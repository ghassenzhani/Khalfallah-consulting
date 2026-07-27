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

  const defaultClients = [
    {
      id: 2,
      fullName: 'Ahmed Ben Ali',
      email: 'etudiant@test.com',
      phone: '+216 55 123 456',
      currentLevel: 'Baccalauréat',
      fieldOfStudy: 'Informatique / Génie Logiciel',
      isApproved: true,
      createdAt: new Date().toISOString(),
      progressId: 1,
      totalAmount: 2500,
      paidAmount: 1000,
      steps: [
        { stepId: 1, title: '1. Collecte des documents', status: 'completed', notes: 'Vérification complète' },
        { stepId: 2, title: '2. Traduction & Légalisation', status: 'in-progress', notes: 'En cours de traduction' },
        { stepId: 3, title: '3. Pré-inscription Universitaire', status: 'pending', notes: '' },
        { stepId: 4, title: '4. Portail Universitaly', status: 'pending', notes: '' },
        { stepId: 5, title: '5. Demande de Visa Étudiant', status: 'pending', notes: '' },
        { stepId: 6, title: '6. Prêt pour le Départ', status: 'pending', notes: '' },
      ],
    }
  ];

  try {
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

    if (allClients.length > 0) {
      return NextResponse.json(allClients);
    }
  } catch (err) {
    console.warn('DB query error in admin clients, using fallback:', err);
  }

  return NextResponse.json(defaultClients);
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
