'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Users, MessageSquare, BarChart3, Settings, LogOut, Home,
  UserPlus, Calendar, Mail, Phone, Copy, Check, X, Eye,
  ChevronRight, Clock, UserCheck
} from 'lucide-react';

type Lead = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  appointmentType: string;
  appointmentDate: string;
  appointmentTime: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
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
};

type TabKey = 'clients' | 'leads';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>('clients');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    fullName: '', email: '', phone: '', currentLevel: '', fieldOfStudy: '', leadId: 0
  });
  const [createdAccount, setCreatedAccount] = useState<{ email: string; password: string } | null>(null);
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const [leadsRes, clientsRes] = await Promise.all([
      fetch('/api/admin/leads'),
      fetch('/api/admin/clients'),
    ]);
    if (leadsRes.ok) setLeads(await leadsRes.json());
    if (clientsRes.ok) {
      setClients(await clientsRes.json());
    } else {
      router.push('/login');
    }
    setLoading(false);
  };

  const openCreateFromLead = (lead: Lead) => {
    setCreateForm({
      fullName: lead.fullName,
      email: lead.email,
      phone: lead.phone,
      currentLevel: '',
      fieldOfStudy: lead.subject || '',
      leadId: lead.id,
    });
    setCreatedAccount(null);
    setShowCreateModal(true);
  };

  const openCreateBlank = () => {
    setCreateForm({ fullName: '', email: '', phone: '', currentLevel: '', fieldOfStudy: '', leadId: 0 });
    setCreatedAccount(null);
    setShowCreateModal(true);
  };

  const createClientAccount = async () => {
    setCreating(true);
    const res = await fetch('/api/admin/create-client', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createForm),
    });
    const data = await res.json();
    setCreating(false);

    if (res.ok) {
      setCreatedAccount({ email: data.client.email, password: data.generatedPassword });
      fetchAll();
    } else {
      alert(data.error || 'Erreur lors de la création');
    }
  };

  const copyCredentials = () => {
    if (!createdAccount) return;
    const text = `Bonjour,\n\nVotre espace client Khalfallah Consulting est prêt.\n\n📧 Email: ${createdAccount.email}\n🔑 Mot de passe: ${createdAccount.password}\n\n🔗 Connectez-vous ici: ${window.location.origin}/login\n\nCordialement,\nKhalfallah Consulting`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'converted': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'contacted': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-white">Chargement...</div>
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
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-all font-medium text-sm">
            <BarChart3 className="w-5 h-5" /> Tableau de bord
          </Link>
          <Link href="/admin/messages" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-all font-medium text-sm">
            <MessageSquare className="w-5 h-5" /> Messages clients
          </Link>
          <Link href="/admin/leads" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white font-medium text-sm">
            <Users className="w-5 h-5" /> Clients & Leads
          </Link>
          <Link href="/admin/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-all font-medium text-sm">
            <Settings className="w-5 h-5" /> Mon Profil
          </Link>
        </nav>
        <div className="p-4 border-t border-zinc-800 space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-all text-sm">
            <Home className="w-4 h-4" /> Retour au site
          </Link>
          <button onClick={() => { fetch('/api/auth/logout', { method: 'POST' }).then(() => router.push('/login')); }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-rose-400 transition-all text-sm w-full">
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold">Clients & Leads</h1>
            <ChevronRight className="w-4 h-4 text-zinc-600" />
            <span className="text-sm text-zinc-500">{clients.length} clients · {leads.length} leads</span>
          </div>
          <button onClick={openCreateBlank} className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium rounded-xl flex items-center gap-2 transition-colors">
            <UserPlus className="w-4 h-4" /> Créer un compte client
          </button>
        </div>

        {/* Tabs */}
        <div className="px-8 pt-6">
          <div className="flex gap-1 bg-zinc-900 rounded-xl p-1 w-fit border border-zinc-800">
            <button
              onClick={() => setActiveTab('clients')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'clients'
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Clients ({clients.length})
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'leads'
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              Leads ({leads.length})
            </button>
          </div>
        </div>

        <div className="p-8 pt-6">
          {/* ── Clients Tab ── */}
          {activeTab === 'clients' && (
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
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
                  {clients.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-16 text-center text-zinc-500">Aucun client pour le moment.</td>
                    </tr>
                  ) : (
                    clients.map((client) => (
                      <tr key={client.id} className="hover:bg-zinc-800/50 transition-colors">
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-zinc-700 rounded-full flex items-center justify-center text-sm font-medium shrink-0">
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
                          <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border ${
                            client.isApproved
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}>
                            {client.isApproved ? <><Check className="w-3 h-3" /> Approuvé</> : <><Clock className="w-3 h-3" /> En attente</>}
                          </span>
                        </td>
                        <td className="py-5 px-6">
                          <div className="text-sm font-medium">{client.paidAmount || 0} / {client.totalAmount || 2500} €</div>
                          <div className="w-24 h-1.5 bg-zinc-800 rounded-full mt-1.5">
                            <div className="h-full bg-rose-500 rounded-full" style={{ width: `${Math.min(100, ((client.paidAmount || 0) / (client.totalAmount || 2500)) * 100)}%` }}></div>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-2">
                            <Link href={`/admin?client=${client.id}`} className="px-3 py-2 text-xs border border-zinc-700 hover:bg-zinc-800 rounded-xl flex items-center gap-1.5 transition-colors">
                              <Eye className="w-3 h-3" /> Gérer
                            </Link>
                            <Link href={`/admin/messages?client=${client.id}`} className="px-3 py-2 text-xs border border-zinc-700 hover:bg-zinc-800 rounded-xl flex items-center gap-1.5 transition-colors">
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
          )}

          {/* ── Leads Tab ── */}
          {activeTab === 'leads' && (
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-4 px-6 font-normal text-xs uppercase tracking-widest text-zinc-500">Contact</th>
                    <th className="text-left py-4 px-6 font-normal text-xs uppercase tracking-widest text-zinc-500">RDV</th>
                    <th className="text-left py-4 px-6 font-normal text-xs uppercase tracking-widest text-zinc-500">Sujet</th>
                    <th className="text-left py-4 px-6 font-normal text-xs uppercase tracking-widest text-zinc-500">Statut</th>
                    <th className="text-left py-4 px-6 font-normal text-xs uppercase tracking-widest text-zinc-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-16 text-center text-zinc-500">Aucune demande reçue pour le moment.</td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-zinc-800/50 transition-colors">
                        <td className="py-5 px-6">
                          <div className="font-medium text-sm">{lead.fullName}</div>
                          <div className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5"><Mail className="w-3 h-3" />{lead.email}</div>
                          <div className="text-xs text-zinc-500 flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</div>
                        </td>
                        <td className="py-5 px-6 text-sm">
                          {lead.appointmentDate ? (
                            <div className="flex items-center gap-2 text-zinc-400">
                              <Calendar className="w-4 h-4" />
                              <div>
                                <div>{lead.appointmentDate}</div>
                                <div className="text-xs text-zinc-600">{lead.appointmentTime}</div>
                              </div>
                            </div>
                          ) : (
                            <span className="text-zinc-600 text-xs">Non planifié</span>
                          )}
                        </td>
                        <td className="py-5 px-6 text-sm text-zinc-400 max-w-[200px] truncate">{lead.subject || lead.appointmentType || '-'}</td>
                        <td className="py-5 px-6">
                          <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border ${getStatusBadge(lead.status)}`}>
                            {lead.status === 'converted' ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            {lead.status === 'converted' ? 'Converti' : lead.status === 'contacted' ? 'Contacté' : 'Nouveau'}
                          </span>
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-2 flex-wrap">
                            <button onClick={() => { setSelectedLead(lead); setShowDetailModal(true); }} className="px-3 py-2 text-xs border border-zinc-700 hover:bg-zinc-800 rounded-xl flex items-center gap-1.5 transition-colors">
                              <Eye className="w-3 h-3" /> Voir
                            </button>
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2 text-xs bg-[#25D366] hover:bg-[#20b858] text-white rounded-xl flex items-center gap-1.5 transition-colors"
                            >
                              <MessageSquare className="w-3 h-3" /> WhatsApp
                            </a>
                            {lead.status !== 'converted' && (
                              <button onClick={() => openCreateFromLead(lead)} className="px-3 py-2 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center gap-1.5 transition-colors">
                                <UserPlus className="w-3 h-3" /> Créer compte
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Create Client Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-6" onClick={() => setShowCreateModal(false)}>
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-8 py-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{createdAccount ? '✅ Compte créé !' : 'Créer un compte client'}</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-zinc-800 rounded-lg"><X className="w-4 h-4" /></button>
            </div>

            <div className="p-8">
              {createdAccount ? (
                <div className="space-y-6">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
                    <p className="text-emerald-400 text-sm font-medium mb-4">Le compte a été créé avec succès. Envoyez ces identifiants au client :</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-zinc-800 rounded-lg px-4 py-3">
                        <div>
                          <div className="text-[10px] text-zinc-500 uppercase">Email</div>
                          <div className="text-sm font-mono">{createdAccount.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between bg-zinc-800 rounded-lg px-4 py-3">
                        <div>
                          <div className="text-[10px] text-zinc-500 uppercase">Mot de passe</div>
                          <div className="text-sm font-mono text-rose-400 font-bold">{createdAccount.password}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={copyCredentials} className="w-full py-3 bg-white text-black rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors">
                    {copied ? <><Check className="w-4 h-4" /> Copié !</> : <><Copy className="w-4 h-4" /> Copier le message à envoyer au client</>}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">Nom complet *</label>
                    <input type="text" value={createForm.fullName} onChange={e => setCreateForm({ ...createForm, fullName: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-zinc-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">Email *</label>
                    <input type="email" value={createForm.email} onChange={e => setCreateForm({ ...createForm, email: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-zinc-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">Téléphone *</label>
                    <input type="text" value={createForm.phone} onChange={e => setCreateForm({ ...createForm, phone: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-zinc-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1.5">Niveau actuel</label>
                      <input type="text" value={createForm.currentLevel} onChange={e => setCreateForm({ ...createForm, currentLevel: e.target.value })} placeholder="Bac, Licence..." className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-zinc-500 placeholder:text-zinc-600" />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1.5">Filière</label>
                      <input type="text" value={createForm.fieldOfStudy} onChange={e => setCreateForm({ ...createForm, fieldOfStudy: e.target.value })} placeholder="Informatique..." className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-zinc-500 placeholder:text-zinc-600" />
                    </div>
                  </div>

                  <div className="bg-zinc-800 rounded-xl p-4 text-xs text-zinc-500">
                    <strong className="text-zinc-400">ℹ️ Note :</strong> Un mot de passe sera généré automatiquement. Vous pourrez le copier et l&apos;envoyer au client par email.
                  </div>

                  <button 
                    onClick={createClientAccount} 
                    disabled={creating || !createForm.fullName || !createForm.email || !createForm.phone}
                    className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-xl font-medium text-sm transition-colors"
                  >
                    {creating ? 'Création en cours...' : 'Créer le compte et générer le mot de passe'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lead Detail Modal */}
      {showDetailModal && selectedLead && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-6" onClick={() => setShowDetailModal(false)}>
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-8 py-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Détails de la demande</h2>
              <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-zinc-800 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-8 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div><div className="text-zinc-500 text-xs mb-1">Nom</div><div className="font-medium">{selectedLead.fullName}</div></div>
                <div><div className="text-zinc-500 text-xs mb-1">Email</div><div>{selectedLead.email}</div></div>
                <div><div className="text-zinc-500 text-xs mb-1">Téléphone</div><div>{selectedLead.phone}</div></div>
                <div><div className="text-zinc-500 text-xs mb-1">Type de RDV</div><div>{selectedLead.appointmentType || '-'}</div></div>
                <div><div className="text-zinc-500 text-xs mb-1">Date RDV</div><div>{selectedLead.appointmentDate || '-'}</div></div>
                <div><div className="text-zinc-500 text-xs mb-1">Heure RDV</div><div>{selectedLead.appointmentTime || '-'}</div></div>
              </div>
              {selectedLead.message && (
                <div>
                  <div className="text-zinc-500 text-xs mb-1">Message</div>
                  <div className="bg-zinc-800 rounded-xl p-4 text-zinc-300">{selectedLead.message}</div>
                </div>
              )}
              <div className="text-xs text-zinc-600">Reçu le {new Date(selectedLead.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
              
              {/* Action Buttons to Reply to Lead */}
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                <a 
                  href={`mailto:${selectedLead.email}?subject=Suite à votre demande de contact - Khalfallah Consulting`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" /> Répondre par Email
                </a>
                <a 
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#25D366] hover:bg-[#20b858] text-white rounded-xl text-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" /> Répondre sur WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
