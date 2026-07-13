'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, FileText, Building, Award, Home, Plane, CheckCircle, Clock, AlertCircle, LogOut, MessageSquare, Send } from 'lucide-react';

const stepIcons: any = {
  1: GraduationCap,
  2: FileText,
  3: Building,
  4: Award,
  5: Home,
  6: Plane,
};

const stepDescriptions: Record<number, string> = {
  1: "Nous analysons votre parcours académique, vos notes et votre profil pour identifier les meilleures universités et programmes adaptés à votre situation.",
  2: "Rassemblement, traduction officielle et légalisation de tous vos documents : diplômes, relevés de notes, passeport, certificats et attestations nécessaires.",
  3: "Sélection stratégique des universités italiennes en fonction de votre profil, vos préférences de ville, de programme et vos chances d'admission.",
  4: "Soumission de vos candidatures sur la plateforme Universitaly et suivi des réponses des universités jusqu'à l'obtention de votre lettre d'admission.",
  5: "Préparation des dossiers de bourse DSU, ISEE Parificato et recherche de logement étudiant (résidence universitaire ou appartement privé).",
  6: "Constitution du dossier visa, prise de rendez-vous à l'ambassade, préparation à l'entretien et accompagnement jusqu'à l'obtention de votre visa.",
};

type Step = {
  stepId: number;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  notes: string;
};

type Progress = {
  id: number;
  steps: Step[];
  totalAmount: number;
  paidAmount: number;
  payments: any[];
};

export default function ClientDashboard() {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication via server-side session endpoint
    // (httpOnly cookies can't be read by document.cookie)
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(session => {
        if (!session.authenticated) {
          router.push('/login');
          return;
        }
        setUser(session.user);

        // Now fetch the client's file progress
        return fetch('/api/client/progress')
          .then(res => res.json())
          .then(data => {
            if (data.error) {
              router.push('/login');
            } else {
              setProgress(data);
            }
            setLoading(false);
          });
      })
      .catch(() => {
        router.push('/login');
        setLoading(false);
      });
  }, [router]);



  const getStatusColor = (status: string) => {
    if (status === 'completed') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (status === 'in-progress') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-zinc-100 text-zinc-500 border-zinc-200';
  };

  const completionRate = progress ? Math.round(
    (progress.steps.filter(s => s.status === 'completed').length / progress.steps.length) * 100
  ) : 0;

  const remainingPayment = progress ? progress.totalAmount - progress.paidAmount : 0;

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement de votre espace...</div>;

  return (
    <div className="min-h-screen bg-zinc-100">
      {/* Top Nav */}
      <nav className="bg-white border-b px-8 py-5 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="text-3xl">🇹🇳</div>
          <div>
            <div className="font-semibold text-xl tracking-tight">Khalfallah Consulting</div>
            <div className="text-xs text-emerald-600 -mt-1">ESPACE CLIENT</div>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="text-sm flex items-center gap-2">
            <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">👋</div>
            <span>Bienvenue, {user?.fullName}</span>
          </div>
          <button
            onClick={() => {
              fetch('/api/auth/logout', { method: 'POST' }).then(() => router.push('/login'));
            }}
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900"
          >
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="uppercase text-xs tracking-[2px] text-rose-600 font-medium">Tableau de bord</div>
            <h1 className="text-5xl font-semibold tracking-tighter">Suivi de votre dossier</h1>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-zinc-500">Avancement global</div>
            <div className="text-6xl font-semibold text-emerald-600 tabular-nums">{completionRate}<span className="text-4xl">%</span></div>
          </div>
        </div>

        {/* Payment Status */}
        <div className="bg-white rounded-3xl p-8 mb-10 border border-zinc-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="text-3xl">💰</div>
              <div>
                <div className="font-semibold text-lg">État des paiements</div>
                <div className="text-sm text-zinc-500">Accompagnement complet — 2500 €</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-semibold text-emerald-600">{progress?.paidAmount} €</div>
              <div className="text-xs text-zinc-400">PAYÉS / {progress?.totalAmount} €</div>
            </div>
          </div>
          
          <div className="h-3 bg-zinc-100 rounded-3xl overflow-hidden mb-2">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-3xl transition-all" 
              style={{ width: `${(progress?.paidAmount || 0) / (progress?.totalAmount || 2500) * 100}%` }}
            ></div>
          </div>
          
          {remainingPayment > 0 && (
            <div className="text-xs text-rose-500 flex items-center gap-1 mt-4">
              <AlertCircle className="w-3.5 h-3.5" /> {remainingPayment} € restant. Contactez-nous pour payer par tranches.
            </div>
          )}
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <h2 className="font-semibold text-xl mb-6 flex items-center gap-3">
              <span>ÉTAPES DU DOSSIER</span>
              <div className="h-px flex-1 bg-gradient-to-r from-zinc-300 to-transparent"></div>
            </h2>
            
            <div className="space-y-4">
              {progress?.steps.map((step) => {
                const Icon = stepIcons[step.stepId] || Clock;
                return (
                  <div key={step.stepId} className="bg-white border border-zinc-100 rounded-3xl p-8 flex gap-7 items-start group">
                    <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center ${step.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-zinc-100 text-zinc-400'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 pt-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-xl">{step.title}</div>
                        <span className={`text-xs px-5 py-2 rounded-3xl border shrink-0 ${getStatusColor(step.status)}`}>
                          {step.status === 'completed' ? 'TERMINÉ' : step.status === 'in-progress' ? 'EN COURS' : 'À FAIRE'}
                        </span>
                      </div>
                      {stepDescriptions[step.stepId] && (
                        <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{stepDescriptions[step.stepId]}</p>
                      )}
                      {step.notes && <div className="mt-3 text-sm text-zinc-500 bg-zinc-50 p-4 rounded-2xl">{step.notes}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            {/* Messages Section */}
            <DashboardMessages />

            <div className="bg-white rounded-3xl p-8">
              <h3 className="font-semibold mb-6">Documents à préparer</h3>
              <ul className="text-xs space-y-2 text-zinc-500">
                <li className="flex items-center gap-2">• Diplôme + relevés de notes</li>
                <li className="flex items-center gap-2">• Passeport valide</li>
                <li className="flex items-center gap-2">• Preuve de ressources financières</li>
                <li className="flex items-center gap-2">• Photo d&apos;identité</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8">
              <h3 className="font-semibold mb-4">Contact rapide</h3>
              <div className="border border-dashed border-zinc-300 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">📲</div>
                <div className="font-medium text-sm">WhatsApp</div>
                <a href="https://wa.me/21698123456" target="_blank" className="text-rose-600 font-medium text-sm">+216 98 123 456</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardMessages() {
  const [msgs, setMsgs] = useState<{id: number; senderId: number; content: string; createdAt: string}[]>([]);
  const [newMsg, setNewMsg] = useState('');
  const [adminId, setAdminId] = useState<number | null>(null);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    const res = await fetch('/api/client/messages');
    if (res.ok) {
      const data = await res.json();
      setMsgs(data);
      // Find admin id from messages
      if (data.length > 0) {
        const firstMsg = data[0];
        // We assume the "other" party is admin
        setAdminId(firstMsg.senderId); // Will be overridden if needed
      }
    }
  };

  const sendMessage = async () => {
    if (!newMsg.trim()) return;
    // Send to admin (ID 1 by default, since first user is usually admin)
    await fetch('/api/client/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ receiverId: adminId || 1, content: newMsg }),
    });
    setNewMsg('');
    fetchMessages();
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-zinc-100 shadow-sm">
      <div className="px-6 py-4 border-b border-zinc-100 flex items-center gap-3 bg-rose-50">
        <MessageSquare className="w-5 h-5 text-rose-600" />
        <h3 className="font-semibold text-sm">Messages avec votre conseiller</h3>
      </div>

      <div className="h-64 overflow-y-auto p-4 space-y-3 bg-zinc-50">
        {msgs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-400 text-sm">
            <MessageSquare className="w-8 h-8 mb-2 text-zinc-300" />
            <p>Aucun message pour le moment</p>
          </div>
        ) : (
          msgs.map((msg) => {
            const isMe = msg.senderId !== (adminId || 1);
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                  isMe ? 'bg-rose-600 text-white rounded-tr-sm' : 'bg-white border border-zinc-200 text-zinc-800 rounded-tl-sm shadow-sm'
                }`}>
                  {msg.content}
                  <div className={`text-[9px] mt-1 ${isMe ? 'text-rose-200' : 'text-zinc-400'}`}>
                    {new Date(msg.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="p-3 border-t border-zinc-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Votre message..."
            className="flex-1 px-3 py-2 bg-zinc-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-rose-500/20 border border-transparent focus:border-rose-200"
          />
          <button onClick={sendMessage} disabled={!newMsg.trim()} className="w-9 h-9 bg-rose-600 hover:bg-rose-700 disabled:bg-zinc-200 text-white disabled:text-zinc-400 rounded-xl flex items-center justify-center transition-colors shrink-0">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
