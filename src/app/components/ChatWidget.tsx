'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────
interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

type WidgetView = 'closed' | 'chat';

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

  const phoneNumber = '21698123456';

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

  const toggleWidget = () => {
    setView(view === 'chat' ? 'closed' : 'chat');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence mode="wait">
        {/* ────── Simple Chat View ────── */}
        {view === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-4 w-[380px] max-w-[calc(100vw-3rem)] origin-bottom-right bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 flex flex-col overflow-hidden border border-zinc-100"
            style={{ height: '480px' }}
          >
            {/* Header */}
            <div className="bg-[#009664] px-5 py-4 flex items-center justify-between shrink-0 text-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Khalfallah Consulting</div>
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
                      msg.sender === 'user' ? 'bg-zinc-200' : 'bg-emerald-50'
                    }`}>
                      {msg.sender === 'user'
                        ? <User className="w-3.5 h-3.5 text-zinc-600" />
                        : <Bot className="w-3.5 h-3.5 text-[#009664]" />
                      }
                    </div>
                    <div>
                      <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#009664] text-white rounded-tr-sm'
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
                    <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-[#009664]" />
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
                  className="flex-1 px-4 py-2.5 bg-zinc-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 border border-transparent focus:border-emerald-300 transition-all placeholder:text-zinc-400"
                />
                <button
                  onClick={handleChatSend}
                  disabled={!chatInput.trim()}
                  className="w-10 h-10 bg-[#009664] hover:bg-[#007f54] disabled:bg-zinc-200 text-white disabled:text-zinc-400 rounded-full flex items-center justify-center transition-all active:scale-95 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ────── WhatsApp Floating Pill ────── */}
      <AnimatePresence>
        {view === 'closed' && (
          <motion.a
            key="whatsapp-pill"
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent("Bonjour ! Je souhaite obtenir des renseignements.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 mr-2 flex items-center gap-2.5 bg-[#4FDF83] hover:bg-[#40d273] text-white px-5 py-3.5 rounded-full font-semibold text-sm shadow-xl shadow-[#4FDF83]/30 transition-all hover:scale-105 hover:-translate-y-0.5 active:scale-95 duration-200"
          >
            {/* Phone/WhatsApp Icon matching the user screenshot */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white fill-current shrink-0">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="font-semibold text-base leading-none">WhatsApp</span>
          </motion.a>
        )}
      </AnimatePresence>

      {/* ────── Floating Action Button ────── */}
      <button
        onClick={toggleWidget}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#009664] hover:bg-[#008256] shadow-lg shadow-[#009664]/30 transition-all hover:scale-110 hover:shadow-xl hover:shadow-[#009664]/40 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 active:scale-95 cursor-pointer mr-2 mb-2"
        aria-label="Toggle Live Chat Assistant"
      >
        {view === 'chat' ? (
          <X className="h-6 w-6 text-white transition-transform duration-200 group-hover:rotate-90" />
        ) : (
          /* Chat Speech Bubble outline icon matching the user screenshot */
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-white">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
