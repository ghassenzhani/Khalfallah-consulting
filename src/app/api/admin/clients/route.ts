import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users, clientProgress } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const session = await getSession();
  
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const allClients = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      phone: users.phone,
      currentLevel: users.currentLevel,
      fieldOfStudy: users.fieldOfStudy,
      isApproved: users.isApproved,
      createdAt: users.createdAt,
      progressId: clientProgress.id,
      totalAmount: clientProgress.totalAmount,
      paidAmount: clientProgress.paidAmount,
      steps: clientProgress.steps,
    })
    .from(users)
    .leftJoin(clientProgress, eq(users.id, clientProgress.userId))
    .where(eq(users.role, 'client'))
    .orderBy(desc(users.createdAt));

  return NextResponse.json(allClients);
}

export async function PATCH(request: NextRequest) {
  const session = await getSession();
  
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const { clientId, isApproved, steps, payments, totalAmount, paidAmount } = await request.json();

  if (isApproved !== undefined) {
    await db.update(users)
      .set({ isApproved })
      .where(eq(users.id, clientId));
  }

  if (steps || payments || totalAmount !== undefined || paidAmount !== undefined) {
    await db.update(clientProgress)
      .set({ 
        steps: steps || undefined,
        payments: payments || undefined,
        totalAmount: totalAmount !== undefined ? totalAmount : undefined,
        paidAmount: paidAmount !== undefined ? paidAmount : undefined,
      })
      .where(eq(clientProgress.userId, clientId));
  }

  return NextResponse.json({ success: true });
}
