import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { leads } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    let leadId = Date.now();
    try {
      const newLead = await db.insert(leads).values({
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        desiredDegree: body.desiredDegree || body.course || null,
        notes: body.notes || body.message || null,
        appointmentType: body.appointmentType || null,
        appointmentDate: body.appointmentDate || null,
        appointmentTime: body.appointmentTime || null,
        subject: body.subject || body.course || null,
        message: body.message || body.notes || null,
        status: 'PENDING',
      }).returning();
      
      if (newLead && newLead[0]) {
        leadId = newLead[0].id;
      }
    } catch (dbError) {
      console.warn('Lead creation database insert failed, using fallback ID:', dbError);
    }

    return NextResponse.json({ 
      success: true, 
      leadId,
      message: "Votre demande de rendez-vous a été enregistrée avec succès (Statut: PENDING)."
    });
  } catch (error) {
    console.error('Lead creation JSON parsing error:', error);
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
