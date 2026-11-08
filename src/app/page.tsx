'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ShieldCheck,
  FlaskConical,
  Award,
  ArrowRight,
  Star,
  CheckCircle2,
  Droplets,
  Feather,
  Layers,
  Compass,
  Zap,
} from 'lucide-react';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '@/lib/data';
import ProductCard from '@/components/product/ProductCard';

export default function HomePage() {
  const featuredProducts = INITIAL_PRODUCTS.filter((p) => p.is_featured);

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-obsidian-950 text-stone-900 dark:text-foreground overflow-hidden transition-colors">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 px-4 sm:px-6 lg:px-8 border-b border-stone-200 dark:border-zinc-800/80">
        
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-botanical-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-800 dark:text-gold-400 text-xs font-mono shadow-sm animate-pulse-glow font-semibold">
              <FlaskConical className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
              <span>MAG LABORATORIES • ATELIER BUCUREȘTI</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-950 dark:text-white leading-[1.15]">
              Botanică de Precizie. <br />
              <span className="gold-gradient-text">Fără Prostaglandine.</span>
            </h1>

            {/* Sub-headline / Copy */}
            <p className="text-sm sm:text-base text-stone-600 dark:text-zinc-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Tratament bioactiv 100% natural cu lipide active presate la rece, formulat în micro-loturi
              în București. Trezește foliculii dorminzi și redă densitatea arhitecturală a sprâncenelor,
              fără riscul hiperpigmentării pleoapelor.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/catalog"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-xl shadow-gold-500/20 flex items-center justify-center gap-2 group"
              >
                <span>Descoperă Catalogul</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/simulator"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white dark:bg-obsidian-900 hover:bg-stone-50 dark:hover:bg-zinc-800 border border-stone-300 dark:border-gold-500/40 text-gold-700 dark:text-gold-300 font-semibold text-xs tracking-wider transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-gold-600 dark:text-gold-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Simulator Timeline & Diagnostic</span>
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="pt-6 border-t border-stone-200 dark:border-zinc-800/80 grid grid-cols-3 gap-2 sm:gap-4 text-left max-w-md mx-auto lg:mx-0">
              <div className="group">
                <span className="font-serif text-lg sm:text-2xl font-bold text-stone-900 dark:text-white block group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">100%</span>
                <span className="text-[10px] sm:text-[11px] font-mono text-stone-500 dark:text-zinc-400">Lipide Active (Fără Apă)</span>
              </div>
              <div className="group">
                <span className="font-serif text-lg sm:text-2xl font-bold text-gold-600 dark:text-gold-400 block">0%</span>
                <span className="text-[10px] sm:text-[11px] font-mono text-stone-500 dark:text-zinc-400">Hormoni / Prostaglandine</span>
              </div>
              <div className="group">
                <span className="font-serif text-lg sm:text-2xl font-bold text-stone-900 dark:text-white block group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">90 Zile</span>
                <span className="text-[10px] sm:text-[11px] font-mono text-stone-500 dark:text-zinc-400">Cură per Flacon 3 ml</span>
              </div>
            </div>

          </div>

          {/* Right Hero Column: Real Product Visual with Floating Animation */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-64 sm:w-84 aspect-[9/16] rounded-3xl overflow-hidden border-2 border-gold-500/40 shadow-2xl shadow-gold-500/10 group animate-float">
              <Image
                src="/images/mag-evergrow-bottle.png"
                alt="MAG EVERGROW Lash and Brow Serum Bottle"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating luxury certificate badge */}
              <div className="absolute top-4 sm:top-5 left-3 sm:left-4 right-3 sm:right-4 bg-white/95 dark:bg-obsidian-950/90 backdrop-blur-md border border-stone-200 dark:border-gold-500/40 p-2.5 sm:p-3.5 rounded-2xl flex items-center gap-2.5 sm:gap-3 shadow-2xl z-10">
                <div className="p-2 sm:p-2.5 rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-600 dark:text-gold-400 animate-pulse flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs font-serif font-bold text-stone-950 dark:text-white">MAG EVERGROW 3 ML</div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-gold-600 dark:text-gold-400 font-semibold">Compounded in Bucharest Atelier</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CATEGORIES OVERVIEW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400 block mb-1 flex items-center gap-1.5 font-bold">
              <Feather className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
              Colecții de Tratament Folicular
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-950 dark:text-white">
              Grupate pe Etape de Regenerare
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-mono text-stone-500 dark:text-zinc-400 hover:text-gold-600 dark:hover:text-gold-400 flex items-center gap-1 group font-medium"
          >
            <span>Vezi toate produsele</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/catalog?category=${cat.slug}`}
              className="group bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 hover:border-gold-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold-500/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-gold-600 dark:text-gold-400 font-bold bg-gold-500/10 border border-gold-500/20 px-2 py-0.5 rounded">
                  0{idx + 1}
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white mt-3 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-600 dark:text-zinc-400 mt-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono text-stone-500 dark:text-zinc-400 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors font-medium">
                <span>Explorează</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. INNOVATIVE FEATURE CALLOUT: SIMULATOR & TIMELINE (FIXED CONTRAST IN LIGHT MODE) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#F6F0E4] via-[#ECE1CD] to-[#F6F0E4] dark:from-obsidian-900 dark:via-botanical-950 dark:to-obsidian-900 border border-gold-500/40 p-8 sm:p-14 overflow-hidden shadow-2xl transition-colors">
          <div className="max-w-2xl space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 border border-gold-500/50 text-gold-800 dark:text-gold-300 text-xs font-mono font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-700 dark:text-gold-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>MODUL ORIGINAL • EVALUARE PERSONALIZATĂ</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950 dark:text-white leading-tight">
              BrowGrowth Diagnostics & <br />
              <span className="gold-gradient-text">Visual Timeline Simulator</span>
            </h2>

            <p className="text-xs sm:text-sm text-stone-700 dark:text-zinc-300 leading-relaxed font-normal">
              Fiecare arcadă are un ritm biologic distinct. Prin quiz-ul nostru de diagnostic în 3 pași,
              obții calculatorul de dozaj exact și simulezi interactiv evoluția pe săptămâni (W2, W4, W8, W12).
              Adaugi apoi rutina completă recomandată în coș printr-un singur click cu discount automat!
            </p>

            <div className="pt-2">
              <Link
                href="/simulator"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-xl shadow-gold-500/20 group"
              >
                <span>Pornește Simulatorul Interactiv</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (BESTSELLERS) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400 block mb-1 flex items-center gap-1.5 font-bold">
              <Award className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
              Selectate de Laborator
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-950 dark:text-white">
              Bestsellers MAG EVERGROW
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-mono text-stone-500 dark:text-zinc-400 hover:text-gold-600 dark:hover:text-gold-400 flex items-center gap-1 group font-medium"
          >
            <span>Vezi întregul catalog (8 produse)</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. ACTIVE BOTANICAL MATRIX SECTION */}
      <section className="py-20 bg-[#F4EFE6]/60 dark:bg-obsidian-900 border-y border-stone-200 dark:border-zinc-800 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400 flex items-center justify-center gap-1.5 font-bold">
              <FlaskConical className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
              Decriptare Științifică
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950 dark:text-white">
              Matricea Lipidelor Active MAG
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400">
              Fiecare ingredient este ales pentru puritatea chimică și capacitatea de a penetra teaca foliculului fără hormoni.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: 'Ricinus Communis (Ricin Virgin)',
                source: 'Prima presare la rece • 85-90% acid ricinoleic',
                desc: 'Creează un scut lipidic dens, sigilează cuticula firului și previne pierderea de apă.',
              },
              {
                title: 'Rosmarinus Officinalis (Rozmarin)',
                source: 'Distilare cu abur din plante mediteraneene',
                desc: 'Activează microcirculația capilară din jurul papilei dermice, stimulând faza anagenă.',
              },
              {
                title: 'Simmondsia Chinensis (Jojoba Aurie)',
                source: 'Presare la rece nerafinată',
                desc: 'Esteri de ceară biomimetici ce dizolvă sebumul oxidat din pori fără a usca pielea.',
              },
              {
                title: 'Tocopherol (Vitamina E Activă)',
                source: 'Antioxidant vegetal lipofil',
                desc: 'Protejează proteinele de keratină nou formate împotriva stresului oxidativ și a razelor UV.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-obsidian-950 border border-stone-200 dark:border-zinc-800 p-6 rounded-2xl space-y-3 group hover:border-gold-500/40 transition-colors shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-700 dark:text-gold-400 font-mono text-xs font-bold group-hover:scale-110 transition-transform">
                  0{idx + 1}
                </div>
                <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                  {item.title}
                </h3>
                <span className="text-[10px] font-mono text-gold-700 dark:text-gold-400/90 block font-semibold">{item.source}</span>
                <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VERIFIED REVIEWS & SOCIAL PROOF */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="flex items-center justify-center gap-1 text-gold-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
            ))}
          </div>
          <h2 className="font-serif text-3xl font-bold text-stone-950 dark:text-white">
            Rezultate Verificate Clinic & Clienți MAG
          </h2>
          <p className="text-xs text-stone-600 dark:text-zinc-400">
            Peste 500 de flacoane livrate în România cu recenzii confirmate prin achiziție.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              author: 'Elena R. (București)',
              text: 'Folosesc serul Evergrow de 6 săptămâni. Golurile din colțul intern al sprâncenelor, unde pensam agresiv încă din liceu, s-au umplut complet cu fire noi și viguroase! Nu ustură deloc ochii.',
            },
            {
              author: 'Andreea M. (Cluj-Napoca)',
              text: 'Cel mai mare plus pentru mine este că NU conține prostaglandine sintetice! Am avut experiențe groaznice cu alte mărci care mi-au înnegrit pleoapele. MAG Evergrow este aur curat!',
            },
            {
              author: 'Ioana V. (Iași)',
              text: 'Am comandat Duo Pack pentru a face cura completă de 6 luni recomandată de laborator. Rezultatele sunt spectaculoase, nu mai am nevoie deloc de creion de sprâncene!',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 hover:border-gold-500/40 p-6 rounded-2xl flex flex-col justify-between transition-all hover:-translate-y-1 shadow-sm"
            >
              <div>
                <div className="flex text-gold-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className="text-xs text-stone-700 dark:text-zinc-300 leading-relaxed italic">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-zinc-800/80 flex items-center justify-between">
                <span className="font-serif font-bold text-xs text-stone-900 dark:text-white">{item.author}</span>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3 h-3" /> Achiziție Verificată
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
