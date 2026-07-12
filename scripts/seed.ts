import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { db } from '../src/db';
import { users, clientProgress } from '../src/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 Seeding database...');

  // Check if admin exists
  const existingAdmin = await db.select().from(users).where(eq(users.email, 'admin@khalfallah.com'));
  
  if (existingAdmin.length === 0) {
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await db.insert(users).values({
      fullName: 'Admin Khalfallah',
      email: 'admin@khalfallah.com',
      phone: '+216 98 123 456',
      password: hashedPassword,
      currentLevel: 'admin',
      fieldOfStudy: 'admin',
      role: 'admin',
      isApproved: true,
    });
    console.log('✅ Admin account created: admin@khalfallah.com / admin123');
  } else {
    console.log('ℹ️  Admin account already exists');
  }

  // Create a demo client for testing
  const existingClient = await db.select().from(users).where(eq(users.email, 'etudiant@test.com'));
  
  if (existingClient.length === 0) {
    const hashedClientPw = await bcrypt.hash('client123', 12);
    const newClient = await db.insert(users).values({
      fullName: 'Ahmed Ben Ali',
      email: 'etudiant@test.com',
      phone: '+216 55 123 456',
      password: hashedClientPw,
      currentLevel: 'Baccalauréat',
      fieldOfStudy: 'Informatique',
      desiredProgram: 'Computer Science',
      role: 'client',
      isApproved: true,
    }).returning();

    await db.insert(clientProgress).values({
      userId: newClient[0].id,
      totalAmount: 2500,
      paidAmount: 800,
      steps: [
        { stepId: 1, title: 'Analyse de Profil', status: 'completed', notes: 'Profil validé le 15/06/2026' },
        { stepId: 2, title: 'Documents & Traductions', status: 'completed', notes: 'Tous les documents reçus' },
        { stepId: 3, title: 'Choix Universités', status: 'in-progress', notes: 'En attente de réponse de Bologne' },
        { stepId: 4, title: 'Candidatures & Universitaly', status: 'pending', notes: '' },
        { stepId: 5, title: 'Bourses & Logement', status: 'pending', notes: '' },
        { stepId: 6, title: 'Préparation Visa', status: 'pending', notes: '' },
      ],
    });
    console.log('✅ Demo client created: etudiant@test.com / client123');
  } else {
    console.log('ℹ️  Demo client already exists');
  }

  console.log('\n🎉 Seeding complete!');
  console.log('\n📋 Login credentials:');
  console.log('   Admin: admin@khalfallah.com / admin123');
  console.log('   Client: etudiant@test.com / client123');
  
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
