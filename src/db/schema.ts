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
  role: text('role').default('client'), // client or admin
  isApproved: boolean('is_approved').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const clientProgress = pgTable('client_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  steps: jsonb('steps').default([ // array of {stepId, title, status: 'pending'|'in-progress'|'completed', notes}
    { stepId: 1, title: 'Analyse de Profil', status: 'pending', notes: '' },
    { stepId: 2, title: 'Documents & Traductions', status: 'pending', notes: '' },
    { stepId: 3, title: 'Choix Universités', status: 'pending', notes: '' },
    { stepId: 4, title: 'Candidatures & Universitaly', status: 'pending', notes: '' },
    { stepId: 5, title: 'Bourses & Logement', status: 'pending', notes: '' },
    { stepId: 6, title: 'Préparation Visa', status: 'pending', notes: '' },
  ]),
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
  appointmentType: text('appointment_type'), // diagnostic, visa, scholarship, university
  appointmentDate: text('appointment_date'),
  appointmentTime: text('appointment_time'),
  subject: text('subject'),
  message: text('message'),
  status: text('status').default('new'),
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

