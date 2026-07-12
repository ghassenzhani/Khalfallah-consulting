import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function UniversitalyPage() {
  const steps = [
    { step: "01", title: "Créer un compte", desc: "Rendez-vous sur universitaly.it et créez votre compte personnel avec votre adresse email et vos informations." },
    { step: "02", title: "Remplir le profil", desc: "Complétez vos informations personnelles, académiques et choisissez votre nationalité (tunisienne)." },
    { step: "03", title: "Choisir l'université", desc: "Sélectionnez l'université et le programme souhaités parmi les options disponibles pour votre profil." },
    { step: "04", title: "Télécharger les documents", desc: "Uploadez vos diplômes traduits, relevés de notes, lettre de motivation et autres documents requis." },
    { step: "05", title: "Soumettre la candidature", desc: "Vérifiez toutes les informations et soumettez votre candidature avant la date limite." },
    { step: "06", title: "Suivi et confirmation", desc: "Suivez l'état de votre candidature et attendez la lettre d'acceptation de l'université." },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-rose-600 text-sm font-semibold tracking-widest mb-4">PORTAIL OFFICIEL</div>
            <h1 className="text-5xl font-semibold tracking-tighter">Universitaly</h1>
            <p className="max-w-2xl mx-auto mt-4 text-zinc-600 text-lg">
              Universitaly est le portail officiel du gouvernement italien pour les candidatures universitaires internationales. Voici comment l&apos;utiliser.
            </p>
          </div>

          <div className="space-y-6 mb-20">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-6 items-start bg-zinc-50 border border-zinc-100 rounded-2xl p-8">
                <div className="text-3xl font-bold text-rose-600/30 shrink-0 w-12">{s.step}</div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">{s.title}</h3>
                  <p className="text-zinc-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-rose-50 rounded-3xl p-10 border border-rose-100 text-center">
            <h2 className="text-2xl font-semibold mb-4">Besoin d&apos;aide avec Universitaly ?</h2>
            <p className="text-zinc-600 mb-6 max-w-lg mx-auto">
              Le processus peut être complexe. Nous gérons votre inscription Universitaly de A à Z pour maximiser vos chances d&apos;acceptation.
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
