'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, Sparkles, Clock, Gift } from 'lucide-react';
import { useCart } from '@/lib/store/cart-context';
import { useRouter } from 'next/navigation';

export default function MarketingPopup() {
  const router = useRouter();
  const { applyCoupon, openCart } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState(58); // Starts around 0:58 like in the reference photo
  const [hasScrolled, setHasScrolled] = useState(false);

  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Scroll-trigger logic: triggers a few seconds after the user starts scrolling
  useEffect(() => {
    // Check if user already dismissed or claimed in this session
    const dismissed = sessionStorage.getItem('evergreen_bf_popup_dismissed');
    const claimed = sessionStorage.getItem('evergreen_bf_popup_claimed');

    if (dismissed === 'true' || claimed === 'true') {
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // When user has scrolled past 150px and hasn't triggered yet
      if (scrollY > 150 && !hasScrolled) {
        setHasScrolled(true);

        // Activate pop-up 2.5 seconds after scrolling
        scrollTimerRef.current = setTimeout(() => {
          setIsOpen(true);
        }, 2500);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Allow manual trigger from anywhere (e.g. testing or banner click)
    const handleManualOpen = () => {
      setIsOpen(true);
    };
    window.addEventListener('open-marketing-popup', handleManualOpen);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('open-marketing-popup', handleManualOpen);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [hasScrolled]);

  // 2. Countdown timer ticking down (e.g. 0:58 -> 0:00)
  useEffect(() => {
    if (!isOpen) return;

    countdownIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('evergreen_bf_popup_dismissed', 'true');
  };

  const handleClaimOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    // Automatically apply the 50 LEI / 20% discount coupon to the cart
    applyCoupon('BLACKFRIDAY50');
    sessionStorage.setItem('evergreen_bf_popup_claimed', 'true');
    sessionStorage.setItem('evergreen_subscriber_email', email);

    // Switch to Unlocked state (Image 2)
    setIsUnlocked(true);
  };

  const handleShopNow = () => {
    setIsOpen(false);
    openCart();
    router.push('/catalog');
  };

  if (!isOpen) return null;

  // Format seconds into 0:XX
  const formattedTime = `0:${timeLeft < 10 ? '0' : ''}${timeLeft}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* Main Pop-up Card */}
      <div className="relative w-full max-w-[420px] bg-black border border-stone-800/80 rounded-3xl p-6 sm:p-8 pt-10 text-center shadow-2xl text-white z-10 animate-in zoom-in-95 duration-200">
        
        {/* Top-Left Close Button (exact position matching the reference) */}
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-stone-400 hover:text-white transition-colors active:scale-95 touch-manipulation cursor-pointer rounded-full"
          aria-label="Închide fereastra"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Logo in refined serif */}
        <div className="flex flex-col items-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.16em] text-white">
            EVERGREEN &amp; ISLE
          </h2>
          <span className="text-[8.5px] uppercase tracking-[0.28em] text-[#8DAFA0] font-sans font-medium mt-0.5">
            NATURAL SKINCARE
          </span>
        </div>

        {/* Countdown Box (Dark Taupe/Bronze Box with Glowing Digital Digits) */}
        <div className="mt-5 flex justify-center">
          <div className="w-28 sm:w-32 py-2.5 rounded-xl bg-[#4A4039] text-white flex items-center justify-center shadow-inner">
            <span className="font-mono text-2xl sm:text-3xl font-bold tracking-wider">
              {formattedTime}
            </span>
          </div>
        </div>

        {/* Pill Badge: BLACK FRIDAY SALE */}
        <div className="mt-3.5 flex justify-center">
          <span className="px-4 py-1.5 rounded-full bg-[#4A4039] text-stone-200 text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] uppercase">
            BLACK FRIDAY SALE
          </span>
        </div>

        {/* Dynamic Content: Step 1 (Form) vs Step 2 (Unlocked) */}
        {!isUnlocked ? (
          /* ──────── STEP 1: INITIAL OFFER & EMAIL INPUT ──────── */
          <div className="mt-5 space-y-5">
            <div>
              <span className="font-serif text-2xl sm:text-3xl text-stone-100 font-normal block leading-tight">
                You&apos;ve Got
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight mt-1">
                50 Lei Off + Up to <br />
                <span className="font-serif italic font-medium">3 FREE Gifts</span>
              </h3>
              <p className="text-[11px] text-stone-400 mt-2 font-sans">
                (50 RON Reducere Imediată + Set 3 Accesorii Botanice Cadou)
              </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleClaimOffer} className="space-y-3 pt-1">
              <div>
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white text-stone-900 placeholder-stone-400 rounded-lg px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 font-sans shadow-inner text-center"
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-[48px] py-3.5 px-6 rounded-lg bg-[#FAF5EE] hover:bg-white text-stone-950 font-sans font-bold text-sm sm:text-base tracking-wide shadow-lg active:scale-95 touch-manipulation transition-all cursor-pointer"
              >
                Claim Offer
              </button>
            </form>

            <p className="text-[10px] text-stone-500 font-sans">
              Ofertă valabilă pentru comenzi de peste 150 RON. Fără spam.
            </p>
          </div>
        ) : (
          /* ──────── STEP 2: UNLOCKED STATE (Image 2) ──────── */
          <div className="mt-5 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className="font-serif text-2xl sm:text-3xl text-stone-100 font-normal block leading-tight">
                You&apos;ve Unlocked
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight mt-1">
                50 Lei Off + Up to 3 FREE Gifts
              </h3>
              
              <div className="mt-3 p-3 rounded-xl bg-teal-950/60 border border-teal-700/40 text-left flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-stone-200">
                  <span className="font-bold text-emerald-300 block">Cupon BLACKFRIDAY50 activat!</span>
                  <span>Reducerea este aplicată automat în coș la finalizarea comenzii.</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 pt-3 font-sans font-medium">
                Discount is automatically applied at checkout.
              </p>
            </div>

            {/* Shop Now CTA */}
            <div className="pt-1">
              <button
                onClick={handleShopNow}
                className="w-full min-h-[48px] py-3.5 px-6 rounded-lg bg-[#FAF5EE] hover:bg-white text-stone-950 font-sans font-bold text-sm sm:text-base tracking-wide shadow-lg active:scale-95 touch-manipulation transition-all cursor-pointer"
              >
                Shop now
              </button>
            </div>

            <p className="text-[10px] text-stone-500 font-sans">
              Cadourile gratuite (periuță bambus + ghid ritual) sunt adăugate automat în pachet.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
