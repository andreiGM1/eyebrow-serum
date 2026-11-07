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
    <div className="bg-obsidian-900 border border-gold-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all">
      
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SIMULATOR VIZUAL PE SĂPTĂMÂNI</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Evoluția Densității Foliculare în Timp
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Glisați sliderul pentru a vizualiza transformarea biologică pe parcursul curei de 90-120 de zile.
          </p>
        </div>

        <div className="bg-obsidian-950 px-4 py-2.5 rounded-xl border border-zinc-800 flex items-center gap-3 shadow-inner">
          <Clock className="w-5 h-5 text-gold-400" />
          <div>
            <div className="text-[10px] uppercase font-mono text-zinc-400">Etapa Selectată</div>
            <div className="text-sm font-serif font-bold text-white">
              {activeStage.label} ({activeStage.phaseName})
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Visual Graphic Comparison (Before vs Current Week) */}
      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* State 0: Initial Sparse State (Week 0) */}
        <div className="relative rounded-2xl bg-obsidian-950 border border-zinc-800 p-6 flex flex-col justify-between overflow-hidden shadow-inner">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase text-zinc-400 bg-zinc-800/80 px-2.5 py-1 rounded border border-zinc-700/60 flex items-center gap-1.5">
              <Compass className="w-3 h-3" />
              <span>Ziua 0 (Înainte de Tratament)</span>
            </span>
            <span className="text-xs font-mono text-red-400 font-bold">Densitate: ~20%</span>
          </div>

          {/* SVG Visual Representation of Sparse Brow */}
          <div className="py-6 flex items-center justify-center">
            <svg viewBox="0 0 320 80" className="w-full max-w-xs h-20 text-zinc-600">
              <defs>
                <linearGradient id="sparseHairGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4A3F35" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#2E2822" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path
                d="M 30,55 Q 160,25 290,45"
                fill="none"
                stroke="#888"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.4"
              />
              {[...Array(28)].map((_, i) => {
                const x = 40 + i * 9 + (i % 3) * 2;
                const baseY = 52 - Math.sin((i / 28) * Math.PI) * 20;
                const angle = 25 - i * 0.8;
                return (
                  <path
                    key={i}
                    d={`M ${x},${baseY} Q ${x + 4},${baseY - 12} ${x + angle * 0.4},${baseY - 18}`}
                    stroke={i % 4 === 0 ? '#8B7355' : '#5C4D3C'}
                    strokeWidth={i % 3 === 0 ? 1 : 1.4}
                    strokeLinecap="round"
                    opacity={i % 5 === 0 ? 0.25 : 0.6}
                  />
                );
              })}
            </svg>
          </div>

          <div className="text-xs text-zinc-400 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80">
            Foliculi dorminzi, micro-rupere la nivelul cuticulei, goluri evidente în arcadă.
          </div>
        </div>

        {/* State 1: Active Stage After Treatment */}
        <div className="relative rounded-2xl bg-obsidian-950 border border-gold-500/40 p-6 flex flex-col justify-between overflow-hidden shadow-xl shadow-gold-500/5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase text-gold-400 bg-gold-500/10 px-2.5 py-1 rounded border border-gold-500/30 flex items-center gap-1.5 font-bold">
              <Feather className="w-3 h-3 text-gold-400" />
              <span>{activeStage.label} (Tratament MAG)</span>
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              Densitate: {activeStage.densityScore}%
            </span>
          </div>

          {/* SVG Visual Representation of Regrown Dense Brow */}
          <div className="py-6 flex items-center justify-center">
            <svg viewBox="0 0 320 80" className="w-full max-w-xs h-20">
              <defs>
                <linearGradient id="richHairGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C5A03C" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#1C1814" stopOpacity="1" />
                </linearGradient>
              </defs>
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
                    stroke={i % 7 === 0 ? '#C5A03C' : '#2A241C'}
                    strokeWidth={isNewHair ? 1.4 : 1.8}
                    strokeLinecap="round"
                    opacity={activeStage.visualOpacity}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>
          </div>

          <div className="text-xs text-zinc-300 bg-gold-500/10 p-3 rounded-xl border border-gold-500/20">
            <strong className="text-gold-400">{activeStage.phaseName}:</strong> {activeStage.description}
          </div>
        </div>
      </div>

      {/* Interactive Timeline Slider Selector Buttons */}
      <div className="mt-8">
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {STAGES.map((stage, idx) => {
            const isActive = activeStageIndex === idx;
            return (
              <button
                key={stage.week}
                onClick={() => setActiveStageIndex(idx)}
                className={`p-3 sm:p-4 rounded-2xl border text-center transition-all duration-200 active:scale-95 flex flex-col items-center justify-center gap-1 ${
                  isActive
                    ? 'bg-gold-500 text-obsidian-950 border-gold-400 font-bold shadow-lg shadow-gold-500/20 scale-105'
                    : 'bg-obsidian-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                <span className={`text-[11px] font-mono uppercase ${isActive ? 'text-obsidian-950' : 'text-zinc-400'}`}>
                  Etapa {idx + 1}
                </span>
                <span className="font-serif text-sm sm:text-base font-bold">
                  {stage.label}
                </span>
                <span className={`text-[10px] font-mono ${isActive ? 'text-obsidian-900 font-bold' : 'text-gold-400'}`}>
                  {stage.densityScore}% Densitate
                </span>
              </button>
            );
          })}
        </div>

        {/* Range Slider for granular control */}
        <div className="mt-6 px-2">
          <input
            type="range"
            min="0"
            max="3"
            step="1"
            value={activeStageIndex}
            onChange={(e) => setActiveStageIndex(Number(e.target.value))}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
          />
          <div className="flex justify-between text-[11px] font-mono text-zinc-500 mt-2">
            <span>Săpt. 2 (Ancorare)</span>
            <span>Săpt. 4 (Trezire)</span>
            <span>Săpt. 8 (Densificare)</span>
            <span>Săpt. 12 (Arhitectură Plină)</span>
          </div>
        </div>
      </div>

      {/* Stage Breakdown & Milestones */}
      <div className="mt-8 pt-6 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-xs font-mono uppercase text-gold-400 tracking-wider mb-3 flex items-center gap-1.5 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Ce Vei Observa În Oglindă
          </h4>
          <ul className="space-y-2">
            {activeStage.milestones.map((m, i) => (
              <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                <span className="text-gold-400 font-bold">•</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-3 flex items-center gap-1.5 font-bold">
            <Microscope className="w-4 h-4 text-gold-400" />
            Mecanismul Fiziologic de Laborator
          </h4>
          <p className="text-xs text-zinc-300 bg-obsidian-950 p-3.5 rounded-xl border border-zinc-800 leading-relaxed">
            {activeStage.scientificMechanism}
          </p>
          <div className="mt-2 text-[11px] font-mono text-zinc-400">
            Aproximativ <strong className="text-gold-400">{activeStage.hairCountEstimate} fire active</strong> per arcadă.
          </div>
        </div>
      </div>
    </div>
  );
}
