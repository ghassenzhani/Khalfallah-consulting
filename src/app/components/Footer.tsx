import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-y-16">
        <div className="md:col-span-5">
          <div className="flex items-center gap-x-4 text-white mb-6">
            <div className="text-4xl">🇹🇳</div>
            <div className="text-4xl font-semibold tracking-tighter">Khalfallah Consulting</div>
          </div>
          <p className="max-w-xs text-sm">Accompagnement professionnel des étudiants tunisiens souhaitant poursuivre leurs études supérieures en Italie.</p>
          
          <div className="mt-10 text-xs flex items-center gap-x-8">
            <div>© 2026 KHALFALLAH CONSULTING</div>
            <Link href="#" className="hover:text-white">Mentions légales</Link>
          </div>
        </div>

        <div className="md:col-span-3 text-sm">
          <div className="font-mono uppercase text-xs tracking-widest mb-6 text-zinc-500">Navigation</div>
          <div className="space-y-4">
            <Link href="/methode" className="block hover:text-white">Notre méthode</Link>
            <Link href="/universites" className="block hover:text-white">Universités italiennes</Link>
            <Link href="/methode" className="block hover:text-white">Services</Link>
            <Link href="/temoignages" className="block hover:text-white">Témoignages</Link>
          </div>
        </div>

        <div className="md:col-span-4">
          <div className="font-mono uppercase text-xs tracking-widest mb-6 text-zinc-500">CONTACT RAPIDE</div>
          
          <div className="space-y-6">
            <a href="tel:+21698123456" className="flex items-center gap-x-4 group">
              <div className="w-11 h-11 flex items-center justify-center bg-white/5 rounded-2xl group-hover:bg-rose-500/10 transition-colors">
                📞
              </div>
              <div>
                <div className="text-white text-xl font-medium">+216 98 123 456</div>
                <div className="text-xs">Appel ou WhatsApp</div>
              </div>
            </a>
            
            <a href="mailto:contact@khalfallahconsulting.com" className="flex items-center gap-x-4 group">
              <div className="w-11 h-11 flex items-center justify-center bg-white/5 rounded-2xl group-hover:bg-rose-500/10 transition-colors">
                ✉️
              </div>
              <div>
                <div className="text-white font-medium">contact@khalfallahconsulting.com</div>
                <div className="text-xs">Réponse sous 48h</div>
              </div>
            </a>
          </div>

          <div className="mt-16 text-[10px] max-w-[260px] leading-relaxed">
            Siège social : Avenue de la Liberté, Tunis<br />
            Agréé par les autorités italiennes et tunisiennes pour l'accompagnement aux études à l'étranger.
          </div>
        </div>
      </div>
    </footer>
  );
}
