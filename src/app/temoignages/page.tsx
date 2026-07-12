import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { db } from '@/db';
import { testimonials } from '@/db/schema';

export default async function TestimonialsPage() {
  let testimonialsData: any[] = [];
  try {
    testimonialsData = await db.select().from(testimonials);
  } catch (e) {
    console.warn("Base de données non configurée ou inaccessible, utilisation des fausses données (seed).");
  }

  const seedTestimonials = testimonialsData.length > 0 ? testimonialsData : [
    {
      id: 1,
      name: "Aziz Rahmouni",
      university: "Université de Bologne",
      quote: "VisaHorizon a rendu mon rêve italien possible. Un accompagnement professionnel du début à la fin. L'équipe a été très présente, surtout pendant la période stressante de la demande de visa. Je suis maintenant bien installé à Bologne !",
      image: "https://picsum.photos/id/64/400/400"
    },
    {
      id: 2,
      name: "Sahar Ben Amor",
      university: "Politecnico di Milano",
      quote: "Grâce à Khalfallah Consulting, j'ai pu intégrer le Politecnico de Milan en un temps record. Je recommande vivement ! Ils ont géré mon dossier Universitaly avec une efficacité redoutable.",
      image: "https://picsum.photos/id/65/400/400"
    },
    {
      id: 3,
      name: "Jihen Mejri",
      university: "Université de Parme",
      quote: "Un service exceptionnel. Ils m'ont guidée à chaque étape de mon dossier pour Parme. Sans eux, je me serais perdue dans les démarches administratives pour la bourse DSU.",
      image: "https://picsum.photos/id/66/400/400"
    },
    {
      id: 4,
      name: "Rayen Trabelsi",
      university: "Politecnico di Torino",
      quote: "Le professionnalisme de cette agence est incroyable. Mon dossier de bourse a été accepté et j'ai eu ma chambre universitaire grâce à leur accompagnement précis et ponctuel.",
      image: "https://picsum.photos/id/67/400/400"
    },
    {
      id: 5,
      name: "Malek Khemiri",
      university: "Université de Rome La Sapienza",
      quote: "Arriver à Rome et avoir déjà son logement et sa paperasse en règle, ça n'a pas de prix. Merci à toute l'équipe pour ce travail acharné !",
      image: "https://picsum.photos/id/68/400/400"
    },
    {
      id: 6,
      name: "Yassine Mansour",
      university: "Université de Florence",
      quote: "J'avais beaucoup de doutes sur mon dossier scolaire, mais l'équipe a su trouver le programme idéal pour moi. Aujourd'hui, je vis mon rêve à Florence.",
      image: "https://picsum.photos/id/69/400/400"
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-rose-600 text-sm font-semibold tracking-widest mb-4">HISTOIRES À SUCCÈS</div>
            <h1 className="text-5xl font-semibold tracking-tighter">Nos étudiants prennent la parole</h1>
            <p className="max-w-xl mx-auto mt-4 text-zinc-600">
              Découvrez les retours d'expérience de nos étudiants tunisiens qui poursuivent actuellement leurs études dans les meilleures universités d'Italie.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seedTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100 flex flex-col h-full">
                <div className="flex gap-4 mb-8">
                  <img 
                    src={testimonial.image || `https://picsum.photos/id/${60 + index}/80/80`} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white shadow-sm"
                  />
                  <div>
                    <div className="font-semibold text-lg">{testimonial.name}</div>
                    <div className="text-sm text-rose-600 font-medium">{testimonial.university}</div>
                  </div>
                </div>
                
                <div className="italic text-[15px] leading-relaxed text-zinc-700 flex-1">
                  "{testimonial.quote}"
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-200 flex items-center justify-between">
                  <div className="flex text-amber-400 text-lg">★★★★★</div>
                  <div className="text-[10px] font-medium tracking-widest text-zinc-400">GOOGLE REVIEWS</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <a href="https://g.co/kgs/visa" target="_blank" className="inline-flex items-center gap-x-3 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors px-10 py-5 rounded-3xl text-sm font-semibold">
              <span>Voir tous nos avis sur Google</span>
              <span className="text-xl">→</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
