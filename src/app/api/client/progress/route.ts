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

  const progress = await db
    .select()
    .from(clientProgress)
    .where(eq(clientProgress.userId, Number(session.id)))
    .limit(1);

  if (progress.length === 0) {
    return NextResponse.json({ error: 'Aucun progrès trouvé' }, { status: 404 });
  }

  return NextResponse.json(progress[0]);
}

