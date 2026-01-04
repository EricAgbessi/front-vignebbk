import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 pt-24 pb-12 mt-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">
        <div className="lg:col-span-2 space-y-8">
          <span className="text-4xl font-black text-[#810b15] font-cavas tracking-tighter">VIGNEBBK</span>
          <p className="text-zinc-500 text-lg leading-relaxed max-w-sm">
            Votre caviste d'exception en ligne. Une sélection rigoureuse des meilleurs domaines et maisons pour des moments inoubliables.
          </p>
          <div className="flex gap-4">
            {["FB", "IG", "TW", "LI"].map(s => (
              <div key={s} className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center font-bold text-xs hover:bg-[#810b15] hover:text-white transition-all cursor-pointer">
                {s}
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <h4 className="font-black font-cavas text-sm uppercase tracking-widest">Navigation</h4>
          <ul className="space-y-4 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
            <li><Link href="/pages/vins/rouges" className="hover:text-[#810b15] transition-colors">Vins Rouges</Link></li>
            <li><Link href="/pages/vins/blancs" className="hover:text-[#810b15] transition-colors">Vins Blancs</Link></li>
            <li><Link href="/pages/champagnes" className="hover:text-[#810b15] transition-colors">Champagnes</Link></li>
            <li><Link href="/pages/spiritueux" className="hover:text-[#810b15] transition-colors">Spiritueux</Link></li>
            <li><Link href="/pages/nouveautes" className="hover:text-[#810b15] transition-colors">Nouveautés</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-black font-cavas text-sm uppercase tracking-widest">Service Client</h4>
          <ul className="space-y-4 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
            <li><Link href="/contact" className="hover:text-[#810b15] transition-colors">Contactez-nous</Link></li>
            <li><Link href="/livraison" className="hover:text-[#810b15] transition-colors">Livraison & Retours</Link></li>
            <li><Link href="/faq" className="hover:text-[#810b15] transition-colors">FAQ</Link></li>
            <li><Link href="/compte" className="hover:text-[#810b15] transition-colors">Mon Compte</Link></li>
            <li><Link href="/fidelite" className="hover:text-[#810b15] transition-colors">Programme Fidélité</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-black font-cavas text-sm uppercase tracking-widest">Légal</h4>
          <ul className="space-y-4 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
            <li><Link href="/cgv" className="hover:text-[#810b15] transition-colors">CGV</Link></li>
            <li><Link href="/confidentialite" className="hover:text-[#810b15] transition-colors">Confidentialité</Link></li>
            <li><Link href="/mentions-legales" className="hover:text-[#810b15] transition-colors">Mentions Légales</Link></li>
            <li><Link href="/cookies" className="hover:text-[#810b15] transition-colors">Gestion des Cookies</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mt-24 pt-12 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-zinc-400 text-[10px] uppercase tracking-[0.3em] font-black">© 2024 VIGNEBBK. TOUS DROITS RÉSERVÉS.</p>
        <p className="text-[#810b15] text-[10px] uppercase tracking-[0.3em] font-black text-center">L'ABUS D'ALCOOL EST DANGEREUX POUR LA SANTÉ. À CONSOMMER AVEC MODÉRATION.</p>
        <div className="flex gap-4 opacity-50 grayscale">
          <div className="w-12 h-8 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="w-12 h-8 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="w-12 h-8 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
