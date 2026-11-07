'use client';

import React, { useState } from 'react';
import { Check, ArrowRight, ArrowLeft, Sparkles, Shield, HeartHandshake, Eye, Feather } from 'lucide-react';
import { DiagnosticQuizAnswers } from '@/lib/types';

interface DiagnosticQuizProps {
  onComplete: (answers: DiagnosticQuizAnswers) => void;
}

export default function DiagnosticQuiz({ onComplete }: DiagnosticQuizProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<DiagnosticQuizAnswers>>({
    density: 'overplucked',
    history: 'waxed_often',
    sensitivity: 'sensitive',
    ageGroup: '26-35',
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(answers as DiagnosticQuizAnswers);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-gold-500/30 rounded-3xl p-6 sm:p-8 shadow-xl transition-all">
      {/* Progress header */}
      <div className="flex items-center justify-between pb-6 border-b border-stone-200 dark:border-zinc-800">
        <div>
          <span className="text-[11px] font-mono text-gold-700 dark:text-gold-400 uppercase tracking-widest block flex items-center gap-1.5 font-bold">
            <Feather className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
            Protocol de Evaluare Clinico-Botanică • Pasul {step} din 3
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-950 dark:text-white mt-1">
            {step === 1 && '1. Care este starea și densitatea actuală a sprâncenelor?'}
            {step === 2 && '2. Ce istoric de stilizare sau tratamente au sprâncenele tale?'}
            {step === 3 && '3. Care este gradul de sensibilitate al zonei ochilor?'}
          </h3>
        </div>

        {/* Step circles */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                s === step
                  ? 'bg-gold-500 text-obsidian-950 ring-4 ring-gold-400/30 scale-110 shadow'
                  : s < step
                  ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30'
                  : 'bg-stone-200 dark:bg-zinc-800 text-stone-600 dark:text-zinc-500'
              }`}
            >
              {s < step ? <Check className="w-4 h-4" /> : s}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="py-8">
        
        {/* Step 1: Density */}
        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                id: 'overplucked',
                title: 'Goluri locale & Pensat excesiv',
                desc: 'Sprâncene subțiate prin pensat repetat în anii trecuți; zone cu goluri vizibile unde părul refuză să crească.',
              },
              {
                id: 'sparse',
                title: 'Densitate redusă din naștere',
                desc: 'Sprâncene fine, deschise la culoare sau rare pe întreaga lungime a arcadei.',
              },
              {
                id: 'thinning',
                title: 'Subțiere recentă (Stres / Hormoni)',
                desc: 'Cădere accentuată în ultimele luni, firul a devenit fragil și casant.',
              },
              {
                id: 'asymmetric',
                title: 'Asimetrie vizibilă',
                desc: 'O sprânceană are formă și volum normal, iar cealaltă prezintă goluri sau arcuire incompletă.',
              },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAnswers({ ...answers, density: opt.id as any })}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 active:scale-95 ${
                  answers.density === opt.id
                    ? 'bg-gold-500/15 border-gold-500 text-stone-950 dark:text-white shadow-md ring-1 ring-gold-500/30'
                    : 'bg-stone-50 dark:bg-obsidian-950 border-stone-200 dark:border-zinc-800 text-stone-700 dark:text-zinc-300 hover:border-stone-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif font-bold text-base text-stone-900 dark:text-zinc-100">
                    {opt.title}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      answers.density === opt.id
                        ? 'border-gold-500 bg-gold-500 text-obsidian-950'
                        : 'border-stone-300 dark:border-zinc-700'
                    }`}
                  >
                    {answers.density === opt.id && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
                <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed font-normal">{opt.desc}</p>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Styling History */}
        {step === 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                id: 'waxed_often',
                title: 'Pensat sau epilat frecvent cu ceară',
                desc: 'Smulgerea repetată a traumatizat rădăcina și a lăsat foliculii în repaus prelungit.',
              },
              {
                id: 'laminated',
                title: 'Laminări chimice repetate / Brow Lift',
                desc: 'Soluțiile perhydrol au deschis forțat cuticula firului, lăsându-l uscat și rigid.',
              },
              {
                id: 'microbladed',
                title: 'Microblading sau micropigmentare',
                desc: 'Pielea prezintă micro-cicatrici tisulare care necesită reactivare celulară.',
              },
              {
                id: 'natural',
                title: 'Îngrijire naturală fără agresiuni',
                desc: 'Sprâncene neagresate, dorești doar volum maxim și fortifierea firelor existente.',
              },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAnswers({ ...answers, history: opt.id as any })}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 active:scale-95 ${
                  answers.history === opt.id
                    ? 'bg-gold-500/15 border-gold-500 text-stone-950 dark:text-white shadow-md ring-1 ring-gold-500/30'
                    : 'bg-stone-50 dark:bg-obsidian-950 border-stone-200 dark:border-zinc-800 text-stone-700 dark:text-zinc-300 hover:border-stone-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif font-bold text-base text-stone-900 dark:text-zinc-100">
                    {opt.title}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      answers.history === opt.id
                        ? 'border-gold-500 bg-gold-500 text-obsidian-950'
                        : 'border-stone-300 dark:border-zinc-700'
                    }`}
                  >
                    {answers.history === opt.id && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
                <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed font-normal">{opt.desc}</p>
              </button>
            ))}
          </div>
        )}

        {/* Step 3: Sensitivity */}
        {step === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                id: 'sensitive',
                title: 'Ochi Sensibili / Reacții Ușoare',
                desc: 'Ochii lăcrimează ușor la seruri clasice; preferi formule fără conservanți sau chimicale sintetice.',
              },
              {
                id: 'very_sensitive',
                title: 'Foarte Sensibili & Lentile de Contact',
                desc: 'Purtător de lentile sau pleoape cu tendință la dermatită; formulele ultra-pure fără apă sunt obligatorii.',
              },
              {
                id: 'normal',
                title: 'Toleranță Normală',
                desc: 'Piele rezistentă, fără istoric de reacții alergice la produse cosmetice.',
              },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAnswers({ ...answers, sensitivity: opt.id as any })}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 active:scale-95 ${
                  answers.sensitivity === opt.id
                    ? 'bg-gold-500/15 border-gold-500 text-stone-950 dark:text-white shadow-md ring-1 ring-gold-500/30'
                    : 'bg-stone-50 dark:bg-obsidian-950 border-stone-200 dark:border-zinc-800 text-stone-700 dark:text-zinc-300 hover:border-stone-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif font-bold text-sm text-stone-900 dark:text-zinc-100">
                    {opt.title}
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      answers.sensitivity === opt.id
                        ? 'border-gold-500 bg-gold-500 text-obsidian-950'
                        : 'border-stone-300 dark:border-zinc-700'
                    }`}
                  >
                    {answers.sensitivity === opt.id && <Check className="w-3 h-3" />}
                  </div>
                </div>
                <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed font-normal">{opt.desc}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer navigation buttons */}
      <div className="pt-6 border-t border-stone-200 dark:border-zinc-800 flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={handlePrev}
            className="px-5 py-2.5 rounded-xl border border-stone-300 dark:border-zinc-700 hover:bg-stone-100 dark:hover:bg-zinc-800 text-stone-700 dark:text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Înapoi</span>
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-200 active:scale-95 shadow-lg shadow-gold-500/20 group"
        >
          <span>{step === 3 ? 'Generează Diagnostic & Protocol Personalizat' : 'Pasul Următor'}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
