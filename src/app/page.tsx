import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Link from 'next/link';
import { ArrowRight, Phone, CheckCircle2, GraduationCap, Building2 } from 'lucide-react';

export default function HomePage() {
  const stats = [
    { number: "500+", label: "Étudiants accompagnés" },
    { number: "61", label: "Universités comparées" },
    { number: "98%", label: "Taux de réussite visa" },
    { number: "24h", label: "Premier retour" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <header className="relative min-h-screen flex items-center pt-32 pb-12">
        {/* Background */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/italy-hero.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/80 to-zinc-950/40"></div>
        </div>

        <div className="max-w-[1200px] w-full mx-auto px-6 relative z-10 flex flex-col justify-center h-full text-white">
          <div className="max-w-3xl mt-8">
            <div className="inline-flex items-center px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/90 text-sm font-semibold mb-8">
              🇹🇳 → 🇮🇹 Étudier en Italie depuis la Tunisie
            </div>
            
            <h1 className="text-[52px] md:text-[72px] leading-[1.05] font-black text-white mb-6 tracking-tight">
              Votre <span className="text-rose-500">avenir en Italie</span><br />
              commence ici
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-[600px] mb-10 leading-relaxed">
              Accompagnement complet et personnalisé pour les étudiants tunisiens. 
              De l'analyse de profil jusqu'à l'obtention du visa, en passant par les candidatures et les bourses DSU.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-16">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-full text-[15px] transition-all shadow-lg shadow-rose-500/20">
                Évaluer mon dossier <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:+21698123456" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full text-[15px] transition-all">
                <Phone className="w-5 h-5 text-white/70" />
                +216 98 123 456
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
              {/* Stat Card 1 */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[20px] p-5 flex items-center gap-4 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-rose-600/20 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6 text-rose-400" />
                </div>
                <div>
                  <div className="text-white font-black text-xl leading-tight">500+ <span className="text-xs font-bold text-white/50">étudiants</span></div>
                  <div className="text-white/50 text-xs font-bold">accompagnés</div>
                </div>
              </div>
              
              {/* Stat Card 2 */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[20px] p-5 flex items-center gap-4 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-rose-600/20 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-rose-400" />
                </div>
                <div>
                  <div className="text-white font-black text-xl leading-tight">61 <span className="text-xs font-bold text-white/50">universités</span></div>
                  <div className="text-white/50 text-xs font-bold">comparées</div>
                </div>
              </div>

              {/* Stat Card 3 */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[20px] p-5 flex items-center gap-4 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-rose-600/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-rose-400" />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-white font-black text-xl leading-tight">3 <span className="text-xs font-bold text-white/50">vérifications</span></div>
                  <div className="text-white/50 text-xs font-bold">essentielles</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="text-[11px] font-bold uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-1.5 bg-white/60 rounded-full animate-bounce"></div>
          </div>
        </div>
      </header>

      {/* TRUST BAR */}
      <div className="bg-white py-6 border-b">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-75">
            <div className="flex items-center gap-3 text-sm font-medium">
              <img src="https://flagcdn.com/w40/it.png" alt="Italie" className="h-5" /> MINISTÈRE DE L'ÉDUCATION ITALIEN
            </div>
            <div className="h-5 w-px bg-zinc-300"></div>
            <div>UNIVERSITALY</div>
            <div className="h-5 w-px bg-zinc-300"></div>
            <div>DSU - BOURSES RÉGIONALES</div>
            <div className="h-5 w-px bg-zinc-300"></div>
            <div>VFS GLOBAL • ITALIE</div>
          </div>
        </div>
      </div>

      {/* METHOD SUMMARY */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="text-rose-600 text-sm font-semibold tracking-widest mb-4">6 ÉTAPES CLÉS</div>
          <h2 className="text-5xl font-semibold tracking-tighter">Notre méthode éprouvée</h2>
          <p className="max-w-xl mx-auto mt-6 text-zinc-600 text-lg">
            De l'analyse de votre profil jusqu'à l'obtention de votre visa étudiant, nous vous accompagnons à chaque étape pour garantir votre réussite en Italie.
          </p>
          <div className="mt-12">
            <Link href="/methode" className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white rounded-3xl font-semibold hover:bg-zinc-800 transition-colors">
              Découvrir notre processus détaillé <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* UNIVERSITIES SUMMARY */}
      <section className="py-24 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-center justify-between">
          <div className="md:w-1/2">
            <div className="text-rose-600 font-medium tracking-widest mb-4">CATALOGUE COMPLET</div>
            <h2 className="text-5xl font-semibold tracking-tighter mb-6">61 Universités Publiques Italiennes</h2>
            <p className="text-zinc-600 text-lg mb-8">
              Politecnico di Milano, Université de Bologne, La Sapienza... Découvrez les meilleures universités italiennes et les programmes les plus adaptés à votre profil.
            </p>
            <Link href="/universites" className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-zinc-200 shadow-sm text-zinc-900 rounded-3xl font-semibold hover:bg-zinc-50 transition-colors">
              Parcourir les universités <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <img src="https://picsum.photos/id/1015/400/300" alt="Politecnico di Milano" className="rounded-2xl shadow-md w-full h-40 object-cover" />
              <img src="https://picsum.photos/id/160/400/300" alt="Bologna" className="rounded-2xl shadow-md w-full h-40 object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SUMMARY */}
      <section className="py-24 bg-zinc-950 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="text-amber-400 font-semibold tracking-widest mb-4">ILS ONT RÉUSSI GRÂCE À NOUS</div>
          <h2 className="text-5xl font-semibold tracking-tighter mb-8">Ils étudient en Italie aujourd'hui</h2>
          <div className="max-w-2xl mx-auto bg-zinc-900 p-10 rounded-3xl border border-zinc-800 mb-12 relative">
            <div className="absolute -top-6 -left-6 text-6xl text-zinc-800 font-serif">"</div>
            <p className="text-xl leading-relaxed italic text-zinc-300 relative z-10">
              VisaHorizon a rendu mon rêve italien possible. Un accompagnement professionnel du début à la fin. L'équipe a été très présente, surtout pendant la période stressante de la demande de visa. Je suis maintenant bien installé à Bologne !
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <img src="https://picsum.photos/id/64/80/80" alt="Aziz" className="w-12 h-12 rounded-full border-2 border-zinc-700" />
              <div className="text-left">
                <div className="font-semibold text-white">Aziz Rahmouni</div>
                <div className="text-sm text-zinc-500">Université de Bologne</div>
              </div>
            </div>
          </div>
          <Link href="/temoignages" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-zinc-950 rounded-3xl font-semibold hover:bg-zinc-200 transition-colors">
            Lire tous les témoignages <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
