'use client';

import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: "Quels sont les frais de scolarité en Italie ?", a: "Les universités publiques italiennes ont des frais de scolarité relativement bas, allant de 0€ à 4 000€ par an selon votre ISEE Parificato. Avec une bourse DSU, les frais sont souvent entièrement exonérés." },
  { q: "Comment fonctionne le portail Universitaly ?", a: "Universitaly est la plateforme officielle du gouvernement italien pour les candidatures universitaires des étudiants internationaux. Vous devez y créer un compte, remplir vos informations et soumettre votre candidature entre janvier et juillet selon l'université." },
  { q: "Qu'est-ce que le DSU et comment obtenir une bourse ?", a: "Le DSU (Diritto allo Studio Universitario) est un organisme régional qui attribue des bourses couvrant frais de scolarité, logement en résidence universitaire et repas à tarif réduit. L'éligibilité dépend de votre ISEE Parificato." },
  { q: "Quels documents sont nécessaires pour le visa étudiant ?", a: "Les principaux documents sont : la lettre d'acceptation universitaire, la preuve de logement, la preuve de ressources financières (environ 6 500€), l'assurance santé, le passeport valide et les diplômes traduits et apostillés." },
  { q: "Combien de temps prend la procédure complète ?", a: "La procédure complète prend en moyenne 4 à 8 mois. Nous recommandons de commencer au minimum 6 mois avant la rentrée universitaire souhaitée pour avoir le temps de préparer tous les documents." },
  { q: "Puis-je travailler pendant mes études en Italie ?", a: "Oui, les étudiants non-européens peuvent travailler jusqu'à 20 heures par semaine pendant les cours et à temps plein pendant les vacances avec un permis de séjour étudiant valide." },
  { q: "Faut-il parler italien pour étudier en Italie ?", a: "Pas nécessairement. De nombreuses universités proposent des programmes entièrement en anglais, notamment au niveau Master. Cependant, avoir des bases en italien facilite la vie quotidienne." },
  { q: "Qu'est-ce que l'ISEE Parificato ?", a: "L'ISEE Parificato est un document fiscal qui évalue la situation économique de votre famille. Il est obligatoire pour accéder aux bourses DSU et à la réduction des frais de scolarité. Nous vous aidons à le préparer." },
  { q: "Comment Khalfallah Consulting peut m'aider ?", a: "Nous offrons un accompagnement complet : analyse de profil, choix d'université, préparation des candidatures sur Universitaly, dossier de bourse DSU, recherche de logement et préparation complète du visa. Notre taux de réussite visa est de 98%." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-zinc-100">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center py-6 text-left gap-4">
        <span className="font-semibold text-lg text-zinc-900">{q}</span>
        <ChevronDown className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pb-6 text-zinc-600 leading-relaxed pr-12">{a}</div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-rose-600 text-sm font-semibold tracking-widest mb-4">FAQ</div>
            <h1 className="text-5xl font-semibold tracking-tighter">Questions fréquentes</h1>
            <p className="max-w-lg mx-auto mt-4 text-zinc-600 text-lg">
              Retrouvez les réponses aux questions les plus posées par nos étudiants.
            </p>
          </div>

          <div className="divide-y-0">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
