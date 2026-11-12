'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Leaf, FlaskConical, Award, Mail, CheckCircle2, Sparkles, Feather } from 'lucide-react';
import { useAuth } from '@/lib/store/auth-context';

export default function Footer() {
  const { isAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#FAF7F2] dark:bg-[#071513] border-t border-teal-900/15 dark:border-teal-500/20 text-stone-600 dark:text-zinc-400 font-sans pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges: Botanical Luxury Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-14 border-b border-stone-300/80 dark:border-zinc-800/80">
          <div className="flex items-start gap-3 group">
            <div className="p-3 rounded-2xl bg-teal-800/10 dark:bg-teal-400/10 border border-teal-700/30 dark:border-teal-400/30 text-teal-800 dark:text-teal-300 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-stone-900 dark:text-white uppercase tracking-wider group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                Compounded în Atelier
              </div>
              <p className="text-xs text-stone-600 dark:text-zinc-400 mt-1">
                Micro-loturi artizanale proaspete în laboratorul propriu din București.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 group">
            <div className="p-3 rounded-2xl bg-teal-800/10 dark:bg-teal-400/10 border border-teal-700/30 dark:border-teal-400/30 text-teal-800 dark:text-teal-300 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm">
              <Leaf className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-stone-900 dark:text-white uppercase tracking-wider group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                100% Active Lipid Complex
              </div>
              <p className="text-xs text-stone-600 dark:text-zinc-400 mt-1">
                Zero apă adăugată, zero conservanți sintetici, parabeni sau sulfați.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 group">
            <div className="p-3 rounded-2xl bg-teal-800/10 dark:bg-teal-400/10 border border-teal-700/30 dark:border-teal-400/30 text-teal-800 dark:text-teal-300 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-stone-900 dark:text-white uppercase tracking-wider group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                Prostaglandin-Free
              </div>
              <p className="text-xs text-stone-600 dark:text-zinc-400 mt-1">
                Fără hormoni sintetici, fără riscuri de hiperpigmentare a pleoapelor.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 group">
            <div className="p-3 rounded-2xl bg-teal-800/10 dark:bg-teal-400/10 border border-teal-700/30 dark:border-teal-400/30 text-teal-800 dark:text-teal-300 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm">
              <Award className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-stone-900 dark:text-white uppercase tracking-wider group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                Regulament UE (CE) 1223/2009
              </div>
              <p className="text-xs text-stone-600 dark:text-zinc-400 mt-1">
                Certificat de siguranță cosmetică europeană și teste oftalmologice.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Columns Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12 border-b border-stone-300/80 dark:border-zinc-800/80">
          
          {/* Brand Manifesto */}
          <div className="md:col-span-2">
            <div className="flex flex-col items-start">
              <span className="text-2xl font-serif tracking-[0.18em] font-bold text-[#143D36] dark:text-[#E8F3F0]">
                EVERGREEN &amp; ISLE
              </span>
              <span className="text-[10px] uppercase tracking-[0.32em] text-[#658777] dark:text-[#8EAE9E] font-sans font-medium mt-0.5">
                NATURAL SKINCARE
              </span>
            </div>
            <p className="text-xs leading-relaxed text-stone-600 dark:text-zinc-400 mt-4 max-w-sm">
              Atelierul botanic dedicat sănătății pielii și biologiei foliculare.
              Formulăm tratamente pure, bio-active și sustenabile pentru densitate naturală,
              fără hormoni sintetici sau ingrediente de umplutură.
            </p>
            <div className="mt-4 text-xs font-mono text-stone-500 dark:text-zinc-500">
              Evergreen &amp; Isle Natural Skincare Atelier • Calea Victoriei, București, România
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-stone-950 dark:text-white font-mono mb-4 flex items-center gap-1.5 font-bold">
              <Feather className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              Catalog Produse
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/catalog?category=seruri-active" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Seruri Active Sprâncene
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=aplicatoare-accesorii" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Dermarollere & Accesorii
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=pachete-tratament" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Pachete Tratament 6 Luni
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=demachiere-ingrijire" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Demachiere & Curățare
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-teal-700 dark:text-teal-400 hover:underline font-semibold">
                  Toate produsele &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-stone-950 dark:text-white font-mono mb-4 flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              Asistență & Diagnostic
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/simulator" className="text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors font-medium">
                  Simulator Vizual Timeline & Quiz
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Manifestul Clean Chemistry
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Coș de Cumpărături
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Cont & Istoric Facturi
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link href="/admin" className="text-teal-600 dark:text-teal-400 hover:underline transition-colors font-mono">
                    Panou Administrare
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-stone-950 dark:text-white font-mono mb-4 flex items-center gap-1.5 font-bold">
              <Mail className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              Atelier Newsletter
            </h4>
            <p className="text-xs text-stone-600 dark:text-zinc-400 mb-3">
              Abonează-te pentru sfaturi dermatologice de îngrijire a sprâncenelor și un cupon de bun venit de 10%.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>Te-ai abonat! Codul tău este EVERGREEN10</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Adresa ta de email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white dark:bg-obsidian-900 border border-stone-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-teal-500/50"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-800 hover:bg-teal-700 text-white font-semibold text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Abonează-mă</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Security */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 dark:text-zinc-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} EVERGREEN &amp; ISLE. Toate drepturile rezervate.
            Prețurile includ TVA (19%).
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Plăți Securizate SSL 256-bit • Stripe & Apple Pay</span>
            <span>•</span>
            <span>Next.js 15 & Supabase</span>
            <span>•</span>
            <span>Livrare în 24-48h</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
