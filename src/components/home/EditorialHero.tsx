'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Maximize2, Minimize2, ChevronDown } from 'lucide-react';

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
  const maskRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const initialOverlayRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const expandedOverlayRef = useRef<HTMLDivElement>(null);

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const touchStartY = useRef(0);
  const arrivalAtTopTime = useRef(0);
  const lastScrollYRef = useRef(0);

  const [activeCampaignIndex, setActiveCampaignIndex] = useState(0);
  const [isExpandedState, setIsExpandedState] = useState(false);

  useEffect(() => {
    let animId: number;
    let isRunning = true;

    // Check if loaded with existing scroll position down the page
    if (typeof window !== 'undefined' && window.scrollY > 50) {
      targetProgress.current = 1;
      currentProgress.current = 1;
    }

    // GPU-accelerated 60/120 FPS transform loop (ZERO React re-renders while scrolling)
    const updateMotion = () => {
      if (!isRunning) return;

      const diff = targetProgress.current - currentProgress.current;

      // Snappy & fluid lerp damping
      if (Math.abs(diff) > 0.0002) {
        currentProgress.current += diff * 0.11;
      } else {
        currentProgress.current = targetProgress.current;
      }

      const p = currentProgress.current;

      // Update state flag only when crossing threshold (for button text toggle)
      const expandedNow = p > 0.6;
      setIsExpandedState((prev) => (prev !== expandedNow ? expandedNow : prev));

      // 1. GPU Scale Calculation:
      // The mask container scales from 1.0 up to ~9.0.
      // The video inside counter-scales by (1 / scale) so the video remains locked full-screen!
      // This uses 100% compositor matrix transforms with ZERO CPU mask re-rasterization.
      const t = Math.min(1, Math.max(0, p / 0.72));
      const easeT = Math.pow(t, 1.7);
      const scale = 1.0 + easeT * 8.5;
      const invScale = 1 / scale;

      if (maskRef.current) {
        maskRef.current.style.transform = `translate3d(-50%, -50%, 0) scale3d(${scale}, ${scale}, 1)`;
        
        // Remove mask once completely off-screen to save composite pass
        if (p >= 0.76) {
          if (maskRef.current.style.webkitMaskImage !== 'none') {
            maskRef.current.style.webkitMaskImage = 'none';
            maskRef.current.style.maskImage = 'none';
          }
        } else {
          if (maskRef.current.style.webkitMaskImage !== 'url("/images/hero-user-mask.png")') {
            maskRef.current.style.webkitMaskImage = 'url(/images/hero-user-mask.png)';
            maskRef.current.style.maskImage = 'url(/images/hero-user-mask.png)';
          }
        }
      }

      if (videoRef.current) {
        videoRef.current.style.transform = `translate3d(-50%, -50%, 0) scale3d(${invScale}, ${invScale}, 1)`;
      }

      // 2. Initial Typography Opacity & Subtle Float-Up (Dissolves between 0 and 0.28)
      if (initialOverlayRef.current) {
        const initT = Math.min(1, Math.max(0, p / 0.28));
        const initOpacity = Math.max(0, 1 - initT);
        initialOverlayRef.current.style.opacity = String(initOpacity);
        initialOverlayRef.current.style.transform = `translate3d(0, ${-initT * 30}px, 0)`;
        initialOverlayRef.current.style.pointerEvents = initOpacity > 0.08 ? 'auto' : 'none';
      }

      // 3. Dark Scrim & Expanded Editorial Manifesto (Fades in between 0.55 and 0.88)
      const expT = Math.min(1, Math.max(0, (p - 0.55) / 0.3));
      if (scrimRef.current) {
        scrimRef.current.style.opacity = String(expT);
      }
      if (expandedOverlayRef.current) {
        expandedOverlayRef.current.style.opacity = String(expT);
        expandedOverlayRef.current.style.transform = `translate3d(0, ${(1 - expT) * 20}px, 0)`;
        expandedOverlayRef.current.style.pointerEvents = expT > 0.5 ? 'auto' : 'none';
      }

      animId = requestAnimationFrame(updateMotion);
    };

    animId = requestAnimationFrame(updateMotion);

    // Track arrival at top to prevent accidental mask collapse during fast scroll deceleration
    const handleScrollTracking = () => {
      const currentY = window.scrollY;
      if (currentY <= 2 && lastScrollYRef.current > 15) {
        arrivalAtTopTime.current = performance.now();
      }
      lastScrollYRef.current = currentY;
    };
    window.addEventListener('scroll', handleScrollTracking, { passive: true });

    // ──────── SCROLL-GATED INTERCEPTION LOGIC ────────
    // When at the top of the page, scrolling gestures ONLY expand the mask.
    // The page does NOT move down until targetProgress reaches 1.0!

    const handleWheel = (e: WheelEvent) => {
      const isAtTop = window.scrollY <= 2;

      if (!isAtTop) return;

      if (targetProgress.current < 0.999) {
        // Not yet fully expanded: intercept all scroll gestures
        if (e.deltaY > 0) {
          // Scrolling down -> expand mask
          e.preventDefault();
          targetProgress.current = Math.min(1, targetProgress.current + e.deltaY * 0.0018);
        } else if (e.deltaY < 0 && targetProgress.current > 0) {
          // Scrolling up -> shrink mask
          e.preventDefault();
          targetProgress.current = Math.max(0, targetProgress.current + e.deltaY * 0.0018);
        }
        // If e.deltaY < 0 and targetProgress is 0: bubbles to ScrollAmortization to cushion top
      } else {
        // Fully expanded (>= 0.999)
        if (e.deltaY < 0 && window.scrollY <= 2) {
          // If we just arrived at the top from a fast scroll up (< 500ms ago),
          // DO NOT immediately collapse the mask; let ScrollAmortization cushion the kinetic energy.
          if (performance.now() - arrivalAtTopTime.current < 500) {
            return;
          }
          // Intentional deliberate scroll up while stationary at top -> reverse/shrink mask back
          e.preventDefault();
          targetProgress.current = Math.max(0, targetProgress.current + e.deltaY * 0.0018);
        }
        // If e.deltaY > 0, do NOT call preventDefault(): allow native page scroll down!
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const isAtTop = window.scrollY <= 2;
      if (!isAtTop || e.touches.length === 0) return;

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY.current - currentY; // positive when swiping up (scrolling down)
      touchStartY.current = currentY;

      if (targetProgress.current < 0.999) {
        // Intercept touch swipe while mask is expanding
        if (deltaY > 0 || (deltaY < 0 && targetProgress.current > 0)) {
          e.preventDefault();
          targetProgress.current = Math.min(1, Math.max(0, targetProgress.current + deltaY * 0.004));
        }
      } else {
        // Fully expanded: if swiping down at top, allow shrinking back after arrival settling
        if (deltaY < 0 && window.scrollY <= 2) {
          if (performance.now() - arrivalAtTopTime.current < 500) {
            return;
          }
          e.preventDefault();
          targetProgress.current = Math.max(0, targetProgress.current + deltaY * 0.004);
        }
        // deltaY > 0 naturally scrolls down into the website
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const isAtTop = window.scrollY <= 2;
      if (!isAtTop) return;

      if (targetProgress.current < 0.999) {
        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
          e.preventDefault();
          targetProgress.current = Math.min(1, targetProgress.current + 0.35);
        } else if (e.key === 'ArrowUp' && targetProgress.current > 0) {
          e.preventDefault();
          targetProgress.current = Math.max(0, targetProgress.current - 0.35);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScrollTracking);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleToggleExpand = () => {
    if (isExpandedState) {
      targetProgress.current = 0;
      if (window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      targetProgress.current = 1;
    }
  };

  const handleScrollToContent = () => {
    targetProgress.current = 1;
    if (containerRef.current) {
      const next = containerRef.current.nextElementSibling;
      if (next) {
        next.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }
    }
  };

  const currentCampaign = CAMPAIGNS[activeCampaignIndex];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-[#071513] text-white select-none"
    >
      {/* ──────── 1. GPU-ACCELERATED MASKED VIDEO CONTAINER ──────── */}
      {/* 
        Container is centered and proportioned to the mask.
        Mask is 100% 100% static, so the GPU never re-rasters.
        Scaling container up while counter-scaling video inside creates a pure GPU iris zoom!
      */}
      <div
        ref={maskRef}
        className="absolute left-1/2 top-1/2 w-[min(88vw,560px)] aspect-[772/454] overflow-hidden pointer-events-none"
        style={{
          transform: 'translate3d(-50%, -50%, 0) scale3d(1, 1, 1)',
          transformOrigin: 'center center',
          WebkitMaskImage: 'url(/images/hero-user-mask.png)',
          WebkitMaskSize: '100% 100%',
          WebkitMaskPosition: 'center center',
          WebkitMaskRepeat: 'no-repeat',
          maskImage: 'url(/images/hero-user-mask.png)',
          maskSize: '100% 100%',
          maskPosition: 'center center',
          maskRepeat: 'no-repeat',
          willChange: 'transform',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-1/2 top-1/2 w-[100vw] h-[100dvh] min-w-[100vw] min-h-[100dvh] max-w-none max-h-none object-cover"
          style={{
            transform: 'translate3d(-50%, -50%, 0) scale3d(1, 1, 1)',
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
        >
          <source src="/videos/evergreen-isle-hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ──────── 2. AMBIENT DARK LUXURY SCRIM (Ensures 100% text legibility over full-bleed video) ──────── */}
      <div
        ref={scrimRef}
        className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-black/90 pointer-events-none"
        style={{ opacity: 0, willChange: 'opacity' }}
      />

      {/* ──────── 3. INITIAL UNEXPANDED EDITORIAL OVERLAY ──────── */}
      <div
        ref={initialOverlayRef}
        className="absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-8 pt-24 sm:pt-28 pb-6 sm:pb-8"
        style={{ willChange: 'opacity, transform' }}
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
              onClick={handleToggleExpand}
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

      {/* ──────── 4. EXPANDED EDITORIAL OVERLAY (Manifesto & 3 Campaigns) ──────── */}
      <div
        ref={expandedOverlayRef}
        className="absolute inset-0 z-30 flex flex-col justify-between p-4 sm:p-8 pt-24 sm:pt-28 pb-8 text-white pointer-events-none"
        style={{ opacity: 0, willChange: 'opacity, transform' }}
      >
        {/* Top: Editorial Manifesto Box */}
        <div className="max-w-2xl bg-black/50 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/15 self-start shadow-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#8DAFA0] font-bold">
              SS2026 BOTANICAL BIOLIPID COLLECTION
            </span>
            <button
              onClick={handleToggleExpand}
              className="text-stone-300 hover:text-white text-xs font-mono flex items-center gap-1 uppercase tracking-wider p-1 cursor-pointer"
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

        {/* Bottom: Campaign Selector & Direct Product Action Card */}
        <div className="w-full space-y-3 pt-2">
          {/* Campaign Buttons (01, 02, 03) */}
          <div className="flex flex-col gap-1 sm:gap-1.5">
            {CAMPAIGNS.map((item, idx) => {
              const isSelected = activeCampaignIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveCampaignIndex(idx)}
                  className="group text-left flex items-center justify-between py-1 sm:py-1.5 transition-all cursor-pointer"
                >
                  <div className="flex items-baseline gap-3 sm:gap-4">
                    <span
                      className={`font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tighter uppercase transition-colors ${
                        isSelected
                          ? 'text-white scale-y-105'
                          : 'text-stone-400/50 hover:text-stone-200'
                      }`}
                    >
                      CAMPAIGN
                    </span>
                    <span
                      className={`font-mono text-base sm:text-xl md:text-2xl font-bold transition-colors ${
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
          <div className="p-3 sm:p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xl">
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
                className="min-h-[44px] px-5 py-2.5 rounded-lg bg-white hover:bg-stone-100 text-stone-950 font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl cursor-pointer"
              >
                <span>Cumpără Acum</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={handleScrollToContent}
                className="min-h-[44px] px-4 py-2.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-white/20 font-sans text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Continuă</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
