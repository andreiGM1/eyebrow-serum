'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Leaf, FlaskConical, Award, Mail, CheckCircle2 } from 'lucide-react';

export default function Footer() {
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
    <footer className="bg-obsidian-950 border-t border-gold-500/20 text-zinc-400 font-sans pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges: Botanical Luxury Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-14 border-b border-zinc-800/80">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-400">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white uppercase tracking-wider">
                Compounded în București
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Micro-loturi artizanale proaspete în laboratorul propriu din capitală.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-400">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white uppercase tracking-wider">
                100% Active Lipid Complex
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Zero apă adăugată, zero conservanți sintetici, parabeni sau sulfați.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white uppercase tracking-wider">
                Prostaglandin-Free
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Fără hormoni sintetici, fără riscuri de hiperpigmentare a pleoapelor.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white uppercase tracking-wider">
                Regulament UE (CE) 1223/2009
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Certificat de siguranță cosmetică europeană și teste oftalmologice.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Columns Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12 border-b border-zinc-800/80">
          
          {/* Brand Manifesto */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif tracking-[0.2em] font-bold text-white">
                MAG
              </span>
              <span className="text-xs uppercase px-1.5 py-0.5 rounded bg-gold-500/10 border border-gold-500/30 text-gold-400 font-mono tracking-widest">
                LABORATORIES
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400 mt-4 max-w-sm">
              Atelierul de precizie botanică din București dedicat biologiei cosmetice celulare.
              Formulăm tratamente native de înaltă performanță pentru gene și sprâncene dense,
              fără a recurge la compuși hormonali periculoși.
            </p>
            <div className="mt-4 text-xs font-mono text-zinc-500">
              MAG Laboratories Atelier • Calea Victoriei, București, România
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-mono mb-4">
              Catalog Produse
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/catalog?category=seruri-active" className="hover:text-gold-400 transition-colors">
                  Seruri Active Sprâncene
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=aplicatoare-accesorii" className="hover:text-gold-400 transition-colors">
                  Dermarollere & Accesorii
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=pachete-tratament" className="hover:text-gold-400 transition-colors">
                  Pachete Tratament 6 Luni
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=demachiere-ingrijire" className="hover:text-gold-400 transition-colors">
                  Demachiere & Curățare
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-gold-400 hover:underline">
                  Toate produsele &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-mono mb-4">
              Asistență & Diagnostic
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/simulator" className="text-gold-400 hover:text-gold-300 transition-colors font-medium">
                  Simulator Vizual Timeline & Quiz
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-400 transition-colors">
                  Manifestul Clean Chemistry
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-gold-400 transition-colors">
                  Coș de Cumpărături
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-gold-400 transition-colors">
                  Cont & Istoric Facturi
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-zinc-500 hover:text-zinc-300 transition-colors font-mono">
                  Panou Admin (Evaluare)
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-mono mb-4">
              Atelier Newsletter
            </h4>
            <p className="text-xs text-zinc-400 mb-3">
              Abonează-te pentru sfaturi dermatologice de îngrijire a sprâncenelor și un cupon de bun venit de 10%.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Te-ai abonat! Codul tău este MAGWELCOME</span>
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
                    className="w-full bg-obsidian-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-500/50"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-semibold text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Abonează-mă</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Security */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} MAG LABORATORIES BUCHAREST. Toate drepturile rezervate.
            Prețurile includ TVA (19%).
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Procesare Securizată Stripe (Test Mode)</span>
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
