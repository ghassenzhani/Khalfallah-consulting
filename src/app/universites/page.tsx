import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { db } from '@/db';
import { universities } from '@/db/schema';
import { ArrowRight } from 'lucide-react';

export default async function UniversitiesPage() {
  let universitiesData: any[] = [];
  try {
    universitiesData = await db.select().from(universities);
  } catch (e) {
    console.warn("Base de données non configurée ou inaccessible, utilisation des fausses données (seed).");
  }

  const seedUniversities = universitiesData.length > 0 ? universitiesData : [
    {
      id: 1,
      name: "Politecnico di Milano",
      location: "Milan",
      popularPrograms: "Architecture, Design, Ingénierie",
      description: "Classée parmi les meilleures universités techniques au monde. Excellente réputation en design et ingénierie. C'est l'une des destinations les plus prisées par nos étudiants pour son rayonnement international.",
      website: "https://www.polimi.it",
      image: "https://picsum.photos/id/1015/600/400"
    },
    {
      id: 2,
      name: "Université de Bologne",
      location: "Bologne",
      popularPrograms: "Médecine, Droit, Sciences Politiques",
      description: "La plus ancienne université du monde occidental. Excellence académique et vie étudiante dynamique. Bologne est une véritable ville étudiante qui offre un cadre de vie exceptionnel.",
      website: "https://www.unibo.it",
      image: "https://picsum.photos/id/160/600/400"
    },
    {
      id: 3,
      name: "Université de Rome La Sapienza",
      location: "Rome",
      popularPrograms: "Architecture, Sciences Humaines, Médecine",
      description: "Une des plus grandes universités d'Europe. Située au cœur de la capitale historique. Étudier à La Sapienza, c'est étudier dans un musée à ciel ouvert.",
      website: "https://www.uniroma1.it",
      image: "https://picsum.photos/id/1016/600/400"
    },
    {
      id: 4,
      name: "Politecnico di Torino",
      location: "Turin",
      popularPrograms: "Ingénierie Automobile, Informatique, Architecture",
      description: "Une institution de premier plan pour l'ingénierie et l'architecture en Italie, avec des liens étroits avec l'industrie automobile (Fiat, Stellantis).",
      website: "https://www.polito.it",
      image: "https://picsum.photos/id/1018/600/400"
    },
    {
      id: 5,
      name: "Université de Padoue",
      location: "Padoue",
      popularPrograms: "Médecine, Psychologie, Sciences",
      description: "L'une des universités les plus anciennes et prestigieuses d'Europe, où Galilée a enseigné. Une excellence reconnue particulièrement dans le domaine médical.",
      website: "https://www.unipd.it",
      image: "https://picsum.photos/id/1019/600/400"
    },
    {
      id: 6,
      name: "Université de Florence",
      location: "Florence",
      popularPrograms: "Arts, Histoire, Architecture, Lettres",
      description: "Située au cœur du berceau de la Renaissance, cette université est idéale pour les passionnés d'arts, d'histoire et de culture humaniste.",
      website: "https://www.unifi.it",
      image: "https://picsum.photos/id/1020/600/400"
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <section className="py-24 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-rose-600 text-sm font-semibold tracking-widest mb-4">CATALOGUE COMPLET</div>
            <h1 className="text-5xl font-semibold tracking-tighter">61 Universités Publiques Italiennes</h1>
            <p className="max-w-xl mx-auto mt-4 text-zinc-600">
              Grâce à notre vaste réseau et notre expertise, nous vous aidons à intégrer les meilleures universités d'Italie, peu importe votre domaine d'étude.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seedUniversities.map((uni) => (
              <div key={uni.id} className="bg-white rounded-3xl overflow-hidden shadow-sm card-hover group flex flex-col h-full">
                <div className="h-56 relative flex-shrink-0">
                  <img 
                    src={uni.image || "https://picsum.photos/id/1015/600/400"} 
                    alt={uni.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-6 right-6 bg-white text-xs font-mono px-4 py-2 rounded-3xl shadow">{uni.location}</div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="font-semibold text-2xl tracking-tight">{uni.name}</div>
                  <div className="text-emerald-600 text-sm mt-1 mb-4">{uni.popularPrograms}</div>
                  <p className="mt-2 text-zinc-600 text-[15px] flex-1">{uni.description}</p>
                  <a href={uni.website || '#'} target="_blank" className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors">
                    VISITER LE SITE OFFICIEL →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-emerald-900 text-white p-12 rounded-3xl text-center">
            <h2 className="text-3xl font-semibold mb-4">Et bien d'autres encore !</h2>
            <p className="max-w-2xl mx-auto text-emerald-100 mb-8">
              Ceci n'est qu'un échantillon. Nous travaillons avec toutes les universités publiques et privées d'Italie. Parlez-nous de votre projet et nous trouverons le programme idéal pour vous.
            </p>
            <a href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-emerald-900 font-semibold rounded-3xl hover:bg-emerald-50 transition-colors">
              Faire analyser mon profil gratuitement
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
