import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { ArrowRight, FileCheck, Shield, Clock } from 'lucide-react';

export default function DOVCIMEAPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-rose-600 text-sm font-semibold tracking-widest mb-4">RECONNAISSANCE DIPLÔMES</div>
            <h1 className="text-5xl font-semibold tracking-tighter">DOV / CIMEA</h1>
            <p className="max-w-2xl mx-auto mt-4 text-zinc-600 text-lg">
              La Dichiarazione di Valore (DOV) et la certification CIMEA sont essentielles pour faire reconnaître vos diplômes tunisiens en Italie.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-10">
              <h2 className="text-2xl font-semibold mb-4">Dichiarazione di Valore (DOV)</h2>
              <p className="text-zinc-600 leading-relaxed mb-6">
                La DOV est un document officiel délivré par le consulat d&apos;Italie en Tunisie qui certifie la valeur de votre diplôme tunisien dans le système éducatif italien.
              </p>
              <div className="space-y-3">
                {[
                  "Délivrée par le consulat d'Italie",
                  "Valide votre niveau d'études",
                  "Requise pour l'inscription universitaire",
                  "Délai : 2 à 4 semaines",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FileCheck className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="text-sm text-zinc-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-10">
              <h2 className="text-2xl font-semibold mb-4">Certification CIMEA</h2>
              <p className="text-zinc-600 leading-relaxed mb-6">
                Le CIMEA (Centro Informazioni Mobilità Equivalenze Accademiche) est une alternative digitale à la DOV, acceptée par de nombreuses universités italiennes.
              </p>
              <div className="space-y-3">
                {[
                  "Procédure entièrement en ligne",
                  "Plus rapide que la DOV traditionnelle",
                  "Reconnue par la majorité des universités",
                  "Délai : 1 à 3 semaines",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="text-sm text-zinc-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 text-white rounded-3xl p-12 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-rose-400" />
                <h2 className="text-2xl font-semibold">Ne perdez pas de temps</h2>
              </div>
              <p className="text-zinc-400 mb-6">
                La DOV et la certification CIMEA nécessitent une préparation minutieuse des documents. Nous gérons l&apos;ensemble du processus pour vous.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-full transition-all">
                Lancer ma procédure <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
