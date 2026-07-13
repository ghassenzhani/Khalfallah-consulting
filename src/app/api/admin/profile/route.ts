import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
  const session = await getSession();
  
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const adminUser = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      phone: users.phone,
    })
    .from(users)
    .where(eq(users.id, session.id as number))
    .limit(1);

  if (!adminUser.length) {
    return NextResponse.json({ error: 'Admin introuvable' }, { status: 404 });
  }

  return NextResponse.json(adminUser[0]);
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const { fullName, email, phone, password } = await request.json();

  const updateData: any = {};
  if (fullName) updateData.fullName = fullName;
  if (email) updateData.email = email;
  if (phone) updateData.phone = phone;
  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  try {
    await db.update(users)
      .set(updateData)
      .where(eq(users.id, session.id as number));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update admin profile:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour du profil' }, { status: 500 });
  }
}
