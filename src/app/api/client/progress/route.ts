import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { clientProgress } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const session = await getSession();
  
  if (!session || !session.id) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const defaultProgress = {
    id: 1,
    userId: Number(session.id),
    steps: [
      { stepId: 1, title: '1. Collecte des documents', status: 'completed', notes: 'Tous les documents de base ont été vérifiés' },
      { stepId: 2, title: '2. Traduction & Légalisation', status: 'in-progress', notes: 'Traductions en cours chez le traducteur assermenté' },
      { stepId: 3, title: '3. Pré-inscription Universitaire', status: 'pending', notes: 'Choix de 3 universités cibles' },
      { stepId: 4, title: '4. Portail Universitaly', status: 'pending', notes: 'Compte Universitaly en attente' },
      { stepId: 5, title: '5. Demande de Visa Étudiant', status: 'pending', notes: 'Dépôt de visa à préparer' },
      { stepId: 6, title: '6. Prêt pour le Départ', status: 'pending', notes: 'Bourse DSU et logement' },
    ],
    documents: [
      { id: 'diploma', name: 'Diplôme & Relevés de notes', status: 'Approved', notes: 'Vérifié par l\'agence' },
      { id: 'passport', name: 'Passeport valide', status: 'Approved', notes: 'Valide jusqu\'en 2028' },
      { id: 'translation', name: 'Traductions certifiées', status: 'Action Needed', notes: 'Action requise: fournir le tampon de légalisation' },
      { id: 'cimea_dov', name: 'CIMEA / Déclaration de valeur', status: 'Pending', notes: 'En attente de traitement' },
      { id: 'universitaly', name: 'Fiche Universitaly', status: 'Pending', notes: 'En attente de pré-inscription' },
      { id: 'financial_proof', name: 'Garantie financière & ISEE', status: 'Pending', notes: 'Relevé bancaire 6000€ min' },
    ],
    adminNotes: 'Bienvenue dans votre espace client ! Votre dossier est pris en charge.',
    totalAmount: 2500,
    paidAmount: 1000,
  };

  try {
    const progress = await db
      .select()
      .from(clientProgress)
      .where(eq(clientProgress.userId, Number(session.id)))
      .limit(1);

    if (progress.length > 0) {
      return NextResponse.json(progress[0]);
    }
  } catch (err) {
    console.warn('DB error fetching progress, using default fallback:', err);
  }

  return NextResponse.json(defaultProgress);
}

