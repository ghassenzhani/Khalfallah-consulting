import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { FileText, CreditCard, Shield, Home, GraduationCap, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import React from 'react';

export default function ItalyStudentVisaPage() {
  const documents = [
    { icon: <FileText className="w-5 h-5" />, title: "Passeport valide", desc: "Validité minimum de 12 mois après la date d'entrée en Italie." },
    { icon: <GraduationCap className="w-5 h-5" />, title: "Lettre d'acceptation", desc: "Lettre officielle d'admission de l'université italienne." },
    { icon: <CreditCard className="w-5 h-5" />, title: "Preuve financière", desc: "Environ 6 500€ de ressources financières (compte bancaire ou garant)." },
    { icon: <Shield className="w-5 h-5" />, title: "Assurance santé", desc: "Assurance maladie couvrant toute la durée du séjour en Italie." },
    { icon: <Home className="w-5 h-5" />, title: "Preuve de logement", desc: "Réservation de résidence universitaire ou contrat de location." },
    { icon: <Clock className="w-5 h-5" />, title: "Diplômes traduits", desc: "Diplômes et relevés de notes traduits, apostillés et légalisés." },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-rose-600 text-sm font-semibold tracking-widest mb-4">VISA ÉTUDIANT</div>
            <h1 className="text-5xl font-semibold tracking-tighter">Visa étudiant pour l&apos;Italie</h1>
            <p className="max-w-2xl mx-auto mt-4 text-zinc-600 text-lg">
              Tout ce que vous devez savoir sur la demande de visa étudiant italien depuis la Tunisie. Nous vous accompagnons avec un taux de réussite de 98%.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {documents.map((doc, i) => (
              <div key={i} className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 flex gap-4">
                <div className="w-10 h-10 bg-white shadow rounded-xl flex items-center justify-center text-rose-500 shrink-0">
                  {doc.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{doc.title}</h3>
                  <p className="text-sm text-zinc-600">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-zinc-900 text-white rounded-3xl p-12">
            <h2 className="text-3xl font-semibold tracking-tight mb-8">Étapes de la demande de visa</h2>
            <div className="space-y-6">
              {[
                "Obtenir la lettre d'acceptation de l'université italienne",
                "Préparer tous les documents requis (traductions, apostilles)",
                "Constituer la preuve de ressources financières",
                "Souscrire à une assurance santé valide",
                "Prendre rendez-vous auprès du consulat d'Italie en Tunisie",
                "Déposer le dossier et passer l'entretien consulaire",
                "Récupérer le visa et préparer le voyage",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-full transition-all">
                Commencer ma demande <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
