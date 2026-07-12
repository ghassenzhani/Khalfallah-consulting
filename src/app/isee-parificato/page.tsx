import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

export default function ISEEParificatoPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-rose-600 text-sm font-semibold tracking-widest mb-4">DOCUMENT FISCAL</div>
            <h1 className="text-5xl font-semibold tracking-tighter">ISEE Parificato</h1>
            <p className="max-w-2xl mx-auto mt-4 text-zinc-600 text-lg">
              L&apos;ISEE Parificato est un indicateur de la situation économique de votre famille. Il est indispensable pour accéder aux bourses DSU et à la réduction des frais de scolarité.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight mb-6">Qu&apos;est-ce que l&apos;ISEE Parificato ?</h2>
              <p className="text-zinc-600 leading-relaxed mb-4">
                L&apos;ISEE (Indicatore della Situazione Economica Equivalente) Parificato est l&apos;équivalent italien de la déclaration de revenus familiaux pour les étudiants étrangers.
              </p>
              <p className="text-zinc-600 leading-relaxed mb-4">
                Ce document permet aux organismes DSU de calculer votre droit aux aides financières : bourses, logement en résidence, réduction des frais de scolarité et repas subventionnés.
              </p>
              <p className="text-zinc-600 leading-relaxed">
                Pour les étudiants tunisiens, il nécessite des documents spécifiques traduits et légalisés auprès du consulat d&apos;Italie en Tunisie.
              </p>
            </div>
            <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100">
              <h3 className="font-semibold text-xl mb-6">Documents requis</h3>
              <div className="space-y-4">
                {[
                  "Déclaration des revenus familiaux (attestation de salaire des parents)",
                  "Attestation de propriété immobilière ou certificat de non-propriété",
                  "Composition du foyer (état civil)",
                  "Relevés bancaires des 2 dernières années",
                  "Traduction certifiée de tous les documents en italien",
                  "Légalisation au consulat d'Italie en Tunisie",
                ].map((doc, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <span className="text-zinc-700 text-sm">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-rose-50 rounded-3xl p-10 border border-rose-100 text-center">
            <h2 className="text-2xl font-semibold mb-4">Nous préparons votre ISEE Parificato</h2>
            <p className="text-zinc-600 mb-6 max-w-lg mx-auto">
              La préparation de l&apos;ISEE Parificato est complexe. Nous nous occupons de la collecte, traduction et soumission de tous vos documents.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-full transition-all">
              Nous contacter <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
