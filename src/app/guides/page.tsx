import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { BookOpen, ArrowRight, FileText, GraduationCap, Plane, Home, Award, CreditCard } from 'lucide-react';
import React from 'react';

export default function GuidesPage() {
  const guides = [
    { title: "Guide complet : Étudier en Italie", description: "Tout ce que vous devez savoir pour préparer votre projet d'études en Italie depuis la Tunisie.", icon: <GraduationCap className="w-6 h-6" />, href: '/italy-student-visa' },
    { title: "Inscription sur Universitaly", description: "Guide étape par étape pour créer votre compte et soumettre votre candidature sur le portail officiel.", icon: <FileText className="w-6 h-6" />, href: '/universitaly' },
    { title: "Obtenir une bourse DSU", description: "Comment préparer votre dossier ISEE Parificato et maximiser vos chances d'obtenir une bourse régionale.", icon: <Award className="w-6 h-6" />, href: '/dsu-scholarship' },
    { title: "Demande de visa étudiant", description: "Les documents requis, les délais et les conseils pour réussir votre demande de visa étudiant italien.", icon: <Plane className="w-6 h-6" />, href: '/italy-student-visa' },
    { title: "Trouver un logement", description: "Résidences universitaires, colocations et appartements : toutes les options pour se loger en Italie.", icon: <Home className="w-6 h-6" />, href: '/student-housing' },
    { title: "Budget et coûts de la vie", description: "Estimation des coûts : frais de scolarité, loyer, nourriture, transport et dépenses courantes en Italie.", icon: <CreditCard className="w-6 h-6" />, href: '/guides' },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-rose-600 text-sm font-semibold tracking-widest mb-4">RESSOURCES</div>
            <h1 className="text-5xl font-semibold tracking-tighter">Guides pratiques</h1>
            <p className="max-w-lg mx-auto mt-4 text-zinc-600 text-lg">
              Des guides détaillés pour chaque étape de votre parcours vers les études en Italie.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, i) => (
              <Link href={guide.href} key={i} className="group bg-zinc-50 border border-zinc-100 rounded-3xl p-8 card-hover flex flex-col">
                <div className="w-14 h-14 bg-white shadow flex items-center justify-center text-rose-500 mb-6 rounded-2xl group-hover:rotate-6 transition-transform">
                  {guide.icon}
                </div>
                <h3 className="font-semibold text-xl tracking-tight mb-3">{guide.title}</h3>
                <p className="text-zinc-600 leading-relaxed flex-1 text-sm">{guide.description}</p>
                <div className="flex items-center gap-2 text-rose-600 font-medium text-sm mt-6 group-hover:gap-3 transition-all">
                  Lire le guide <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
