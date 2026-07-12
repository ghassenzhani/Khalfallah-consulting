import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users, clientProgress } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { createToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, phone, password, currentLevel, fieldOfStudy, desiredProgram, budget } = await request.json();

    // Check if user exists
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await db.insert(users).values({
      fullName,
      email,
      phone,
      password: hashedPassword,
      currentLevel,
      fieldOfStudy,
      desiredProgram: desiredProgram || null,
      budget: budget || null,
      role: 'client',
      isApproved: false,
    }).returning();

    const user = newUser[0];

    // Create progress record
    await db.insert(clientProgress).values({
      userId: user.id,
      totalAmount: 2500,
      paidAmount: 0,
    });

    // Auto-login
    const token = await createToken({ 
      id: user.id, 
      email: user.email, 
      role: user.role,
      fullName: user.fullName 
    });
    
    await setAuthCookie(token);

    return NextResponse.json({ 
      success: true, 
      user: { id: user.id, fullName: user.fullName, email: user.email, isApproved: false },
      message: 'Compte créé avec succès. En attente d\'approbation par l\'administrateur.'
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur lors de l\'inscription' }, { status: 500 });
  }
}
