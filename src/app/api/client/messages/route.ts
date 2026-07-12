import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { messages } from '@/db/schema';
import { eq, or, and, asc } from 'drizzle-orm';
import { getSession } from '@/lib/auth';

// GET: Fetch messages for the logged-in client
export async function GET(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const clientMessages = await db
    .select()
    .from(messages)
    .where(
      or(
        eq(messages.senderId, Number(session.id)),
        eq(messages.receiverId, Number(session.id))
      )
    )
    .orderBy(asc(messages.createdAt));

  // Mark received messages as read
  await db.update(messages)
    .set({ isRead: true })
    .where(
      and(
        eq(messages.receiverId, Number(session.id)),
        eq(messages.isRead, false)
      )
    );

  return NextResponse.json(clientMessages);
}

// POST: Client sends a message to admin
export async function POST(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const { receiverId, content } = await request.json();

  if (!content?.trim()) {
    return NextResponse.json({ error: 'Message vide' }, { status: 400 });
  }

  const newMessage = await db.insert(messages).values({
    senderId: Number(session.id),
    receiverId: Number(receiverId),
    content: content.trim(),
  }).returning();

  return NextResponse.json(newMessage[0]);
}
