import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { ArrowRight, GraduationCap, Calendar, FileText, CheckCircle2 } from 'lucide-react';

export default function StudyAfterBacPage() {
  const timeline = [
    { month: "Septembre - Novembre", task: "Analyse de profil et préparation des documents", icon: <FileText className="w-5 h-5" /> },
    { month: "Décembre - Février", task: "Traduction, apostille et candidatures Universitaly", icon: <GraduationCap className="w-5 h-5" /> },
    { month: "Mars - Mai", task: "Suivi des candidatures et préparation de la bourse DSU", icon: <Calendar className="w-5 h-5" /> },
    { month: "Juin - Août", task: "Préparation du visa et recherche de logement", icon: <CheckCircle2 className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-rose-600 text-sm font-semibold tracking-widest mb-4">APRÈS LE BAC</div>
            <h1 className="text-5xl font-semibold tracking-tighter">Study after bac</h1>
            <p className="max-w-2xl mx-auto mt-4 text-zinc-600 text-lg">
              Vous venez d&apos;obtenir votre baccalauréat en Tunisie ? Découvrez comment intégrer une université italienne dès la rentrée suivante.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight mb-6">Pourquoi l&apos;Italie après le bac ?</h2>
              <div className="space-y-4">
                {[
                  "Frais de scolarité parmi les plus bas d'Europe (0 à 4 000€/an)",
                  "Possibilité de bourse DSU couvrant tous les frais",
                  "Programmes en anglais disponibles dès la licence",
                  "Diplôme reconnu dans toute l'Union Européenne",
                  "Coût de la vie abordable comparé à la France ou au UK",
                  "Possibilité de travailler 20h/semaine pendant les études",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <span className="text-zinc-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100">
              <h3 className="font-semibold text-xl mb-6">Conditions d&apos;admission</h3>
              <div className="space-y-4">
                {[
                  "Baccalauréat tunisien (toutes sections)",
                  "Minimum 12 ans de scolarité",
                  "Niveau B2 en italien ou anglais selon le programme",
                  "Documents traduits et apostillés",
                  "Inscription sur le portail Universitaly",
                ].map((req, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                    <span className="text-zinc-700">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-semibold tracking-tight text-center mb-10">Calendrier type</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {timeline.map((item, i) => (
                <div key={i} className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-white shadow flex items-center justify-center text-rose-500 rounded-2xl mx-auto mb-4">{item.icon}</div>
                  <div className="text-rose-600 font-semibold text-sm mb-2">{item.month}</div>
                  <p className="text-sm text-zinc-600">{item.task}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-rose-50 rounded-3xl p-10 border border-rose-100 text-center">
            <h2 className="text-2xl font-semibold mb-4">Prêt à commencer après le bac ?</h2>
            <p className="text-zinc-600 mb-6 max-w-lg mx-auto">
              Contactez-nous pour un diagnostic gratuit de votre profil et un plan d&apos;action personnalisé.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-full transition-all">
              Diagnostic gratuit <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
