'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Maximize2, Minimize2, Sparkles } from 'lucide-react';

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
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const [renderProgress, setRenderProgress] = useState(0);
  const [isManualExpanded, setIsManualExpanded] = useState(false);
  const [activeCampaignIndex, setActiveCampaignIndex] = useState(0);

  // Silky smooth lerp loop using requestAnimationFrame
  useEffect(() => {
    let animId: number;

    const updateLerp = () => {
      if (isManualExpanded) {
        // Fast, smooth spring to 1 when manually expanded
        const diff = 1 - currentProgress.current;
        if (Math.abs(diff) > 0.001) {
          currentProgress.current += diff * 0.12;
          setRenderProgress(currentProgress.current);
        } else {
          currentProgress.current = 1;
          setRenderProgress(1);
        }
      } else {
        // Smooth linear interpolation to target scroll progress
        const diff = targetProgress.current - currentProgress.current;
        if (Math.abs(diff) > 0.0005) {
          currentProgress.current += diff * 0.085;
          setRenderProgress(currentProgress.current);
        }
      }
      animId = requestAnimationFrame(updateLerp);
    };

    animId = requestAnimationFrame(updateLerp);

    const handleScroll = () => {
      if (!containerRef.current || isManualExpanded) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollRange = rect.height - window.innerHeight;
      if (scrollRange <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / scrollRange));
      targetProgress.current = p;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isManualExpanded]);

  const effectiveProgress = isManualExpanded ? 1 : renderProgress;

  // Mask size calculation:
  // Starts at ~50% (desktop) / 80% (mobile) and smoothly expands to ~650% (way past all edges)
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const initialBaseSize = isMobile ? 80 : 50;
  const expansionFactor = Math.pow(Math.min(1, effectiveProgress / 0.72), 1.6);
  const currentMaskSize = initialBaseSize + expansionFactor * 550;

  // Initial typography fades out as zoom starts
  const initialTypographyOpacity = Math.max(0, 1 - effectiveProgress * 2.8);

  // Expanded manifesto and campaigns fade in gracefully from 60% progress onwards
  const expandedElementsOpacity = Math.max(0, Math.min(1, (effectiveProgress - 0.62) / 0.28));

  const currentCampaign = CAMPAIGNS[activeCampaignIndex];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[270vh] bg-[#071513] text-white select-none"
    >
      {/* Sticky Fullscreen Canvas: Always exactly 100dvh, NEVER exits or cuts off */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden bg-[#071513]">
        
        {/* ──────── 1. THE CINEMATIC VIDEO (Masked exclusively by user's eyebrow + eye mask, no image overlay) ──────── */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden transition-[mask] duration-200"
          style={{
            WebkitMaskImage: effectiveProgress >= 0.75 ? 'none' : 'url(/images/hero-user-mask.png)',
            WebkitMaskSize: `${currentMaskSize}% auto`,
            WebkitMaskPosition: 'center center',
            WebkitMaskRepeat: 'no-repeat',
            maskImage: effectiveProgress >= 0.75 ? 'none' : 'url(/images/hero-user-mask.png)',
            maskSize: `${currentMaskSize}% auto`,
            maskPosition: 'center center',
            maskRepeat: 'no-repeat',
            willChange: 'mask-size, -webkit-mask-size',
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105"
          >
            <source src="/videos/evergreen-isle-hero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* ──────── 2. AMBIENT DARK LUXURY SCRIM (Ensures 100% Legibility over Video when expanded) ──────── */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-black/90 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: expandedElementsOpacity,
          }}
        />

        {/* ──────── 4. INITIAL UNEXPANDED EDITORIAL OVERLAY (Fades smoothly on scroll) ──────── */}
        <div
          className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-4 sm:p-8 pt-24 sm:pt-28 pb-6 sm:pb-8 transition-opacity duration-200"
          style={{
            opacity: initialTypographyOpacity,
            pointerEvents: initialTypographyOpacity > 0.1 ? 'auto' : 'none',
          }}
        >
          {/* Top Brand Title */}
          <div className="flex flex-col items-start max-w-full">
            <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter uppercase text-white leading-[0.88] scale-y-105 origin-left drop-shadow-md">
              EVERGREEN
            </h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#8DAFA0]">
              <span className="font-bold">BOTANICAL BIOLIPID</span>
              <span className="opacity-60">•</span>
              <span>EYEBROWS, LASHES &amp; ROOTS</span>
            </div>
          </div>

          {/* Bottom Bar: Quick Expand + FILM Indicator */}
          <div className="flex items-end justify-between w-full">
            {/* Quick Expand Button */}
            <div className="flex flex-col items-start gap-1.5">
              <button
                onClick={() => setIsManualExpanded(true)}
                className="min-h-[44px] px-5 py-2.5 rounded-full bg-white text-stone-950 hover:bg-stone-100 text-[11px] font-mono font-bold tracking-wider uppercase flex items-center gap-2 shadow-2xl active:scale-95 touch-manipulation cursor-pointer transition-transform"
              >
                <Maximize2 className="w-3.5 h-3.5 text-stone-900" />
                <span>EXTINDE FILMUL</span>
              </button>
              <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest pl-1">
                ↓ Scroll pentru a deschide
              </span>
            </div>

            {/* Bottom Right: Bold FILM Label */}
            <div className="text-right">
              <span className="font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter uppercase text-white leading-[0.85] block scale-y-105 drop-shadow-md">
                FILM
              </span>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center justify-end gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                BOTANICAL 4K
              </span>
            </div>
          </div>
        </div>

        {/* ──────── 5. EXPANDED EDITORIAL OVERLAY (Manifesto & 3 Campaigns) ──────── */}
        <div
          className="absolute inset-0 z-30 flex flex-col justify-between p-4 sm:p-8 pt-24 sm:pt-28 pb-8 text-white transition-opacity duration-300"
          style={{
            opacity: expandedElementsOpacity,
            pointerEvents: expandedElementsOpacity > 0.4 ? 'auto' : 'none',
          }}
        >
          {/* Top: Editorial Manifesto Box */}
          <div className="max-w-2xl bg-black/50 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/15 self-start shadow-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#8DAFA0] font-bold">
                SS2026 BOTANICAL BIOLIPID COLLECTION
              </span>
              {isManualExpanded && (
                <button
                  onClick={() => setIsManualExpanded(false)}
                  className="text-stone-300 hover:text-white text-xs font-mono flex items-center gap-1 uppercase tracking-wider p-1 cursor-pointer"
                  title="Restrânge"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Restrânge</span>
                </button>
              )}
            </div>
            <p className="font-sans text-xs sm:text-sm md:text-base leading-relaxed tracking-wide text-stone-100 uppercase font-semibold">
              COLECȚIA NOASTRĂ BOTANICĂ REVELEAZĂ O NOUĂ REALITATE PENTRU REGENERAREA ȘI DENSITATEA FOLICULARĂ.
              MINIMALISM PUR, BIO-COMPATIBILITATE TOTALĂ ȘI ZERO HORMONI SINTETICI.
              EXTRACTE VIRGINE DE RICIN, ROZMARIN BIO-FERMENTAT ȘI ESTERI DE JOJOBA CE RESTRUCTUREAZĂ
              SPRÂNCENELE, GENELE ȘI PĂRUL ÎN FORMA LOR NATURALĂ PERFECTĂ.
            </p>
          </div>

          {/* Bottom: Campaign Selector & Direct Product Action Card */}
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

            {/* Active Campaign Detail Card */}
            <div className="p-3 sm:p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xl">
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
