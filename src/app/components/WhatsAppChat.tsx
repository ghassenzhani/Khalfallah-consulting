"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const phoneNumber = "YOUR_PHONE_NUMBER"; // Replace with your actual WhatsApp number

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim()) return;
    
    // Open WhatsApp in a new tab with the pre-filled message
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    
    // Reset state after sending
    setMessage("");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, originBottom: true, originRight: true }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-4 flex w-80 max-w-[calc(100vw-3rem)] origin-bottom-right flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between bg-emerald-700 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* Profile Picture Placeholder */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
                    K
                  </div>
                  {/* Online Indicator */}
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-emerald-700 bg-green-400"></span>
                </div>
                <div>
                  <h3 className="font-semibold leading-none">Admin</h3>
                  <p className="mt-1 text-xs text-emerald-100">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 transition-colors hover:bg-white/20"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Card Body */}
            <div className="flex min-h-[140px] flex-col gap-3 bg-emerald-50/50 p-4 bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-cover bg-center">
              <div className="self-start max-w-[85%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm shadow-sm">
                Hi there! 👋 How can we help you today?
              </div>
            </div>

            {/* Card Footer */}
            <div className="border-t border-zinc-100 bg-white p-3">
              <form onSubmit={handleSend} className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full rounded-full bg-zinc-100 px-4 py-2.5 pr-12 text-sm outline-none transition-colors placeholder:text-zinc-500 focus:bg-zinc-200/50"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white transition-all hover:bg-emerald-700 disabled:scale-90 disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="ml-0.5 h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition-all hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 active:scale-95"
        aria-label="Open WhatsApp Chat"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white transition-transform duration-200 group-hover:rotate-90" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-7 w-7 text-white"
            fill="currentColor"
          >
            <path d="M12.031 0C5.405 0 0 5.394 0 12.012c0 2.122.551 4.195 1.6 6.03l-1.6 5.86 6-1.571a11.97 11.97 0 005.998 1.6h.032c6.626 0 12.031-5.394 12.031-12.012C24 5.394 18.595 0 12.031 0zm7.132 17.275c-.302.846-1.745 1.625-2.42 1.706-.675.081-1.428.163-4.52-1.117-3.708-1.536-6.136-5.46-6.321-5.714-.185-.254-1.51-2.012-1.51-3.832s.938-2.735 1.272-3.111c.334-.376.726-.47 1.05-.47.324 0 .647.01.938.01.291 0 .684-.112 1.07.825.385.938 1.325 3.242 1.442 3.486.117.244.195.529.04.834-.155.305-.233.488-.466.753-.233.264-.492.593-.7 1.078-.195.45-.632 1.017.385 1.697.585.39 1.05.813 1.488 1.25.438.438 1.446 1.157 2.063 1.554.498.322 1.066.305 1.455-.071.39-.376 1.677-1.951 2.125-2.611.447-.66.894-.551 1.487-.334.593.217 3.753 1.776 4.397 2.09.645.314 1.078.47 1.233.734.155.264.155 1.514-.147 2.36z" />
          </svg>
        )}
      </button>
    </div>
  );
}
