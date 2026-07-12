import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { leads } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newLead = await db.insert(leads).values({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      appointmentType: body.appointmentType || null,
      appointmentDate: body.appointmentDate || null,
      appointmentTime: body.appointmentTime || null,
      subject: body.subject || null,
      message: body.message || null,
    }).returning();

    return NextResponse.json({ 
      success: true, 
      leadId: newLead[0].id,
      message: "Votre demande a été enregistrée avec succès. Un consultant vous contactera sous 24h."
    });
  } catch (error) {
    console.error('Lead creation error:', error);
    return NextResponse.json({ 
      success: false, 
      message: "Erreur lors de l'enregistrement. Veuillez réessayer." 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allLeads = await db.select().from(leads).orderBy(leads.createdAt);
    return NextResponse.json(allLeads);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
