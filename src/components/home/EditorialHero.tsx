'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Maximize2, Minimize2 } from 'lucide-react';

// Organic Silhouette Paths (Normalized to 1000x1000 viewBox, center at 500,500)
// Optimized proportions so that on mobile portrait screens (360-430px) the silhouette has luxury breathing room without clipping
// Shape 1: Iconic Sculpted Eyebrow & Eye/Lash Arch (Twin Arched Brow + Sensual Lash Contour)
const BROW_LASH_SILHOUETTE =
  'M 270 500 C 340 380, 420 360, 500 420 C 580 360, 660 380, 730 500 C 660 620, 340 620, 270 500 Z';

// Shape 2: Organic Botanical Follicle / Sprout (Active Hair Growth Germination)
const FOLLICLE_SILHOUETTE =
  'M 500 330 C 600 420, 680 510, 680 580 C 680 660, 600 700, 500 700 C 400 700, 320 660, 320 580 C 320 510, 400 420, 500 330 Z';

// Shape 3: Sculpted Almond Eye & Feather Lash Arch
const ALMOND_EYE_SILHOUETTE =
  'M 260 500 C 350 380, 500 350, 620 390 C 680 410, 720 460, 740 500 C 690 590, 530 630, 420 610 C 330 590, 280 540, 260 500 Z';

interface CampaignItem {
  id: string;
  tag: string;
  title: string;
  category: string;
  price: string;
  slug: string;
  description: string;
}

const CAMPAIGNS: CampaignItem[] = [
  {
    id: '01',
    tag: 'CAMPAIGN (01)',
    title: 'SER CREȘTERE SPRÂNCENE',
    category: 'Seruri Active • Foliculi Sprâncene',
    price: '189 LEI',
    slug: 'evergrow-eyebrow-growth-serum-3ml',
    description: 'Activare foliculară în 30 de zile cu ricin virgin presat la rece și rozmarin bio-fermentat.',
  },
  {
    id: '02',
    tag: 'CAMPAIGN (02)',
    title: 'INFUZIE BIOLIPIDICĂ GENE',
    category: 'Complex Hidratare • Gene & Rădăcini',
    price: '149 LEI',
    slug: 'evergrow-night-growth-elixir-30ml',
    description: 'Alungire și rezistență naturală fără prostaglandine sintetice sau riscul de cearcăne.',
  },
  {
    id: '03',
    tag: 'CAMPAIGN (03)',
    title: 'RITUAL COMPLET 6 LUNI',
    category: 'Kit Densitate • 2x Ser + Dermaroller + Periuță',
    price: '349 LEI',
    slug: 'evergrow-complete-kit-dermaroller',
    description: 'Transformare completă pentru sprâncene subțiate și regenerarea rădăcinilor fragile.',
  },
];

export default function EditorialHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isManualExpanded, setIsManualExpanded] = useState(false);
  const [activeCampaignIndex, setActiveCampaignIndex] = useState(0);
  const [activeShape, setActiveShape] = useState<'brows' | 'follicle' | 'eye'>('brows');

  // Track scroll position inside the hero track (180vh)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isManualExpanded) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // Calculate progress between 0 and 1
      const progress = Math.min(1, Math.max(0, -rect.top / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isManualExpanded]);

  // Effective progress: if manually expanded, jump smoothly to 1
  const effectiveProgress = isManualExpanded ? 1 : scrollProgress;

  // Scale computation: 1.0 -> 12.0 (expands way past screen bounds)
  const maskScale = 1.0 + Math.pow(effectiveProgress, 1.4) * 11.5;

  // Opacity of initial editorial typography (fades out as mask expands)
  const initialElementsOpacity = Math.max(0, 1 - effectiveProgress * 2.6);

  // Opacity of expanded manifesto and campaign items (fades in when mask is large)
  const expandedElementsOpacity = Math.max(0, Math.min(1, (effectiveProgress - 0.45) / 0.4));

  // Determine current active shape path
  const currentPath =
    activeShape === 'brows'
      ? BROW_LASH_SILHOUETTE
      : activeShape === 'follicle'
      ? FOLLICLE_SILHOUETTE
      : ALMOND_EYE_SILHOUETTE;

  const currentCampaign = CAMPAIGNS[activeCampaignIndex];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[190vh] bg-[#FAF7F2] dark:bg-[#071513] transition-colors"
    >
      {/* Sticky Fullscreen Canvas (100dvh) */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden select-none">
        
        {/* 1. Underlying Cinematic Video Layer */}
        <div className="absolute inset-0 w-full h-full z-0 bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/evergreen-isle-hero.mp4" type="video/mp4" />
          </video>

          {/* Dark luxury gradient scrim when expanded, ensuring 100% text legibility */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/85 transition-opacity duration-300 pointer-events-none"
            style={{ opacity: expandedElementsOpacity }}
          />
        </div>

        {/* 2. SVG Mask Layer with Centered Silhouette Cutout */}
        <svg
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <mask id="editorial-hero-cutout">
              {/* White everywhere renders the solid background overlay */}
              <rect width="1000" height="1000" fill="white" />
              {/* Black shape cuts out the transparent window to reveal video */}
              <g
                style={{
                  transform: `scale(${maskScale})`,
                  transformOrigin: '500px 500px',
                  willChange: 'transform',
                  transition: isManualExpanded ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                }}
              >
                <path d={currentPath} fill="black" />
              </g>
            </mask>
          </defs>

          {/* Solid linen/obsidian canvas covering screen, with the cutout applied */}
          <rect
            width="1000"
            height="1000"
            className="fill-[#FAF7F2] dark:fill-[#071513] transition-colors duration-300"
            mask="url(#editorial-hero-cutout)"
          />
        </svg>

        {/* 3. Minimalist Editorial Status Strip */}
        <div className="absolute top-3 sm:top-5 left-0 right-0 z-20 px-4 sm:px-8 flex items-center justify-between text-[11px] font-mono tracking-wider">
          {/* Left: Editorial Tag */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span
              className="uppercase tracking-[0.2em] font-semibold text-stone-700 dark:text-stone-300 transition-colors"
              style={{ color: effectiveProgress > 0.5 ? '#FFFFFF' : undefined }}
            >
              SS2026 EDITION • RITUAL 01
            </span>
          </div>

          {/* Right: Quick Expand / Close Toggle */}
          <button
            onClick={() => setIsManualExpanded(!isManualExpanded)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/10 dark:bg-white/10 hover:bg-stone-900/20 dark:hover:bg-white/20 transition-all uppercase tracking-widest text-[10px] font-bold text-stone-900 dark:text-stone-100 cursor-pointer backdrop-blur-sm"
            style={{ color: effectiveProgress > 0.5 ? '#FFFFFF' : undefined }}
          >
            {isManualExpanded ? (
              <>
                <Minimize2 className="w-3 h-3" />
                <span>Restrânge</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3 h-3" />
                <span>Extinde Filmul</span>
              </>
            )}
          </button>
        </div>

        {/* ──────── 4. INITIAL UNEXPANDED EDITORIAL OVERLAY (Image 1 & 2) ──────── */}
        <div
          className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-4 sm:p-8 pt-10 sm:pt-14 pb-6 sm:pb-8 transition-opacity duration-200"
          style={{
            opacity: initialElementsOpacity,
            pointerEvents: initialElementsOpacity > 0.1 ? 'auto' : 'none',
          }}
        >
          {/* Top Bold Brand Typography (Serotoninn Style) */}
          <div className="flex flex-col items-start max-w-full">
            <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter uppercase text-stone-950 dark:text-white leading-[0.88] scale-y-105 origin-left">
              EVERGREEN
            </h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1.5 sm:mt-2.5 text-[9.5px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#2C6E5C] dark:text-[#8DAFA0]">
              <span className="font-bold">BOTANICAL BIOLIPID</span>
              <span className="opacity-60">•</span>
              <span>HAIR, BROWS &amp; LASHES</span>
            </div>
          </div>

          {/* Silhouette Shape Selector (Minimalist Pills for Hair / Brows / Lashes) */}
          <div className="flex items-center gap-1.5 self-start bg-white/80 dark:bg-black/50 backdrop-blur-md p-1 rounded-full border border-stone-300/80 dark:border-white/10 text-[9.5px] sm:text-[10px] font-mono uppercase tracking-wider shadow-sm">
            <button
              onClick={() => setActiveShape('brows')}
              className={`px-2.5 sm:px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeShape === 'brows'
                  ? 'bg-stone-900 dark:bg-white text-white dark:text-black font-bold shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white'
              }`}
            >
              (01) SPRÂNCENE
            </button>
            <button
              onClick={() => setActiveShape('follicle')}
              className={`px-2.5 sm:px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeShape === 'follicle'
                  ? 'bg-stone-900 dark:bg-white text-white dark:text-black font-bold shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white'
              }`}
            >
              (02) FOLICULI PĂR
            </button>
            <button
              onClick={() => setActiveShape('eye')}
              className={`px-2.5 sm:px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeShape === 'eye'
                  ? 'bg-stone-900 dark:bg-white text-white dark:text-black font-bold shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white'
              }`}
            >
              (03) GENE &amp; OCHI
            </button>
          </div>

          {/* Bottom Row: Mobile Hint + FILM Branding */}
          <div className="flex items-end justify-between w-full">
            
            {/* Mobile Expand Button / Scroll Hint */}
            <div className="flex flex-col items-start gap-1.5">
              <button
                onClick={() => setIsManualExpanded(true)}
                className="min-h-[44px] px-4 py-2 rounded-full bg-stone-900/90 dark:bg-white/95 text-white dark:text-stone-950 text-[11px] font-mono font-bold tracking-wider uppercase flex items-center gap-2 shadow-xl active:scale-95 touch-manipulation cursor-pointer transition-transform"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>EXTINDE FILMUL</span>
              </button>
              <span className="text-[9.5px] font-mono text-stone-500 dark:text-stone-400 uppercase tracking-widest pl-1">
                ↓ Scroll pentru deblocare
              </span>
            </div>

            {/* Bottom Right: Massive FILM Label (serotoninn style) */}
            <div className="text-right">
              <span className="font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter uppercase text-stone-950 dark:text-white leading-[0.85] block scale-y-105">
                FILM
              </span>
              <span className="text-[9.5px] sm:text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center justify-end gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                BOTANICAL 4K
              </span>
            </div>

          </div>
        </div>

        {/* ──────── 5. EXPANDED EDITORIAL OVERLAY (Image 6) ──────── */}
        <div
          className="absolute inset-0 z-30 flex flex-col justify-between p-4 sm:p-8 pt-20 sm:pt-24 pb-8 text-white transition-opacity duration-300"
          style={{
            opacity: expandedElementsOpacity,
            pointerEvents: expandedElementsOpacity > 0.4 ? 'auto' : 'none',
          }}
        >
          {/* Top: Editorial Manifesto Block */}
          <div className="max-w-2xl bg-black/40 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/10 self-start shadow-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#8DAFA0] font-bold">
                SS2026 BOTANICAL BIOLIPID COLLECTION
              </span>
              <button
                onClick={() => setIsManualExpanded(false)}
                className="text-stone-400 hover:text-white text-xs font-mono flex items-center gap-1 uppercase tracking-wider p-1"
                title="Restrânge"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Restrânge</span>
              </button>
            </div>
            <p className="font-sans text-xs sm:text-sm md:text-base leading-relaxed tracking-wide text-stone-100 uppercase font-semibold">
              COLECȚIA NOASTRĂ BOTANICĂ REVELEAZĂ O NOUĂ REALITATE PENTRU REGENERAREA ȘI DENSITATEA FOLICULARĂ.
              MINIMALISM PUR, BIO-COMPATIBILITATE TOTALĂ ȘI ZERO HORMONI SINTETICI.
              EXTRACTE VIRGINE DE RICIN, ROZMARIN BIO-FERMENTAT ȘI ESTERI DE JOJOBA CE RESTRUCTUREAZĂ
              SPRÂNCENELE, GENELE ȘI PĂRUL ÎN FORMA LOR NATURALĂ PERFECTĂ.
            </p>
          </div>

          {/* Bottom: Campaign Selector & Action CTAs */}
          <div className="w-full space-y-4 pt-4">
            
            {/* Campaign Buttons (01, 02, 03) */}
            <div className="flex flex-col gap-1.5 sm:gap-2">
              {CAMPAIGNS.map((item, idx) => {
                const isSelected = activeCampaignIndex === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveCampaignIndex(idx)}
                    className="group text-left flex items-center justify-between py-1 sm:py-2 transition-all cursor-pointer"
                  >
                    <div className="flex items-baseline gap-3 sm:gap-4">
                      <span
                        className={`font-sans font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter uppercase transition-colors ${
                          isSelected
                            ? 'text-white scale-y-105'
                            : 'text-stone-400/50 hover:text-stone-200'
                        }`}
                      >
                        CAMPAIGN
                      </span>
                      <span
                        className={`font-mono text-base sm:text-2xl md:text-3xl font-bold transition-colors ${
                          isSelected ? 'text-[#8DAFA0]' : 'text-stone-500/60'
                        }`}
                      >
                        ({item.id})
                      </span>
                      <span
                        className={`hidden md:inline font-mono text-xs uppercase tracking-wider transition-opacity ${
                          isSelected ? 'text-stone-300 opacity-100' : 'opacity-0'
                        }`}
                      >
                        — {item.title}
                      </span>
                    </div>

                    <span className="font-mono text-xs sm:text-sm font-semibold text-stone-300 group-hover:text-white transition-colors">
                      {item.price}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Campaign Detail Card on Mobile & Desktop */}
            <div className="p-3 sm:p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">
                  {currentCampaign.category}
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                  {currentCampaign.title}
                </h3>
                <p className="text-xs text-stone-300 font-sans mt-0.5 line-clamp-1 sm:line-clamp-none">
                  {currentCampaign.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <Link
                  href={`/product/${currentCampaign.slug}`}
                  className="min-h-[48px] px-6 py-3 rounded-lg bg-white hover:bg-stone-100 text-stone-950 font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl cursor-pointer"
                >
                  <span>Cumpără Acum</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/catalog"
                  className="min-h-[48px] px-4 py-3 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-white/20 font-sans text-xs uppercase tracking-wider flex items-center justify-center transition-all cursor-pointer"
                >
                  Toată Colecția
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
