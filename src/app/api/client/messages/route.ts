import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { messages, users } from '@/db/schema';
import { eq, or, and, asc } from 'drizzle-orm';
import { getSession } from '@/lib/auth';

// GET: Fetch messages for the logged-in client
export async function GET(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const currentUserId = Number(session.id);

  try {
    const clientMessages = await db
      .select()
      .from(messages)
      .where(
        or(
          eq(messages.senderId, currentUserId),
          eq(messages.receiverId, currentUserId)
        )
      )
      .orderBy(asc(messages.createdAt));

    // Mark received messages as read
    await db.update(messages)
      .set({ isRead: true })
      .where(
        and(
          eq(messages.receiverId, currentUserId),
          eq(messages.isRead, false)
        )
      );

    return NextResponse.json({ currentUserId, messages: clientMessages });
  } catch (err) {
    console.warn('Error fetching client messages, returning empty list:', err);
    return NextResponse.json({ currentUserId, messages: [] });
  }
}

// POST: Client sends a message to admin
export async function POST(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const { receiverId, content } = await request.json();

    if (!content?.trim()) {
      return NextResponse.json({ error: 'Message vide' }, { status: 400 });
    }

    // Automatically resolve receiverId to admin if not valid
    let finalReceiverId = Number(receiverId);
    if (!finalReceiverId || finalReceiverId === Number(session.id)) {
      try {
        const adminUsers = await db.select().from(users).where(eq(users.role, 'admin')).limit(1);
        if (adminUsers.length > 0) {
          finalReceiverId = adminUsers[0].id;
        } else {
          finalReceiverId = 1;
        }
      } catch {
        finalReceiverId = 1;
      }
    }

    const newMessage = await db.insert(messages).values({
      senderId: Number(session.id),
      receiverId: finalReceiverId,
      content: content.trim(),
    }).returning();

    return NextResponse.json(newMessage[0]);
  } catch (err) {
    console.error('Error sending client message:', err);
    return NextResponse.json({ error: 'Erreur lors de l\'envoi du message' }, { status: 500 });
  }
}
