'use client';

import React, { useState } from 'react';
import { Calendar, CheckCircle2, Sparkles, AlertCircle, Clock, Feather, Microscope, Compass } from 'lucide-react';

interface StageInfo {
  week: number;
  label: string;
  phaseName: string;
  densityScore: number;
  hairCountEstimate: number;
  description: string;
  milestones: string[];
  scientificMechanism: string;
  visualOpacity: number;
}

const STAGES: StageInfo[] = [
  {
    week: 2,
    label: 'Săptămâna 2',
    phaseName: 'Reactivare Foliculară & Ancorare Lipidică',
    densityScore: 35,
    hairCountEstimate: 180,
    description:
      'Acidul ricinoleic pătrunde în teaca foliculară. Sebumul oxidat este dizolvat, iar căderea firelor fragile la demachiere este redusă cu până la 65%.',
    milestones: [
      'Stoparea ruperii mecanice a genelor și sprâncenelor',
      'Hidratarea profundă a pielii supraorbitale',
      'Stimularea microcirculației prin acțiunea rozmarinului',
    ],
    scientificMechanism:
      'Penetrarea lipidelor Omega-9 în papila dermică întărește joncțiunea dermo-epidermică.',
    visualOpacity: 0.45,
  },
  {
    week: 4,
    label: 'Săptămâna 4',
    phaseName: 'Trezire Anagenă (Sinteză de Keratină)',
    densityScore: 58,
    hairCountEstimate: 290,
    description:
      'Apar primele fire fine noi (vellus hair) în golurile lăsate de pensat. Rădăcinile primesc aflux crescut de micronutrienți.',
    milestones: [
      'Puncte negre fine de regenerare vizibile cu lupa cosmetică',
      'Textură catifelată și fir mai mătăsos',
      'Începutul umplerii golurilor din colțul intern',
    ],
    scientificMechanism:
      'Faza de creștere anagenă este prelungită; celulele stem din teacă devin active mitotic.',
    visualOpacity: 0.65,
  },
  {
    week: 8,
    label: 'Săptămâna 8',
    phaseName: 'Densificare Structurală & Îngroșare',
    densityScore: 82,
    hairCountEstimate: 420,
    description:
      'Firele noi își definitivează grosimea și pigmentarea naturală. Golurile vizibile sunt acoperite în proporție de peste 75%.',
    milestones: [
      'Diametrul firului crește cu până la 42%',
      'Arcada capătă contur natural definit',
      'Nevoia de creion de sprâncene se reduce substanțial',
    ],
    scientificMechanism:
      'Vitamina E și fitosterolii protejează keratina tânără împotriva fragmentării oxidatice.',
    visualOpacity: 0.88,
  },
  {
    week: 12,
    label: 'Săptămâna 12',
    phaseName: 'Plinătate Arhitecturală Maximă',
    densityScore: 100,
    hairCountEstimate: 520,
    description:
      'Ciclul complet de transformare este atins. Sprâncenele au densitate bogată, strălucire sănătoasă și o structură simetrică robustă.',
    milestones: [
      'Arcuri pline și arcuite natural în stil "Feather Brow"',
      'Fire puternice rezistente la periaj și vânt',
      'Rezultat de durată prin întreținere de doar 2-3 ori pe săptămână',
    ],
    scientificMechanism:
      'Matricea foliculară este complet stabilizată, menținând firele în faza telogenă fără cădere prematură.',
    visualOpacity: 1.0,
  },
];

export default function VisualTimelineSlider() {
  const [activeStageIndex, setActiveStageIndex] = useState(2); // default week 8
  const activeStage = STAGES[activeStageIndex];

  return (
    <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-gold-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl transition-all">
      
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-stone-200 dark:border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-700 dark:text-gold-400 text-[10px] sm:text-xs font-mono mb-2 font-semibold">
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span>SIMULATOR VIZUAL PE SĂPTĂMÂNI</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-950 dark:text-white">
            Evoluția Densității Foliculare în Timp
          </h3>
          <p className="text-xs text-stone-600 dark:text-zinc-400 mt-1">
            Glisați sliderul pentru a vizualiza transformarea biologică pe parcursul curei de 90-120 de zile.
          </p>
        </div>

        <div className="bg-stone-50 dark:bg-obsidian-950 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-stone-200 dark:border-zinc-800 flex items-center gap-2.5 sm:gap-3 shadow-inner self-start sm:self-auto">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gold-600 dark:text-gold-400 flex-shrink-0" />
          <div>
            <div className="text-[9px] sm:text-[10px] uppercase font-mono text-stone-500 dark:text-zinc-400">Etapa Selectată</div>
            <div className="text-xs sm:text-sm font-serif font-bold text-stone-900 dark:text-white">
              {activeStage.label} ({activeStage.phaseName})
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Visual Graphic Comparison (Before vs Current Week) */}
      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* State 0: Initial Sparse State (Week 0) */}
        <div className="relative rounded-2xl bg-stone-50 dark:bg-obsidian-950 border border-stone-200 dark:border-zinc-800 p-6 flex flex-col justify-between overflow-hidden shadow-inner">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase text-stone-700 dark:text-zinc-400 bg-white dark:bg-zinc-800/80 px-2.5 py-1 rounded border border-stone-200 dark:border-zinc-700/60 flex items-center gap-1.5 font-semibold">
              <Compass className="w-3 h-3 text-stone-500" />
              <span>Ziua 0 (Înainte de Tratament)</span>
            </span>
            <span className="text-xs font-mono text-red-500 dark:text-red-400 font-bold">Densitate: ~20%</span>
          </div>

          {/* SVG Visual Representation of Sparse Brow */}
          <div className="py-6 flex items-center justify-center">
            <svg viewBox="0 0 320 80" className="w-full max-w-xs h-20 text-stone-500 dark:text-zinc-600">
              <path
                d="M 30,55 Q 160,25 290,45"
                fill="none"
                stroke="#A8A29E"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.6"
              />
              {[...Array(28)].map((_, i) => {
                const x = 40 + i * 9 + (i % 3) * 2;
                const baseY = 52 - Math.sin((i / 28) * Math.PI) * 20;
                const angle = 25 - i * 0.8;
                return (
                  <path
                    key={i}
                    d={`M ${x},${baseY} Q ${x + 4},${baseY - 12} ${x + angle * 0.4},${baseY - 18}`}
                    stroke={i % 4 === 0 ? '#78716C' : '#57534E'}
                    strokeWidth={i % 3 === 0 ? 1 : 1.4}
                    strokeLinecap="round"
                    opacity={i % 5 === 0 ? 0.35 : 0.75}
                  />
                );
              })}
            </svg>
          </div>

          <div className="text-xs text-stone-600 dark:text-zinc-400 bg-white/80 dark:bg-zinc-900/60 p-3 rounded-xl border border-stone-200 dark:border-zinc-800/80 font-normal">
            Foliculi dorminzi, micro-rupere la nivelul cuticulei, goluri evidente în arcadă.
          </div>
        </div>

        {/* State 1: Active Stage After Treatment */}
        <div className="relative rounded-2xl bg-[#FBF8F1] dark:bg-obsidian-950 border border-gold-500/40 p-6 flex flex-col justify-between overflow-hidden shadow-xl shadow-gold-500/5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase text-gold-800 dark:text-gold-400 bg-gold-500/20 px-2.5 py-1 rounded border border-gold-500/40 flex items-center gap-1.5 font-bold">
              <Feather className="w-3 h-3 text-gold-700 dark:text-gold-400" />
              <span>{activeStage.label} (Tratament EVERGREEN &amp; ISLE)</span>
            </span>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              Densitate: {activeStage.densityScore}%
            </span>
          </div>

          {/* SVG Visual Representation of Regrown Dense Brow */}
          <div className="py-6 flex items-center justify-center">
            <svg viewBox="0 0 320 80" className="w-full max-w-xs h-20">
              <path
                d="M 30,55 Q 160,20 290,45"
                fill="none"
                stroke="rgba(197, 160, 60, 0.4)"
                strokeWidth="2"
              />
              {[...Array(70)].map((_, i) => {
                const x = 35 + i * 3.7;
                const baseY = 53 - Math.sin((i / 70) * Math.PI) * 26;
                const angle = 28 - i * 0.65;
                const hairLength = 16 + (i % 4) * 3;
                const isNewHair = i % 2 !== 0;
                const showHair = isNewHair ? activeStage.densityScore > 40 : true;

                if (!showHair) return null;

                return (
                  <path
                    key={i}
                    d={`M ${x},${baseY} Q ${x + 5},${baseY - hairLength * 0.6} ${x + angle * 0.5},${baseY - hairLength}`}
                    stroke={i % 7 === 0 ? '#B08B35' : '#292524'}
                    strokeWidth={isNewHair ? 1.4 : 1.8}
                    strokeLinecap="round"
                    opacity={activeStage.visualOpacity}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>
          </div>

          <div className="text-xs text-stone-800 dark:text-zinc-300 bg-gold-500/15 p-3 rounded-xl border border-gold-500/30 font-normal">
            <strong className="text-gold-700 dark:text-gold-400 font-semibold">{activeStage.phaseName}:</strong> {activeStage.description}
          </div>
        </div>
      </div>

      {/* Interactive Timeline Slider Selector Buttons */}
      <div className="mt-8">
        <div className="grid grid-cols-4 gap-1.5 sm:gap-4">
          {STAGES.map((stage, idx) => {
            const isActive = activeStageIndex === idx;
            return (
              <button
                key={stage.week}
                onClick={() => setActiveStageIndex(idx)}
                className={`p-2 sm:p-4 rounded-xl sm:rounded-2xl border text-center transition-all duration-200 active:scale-95 flex flex-col items-center justify-center gap-0.5 sm:gap-1 ${
                  isActive
                    ? 'bg-gold-500 text-obsidian-950 border-gold-400 font-bold shadow-lg shadow-gold-500/20 scale-105'
                    : 'bg-stone-50 dark:bg-obsidian-950 border-stone-200 dark:border-zinc-800 text-stone-600 dark:text-zinc-400 hover:border-stone-300 dark:hover:border-zinc-700 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                <span className={`text-[9px] sm:text-[11px] font-mono uppercase font-semibold ${isActive ? 'text-obsidian-950' : 'text-stone-500 dark:text-zinc-400'}`}>
                  Etapa {idx + 1}
                </span>
                <span className="font-serif text-xs sm:text-base font-bold whitespace-nowrap">
                  {stage.label}
                </span>
                <span className={`text-[9px] sm:text-[10px] font-mono whitespace-nowrap ${isActive ? 'text-obsidian-900 font-bold' : 'text-gold-600 dark:text-gold-400 font-semibold'}`}>
                  {stage.densityScore}% Densitate
                </span>
              </button>
            );
          })}
        </div>

        {/* Range Slider for granular control */}
        <div className="mt-6 px-1 sm:px-2">
          <input
            type="range"
            min="0"
            max="3"
            step="1"
            value={activeStageIndex}
            onChange={(e) => setActiveStageIndex(Number(e.target.value))}
            className="w-full h-2.5 sm:h-2 bg-stone-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
          />
          <div className="flex justify-between text-[9px] sm:text-[11px] font-mono text-stone-500 dark:text-zinc-500 mt-2 font-medium">
            <span>S2: Ancorare</span>
            <span>S4: Trezire</span>
            <span>S8: Densificare</span>
            <span>S12: Plinătate</span>
          </div>
        </div>
      </div>

      {/* Stage Breakdown & Milestones */}
      <div className="mt-8 pt-6 border-t border-stone-200 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-xs font-mono uppercase text-gold-700 dark:text-gold-400 tracking-wider mb-3 flex items-center gap-1.5 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Ce Vei Observa În Oglindă
          </h4>
          <ul className="space-y-2">
            {activeStage.milestones.map((m, i) => (
              <li key={i} className="text-xs text-stone-700 dark:text-zinc-300 flex items-start gap-2">
                <span className="text-gold-600 dark:text-gold-400 font-bold">•</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-mono uppercase text-stone-700 dark:text-zinc-400 tracking-wider mb-3 flex items-center gap-1.5 font-bold">
            <Microscope className="w-4 h-4 text-gold-600 dark:text-gold-400" />
            Mecanismul Fiziologic de Laborator
          </h4>
          <p className="text-xs text-stone-700 dark:text-zinc-300 bg-stone-50 dark:bg-obsidian-950 p-3.5 rounded-xl border border-stone-200 dark:border-zinc-800 leading-relaxed font-normal">
            {activeStage.scientificMechanism}
          </p>
          <div className="mt-2 text-[11px] font-mono text-stone-500 dark:text-zinc-400">
            Aproximativ <strong className="text-gold-600 dark:text-gold-400 font-semibold">{activeStage.hairCountEstimate} fire active</strong> per arcadă.
          </div>
        </div>
      </div>
    </div>
  );
}
