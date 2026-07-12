import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { messages, users } from '@/db/schema';
import { eq, or, and, desc, asc } from 'drizzle-orm';
import { getSession } from '@/lib/auth';

// GET: Fetch conversations for admin (all clients who have messages)
// or fetch messages for a specific client
export async function GET(request: NextRequest) {
  const session = await getSession();
  
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get('clientId');

  if (clientId) {
    // Get messages with specific client
    const clientMessages = await db
      .select({
        id: messages.id,
        senderId: messages.senderId,
        receiverId: messages.receiverId,
        content: messages.content,
        isRead: messages.isRead,
        createdAt: messages.createdAt,
      })
      .from(messages)
      .where(
        or(
          and(eq(messages.senderId, Number(session.id)), eq(messages.receiverId, Number(clientId))),
          and(eq(messages.senderId, Number(clientId)), eq(messages.receiverId, Number(session.id)))
        )
      )
      .orderBy(asc(messages.createdAt));

    // Mark unread messages as read
    await db.update(messages)
      .set({ isRead: true })
      .where(
        and(
          eq(messages.senderId, Number(clientId)),
          eq(messages.receiverId, Number(session.id)),
          eq(messages.isRead, false)
        )
      );

    return NextResponse.json(clientMessages);
  }

  // Get all clients who are clients (for conversation list)
  const allClients = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      phone: users.phone,
    })
    .from(users)
    .where(eq(users.role, 'client'))
    .orderBy(desc(users.createdAt));

  return NextResponse.json(allClients);
}

// POST: Send a message
export async function POST(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const { receiverId, content } = await request.json();

  if (!receiverId || !content?.trim()) {
    return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
  }

  const newMessage = await db.insert(messages).values({
    senderId: Number(session.id),
    receiverId: Number(receiverId),
    content: content.trim(),
  }).returning();

  return NextResponse.json(newMessage[0]);
}
