import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Award, Globe } from 'lucide-react';

export default function MasterInItalyPage() {
  const advantages = [
    { icon: <Award className="w-6 h-6" />, title: "Excellence académique", desc: "Les universités italiennes figurent parmi les meilleures au monde, avec des programmes reconnus internationalement." },
    { icon: <Globe className="w-6 h-6" />, title: "Programmes internationaux", desc: "De nombreux Masters sont enseignés entièrement en anglais, attirant des étudiants du monde entier." },
    { icon: <BookOpen className="w-6 h-6" />, title: "Recherche avancée", desc: "Accès à des laboratoires de pointe et des projets de recherche européens." },
    { icon: <Clock className="w-6 h-6" />, title: "Durée : 2 ans", desc: "Les programmes de Master en Italie durent généralement 2 ans (120 crédits ECTS)." },
  ];

  const popularFields = [
    "Ingénierie (Politecnico di Milano, Politecnico di Torino)",
    "Économie et Management (Bocconi, LUISS)",
    "Architecture et Design (Politecnico di Milano)",
    "Sciences politiques et Relations internationales (Bologne, LUISS)",
    "Informatique et Intelligence artificielle (Milan, Turin, Bologne)",
    "Médecine et Sciences de la santé (La Sapienza, Bologne)",
    "Arts et Patrimoine culturel (Florence, Venise)",
    "Droit international (Bologne, Milan)",
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-rose-600 text-sm font-semibold tracking-widest mb-4">MASTER</div>
            <h1 className="text-5xl font-semibold tracking-tighter">Master in Italy</h1>
            <p className="max-w-2xl mx-auto mt-4 text-zinc-600 text-lg">
              Poursuivez vos études avec un Master dans une université italienne de renommée mondiale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {advantages.map((adv, i) => (
              <div key={i} className="bg-zinc-50 border border-zinc-100 rounded-3xl p-8 text-center">
                <div className="w-14 h-14 bg-white shadow flex items-center justify-center text-rose-500 mb-4 rounded-2xl mx-auto">
                  {adv.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{adv.title}</h3>
                <p className="text-sm text-zinc-600">{adv.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-10 mb-20">
            <h2 className="text-3xl font-semibold tracking-tight mb-8">Domaines populaires</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {popularFields.map((field, i) => (
                <div key={i} className="flex items-start gap-3 py-2">
                  <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 shrink-0"></div>
                  <span className="text-zinc-700">{field}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 text-white rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-semibold tracking-tight mb-4">Commencez votre Master en Italie</h2>
            <p className="text-zinc-400 max-w-lg mx-auto mb-8">
              Nous vous aidons à choisir le programme idéal et à préparer votre candidature complète.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-full transition-all">
              Démarrer mon projet <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
