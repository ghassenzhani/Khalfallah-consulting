import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users, clientProgress, leads } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';
import { getSession } from '@/lib/auth';

// Generate a random temporary password (MDP)
function generatePassword(length = 10): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const { leadId, email, fullName, phone, currentLevel, fieldOfStudy, desiredDegree } = await request.json();

    if (!email || !fullName) {
      return NextResponse.json({ error: 'Email et nom complet sont requis' }, { status: 400 });
    }

    // 1. Check if user account already exists for this email
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return NextResponse.json({ error: 'Un compte avec cet email existe déjà' }, { status: 400 });
    }

    // 2. Generate secure temporary password
    const plainPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 12);

    // 3. Save new user with role CLIENT & approved status
    const newUser = await db.insert(users).values({
      fullName,
      email,
      phone: phone || '',
      password: hashedPassword,
      currentLevel: currentLevel || 'Baccalauréat',
      fieldOfStudy: fieldOfStudy || desiredDegree || 'Non spécifié',
      desiredProgram: desiredDegree || null,
      appointmentId: leadId ? Number(leadId) : null,
      role: 'client',
      isApproved: true,
    }).returning();

    const user = newUser[0];

    // 4. Initialize tracking stages and document checklist for the new client
    await db.insert(clientProgress).values({
      userId: user.id,
      steps: [
        { stepId: 1, title: '1. Collecte des documents', status: 'pending', notes: 'Collecte et vérification des pièces de dossier' },
        { stepId: 2, title: '2. Traduction & Légalisation', status: 'pending', notes: 'Traductions assermentées et légalisations' },
        { stepId: 3, title: '3. Pré-inscription Universitaire', status: 'pending', notes: 'Sélection des filières et candidatures universités' },
        { stepId: 4, title: '4. Portail Universitaly', status: 'pending', notes: 'Validation du compte Universitaly' },
        { stepId: 5, title: '5. Demande de Visa Étudiant', status: 'pending', notes: 'Prise de rendez-vous et dépôt de visa' },
        { stepId: 6, title: '6. Prêt pour le Départ', status: 'pending', notes: 'Logement, bourse DSU et billet d\'avion' },
      ],
      documents: [
        { id: 'diploma', name: 'Diplôme & Relevés de notes', status: 'Pending', notes: 'Fournir le diplôme original et relevés' },
        { id: 'passport', name: 'Passeport valide', status: 'Pending', notes: 'Valide pour au moins 1 an' },
        { id: 'translation', name: 'Traductions certifiées', status: 'Pending', notes: 'Traduction en italien par un traducteur assermenté' },
        { id: 'cimea_dov', name: 'CIMEA / Déclaration de valeur', status: 'Pending', notes: 'Attestation de comparabilité ou DOV' },
        { id: 'universitaly', name: 'Inscription Universitaly', status: 'Pending', notes: 'Fiche d\'inscription générée sur Universitaly' },
        { id: 'financial_proof', name: 'Garantie financière & ISEE', status: 'Pending', notes: 'Preuves de ressources de 6000€/an minimum' },
      ],
      adminNotes: 'Compte client approuvé. Début du processus d\'accompagnement.',
      totalAmount: 2500,
      paidAmount: 0,
    });

    // 5. Update appointment status to APPROVED
    if (leadId) {
      await db.update(leads)
        .set({ status: 'APPROVED' })
        .where(eq(leads.id, Number(leadId)));
    }

    // 6. Send Welcome Email via Resend (with graceful error handling)
    let emailSent = false;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const loginUrl = `${request.nextUrl.origin}/login`;

        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'Khalfallah Consulting <onboarding@resend.dev>',
          to: email,
          subject: 'Bienvenue chez Khalfallah Consulting - Votre espace client est actif !',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #18181b;">
              <h2 style="color: #e11d48;">Bienvenue chez Khalfallah Consulting 🇹🇳 🇮🇹</h2>
              <p>Bonjour <strong>${fullName}</strong>,</p>
              <p>Nous avons le plaisir de vous informer que votre demande de rendez-vous a été approuvée ! Votre espace client personnalisé est maintenant actif.</p>
              
              <div style="background-color: #f4f4f5; border-radius: 12px; padding: 20px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #18181b;">Vos identifiants de connexion :</h3>
                <p style="margin: 5px 0;"><strong>Email :</strong> ${email}</p>
                <p style="margin: 5px 0;"><strong>Mot de passe temporaire :</strong> <span style="font-family: monospace; background: #ffe4e6; padding: 3px 8px; border-radius: 4px; color: #e11d48; font-weight: bold;">${plainPassword}</span></p>
              </div>

              <p>Vous pouvez suivre l'avancement de votre dossier, consulter vos documents requis et échanger avec votre conseiller depuis votre espace client.</p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${loginUrl}" style="background-color: #e11d48; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Accéder à mon Espace Client</a>
              </div>

              <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 30px 0;" />
              <p style="font-size: 12px; color: #71717a;">Khalfallah Consulting - Accompagnement aux études supérieures en Italie.</p>
            </div>
          `,
        });
        emailSent = true;
      } catch (emailError) {
        console.error('Erreur lors de l\'envoi de l\'email Resend:', emailError);
        // Resend error caught gracefully so DB user remains created
      }
    }

    return NextResponse.json({ 
      success: true,
      client: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
      generatedPassword: plainPassword,
      emailSent,
      message: `Compte approuvé pour ${fullName}.`
    });

  } catch (error) {
    console.error('Erreur lors de l\'approbation du client:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'approbation du client' }, { status: 500 });
  }
}
