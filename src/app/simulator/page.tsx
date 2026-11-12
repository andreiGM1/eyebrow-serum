'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Microscope, Award, ArrowLeft } from 'lucide-react';
import DiagnosticQuiz from '@/components/simulator/DiagnosticQuiz';
import VisualTimelineSlider from '@/components/simulator/VisualTimelineSlider';
import RoutineResult from '@/components/simulator/RoutineResult';
import { DiagnosticQuizAnswers } from '@/lib/types';

export default function SimulatorPage() {
  const [completedAnswers, setCompletedAnswers] = useState<DiagnosticQuizAnswers | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-obsidian-950 text-stone-900 dark:text-foreground py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Back Link & Breadcrumb */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-zinc-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Înapoi la magazinul principal</span>
          </Link>
        </div>

        {/* Hero Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-800/10 border border-teal-700/30 text-teal-900 dark:text-teal-200 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
            <span>ORIGINALITATE &amp; INOVAȚIE • ATELIERUL EVERGREEN &amp; ISLE</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-950 dark:text-white leading-tight">
            BrowGrowth Diagnostics &amp; <br />
            <span className="teal-gradient-text">Visual Timeline Simulator</span>
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-zinc-400 leading-relaxed font-normal">
            Algoritmul de diagnostic dermato-cosmetic al atelierului nostru botanic.
            Evaluează densitatea actuală a sprâncenelor, simulează grafic evoluția pe săptămâni și
            calculează rutina optimă de îngrijire fără hormoni sintetici.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-stone-600 dark:text-zinc-400">
            <span className="flex items-center gap-1.5 font-semibold">
              <Microscope className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              <span>Biologie Botanică Activă</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Zero Prostaglandine</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-semibold">
              <Award className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              <span>Conform Regulament CE 1223/2009</span>
            </span>
          </div>
        </div>

        {/* Interactive Visual Timeline Slider (Before / After on Weeks) */}
        <div>
          <VisualTimelineSlider />
        </div>

        {/* 3-Step Diagnostic Quiz or Computed Routine Result */}
        <div id="quiz-section">
          {completedAnswers ? (
            <RoutineResult
              answers={completedAnswers}
              onReset={() => setCompletedAnswers(null)}
            />
          ) : (
            <DiagnosticQuiz onComplete={(answers) => setCompletedAnswers(answers)} />
          )}
        </div>

        {/* Scientific Comparison Table: Prostaglandin vs Evergreen & Isle Active Lipid */}
        <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl transition-colors">
          <h3 className="font-serif text-xl font-bold text-stone-950 dark:text-white mb-2">
            De Ce Tratamentul Botanic EVERGREEN &amp; ISLE Este Sigur pentru Sănătatea Ochilor?
          </h3>
          <p className="text-xs text-stone-600 dark:text-zinc-400 mb-6 font-normal">
            Comparație științifică între serurile industriale convenționale și formula noastră botanică pură.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 dark:border-zinc-800 text-stone-700 dark:text-zinc-400 font-mono uppercase text-[11px]">
                  <th className="py-3 px-4">Criteriu Fiziologic</th>
                  <th className="py-3 px-4 text-red-600 dark:text-red-400 font-bold">Seruri Masă (Prostaglandine)</th>
                  <th className="py-3 px-4 text-emerald-700 dark:text-emerald-400 bg-teal-800/10 dark:bg-teal-400/10 font-bold">EVERGREEN &amp; ISLE (Lipide Bioactive)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-zinc-800/60 text-stone-800 dark:text-zinc-300">
                <tr>
                  <td className="py-3 px-4 font-semibold text-stone-900 dark:text-white">Mecanism de Acțiune</td>
                  <td className="py-3 px-4 text-stone-600 dark:text-zinc-400 font-normal">Forțare hormonală chimică a ciclului anagen</td>
                  <td className="py-3 px-4 bg-teal-800/10 dark:bg-teal-400/10 text-stone-900 dark:text-teal-200 font-medium">Hrănire celulară cu acid ricinoleic și rozmarin microcirculator</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-stone-900 dark:text-white">Risc Întunecare Pleoape</td>
                  <td className="py-3 px-4 text-red-600 dark:text-red-400 font-mono font-bold">RIDICAT (Hiperpigmentare iris/pleoapă)</td>
                  <td className="py-3 px-4 bg-teal-800/10 dark:bg-teal-400/10 text-emerald-700 dark:text-emerald-400 font-mono font-bold">ZERO RISC (100% sigur dermatologic)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-stone-900 dark:text-white">Compoziție Activă</td>
                  <td className="py-3 px-4 text-stone-600 dark:text-zinc-400 font-normal">90% apă, alcool, conservanți sintetici, parabeni</td>
                  <td className="py-3 px-4 bg-teal-800/10 dark:bg-teal-400/10 text-stone-900 dark:text-teal-200 font-medium">100% Lipide Active Concentrat (Zero Apă, Zero Fillers)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-stone-900 dark:text-white">Efect la Întrerupere</td>
                  <td className="py-3 px-4 text-red-600 dark:text-red-400 font-normal">Cădere bruscă a genelor și sprâncenelor (shedding)</td>
                  <td className="py-3 px-4 bg-teal-800/10 dark:bg-teal-400/10 text-emerald-700 dark:text-emerald-400 font-semibold">Densitate susținută, rădăcini fortifiate nativ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
