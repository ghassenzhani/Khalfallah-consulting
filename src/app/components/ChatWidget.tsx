'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, ArrowLeft } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────
interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

type WidgetView = 'closed' | 'menu' | 'chat' | 'whatsapp';

// ─── Auto-Reply Logic ────────────────────────────────────────────
const AUTO_REPLIES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ['bonjour', 'salut', 'hello', 'hi', 'bonsoir'],
    reply: "Bonjour ! 👋 Bienvenue chez Khalfallah Consulting. Comment puis-je vous aider aujourd'hui ?",
  },
  {
    keywords: ['visa', 'étudiant', 'student'],
    reply: "Pour le visa étudiant italien, nous vous accompagnons de A à Z : préparation du dossier, prise de RDV, et suivi. Souhaitez-vous prendre rendez-vous ?",
  },
  {
    keywords: ['université', 'universites', 'university', 'inscription'],
    reply: "Nous comparons 61 universités publiques italiennes pour trouver celle qui correspond le mieux à votre profil. Consultez notre page Universités pour en savoir plus !",
  },
  {
    keywords: ['bourse', 'dsu', 'scholarship'],
    reply: "Les bourses DSU couvrent les frais de scolarité, le logement et la restauration. Nous vous aidons à préparer votre dossier ISEE Parificato pour maximiser vos chances.",
  },
  {
    keywords: ['prix', 'tarif', 'coût', 'cost', 'price'],
    reply: "Nos tarifs varient selon le pack choisi. Contactez-nous pour un devis personnalisé gratuit ! Vous pouvez aussi nous appeler au +216 98 123 456.",
  },
  {
    keywords: ['contact', 'rdv', 'rendez-vous', 'appeler', 'téléphone'],
    reply: "Vous pouvez nous joindre au +216 98 123 456 ou via notre page Contact. Nous répondons sous 24h !",
  },
  {
    keywords: ['methode', 'méthode', 'processus', 'étapes', 'comment'],
    reply: "Notre méthode se déroule en 6 étapes : Analyse de profil → Choix d'université → Candidature → Bourse DSU → Logement → Visa. Visitez notre page Méthode pour les détails !",
  },
];

function getAutoReply(text: string): string {
  const lower = text.toLowerCase();
  for (const entry of AUTO_REPLIES) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.reply;
    }
  }
  return "Merci pour votre message ! Un conseiller vous répondra dans les plus brefs délais. En attendant, n'hésitez pas à consulter notre page Méthode ou Universités.";
}

function getTime(): string {
  return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

// ─── WhatsApp SVG Icon ───────────────────────────────────────────
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.031 0C5.405 0 0 5.394 0 12.012c0 2.122.551 4.195 1.6 6.03l-1.6 5.86 6-1.571a11.97 11.97 0 005.998 1.6h.032c6.626 0 12.031-5.394 12.031-12.012C24 5.394 18.595 0 12.031 0zm7.132 17.275c-.302.846-1.745 1.625-2.42 1.706-.675.081-1.428.163-4.52-1.117-3.708-1.536-6.136-5.46-6.321-5.714-.185-.254-1.51-2.012-1.51-3.832s.938-2.735 1.272-3.111c.334-.376.726-.47 1.05-.47.324 0 .647.01.938.01.291 0 .684-.112 1.07.825.385.938 1.325 3.242 1.442 3.486.117.244.195.529.04.834-.155.305-.233.488-.466.753-.233.264-.492.593-.7 1.078-.195.45-.632 1.017.385 1.697.585.39 1.05.813 1.488 1.25.438.438 1.446 1.157 2.063 1.554.498.322 1.066.305 1.455-.071.39-.376 1.677-1.951 2.125-2.611.447-.66.894-.551 1.487-.334.593.217 3.753 1.776 4.397 2.09.645.314 1.078.47 1.233.734.155.264.155 1.514-.147 2.36z" />
    </svg>
  );
}

// ─── Main Component ──────────────────────────────────────────────
export default function ChatWidget() {
  const pathname = usePathname();
  const [view, setView] = useState<WidgetView>('closed');

  // Simple chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      text: "Bonjour ! 👋 Je suis l'assistant de Khalfallah Consulting. Posez-moi vos questions sur les études en Italie, le visa, les bourses DSU, ou nos services !",
      sender: 'bot',
      time: getTime(),
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // WhatsApp state
  const [waMessage, setWaMessage] = useState('');
  const phoneNumber = 'YOUR_PHONE_NUMBER'; // Replace with your actual WhatsApp number

  // Hide on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  /* eslint-disable react-hooks/rules-of-hooks */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  useEffect(() => {
    if (view === 'chat') chatInputRef.current?.focus();
  }, [view]);
  /* eslint-enable react-hooks/rules-of-hooks */

  // ─── Handlers ────────────────────────────────────────────────
  const handleChatSend = () => {
    const trimmed = chatInput.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = { id: Date.now(), text: trimmed, sender: 'user', time: getTime() };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = { id: Date.now() + 1, text: getAutoReply(trimmed), sender: 'bot', time: getTime() };
      setChatMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleWhatsAppSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!waMessage.trim()) return;
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(waMessage)}`;
    window.open(url, '_blank');
    setWaMessage('');
    setView('closed');
  };

  const toggleWidget = () => {
    setView(view === 'closed' ? 'menu' : 'closed');
  };

  const isOpen = view !== 'closed';

  // ─── Render ──────────────────────────────────────────────────
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence mode="wait">
        {/* ────── Choice Menu ────── */}
        {view === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-4 w-72 origin-bottom-right overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
          >
            <div className="bg-rose-600 px-5 py-4">
              <h3 className="text-white font-semibold text-sm">Khalfallah Consulting</h3>
              <p className="text-white/80 text-xs mt-0.5">Comment souhaitez-vous nous contacter ?</p>
            </div>

            <div className="p-3 space-y-2">
              {/* Simple Chat Option */}
              <button
                onClick={() => setView('chat')}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-zinc-50 transition-colors text-left group"
              >
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center shrink-0 group-hover:bg-rose-200 transition-colors">
                  <Bot className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <div className="font-medium text-sm text-zinc-900">Chat en direct</div>
                  <div className="text-xs text-zinc-500">Réponse instantanée par notre assistant</div>
                </div>
              </button>

              {/* WhatsApp Option */}
              <button
                onClick={() => setView('whatsapp')}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-zinc-50 transition-colors text-left group"
              >
                <div className="w-10 h-10 bg-[#25D366]/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/20 transition-colors">
                  <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                </div>
                <div>
                  <div className="font-medium text-sm text-zinc-900">WhatsApp</div>
                  <div className="text-xs text-zinc-500">Parler directement avec un conseiller</div>
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {/* ────── Simple Chat View ────── */}
        {view === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-4 w-[380px] max-w-[calc(100vw-3rem)] origin-bottom-right bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 flex flex-col overflow-hidden"
            style={{ height: '480px' }}
          >
            {/* Header */}
            <div className="bg-rose-600 px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setView('menu')}
                  className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 text-white" />
                </button>
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Khalfallah Consulting</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80 text-xs">En ligne</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setView('closed')}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                      msg.sender === 'user' ? 'bg-zinc-200' : 'bg-rose-100'
                    }`}>
                      {msg.sender === 'user'
                        ? <User className="w-3.5 h-3.5 text-zinc-600" />
                        : <Bot className="w-3.5 h-3.5 text-rose-600" />
                      }
                    </div>
                    <div>
                      <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-rose-600 text-white rounded-tr-sm'
                          : 'bg-white text-zinc-800 border border-zinc-200 rounded-tl-sm shadow-sm'
                      }`}>
                        {msg.text}
                      </div>
                      <div className={`text-[10px] text-zinc-400 mt-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2 items-end">
                    <div className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-rose-600" />
                    </div>
                    <div className="bg-white border border-zinc-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-zinc-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-zinc-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-zinc-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-zinc-200 p-3 bg-white shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={chatInputRef}
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                  placeholder="Écrivez votre message..."
                  className="flex-1 px-4 py-2.5 bg-zinc-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-rose-500/30 border border-transparent focus:border-rose-300 transition-all placeholder:text-zinc-400"
                />
                <button
                  onClick={handleChatSend}
                  disabled={!chatInput.trim()}
                  className="w-10 h-10 bg-rose-600 hover:bg-rose-700 disabled:bg-zinc-200 text-white disabled:text-zinc-400 rounded-full flex items-center justify-center transition-all active:scale-95 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ────── WhatsApp View ────── */}
        {view === 'whatsapp' && (
          <motion.div
            key="whatsapp"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-4 w-80 max-w-[calc(100vw-3rem)] origin-bottom-right overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-[#075E54] p-4 text-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setView('menu')}
                  className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 text-white" />
                </button>
                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 font-bold text-white text-sm">
                    K
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#075E54] bg-green-400"></span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-none">Khalfallah Consulting</h3>
                  <p className="mt-0.5 text-xs text-emerald-200">En ligne</p>
                </div>
              </div>
              <button
                onClick={() => setView('closed')}
                className="rounded-full p-1.5 transition-colors hover:bg-white/20"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex min-h-[120px] flex-col gap-3 p-4 bg-[#ECE5DD]">
              <div className="self-start max-w-[85%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm shadow-sm text-zinc-800">
                Bonjour ! 👋 Envoyez-nous un message et nous vous répondrons directement sur WhatsApp.
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-zinc-100 bg-[#F0F0F0] p-3">
              <form onSubmit={handleWhatsAppSend} className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={waMessage}
                  onChange={(e) => setWaMessage(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="w-full rounded-full bg-white px-4 py-2.5 pr-12 text-sm outline-none transition-colors placeholder:text-zinc-500 focus:ring-2 focus:ring-[#25D366]/30 border border-zinc-200"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!waMessage.trim()}
                  className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white transition-all hover:bg-[#20b858] disabled:scale-90 disabled:opacity-50"
                  aria-label="Send on WhatsApp"
                >
                  <Send className="ml-0.5 h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ────── Floating Action Button ────── */}
      <button
        onClick={toggleWidget}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-rose-600 shadow-lg shadow-rose-500/30 transition-all hover:scale-110 hover:shadow-xl hover:shadow-rose-500/40 focus:outline-none focus:ring-4 focus:ring-rose-500/30 active:scale-95"
        aria-label="Open Contact Options"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white transition-transform duration-200 group-hover:rotate-90" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>
    </div>
  );
}
