import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import LeadForm from '@/app/components/LeadForm';
import { GraduationCap, FileText, Building2, Award, Home, Plane, CheckCircle2 } from 'lucide-react';
import React from 'react';

export default function MethodPage() {
  const methodSteps = [
    {
      id: 1,
      title: "Analyse de Profil",
      description: "Évaluation complète de votre parcours académique, vos objectifs, vos compétences linguistiques et vos attentes budgétaires.",
      icon: "profile",
    },
    {
      id: 2,
      title: "Documents & Traductions",
      description: "Préparation, traduction certifiée, apostille et légalisation de tous vos documents officiels tunisiens.",
      icon: "documents",
    },
    {
      id: 3,
      title: "Choix Universités",
      description: "Sélection personnalisée parmi 61 universités italiennes selon votre profil, vos notes, la ville et les délais.",
      icon: "universities",
    },
    {
      id: 4,
      title: "Candidatures & Universitaly",
      description: "Rédaction des lettres de motivation, remplissage des formulaires et inscription sur le portail Universitaly.",
      icon: "applications",
    },
    {
      id: 5,
      title: "Bourses & Logement",
      description: "Préparation des dossiers DSU, bourse régionale, recherche de résidence universitaire et preuve de logement.",
      icon: "scholarship",
    },
    {
      id: 6,
      title: "Visa Étudiant",
      description: "Préparation exhaustive du dossier visa : ressources financières, assurance, préinscription et simulation d'entretien.",
      icon: "visa",
    }
  ];

  const iconsMap: Record<string, React.ReactNode> = {
    profile: <GraduationCap className="w-6 h-6" />,
    documents: <FileText className="w-6 h-6" />,
    universities: <Building2 className="w-6 h-6" />,
    applications: <Award className="w-6 h-6" />,
    scholarship: <Home className="w-6 h-6" />,
    visa: <Plane className="w-6 h-6" />,
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-rose-600 text-sm font-semibold tracking-widest mb-4">6 ÉTAPES CLÉS</div>
            <h1 className="text-5xl font-semibold tracking-tighter">Notre méthode éprouvée</h1>
            <p className="max-w-md mx-auto mt-4 text-zinc-600">Un accompagnement structuré et transparent pour maximiser vos chances de succès</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {methodSteps.map((step, index) => (
              <div key={step.id} className="group bg-zinc-50 border border-zinc-100 rounded-3xl p-8 card-hover flex flex-col">
                <div className="step-circle w-14 h-14 bg-white shadow flex items-center justify-center text-rose-500 mb-8 rounded-2xl group-hover:rotate-12 transition-transform">
                  {iconsMap[step.icon]}
                </div>
                
                <div className="font-semibold text-2xl tracking-tight mb-4">{step.title}</div>
                <p className="text-zinc-600 leading-relaxed flex-1">{step.description}</p>
                
                <div className="text-xs text-zinc-400 font-mono mt-10">ÉTAPE 0{index + 1}</div>
              </div>
            ))}
          </div>

          {/* Additional details about the process */}
          <div className="mt-24 max-w-4xl mx-auto space-y-16">
            <h2 className="text-3xl font-semibold tracking-tight text-center">Pourquoi notre méthode fonctionne ?</h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">Un suivi de A à Z</h3>
                <p className="text-zinc-600 mb-4">
                  Contrairement à d'autres agences qui s'arrêtent après l'inscription universitaire, nous vous accompagnons jusqu'à votre installation en Italie.
                </p>
                <p className="text-zinc-600">
                  La gestion du dossier de bourse régionale (DSU) est essentielle pour financer vos études et garantir votre logement.
                </p>
              </div>
              <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100">
                <div className="text-4xl mb-4">🛡️</div>
                <h4 className="font-semibold mb-2">Garantie de transparence</h4>
                <p className="text-sm text-zinc-500">Vous avez accès à tout moment à votre tableau de bord personnel pour suivre l'avancement exact de votre dossier et vos paiements.</p>
              </div>
            </div>
          </div>

          <div className="mt-24 bg-zinc-900 text-white rounded-3xl p-12 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="uppercase text-rose-400 text-xs tracking-[3px]">POURQUOI NOUS CHOISIR ?</div>
              <h3 className="text-4xl font-semibold tracking-tight mt-3 leading-none">Un accompagnement humain<br />et professionnel</h3>
              <ul className="space-y-6 mt-10">
                {[
                  "Diagnostic initial gratuit en moins de 24 heures",
                  "Accompagnement 100% personnalisé selon votre profil",
                  "Préparation complète du dossier visa (98% de succès)",
                  "Suivi continu jusqu'à votre arrivée en Italie",
                  "Support 7j/7 pendant les périodes critiques"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex-1 w-full">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
