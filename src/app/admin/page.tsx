'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Check, X, Edit2, Save, Users, MessageSquare, BarChart3, 
  Settings, LogOut, Home, ChevronRight, Search, Bell,
  TrendingUp, UserCheck, Clock, DollarSign
} from 'lucide-react';

type Step = {
  stepId: number;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  notes: string;
};

type Client = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  currentLevel: string;
  fieldOfStudy: string;
  isApproved: boolean;
  createdAt: string;
  totalAmount: number;
  paidAmount: number;
  progressId?: number;
  steps?: Step[];
};

export default function AdminDashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingSteps, setEditingSteps] = useState<Step[]>([]);
  const [editingPaidAmount, setEditingPaidAmount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const res = await fetch('/api/admin/clients');
    if (res.ok) {
      const data = await res.json();
      setClients(data);
    } else {
      router.push('/login');
    }
    setLoading(false);
  };

  const toggleApproval = async (clientId: number, currentStatus: boolean) => {
    await fetch('/api/admin/clients', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId, isApproved: !currentStatus }),
    });
    fetchClients();
  };

  const openModal = (client: Client) => {
    setSelectedClient(client);
    setEditingSteps(client.steps || []);
    setEditingPaidAmount(client.paidAmount || 0);
  };

  const saveProgress = async () => {
    if (!selectedClient) return;
    await fetch('/api/admin/clients', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        clientId: selectedClient.id, 
        steps: editingSteps,
        paidAmount: editingPaidAmount
      }),
    });
    setSelectedClient(null);
    fetchClients();
  };

  const updateStepStatus = (stepId: number, status: string) => {
    setEditingSteps(steps => steps.map(s => s.stepId === stepId ? { ...s, status: status as Step['status'] } : s));
  };

  const filteredClients = clients.filter(c => 
    c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const approvedCount = clients.filter(c => c.isApproved).length;
  const pendingCount = clients.filter(c => !c.isApproved).length;
  const totalRevenue = clients.reduce((sum, c) => sum + c.paidAmount, 0);

  if (loading) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-white text-lg">Chargement du tableau de bord admin...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">🛡️</div>
            <div>
              <div className="font-semibold text-lg tracking-tight">Khalfallah</div>
              <div className="text-[10px] text-emerald-400 font-medium tracking-widest">ADMIN PANEL</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white font-medium text-sm">
            <BarChart3 className="w-5 h-5" />
            Tableau de bord
          </Link>
          <Link href="/admin/messages" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-all font-medium text-sm">
            <MessageSquare className="w-5 h-5" />
            Messages clients
            <span className="ml-auto bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-all font-medium text-sm">
            <Users className="w-5 h-5" />
            Clients
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-all font-medium text-sm">
            <Settings className="w-5 h-5" />
            Paramètres
          </Link>
        </nav>

        <div className="p-4 border-t border-zinc-800 space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-all text-sm">
            <Home className="w-4 h-4" />
            Retour au site
          </Link>
          <button 
            onClick={() => {
              fetch('/api/auth/logout', { method: 'POST' }).then(() => router.push('/login'));
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-rose-400 transition-all text-sm w-full"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold">Tableau de bord</h1>
            <ChevronRight className="w-4 h-4 text-zinc-600" />
            <span className="text-sm text-zinc-500">Vue d&apos;ensemble</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Rechercher un client..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm w-64 outline-none focus:border-zinc-600 placeholder:text-zinc-600"
              />
            </div>
            <button className="relative p-2 rounded-xl hover:bg-zinc-900 transition-colors">
              <Bell className="w-5 h-5 text-zinc-400" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></div>
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-bold">{clients.length}</div>
              <div className="text-xs text-zinc-500 mt-1">Total clients</div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div className="text-3xl font-bold">{approvedCount}</div>
              <div className="text-xs text-zinc-500 mt-1">Approuvés</div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div className="text-3xl font-bold">{pendingCount}</div>
              <div className="text-xs text-zinc-500 mt-1">En attente</div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-rose-400" />
                </div>
              </div>
              <div className="text-3xl font-bold">{totalRevenue.toLocaleString()} €</div>
              <div className="text-xs text-zinc-500 mt-1">Revenus collectés</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 mb-8">
            <Link href="/admin/messages" className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium rounded-xl transition-colors flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Messages clients
            </Link>
          </div>

          {/* Clients Table */}
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
            <div className="px-6 py-5 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="font-semibold text-lg">Clients ({filteredClients.length})</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-4 px-6 font-normal text-xs uppercase tracking-widest text-zinc-500">Client</th>
                  <th className="text-left py-4 px-6 font-normal text-xs uppercase tracking-widest text-zinc-500">Niveau / Filière</th>
                  <th className="text-left py-4 px-6 font-normal text-xs uppercase tracking-widest text-zinc-500">Statut</th>
                  <th className="text-left py-4 px-6 font-normal text-xs uppercase tracking-widest text-zinc-500">Paiement</th>
                  <th className="text-left py-4 px-6 font-normal text-xs uppercase tracking-widest text-zinc-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {filteredClients.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center text-zinc-500">
                      {searchQuery ? 'Aucun client trouvé pour cette recherche.' : 'Aucun client enregistré pour le moment.'}
                    </td>
                  </tr>
                ) : (
                  filteredClients.map((client) => (
                    <tr key={client.id} className="hover:bg-zinc-800/50 transition-colors">
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-zinc-800 rounded-full flex items-center justify-center text-sm font-medium text-zinc-400">
                            {client.fullName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{client.fullName}</div>
                            <div className="text-xs text-zinc-500">{client.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-sm text-zinc-400">
                        {client.currentLevel} — {client.fieldOfStudy}
                      </td>
                      <td className="py-5 px-6">
                        <button
                          onClick={() => toggleApproval(client.id, client.isApproved)}
                          className={`inline-flex items-center gap-1.5 text-xs px-4 py-1.5 rounded-full transition-all ${
                            client.isApproved 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {client.isApproved ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {client.isApproved ? 'Approuvé' : 'En attente'}
                        </button>
                      </td>
                      <td className="py-5 px-6">
                        <div className="text-sm font-mono tabular-nums">{client.paidAmount} / {client.totalAmount} €</div>
                        <div className="w-20 h-1.5 bg-zinc-800 rounded-full mt-1.5 overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full" 
                            style={{ width: `${(client.paidAmount / Math.max(client.totalAmount, 1)) * 100}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => openModal(client)}
                            className="px-4 py-2 text-xs border border-zinc-700 hover:bg-zinc-800 rounded-xl flex items-center gap-2 transition-colors"
                          >
                            <Edit2 className="w-3 h-3" /> Gérer
                          </button>
                          <Link
                            href={`/admin/messages?client=${client.id}`}
                            className="px-4 py-2 text-xs border border-zinc-700 hover:bg-zinc-800 rounded-xl flex items-center gap-2 transition-colors"
                          >
                            <MessageSquare className="w-3 h-3" /> Message
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Progress Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-6" onClick={() => setSelectedClient(null)}>
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-8 py-6 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">{selectedClient.fullName}</div>
                <div className="text-xs text-zinc-500">{selectedClient.email} • ID #{selectedClient.id}</div>
              </div>
              <button onClick={() => setSelectedClient(null)} className="text-xs px-4 py-2 border border-zinc-700 rounded-xl hover:bg-zinc-800 transition-colors">Fermer</button>
            </div>

            <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
              <div>
                <div className="uppercase text-xs text-zinc-500 font-medium tracking-widest mb-4">Étapes du dossier</div>
                <div className="space-y-2">
                  {editingSteps.map((step) => (
                    <div key={step.stepId} className="flex items-center bg-zinc-800 rounded-xl px-5 py-3.5 text-sm gap-3">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${
                        step.status === 'completed' ? 'bg-emerald-400' : step.status === 'in-progress' ? 'bg-amber-400' : 'bg-zinc-600'
                      }`}></div>
                      <span className="flex-1">{step.title}</span>
                      <select 
                        className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs cursor-pointer" 
                        value={step.status}
                        onChange={(e) => updateStepStatus(step.stepId, e.target.value)}
                      >
                        <option value="pending">À faire</option>
                        <option value="in-progress">En cours</option>
                        <option value="completed">Terminé</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="uppercase text-xs text-zinc-500 font-medium tracking-widest mb-4">Paiements</div>
                <div className="bg-zinc-800 rounded-xl p-5">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Montant payé (€)</div>
                    <input 
                      type="number" 
                      value={editingPaidAmount}
                      onChange={(e) => setEditingPaidAmount(Number(e.target.value))}
                      className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-right w-32 text-sm"
                    />
                  </div>
                  <div className="text-xs text-zinc-500 mt-2">Total: {selectedClient.totalAmount} €</div>
                </div>
              </div>
            </div>

            <div className="px-8 py-5 border-t border-zinc-800 flex justify-end gap-3">
              <button onClick={() => setSelectedClient(null)} className="px-6 py-2.5 text-sm text-zinc-400 hover:text-white transition-colors">Annuler</button>
              <button onClick={saveProgress} className="bg-white text-black px-6 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-zinc-200 transition-colors">
                <Save className="w-4 h-4" /> Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
