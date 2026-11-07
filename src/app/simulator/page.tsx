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
    <div className="min-h-screen bg-obsidian-950 text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Back Link & Breadcrumb */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-gold-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Înapoi la magazinul principal</span>
          </Link>
        </div>

        {/* Hero Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>ORIGINALITATE & INOVAȚIE • ATELIERUL DE PRECIZIE MAG</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            BrowGrowth Diagnostics & Visual Timeline Simulator
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Algoritmul de diagnostic dermato-cosmetic al laboratorului nostru din București.
            Evaluează densitatea actuală a sprâncenelor, simulează grafic evoluția pe săptămâni și
            calculează rutina optimă de îngrijire fără hormoni sintetici.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Microscope className="w-4 h-4 text-gold-400" />
              <span>Biologie Celulară Activă</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero Prostaglandine</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-gold-400" />
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

        {/* Scientific Comparison Table: Prostaglandin vs MAG Active Lipid */}
        <div className="bg-obsidian-900 border border-zinc-800 rounded-3xl p-6 sm:p-8">
          <h3 className="font-serif text-xl font-bold text-white mb-2">
            De Ce Tratamentul Botanic MAG Este Sigur pentru Sănătatea Ochilor?
          </h3>
          <p className="text-xs text-zinc-400 mb-6">
            Comparație științifică între serurile industriale convenționale și formula formulată în București.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 font-mono uppercase text-[11px]">
                  <th className="py-3 px-4">Criteriu Fiziologic</th>
                  <th className="py-3 px-4 text-red-400">Seruri Masă (Prostaglandine)</th>
                  <th className="py-3 px-4 text-emerald-400 bg-gold-500/5">MAG EVERGROW (Lipide Bioactive)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Mecanism de Acțiune</td>
                  <td className="py-3 px-4 text-zinc-400">Forțare hormonală chimică a ciclului anagen</td>
                  <td className="py-3 px-4 bg-gold-500/5 text-gold-200">Hrănire celulară cu acid ricinoleic și rozmarin microcirculator</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Risc Întunecare Pleoape</td>
                  <td className="py-3 px-4 text-red-400 font-mono">RIDICAT (Hiperpigmentare iris/pleoapă)</td>
                  <td className="py-3 px-4 bg-gold-500/5 text-emerald-400 font-mono font-bold">ZERO RISC (100% sigur dermatologic)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Compoziție Activă</td>
                  <td className="py-3 px-4 text-zinc-400">90% apă, alcool, conservanți sintetici, parabeni</td>
                  <td className="py-3 px-4 bg-gold-500/5 text-gold-200">100% Lipide Active Concentrat (Zero Apă, Zero Fillers)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Efect la Întrerupere</td>
                  <td className="py-3 px-4 text-red-400">Cădere bruscă a genelor și sprâncenelor (shedding)</td>
                  <td className="py-3 px-4 bg-gold-500/5 text-emerald-400 font-medium">Densitate susținută, rădăcini fortifiate nativ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

