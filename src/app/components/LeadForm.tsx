'use client';

import { useState, type FormEvent } from 'react';
import { Loader2, CheckCircle2, Send, Sparkles, Calendar, GraduationCap } from 'lucide-react';
import * as z from 'zod';

const formSchema = z.object({
  fullName: z.string().min(3, "Le nom complet est requis (min 3 caractères)"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide (min 8 chiffres)"),
  desiredDegree: z.string().optional(),
  course: z.string().optional(),
  message: z.string().optional(),
});

type FormStatus = 'idle' | 'submitting' | 'success';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    desiredDegree: 'Licence (Laurea Triennale)',
    course: 'universities',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const degrees = [
    { value: 'Licence (Laurea Triennale)', label: 'Licence / Bachelor (3 ans)' },
    { value: 'Master (Laurea Magistrale)', label: 'Master (2 ans)' },
    { value: 'Médecine / Chirurgie (Single-Cycle)', label: 'Médecine / Pharmacie (5-6 ans)' },
    { value: 'Doctorat (PhD)', label: 'Doctorat / PhD' },
    { value: 'Autre / Diagnostic', label: 'Autre / Diagnostic personnalisé' },
  ];

  const courses = [
    { value: 'universities', label: "Choix d'université & Candidature" },
    { value: 'visa', label: 'Préparation Visa Étudiant Italie' },
    { value: 'dsu', label: 'Bourse DSU & Logement Étudiant' },
    { value: 'documents', label: 'Légalisation & Traductions de documents' },
    { value: 'trial', label: 'Diagnostic gratuit (Évaluation de dossier)' },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validate using Zod schema
    const validation = formSchema.safeParse(formData);
    if (!validation.success) {
      setErrorMsg(validation.error.issues[0].message);
      return;
    }

    // 1. Show loading state
    setStatus('submitting');

    try {
      // Send data to API endpoint
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          desiredDegree: formData.desiredDegree,
          notes: formData.message,
          subject: formData.course,
          message: formData.message,
        }),
      });

      // 2. Network delay simulation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (res.ok) {
        // 3. Show success state
        setStatus('success');

        // Reset form data
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          desiredDegree: 'Licence (Laurea Triennale)',
          course: 'universities',
          message: '',
        });

        // 4. Return to idle after 4 seconds
        setTimeout(() => {
          setStatus('idle');
        }, 4000);
      } else {
        setStatus('idle');
        setErrorMsg('Une erreur est survenue lors de l\'envoi de votre demande.');
      }
    } catch (err) {
      console.error(err);
      setStatus('idle');
      setErrorMsg('Erreur de connexion. Veuillez vérifier votre réseau.');
    }
  };

  return (
    <div className="contact-form-card bg-white rounded-3xl shadow-xl shadow-zinc-900/5 border border-zinc-100 p-8 md:p-12 transition-all">
      {status === 'success' ? (
        <div className="text-center py-12 px-4 transition-all animate-in fade-in duration-300">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h3 className="text-3xl font-bold text-zinc-900 tracking-tight mb-2">
            Demande enregistrée !
          </h3>
          <p className="text-zinc-600 max-w-sm mx-auto text-base">
            Votre rendez-vous a été créé avec le statut <strong className="text-amber-600 font-semibold">PENDING</strong>. Notre équipe va examiner votre dossier et vous envoyer vos identifiants d'accès.
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-zinc-400 font-medium">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>Réinitialisation dans 4 secondes...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold uppercase tracking-wider mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Demande de Rendez-vous</span>
            </div>
            <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">
              Prenez rendez-vous avec un conseiller
            </h2>
            <p className="text-zinc-500 mt-2 text-sm md:text-base">
              Remplissez les informations ci-dessous pour ouvrir votre dossier étudiant.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-2xl font-medium">
              {errorMsg}
            </div>
          )}

          <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                  Nom complet <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))}
                  placeholder="Ex: Mohamed Ben Salem"
                  className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 rounded-2xl outline-none text-sm text-zinc-900 transition-all placeholder:text-zinc-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                  Téléphone / WhatsApp <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="+216 XX XXX XXX"
                  className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 rounded-2xl outline-none text-sm text-zinc-900 transition-all placeholder:text-zinc-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                Adresse Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                placeholder="votre.email@exemple.com"
                className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 rounded-2xl outline-none text-sm text-zinc-900 transition-all placeholder:text-zinc-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                  Niveau / Diplôme visé
                </label>
                <select
                  value={formData.desiredDegree}
                  onChange={(e) => setFormData((p) => ({ ...p, desiredDegree: e.target.value }))}
                  className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 rounded-2xl outline-none text-sm text-zinc-900 transition-all appearance-none bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%2371717a%22%20stroke-width=%222%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22><polyline%20points=%226%209%2012%2015%2018%209%22/></svg>')] bg-no-repeat bg-[right_1.25rem_center] bg-[length:1rem]"
                >
                  {degrees.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                  Service principal
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData((p) => ({ ...p, course: e.target.value }))}
                  className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 rounded-2xl outline-none text-sm text-zinc-900 transition-all appearance-none bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%2371717a%22%20stroke-width=%222%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22><polyline%20points=%226%209%2012%2015%2018%209%22/></svg>')] bg-no-repeat bg-[right_1.25rem_center] bg-[length:1rem]"
                >
                  {courses.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                Notes ou questions complémentaires
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                placeholder="Précisez votre filière, la ville préférée ou toute question sur votre dossier..."
                className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 rounded-2xl outline-none text-sm text-zinc-900 transition-all resize-y placeholder:text-zinc-400"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-submit w-full py-4 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 disabled:opacity-75 text-white font-semibold text-sm rounded-2xl transition-all shadow-lg shadow-rose-500/25 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Enregistrement en cours...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Demander un rendez-vous (Statut PENDING)</span>
                </>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

