'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  MessageSquare, Send, Users, BarChart3, Settings, LogOut, Home,
  Search, ArrowLeft, User, ChevronRight, Clock
} from 'lucide-react';

type ClientInfo = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
};

type Message = {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  isRead: boolean;
  createdAt: string;
};

function AdminMessagesContent() {
  const [clients, setClients] = useState<ClientInfo[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchClients();
    const clientParam = searchParams.get('client');
    if (clientParam) {
      setSelectedClientId(Number(clientParam));
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedClientId) {
      fetchMessages(selectedClientId);
      const interval = setInterval(() => fetchMessages(selectedClientId), 5000);
      return () => clearInterval(interval);
    }
  }, [selectedClientId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchClients = async () => {
    const res = await fetch('/api/admin/messages');
    if (res.ok) {
      const data = await res.json();
      setClients(data);
    } else {
      router.push('/login');
    }
    setLoading(false);
  };

  const fetchMessages = async (clientId: number) => {
    const res = await fetch(`/api/admin/messages?clientId=${clientId}`);
    if (res.ok) {
      const data = await res.json();
      setMessages(data);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedClientId) return;
    
    await fetch('/api/admin/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ receiverId: selectedClientId, content: newMessage }),
    });
    
    setNewMessage('');
    fetchMessages(selectedClientId);
  };

  const selectedClient = clients.find(c => c.id === selectedClientId);
  const filteredClients = clients.filter(c =>
    c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return "Aujourd'hui";
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) return "Hier";
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
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
            <BarChart3 className="w-5 h-5" />
            Tableau de bord
          </Link>
          <Link href="/admin/messages" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white font-medium text-sm">
            <MessageSquare className="w-5 h-5" />
            Messages clients
          </Link>
          <Link href="/admin/leads" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-all font-medium text-sm">
            <Users className="w-5 h-5" />
            Leads / RDV
          </Link>
          <Link href="/admin/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-all font-medium text-sm">
            <Settings className="w-5 h-5" />
            Mon Profil
          </Link>
        </nav>

        <div className="p-4 border-t border-zinc-800 space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-all text-sm">
            <Home className="w-4 h-4" /> Retour au site
          </Link>
          <button 
            onClick={() => { fetch('/api/auth/logout', { method: 'POST' }).then(() => router.push('/login')); }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-rose-400 transition-all text-sm w-full"
          >
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Chat Area */}
      <div className="flex-1 flex">
        {/* Conversations List */}
        <div className="w-80 border-r border-zinc-800 flex flex-col bg-zinc-900/50">
          <div className="p-4 border-b border-zinc-800">
            <h2 className="font-semibold text-lg mb-3">Messages</h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-zinc-600 placeholder:text-zinc-600"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredClients.length === 0 ? (
              <div className="p-6 text-center text-zinc-500 text-sm">
                Aucun client trouvé
              </div>
            ) : (
              filteredClients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => setSelectedClientId(client.id)}
                  className={`w-full flex items-center gap-3 px-4 py-4 border-b border-zinc-800/50 hover:bg-zinc-800/50 transition-colors text-left ${
                    selectedClientId === client.id ? 'bg-zinc-800' : ''
                  }`}
                >
                  <div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center text-sm font-medium shrink-0">
                    {client.fullName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{client.fullName}</div>
                    <div className="text-xs text-zinc-500 truncate">{client.email}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-600 shrink-0" />
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 flex flex-col">
          {selectedClient ? (
            <>
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-zinc-800 flex items-center gap-4 bg-zinc-900/50">
                <button onClick={() => setSelectedClientId(null)} className="lg:hidden">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 bg-rose-600/20 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <div className="font-semibold">{selectedClient.fullName}</div>
                  <div className="text-xs text-zinc-500">{selectedClient.email} • {selectedClient.phone}</div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                    <MessageSquare className="w-12 h-12 mb-4 text-zinc-700" />
                    <p className="text-sm">Aucun message avec ce client</p>
                    <p className="text-xs text-zinc-600 mt-1">Envoyez le premier message ci-dessous</p>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, i) => {
                      const isAdmin = msg.senderId !== selectedClientId;
                      const showDate = i === 0 || formatDate(msg.createdAt) !== formatDate(messages[i - 1].createdAt);
                      return (
                        <div key={msg.id}>
                          {showDate && (
                            <div className="text-center text-xs text-zinc-600 my-4">
                              {formatDate(msg.createdAt)}
                            </div>
                          )}
                          <div className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                              isAdmin
                                ? 'bg-rose-600 text-white rounded-tr-sm'
                                : 'bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-tl-sm'
                            }`}>
                              {msg.content}
                              <div className={`text-[10px] mt-1.5 ${isAdmin ? 'text-rose-200' : 'text-zinc-500'}`}>
                                {formatTime(msg.createdAt)}
                                {isAdmin && (
                                  <span className="ml-2">{msg.isRead ? '✓✓' : '✓'}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Écrivez votre message..."
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-zinc-500 placeholder:text-zinc-600"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="w-11 h-11 bg-rose-600 hover:bg-rose-700 disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-xl flex items-center justify-center transition-colors shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-500">
              <MessageSquare className="w-16 h-16 mb-4 text-zinc-700" />
              <p className="text-lg font-medium">Messages clients</p>
              <p className="text-sm text-zinc-600 mt-1">Sélectionnez un client pour voir la conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminMessagesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950 flex items-center justify-center"><div className="text-white">Chargement...</div></div>}>
      <AdminMessagesContent />
    </Suspense>
  );
}
