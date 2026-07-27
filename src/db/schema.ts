import { pgTable, serial, text, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: text('email').unique().notNull(),
  phone: text('phone').notNull(),
  password: text('password').notNull(),
  currentLevel: text('current_level').notNull(),
  fieldOfStudy: text('field_of_study').notNull(),
  desiredProgram: text('desired_program'),
  budget: text('budget'),
  appointmentId: integer('appointment_id'),
  role: text('role').default('client'), // client or admin
  isApproved: boolean('is_approved').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const clientProgress = pgTable('client_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  steps: jsonb('steps').default([
    { stepId: 1, title: '1. Collecte des documents', status: 'pending', notes: 'Collecte et vérification des pièces de dossier' },
    { stepId: 2, title: '2. Traduction & Légalisation', status: 'pending', notes: 'Traductions assermentées et légalisations' },
    { stepId: 3, title: '3. Pré-inscription Universitaire', status: 'pending', notes: 'Sélection des filières et candidatures universités' },
    { stepId: 4, title: '4. Portail Universitaly', status: 'pending', notes: 'Validation du compte Universitaly' },
    { stepId: 5, title: '5. Demande de Visa Étudiant', status: 'pending', notes: 'Prise de rendez-vous et dépôt de visa' },
    { stepId: 6, title: '6. Prêt pour le Départ', status: 'pending', notes: 'Logement, bourse DSU et billet d’avion' },
  ]),
  documents: jsonb('documents').default([
    { id: 'diploma', name: 'Diplôme & Relevés de notes', status: 'Pending', notes: 'Fournir le diplôme original et relevés' },
    { id: 'passport', name: 'Passeport valide', status: 'Pending', notes: 'Valide pour au moins 1 an' },
    { id: 'translation', name: 'Traductions certifiées', status: 'Pending', notes: 'Traduction en italien par un traducteur assermenté' },
    { id: 'cimea_dov', name: 'CIMEA / Déclaration de valeur', status: 'Pending', notes: 'Attestation de comparabilité ou DOV' },
    { id: 'universitaly', name: 'Inscription Universitaly', status: 'Pending', notes: 'Fiche d’inscription générée sur Universitaly' },
    { id: 'financial_proof', name: 'Garantie financière & ISEE', status: 'Pending', notes: 'Preuves de ressources de 6000€/an minimum' },
  ]),
  adminNotes: text('admin_notes'),
  payments: jsonb('payments').default([]), // array of {id, amount, date, status: 'paid'|'pending'}
  totalAmount: integer('total_amount').default(2500), // example in euros
  paidAmount: integer('paid_amount').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  desiredDegree: text('desired_degree'),
  notes: text('notes'),
  appointmentType: text('appointment_type'), // diagnostic, visa, scholarship, university
  appointmentDate: text('appointment_date'),
  appointmentTime: text('appointment_time'),
  subject: text('subject'),
  message: text('message'),
  status: text('status').default('PENDING'), // PENDING | APPROVED | REJECTED | converted | new
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const testimonials = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  university: text('university').notNull(),
  quote: text('quote').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const universities = pgTable('universities', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  location: text('location').notNull(), // Milan, Rome, Bologna, etc.
  popularPrograms: text('popular_programs'), // comma separated
  description: text('description').notNull(),
  website: text('website'),
  image: text('image'),
});

export const steps = pgTable('steps', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(), // profile, documents, etc.
  order: integer('order').notNull(),
});

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  senderId: integer('sender_id').references(() => users.id).notNull(),
  receiverId: integer('receiver_id').references(() => users.id).notNull(),
  content: text('content').notNull(),
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type Testimonial = typeof testimonials.$inferSelect;
export type University = typeof universities.$inferSelect;
export type Step = typeof steps.$inferSelect;
export type User = typeof users.$inferSelect;
export type Message = typeof messages.$inferSelect;

