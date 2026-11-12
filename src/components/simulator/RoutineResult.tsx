'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  Calendar,
  Clock,
  Droplets,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { DiagnosticQuizAnswers, Product } from '@/lib/types';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { useCart } from '@/lib/store/cart-context';

interface RoutineResultProps {
  answers: DiagnosticQuizAnswers;
  onReset: () => void;
}

export default function RoutineResult({ answers, onReset }: RoutineResultProps) {
  const router = useRouter();
  const { addItem, applyCoupon, openCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Diagnostic algorithm calculation
  let primaryProductId = 'p1111111-1111-1111-1111-111111111111'; // Evergrow 3ml
  let secondaryProductId = 'p3333333-3333-3333-3333-333333333333'; // Dermaroller 0.25mm
  let routineTitle = 'Protocol de Reactivare Foliculară & Ancorare Lipidică';
  let dailyFrequency = 1;
  let targetWeeks = 12;
  let estimatedLifespan = 90;
  let discountCode = 'BROWVIP15';
  let discountPercent = 15;

  if (answers.density === 'overplucked' || answers.history === 'waxed_often') {
    primaryProductId = 'p6666666-6666-6666-6666-666666666666'; // Kit Atelier Complet
    secondaryProductId = '';
    routineTitle = 'Protocol Intensiv de Reconstrucție Arhitecturală EVERGREEN & ISLE';
    targetWeeks = 16;
    discountCode = 'EVERGREEN20';
    discountPercent = 20;
  } else if (answers.density === 'thinning') {
    primaryProductId = 'p2222222-2222-2222-2222-222222222222'; // Night intensive elixir
    secondaryProductId = 'p7777777-7777-7777-7777-777777777777'; // Cleansing oil
    routineTitle = 'Protocol Nocturn de Regenerare Anti-Fragilizare cu Tri-Peptide';
    targetWeeks = 12;
  } else if (answers.history === 'laminated') {
    primaryProductId = 'p5555555-5555-5555-5555-555555555555'; // Duo pack 6 months
    routineTitle = 'Cura Prelungită de Re-Lipidare după Agresiune Chimică';
    targetWeeks = 24;
    estimatedLifespan = 180;
  }

  const primaryProduct = INITIAL_PRODUCTS.find((p) => p.id === primaryProductId)!;
  const secondaryProduct = secondaryProductId
    ? INITIAL_PRODUCTS.find((p) => p.id === secondaryProductId)
    : null;

  const handleAddBundleToCart = () => {
    addItem(primaryProduct, 1);
    if (secondaryProduct) {
      addItem(secondaryProduct, 1);
    }
    applyCoupon(discountCode);
    setIsAdded(true);
    setTimeout(() => {
      openCart();
    }, 400);
  };

  const totalPrice = primaryProduct.price + (secondaryProduct ? secondaryProduct.price : 0);
  const discountedPrice = totalPrice * (1 - discountPercent / 100);

  return (
    <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-gold-500/40 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 animate-in fade-in duration-300 transition-colors">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-700 dark:text-gold-400 text-xs font-mono mb-2 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIAGNOSTIC DERMATO-BOTANIC FINALIZAT</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950 dark:text-white">
            {routineTitle}
          </h2>
          <p className="text-xs text-stone-600 dark:text-zinc-400 mt-1 max-w-xl">
            Pe baza profilului tău (sensibilitate {answers.sensitivity}, profil {answers.density}), atelierul EVERGREEN &amp; ISLE a calculat dozajul ideal pentru rezultate maxime.
          </p>
        </div>

        <button
          onClick={onReset}
          className="text-xs text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white flex items-center gap-1.5 self-start sm:self-center font-mono py-2 px-3 rounded-lg border border-stone-300 dark:border-zinc-800 hover:border-stone-400 dark:hover:border-zinc-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reia evaluarea</span>
        </button>
      </div>

      {/* 3 Metric Cards: Dosage, Longevity, Target Weeks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-stone-50 dark:bg-obsidian-950 p-5 rounded-2xl border border-stone-200 dark:border-zinc-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-600 dark:text-gold-400">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase text-stone-500 dark:text-zinc-400">Dozaj Recomandat</div>
            <div className="text-base font-serif font-bold text-stone-900 dark:text-white">
              {dailyFrequency} Aplicare / Seară
            </div>
            <div className="text-[10px] text-stone-500 dark:text-zinc-500">1 micro-picătură per arcadă</div>
          </div>
        </div>

        <div className="bg-stone-50 dark:bg-obsidian-950 p-5 rounded-2xl border border-stone-200 dark:border-zinc-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-600 dark:text-gold-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase text-stone-500 dark:text-zinc-400">Durată Estimată Flacon</div>
            <div className="text-base font-serif font-bold text-stone-900 dark:text-white">
              ~{estimatedLifespan} Zile
            </div>
            <div className="text-[10px] text-stone-500 dark:text-zinc-500">Formulă lipidică concentrată</div>
          </div>
        </div>

        <div className="bg-stone-50 dark:bg-obsidian-950 p-5 rounded-2xl border border-stone-200 dark:border-zinc-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-600 dark:text-gold-400">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase text-stone-500 dark:text-zinc-400">Ciclu Plinătate Maximă</div>
            <div className="text-base font-serif font-bold text-stone-900 dark:text-white">
              {targetWeeks} Săptămâni
            </div>
            <div className="text-[10px] text-stone-500 dark:text-zinc-500">Rată clinică succes 94%</div>
          </div>
        </div>
      </div>

      {/* Routine Products Bundle Card */}
      <div className="bg-stone-50 dark:bg-obsidian-950 border border-gold-500/40 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-gold-500 text-obsidian-950 font-mono text-[10px] font-bold uppercase">
                Kit Recomandat Personalizat
              </span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                Discount Automat: -{discountPercent}% (Cod: {discountCode})
              </span>
            </div>

            {/* Products summary row */}
            <div className="flex flex-col sm:flex-row gap-4">
              
              {/* Primary Product */}
              <div className="flex items-center gap-3 bg-white dark:bg-zinc-900/60 p-3 rounded-xl border border-stone-200 dark:border-zinc-800 flex-1 shadow-sm">
                <div className="w-14 h-14 relative rounded-lg overflow-hidden bg-stone-100 dark:bg-zinc-950 flex-shrink-0 border border-stone-200 dark:border-zinc-800">
                  <Image
                    src={primaryProduct.images[0] || '/images/mag-evergrow-bottle.png'}
                    alt={primaryProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-serif font-bold text-stone-900 dark:text-white line-clamp-1">
                    {primaryProduct.name}
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-zinc-400 font-mono">{primaryProduct.volume}</div>
                  <div className="text-xs font-serif font-bold text-gold-600 dark:text-gold-400">
                    {primaryProduct.price.toFixed(2)} RON
                  </div>
                </div>
              </div>

              {/* Secondary Product if present */}
              {secondaryProduct && (
                <div className="flex items-center gap-3 bg-white dark:bg-zinc-900/60 p-3 rounded-xl border border-stone-200 dark:border-zinc-800 flex-1 shadow-sm">
                  <div className="w-14 h-14 relative rounded-lg overflow-hidden bg-stone-100 dark:bg-zinc-950 flex-shrink-0 border border-stone-200 dark:border-zinc-800">
                    <Image
                      src={secondaryProduct.images[0] || '/images/mag-evergrow-bottle.png'}
                      alt={secondaryProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-serif font-bold text-stone-900 dark:text-white line-clamp-1">
                      {secondaryProduct.name}
                    </div>
                    <div className="text-[11px] text-stone-500 dark:text-zinc-400 font-mono">{secondaryProduct.volume}</div>
                    <div className="text-xs font-serif font-bold text-gold-600 dark:text-gold-400">
                      {secondaryProduct.price.toFixed(2)} RON
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-1 text-xs text-stone-700 dark:text-zinc-400 font-normal">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Protocol 100% sigur pentru ochi sensibili (fără bimatoprost)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Include ghidul tipărit de aplicare EVERGREEN &amp; ISLE</span>
              </div>
            </div>
          </div>

          {/* Pricing & 1-Click Action */}
          <div className="lg:border-l lg:border-stone-200 dark:lg:border-zinc-800 lg:pl-8 flex flex-col justify-between items-start lg:items-end min-w-[240px]">
            <div>
              <div className="text-xs text-stone-500 dark:text-zinc-400">Preț normal pachet:</div>
              <div className="text-sm font-mono text-stone-400 dark:text-zinc-500 line-through">
                {totalPrice.toFixed(2)} RON
              </div>
              <div className="text-xs text-gold-600 dark:text-gold-400 font-mono mt-1 font-semibold">Preț cu discount ({discountPercent}%):</div>
              <div className="text-2xl font-serif font-bold text-stone-950 dark:text-white">
                {discountedPrice.toFixed(2)} RON
              </div>
              <span className="text-[10px] text-stone-500 dark:text-zinc-500 block">TVA inclus • Livrare Gratuită</span>
            </div>

            <button
              onClick={handleAddBundleToCart}
              className="mt-5 w-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-xl shadow-gold-500/20 flex items-center justify-center gap-2 group"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Adaugă Rutina în Coș</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
