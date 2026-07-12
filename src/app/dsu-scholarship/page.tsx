import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

export default function DSUScholarshipPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-rose-600 text-sm font-semibold tracking-widest mb-4">BOURSES</div>
            <h1 className="text-5xl font-semibold tracking-tighter">Bourse DSU</h1>
            <p className="max-w-2xl mx-auto mt-4 text-zinc-600 text-lg">
              Le Diritto allo Studio Universitario (DSU) offre des bourses régionales couvrant frais de scolarité, logement et repas aux étudiants éligibles.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              { title: "Frais de scolarité", desc: "Exonération totale ou partielle des frais universitaires selon votre ISEE.", value: "Jusqu'à 4 000€/an" },
              { title: "Logement", desc: "Place en résidence universitaire gratuite ou à tarif réduit.", value: "Résidence gratuite" },
              { title: "Repas", desc: "Accès aux cantines universitaires à tarif subventionné.", value: "~2€ par repas" },
            ].map((item, i) => (
              <div key={i} className="bg-zinc-50 border border-zinc-100 rounded-3xl p-8 text-center">
                <div className="text-rose-600 font-bold text-sm mb-4">{item.value}</div>
                <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
                <p className="text-sm text-zinc-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8">
              <h3 className="font-semibold text-xl mb-6 text-emerald-800">Critères d&apos;éligibilité</h3>
              <div className="space-y-4">
                {[
                  "ISEE Parificato inférieur au seuil régional (~24 000€)",
                  "Inscription dans une université publique italienne",
                  "Mérite académique (crédits minimum requis)",
                  "Soumission du dossier dans les délais",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-zinc-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-rose-50 border border-rose-100 rounded-3xl p-8">
              <h3 className="font-semibold text-xl mb-6 text-rose-800">Erreurs à éviter</h3>
              <div className="space-y-4">
                {[
                  "Oublier de demander l'ISEE Parificato à temps",
                  "Ne pas respecter les délais de candidature DSU",
                  "Fournir des documents incomplets ou non traduits",
                  "Ignorer les crédits minimum requis chaque année",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <span className="text-zinc-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 text-white rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-semibold tracking-tight mb-4">Nous préparons votre dossier DSU</h2>
            <p className="text-zinc-400 max-w-lg mx-auto mb-8">
              Notre équipe s&apos;occupe de la préparation complète de votre dossier ISEE Parificato et de votre candidature DSU.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-full transition-all">
              Demander un accompagnement <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
