import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { ArrowRight, Home, Building2, Users, MapPin } from 'lucide-react';

export default function StudentHousingPage() {
  const options = [
    { icon: <Building2 className="w-6 h-6" />, title: "Résidence universitaire", desc: "Logement géré par le DSU régional. Gratuit ou à tarif réduit pour les boursiers. Chambres individuelles ou partagées avec services inclus.", price: "Gratuit (boursiers) ou 150-250€/mois" },
    { icon: <Home className="w-6 h-6" />, title: "Appartement privé", desc: "Location d'un studio ou appartement en ville. Plus de liberté mais coût plus élevé. Contrat de location nécessaire pour le visa.", price: "300-600€/mois selon la ville" },
    { icon: <Users className="w-6 h-6" />, title: "Colocation", desc: "Partage d'un appartement avec d'autres étudiants. Solution économique et sociale, très populaire dans les grandes villes universitaires.", price: "200-400€/mois" },
  ];

  const cities = [
    { name: "Milan", range: "400-700€" },
    { name: "Rome", range: "350-600€" },
    { name: "Bologne", range: "300-500€" },
    { name: "Turin", range: "250-450€" },
    { name: "Florence", range: "350-550€" },
    { name: "Naples", range: "200-350€" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-rose-600 text-sm font-semibold tracking-widest mb-4">LOGEMENT</div>
            <h1 className="text-5xl font-semibold tracking-tighter">Student housing</h1>
            <p className="max-w-2xl mx-auto mt-4 text-zinc-600 text-lg">
              Trouver un logement en Italie est une étape cruciale. Découvrez toutes les options disponibles et nos conseils.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {options.map((opt, i) => (
              <div key={i} className="bg-zinc-50 border border-zinc-100 rounded-3xl p-8 flex flex-col">
                <div className="w-14 h-14 bg-white shadow flex items-center justify-center text-rose-500 mb-6 rounded-2xl">
                  {opt.icon}
                </div>
                <h3 className="font-semibold text-xl mb-3">{opt.title}</h3>
                <p className="text-sm text-zinc-600 flex-1 mb-4">{opt.desc}</p>
                <div className="text-rose-600 font-semibold text-sm">{opt.price}</div>
              </div>
            ))}
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-semibold tracking-tight text-center mb-10">Coût moyen par ville</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {cities.map((city, i) => (
                <div key={i} className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span className="font-semibold">{city.name}</span>
                  </div>
                  <div className="text-sm text-zinc-600">{city.range}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 text-white rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-semibold tracking-tight mb-4">Besoin d&apos;aide pour trouver un logement ?</h2>
            <p className="text-zinc-400 max-w-lg mx-auto mb-8">
              Nous vous aidons à trouver le logement idéal et à préparer tous les documents nécessaires pour votre visa.
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
