import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { createToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const userResults = await db.select().from(users).where(eq(users.email, email));
    if (userResults.length === 0) {
      return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
    }

    const user = userResults[0];
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
    }

    if (user.role === 'client' && !user.isApproved) {
      return NextResponse.json({ error: 'Votre compte n\'a pas encore été approuvé par l\'administrateur.' }, { status: 403 });
    }

    const token = await createToken({ 
      id: user.id, 
      email: user.email, 
      role: user.role,
      fullName: user.fullName 
    });
    
    await setAuthCookie(token);

    return NextResponse.json({ 
      success: true, 
      user: { 
        id: user.id, 
        fullName: user.fullName, 
        email: user.email, 
        role: user.role,
        isApproved: user.isApproved 
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur de connexion' }, { status: 500 });
  }
}
