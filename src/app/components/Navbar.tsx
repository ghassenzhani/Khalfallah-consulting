'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown, Phone, FileSearch } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/methode', label: 'Notre Méthode' },
    { href: '/universites', label: 'Universités' },
    { href: '/temoignages', label: 'Témoignages' },
  ];

  const exploreLinks = [
    { href: '/guides', label: 'Guides' },
    { href: '/faq', label: 'FAQ' },
    { href: '/about', label: 'About' },
    { href: '/italy-student-visa', label: 'Italy student visa' },
    { href: '/universitaly', label: 'Universitaly' },
    { href: '/dsu-scholarship', label: 'DSU scholarship' },
    { href: '/isee-parificato', label: 'ISEE Parificato' },
    { href: '/dov-cimea', label: 'DOV/CIMEA' },
    { href: '/student-housing', label: 'Student housing' },
    { href: '/master-in-italy', label: 'Master in Italy' },
    { href: '/english-taught', label: 'English-taught programmes' },
    { href: '/study-after-bac', label: 'Study after bac' },
    { href: '/universities-without-test', label: 'Universities without test' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[1200px] z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-full px-5 py-3 flex items-center justify-between shadow-xl border border-zinc-200/50">
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-rose-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0">🇹🇳</div>
            <div className="flex flex-col">
              <div className="font-semibold text-xl tracking-tight text-zinc-900 leading-none">Khalfallah</div>
              <span className="text-[9px] font-medium tracking-[0.15em] text-zinc-500 mt-0.5">CONSULTING</span>
            </div>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="nav-link px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 rounded-full hover:bg-zinc-100 transition-all"
            >
              {link.label}
            </Link>
          ))}
          
          {/* Explore Dropdown */}
          <div className="relative" onMouseEnter={() => setExploreOpen(true)} onMouseLeave={() => setExploreOpen(false)}>
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-full transition-all">
              Explorer <ChevronDown className={`w-3.5 h-3.5 transition-transform ${exploreOpen ? 'rotate-180' : ''}`} />
            </button>
            {exploreOpen && (
              <>
                {/* Invisible bridge to keep hover alive between button and dropdown */}
                <div className="absolute top-full left-0 w-full h-4"></div>
                <div className="absolute top-[calc(100%+8px)] right-0 w-[480px] bg-white rounded-2xl shadow-2xl border border-zinc-100 p-6 grid grid-cols-2 gap-x-8 gap-y-1">
                  {exploreLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-sm text-zinc-800 hover:text-rose-600 hover:bg-rose-50 font-semibold px-4 py-3 rounded-xl transition-all">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-full transition-all active:scale-[0.97]"
          >
            <FileSearch className="w-4 h-4" />
            Track File
          </Link>
          <a href="tel:+21698123456" className="flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-rose-600 transition-colors">
            <Phone className="w-4 h-4" />
            <span>+216 98 123 456</span>
          </a>
          <Link 
            href="/contact"
            className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-full transition-all shadow-md shadow-rose-500/20 active:scale-[0.97]"
          >
            Prendre RDV
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2 text-zinc-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden mt-3 bg-white rounded-2xl p-6 shadow-xl border border-zinc-100">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-medium text-zinc-800 text-lg px-4 py-3 rounded-xl hover:bg-zinc-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-zinc-100 mt-2 pt-4 flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-50 text-emerald-700 font-semibold rounded-full border border-emerald-200"
              >
                <FileSearch className="w-5 h-5" /> Track File
              </Link>
              <a href="tel:+21698123456" className="flex items-center gap-3 text-rose-600 font-medium px-4">
                <Phone className="w-5 h-5" /> +216 98 123 456
              </a>
              <Link 
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full py-4 bg-rose-600 text-white font-semibold rounded-full text-center"
              >
                Prendre RDV
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
