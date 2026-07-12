import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { ArrowRight, Globe, BookOpen, Building2 } from 'lucide-react';

export default function EnglishTaughtPage() {
  const universities = [
    { name: "Politecnico di Milano", programs: "Engineering, Architecture, Design", level: "Bachelor & Master" },
    { name: "Università di Bologna", programs: "Economics, Political Science, Engineering", level: "Bachelor & Master" },
    { name: "Politecnico di Torino", programs: "Engineering, Architecture", level: "Master" },
    { name: "Università di Padova", programs: "Science, Engineering, Economics", level: "Bachelor & Master" },
    { name: "Università degli Studi di Milano", programs: "Medicine, Computer Science, Economics", level: "Bachelor & Master" },
    { name: "La Sapienza - Roma", programs: "Engineering, Architecture, Economics", level: "Master" },
    { name: "Università di Pavia", programs: "Engineering, Science, Economics", level: "Bachelor & Master" },
    { name: "Università di Trento", programs: "Computer Science, Engineering, Economics", level: "Bachelor & Master" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-rose-600 text-sm font-semibold tracking-widest mb-4">PROGRAMMES EN ANGLAIS</div>
            <h1 className="text-5xl font-semibold tracking-tighter">English-taught programmes</h1>
            <p className="max-w-2xl mx-auto mt-4 text-zinc-600 text-lg">
              De nombreuses universités italiennes proposent des programmes entièrement en anglais. Pas besoin de parler italien pour commencer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: <Globe className="w-6 h-6" />, title: "100+ programmes", desc: "Plus de 100 programmes en anglais disponibles dans les universités publiques italiennes." },
              { icon: <BookOpen className="w-6 h-6" />, title: "Tous les niveaux", desc: "Licences (Bachelor) et Masters disponibles dans de nombreux domaines." },
              { icon: <Building2 className="w-6 h-6" />, title: "Top universités", desc: "Politecnico di Milano, Bologne, La Sapienza et bien d'autres." },
            ].map((item, i) => (
              <div key={i} className="bg-zinc-50 border border-zinc-100 rounded-3xl p-8 text-center">
                <div className="w-14 h-14 bg-white shadow flex items-center justify-center text-rose-500 mb-4 rounded-2xl mx-auto">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-semibold tracking-tight text-center mb-10">Universités avec programmes en anglais</h2>
            <div className="overflow-hidden rounded-2xl border border-zinc-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-zinc-50">
                    <th className="text-left px-6 py-4 font-semibold text-sm text-zinc-700">Université</th>
                    <th className="text-left px-6 py-4 font-semibold text-sm text-zinc-700">Programmes</th>
                    <th className="text-left px-6 py-4 font-semibold text-sm text-zinc-700">Niveau</th>
                  </tr>
                </thead>
                <tbody>
                  {universities.map((uni, i) => (
                    <tr key={i} className="border-t border-zinc-100 hover:bg-zinc-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-zinc-900">{uni.name}</td>
                      <td className="px-6 py-4 text-sm text-zinc-600">{uni.programs}</td>
                      <td className="px-6 py-4 text-sm text-zinc-600">{uni.level}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-zinc-900 text-white rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-semibold tracking-tight mb-4">Trouvez votre programme en anglais</h2>
            <p className="text-zinc-400 max-w-lg mx-auto mb-8">
              Nous vous aidons à identifier les meilleurs programmes en anglais adaptés à votre profil et à vos ambitions.
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
