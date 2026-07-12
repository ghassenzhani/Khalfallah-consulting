import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { ArrowRight, Building2, CheckCircle2 } from 'lucide-react';

export default function UniversitiesWithoutTestPage() {
  const universities = [
    { name: "Università di Bologna", city: "Bologne", programs: "Économie, Sciences politiques, Ingénierie", note: "L'une des plus anciennes universités au monde" },
    { name: "Università di Padova", city: "Padoue", programs: "Sciences, Ingénierie, Économie, Pharmacie", note: "Top 5 en Italie" },
    { name: "Università di Firenze", city: "Florence", programs: "Architecture, Arts, Sciences sociales", note: "Excellence en arts et humanités" },
    { name: "Università di Torino", city: "Turin", programs: "Droit, Économie, Sciences, Informatique", note: "Grande variété de programmes" },
    { name: "Università di Pavia", city: "Pavie", programs: "Ingénierie, Médecine, Sciences", note: "Forte tradition scientifique" },
    { name: "Università della Calabria", city: "Cosenza", programs: "Ingénierie, Économie, Sciences", note: "Campus moderne, coût de vie bas" },
    { name: "Università di Salerno", city: "Salerne", programs: "Ingénierie, Informatique, Économie", note: "Grand campus, bonne qualité de vie" },
    { name: "Università di Perugia", city: "Pérouse", programs: "Économie, Sciences, Pharmacie", note: "Ville étudiante par excellence" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-rose-600 text-sm font-semibold tracking-widest mb-4">SANS TEST D&apos;ENTRÉE</div>
            <h1 className="text-5xl font-semibold tracking-tighter">Universities without test</h1>
            <p className="max-w-2xl mx-auto mt-4 text-zinc-600 text-lg">
              De nombreuses universités italiennes acceptent les étudiants sans test d&apos;admission. L&apos;inscription se fait directement via Universitaly.
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-12 flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-emerald-800 mb-1">Bonne nouvelle !</h3>
              <p className="text-zinc-700 text-sm">La majorité des programmes de licence en Italie n&apos;exigent pas de test d&apos;entrée. Seuls certains programmes spécifiques (Médecine, Architecture, etc.) nécessitent un examen d&apos;admission.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {universities.map((uni, i) => (
              <div key={i} className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 bg-white shadow rounded-xl flex items-center justify-center text-rose-500 shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{uni.name}</h3>
                  <div className="text-rose-600 text-sm font-medium mb-1">{uni.city}</div>
                  <p className="text-sm text-zinc-600 mb-1">{uni.programs}</p>
                  <p className="text-xs text-zinc-400 italic">{uni.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-zinc-900 text-white rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-semibold tracking-tight mb-4">Candidatez sans test d&apos;entrée</h2>
            <p className="text-zinc-400 max-w-lg mx-auto mb-8">
              Nous identifions les meilleures universités sans test pour votre profil et préparons votre candidature complète.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-full transition-all">
              Commencer maintenant <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
