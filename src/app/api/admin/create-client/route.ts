import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users, clientProgress, leads } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { getSession } from '@/lib/auth';

// Generate a random password
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
    const { fullName, email, phone, currentLevel, fieldOfStudy, leadId } = await request.json();

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return NextResponse.json({ error: 'Un compte avec cet email existe déjà' }, { status: 400 });
    }

    // Generate password
    const plainPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 12);

    // Create client account
    const newUser = await db.insert(users).values({
      fullName,
      email,
      phone,
      password: hashedPassword,
      currentLevel: currentLevel || 'Non spécifié',
      fieldOfStudy: fieldOfStudy || 'Non spécifié',
      role: 'client',
      isApproved: true, // Auto-approved since admin is creating it
    }).returning();

    const user = newUser[0];

    // Create progress record
    await db.insert(clientProgress).values({
      userId: user.id,
      totalAmount: 2500,
      paidAmount: 0,
    });

    // If created from a lead, update lead status
    if (leadId) {
      await db.update(leads)
        .set({ status: 'converted' })
        .where(eq(leads.id, leadId));
    }

    return NextResponse.json({ 
      success: true,
      client: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
      generatedPassword: plainPassword, // Show to admin so they can send to client
      message: `Compte créé pour ${fullName}. Mot de passe: ${plainPassword}`
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur lors de la création du compte' }, { status: 500 });
  }
}
