'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

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

export default function CrispChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Bonjour ! 👋 Je suis l'assistant de Khalfallah Consulting. Posez-moi vos questions sur les études en Italie, le visa, les bourses DSU, ou nos services !",
      sender: 'bot',
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: Date.now(),
      text: trimmed,
      sender: 'user',
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: getAutoReply(trimmed),
        sender: 'bot',
        time: getTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-zinc-200 flex flex-col overflow-hidden"
          style={{ height: '520px' }}
        >
          {/* Header */}
          <div className="bg-rose-600 px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
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
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50">
            {messages.map((msg) => (
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

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-zinc-200 p-3 bg-white shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Écrivez votre message..."
                className="flex-1 px-4 py-2.5 bg-zinc-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-rose-500/30 border border-transparent focus:border-rose-300 transition-all placeholder:text-zinc-400"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-10 h-10 bg-rose-600 hover:bg-rose-700 disabled:bg-zinc-200 text-white disabled:text-zinc-400 rounded-full flex items-center justify-center transition-all active:scale-95 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-lg shadow-rose-500/30 flex items-center justify-center transition-all active:scale-90 hover:scale-105"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </>
  );
}
