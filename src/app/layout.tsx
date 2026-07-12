import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Inter } from 'next/font/google';
import CrispChat from "./components/CrispChat";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Khalfallah Consulting | Étudier en Italie depuis la Tunisie",
  description: "Accompagnement complet pour les étudiants tunisiens souhaitant étudier en Italie : profil, universités, candidatures, bourses DSU, logement et visa étudiant. 98% de réussite visa.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-zinc-50 text-zinc-900 antialiased`}>
        {children}
        <CrispChat />
      </body>
    </html>
  );
}
