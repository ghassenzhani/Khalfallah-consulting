'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  fullName: z.string().min(3, "Le nom complet est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Numéro de téléphone requis"),
  appointmentType: z.string().min(1, "Le type de rendez-vous est requis"),
  appointmentDate: z.string().min(1, "La date est requise"),
  appointmentTime: z.string().min(1, "L'horaire est requis"),
  subject: z.string().min(1, "Le sujet est requis"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion. Veuillez vérifier votre connexion internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate time slots
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  // Appointment subjects
  const subjects = [
    { value: "diagnostic", label: "Diagnostic gratuit" },
    { value: "visa", label: "Préparation visa étudiant" },
    { value: "scholarship", label: "Bourse DSU & logement" },
    { value: "universities", label: "Choix d'université" },
    { value: "documents", label: "Documents & traductions" },
    { value: "autre", label: "Autre demande" },
  ];

  const appointmentTypes = [
    { value: "telephone", label: "Appel téléphonique" },
    { value: "visio", label: "Visio-conférence (Zoom/Meet)" },
    { value: "presentiel", label: "Rendez-vous en agence (Tunis)" },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-zinc-900/10 p-10 md:p-14 max-w-3xl mx-auto">
      {submitted ? (
        <div className="py-16 text-center">
          <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-3xl font-semibold text-zinc-900 mb-3">Rendez-vous confirmé !</h3>
          <p className="text-zinc-600 max-w-md mx-auto">
            Merci pour votre demande. Notre équipe vous contactera dans les plus brefs délais pour confirmer les détails de votre rendez-vous.
          </p>
        </div>
      ) : (
        <>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 tracking-tight">
              Prenez rendez-vous avec un expert
            </h2>
            <p className="text-zinc-500 mt-3 text-sm md:text-base">
              Sélectionnez une plage horaire qui vous convient
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Nom complet <span className="text-rose-500">*</span>
                </label>
                <input 
                  {...register("fullName")} 
                  type="text" 
                  className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 focus:border-rose-300 focus:ring-4 focus:ring-rose-50 rounded-2xl outline-none text-sm transition-all" 
                  placeholder="Votre nom et prénom" 
                />
                {errors.fullName && <p className="text-rose-500 text-xs mt-1.5">{errors.fullName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Email <span className="text-rose-500">*</span>
                </label>
                <input 
                  {...register("email")} 
                  type="email" 
                  className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 focus:border-rose-300 focus:ring-4 focus:ring-rose-50 rounded-2xl outline-none text-sm transition-all" 
                  placeholder="votre@email.com" 
                />
                {errors.email && <p className="text-rose-500 text-xs mt-1.5">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Téléphone <span className="text-rose-500">*</span>
                </label>
                <input 
                  {...register("phone")} 
                  type="tel" 
                  className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 focus:border-rose-300 focus:ring-4 focus:ring-rose-50 rounded-2xl outline-none text-sm transition-all" 
                  placeholder="+216 XX XXX XXX" 
                />
                {errors.phone && <p className="text-rose-500 text-xs mt-1.5">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Type de rendez-vous <span className="text-rose-500">*</span>
                </label>
                <select 
                  {...register("appointmentType")}
                  className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 focus:border-rose-300 focus:ring-4 focus:ring-rose-50 rounded-2xl outline-none text-sm transition-all appearance-none bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%2371717a%22%20stroke-width=%222%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22><polyline%20points=%226%209%2012%2015%2018%209%22/></svg>')] bg-no-repeat bg-[right_1.5rem_center] bg-[length:1rem]"
                >
                  <option value="">Sélectionner</option>
                  {appointmentTypes.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                {errors.appointmentType && <p className="text-rose-500 text-xs mt-1.5">{errors.appointmentType.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Date souhaitée <span className="text-rose-500">*</span>
                </label>
                <input 
                  {...register("appointmentDate")} 
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 focus:border-rose-300 focus:ring-4 focus:ring-rose-50 rounded-2xl outline-none text-sm transition-all" 
                />
                {errors.appointmentDate && <p className="text-rose-500 text-xs mt-1.5">{errors.appointmentDate.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Horaire <span className="text-rose-500">*</span>
                </label>
                <select 
                  {...register("appointmentTime")}
                  className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 focus:border-rose-300 focus:ring-4 focus:ring-rose-50 rounded-2xl outline-none text-sm transition-all appearance-none bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%2371717a%22%20stroke-width=%222%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22><polyline%20points=%226%209%2012%2015%2018%209%22/></svg>')] bg-no-repeat bg-[right_1.5rem_center] bg-[length:1rem]"
                >
                  <option value="">Sélectionner</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                {errors.appointmentTime && <p className="text-rose-500 text-xs mt-1.5">{errors.appointmentTime.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Sujet du rendez-vous <span className="text-rose-500">*</span>
              </label>
              <select 
                {...register("subject")}
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 focus:border-rose-300 focus:ring-4 focus:ring-rose-50 rounded-2xl outline-none text-sm transition-all appearance-none bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%2371717a%22%20stroke-width=%222%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22><polyline%20points=%226%209%2012%2015%2018%209%22/></svg>')] bg-no-repeat bg-[right_1.5rem_center] bg-[length:1rem]"
              >
                <option value="">Choisir le sujet</option>
                {subjects.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              {errors.subject && <p className="text-rose-500 text-xs mt-1.5">{errors.subject.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Informations supplémentaires
              </label>
              <textarea 
                {...register("message")} 
                rows={5}
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 focus:border-rose-300 focus:ring-4 focus:ring-rose-50 rounded-2xl outline-none text-sm resize-y transition-all" 
                placeholder="Parlez-nous de votre projet, votre niveau, la ville ou université visée, vos questions..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 disabled:opacity-70 text-white font-semibold text-base rounded-2xl transition-all active:scale-[0.985] flex items-center justify-center gap-3 shadow-xl shadow-rose-500/30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {isSubmitting ? 'Confirmation...' : 'Confirmer le rendez-vous'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
