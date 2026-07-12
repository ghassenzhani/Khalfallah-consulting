import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { Target, Heart, Shield, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-rose-600 text-sm font-semibold tracking-widest mb-4">À PROPOS</div>
            <h1 className="text-5xl font-semibold tracking-tighter">Qui sommes-nous ?</h1>
            <p className="max-w-2xl mx-auto mt-4 text-zinc-600 text-lg">
              Khalfallah Consulting est un cabinet spécialisé dans l&apos;accompagnement des étudiants tunisiens souhaitant poursuivre leurs études en Italie.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight mb-6">Notre mission</h2>
              <p className="text-zinc-600 leading-relaxed mb-4">
                Nous croyons que chaque étudiant tunisien mérite l&apos;accès à une éducation de qualité en Europe. Notre mission est de simplifier et démystifier le processus d&apos;études en Italie.
              </p>
              <p className="text-zinc-600 leading-relaxed mb-4">
                Depuis notre création, nous avons accompagné plus de 500 étudiants dans leur parcours vers les universités italiennes, avec un taux de réussite visa de 98%.
              </p>
              <p className="text-zinc-600 leading-relaxed">
                Notre approche personnalisée nous permet de traiter chaque dossier avec l&apos;attention qu&apos;il mérite, en prenant en compte le profil unique de chaque étudiant.
              </p>
            </div>
            <div className="bg-zinc-50 rounded-3xl p-10 border border-zinc-100">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-rose-600">500+</div>
                  <div className="text-sm text-zinc-500 mt-1">Étudiants accompagnés</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-rose-600">98%</div>
                  <div className="text-sm text-zinc-500 mt-1">Taux de réussite visa</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-rose-600">61</div>
                  <div className="text-sm text-zinc-500 mt-1">Universités partenaires</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-rose-600">24h</div>
                  <div className="text-sm text-zinc-500 mt-1">Temps de réponse</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Target className="w-6 h-6" />, title: "Précision", desc: "Chaque dossier est traité avec rigueur et attention aux détails." },
              { icon: <Heart className="w-6 h-6" />, title: "Passion", desc: "Nous sommes passionnés par l'éducation et l'avenir de nos étudiants." },
              { icon: <Shield className="w-6 h-6" />, title: "Fiabilité", desc: "98% de taux de réussite visa grâce à notre expertise." },
              { icon: <Users className="w-6 h-6" />, title: "Proximité", desc: "Un accompagnement humain et personnalisé du début à la fin." },
            ].map((value, i) => (
              <div key={i} className="bg-zinc-50 border border-zinc-100 rounded-3xl p-8 text-center">
                <div className="w-14 h-14 bg-white shadow flex items-center justify-center text-rose-500 mb-4 rounded-2xl mx-auto">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-zinc-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
