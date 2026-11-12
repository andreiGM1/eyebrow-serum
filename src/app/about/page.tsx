import React from 'react';
import Link from 'next/link';
import { Leaf, Award, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-obsidian-950 text-stone-900 dark:text-foreground py-16 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/10 border border-teal-700/30 text-teal-900 dark:text-teal-300 text-xs font-mono font-semibold">
            <Leaf className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
            <span>MANIFESTUL EVERGREEN &amp; ISLE • NATURAL SKINCARE</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-950 dark:text-white">
            Filosofia Purității Botanice
          </h1>

          <p className="text-sm sm:text-base text-stone-700 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            La EVERGREEN &amp; ISLE, creăm formulări curate de înaltă performanță cosmetică,
            dedicate regenerării armonioase a sprâncenelor și pielii prin forța plantelor și a lipidelor active presate la rece.
          </p>
        </div>

        {/* The 3 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 p-6 rounded-2xl space-y-3 shadow-sm hover:border-teal-700/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-800/10 border border-teal-700/30 flex items-center justify-center text-teal-800 dark:text-teal-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-950 dark:text-white">Micro-Loturi Artizanale</h3>
            <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed">
              Refuzăm producția industrială de masă. Fiecare flacon EVERGREEN &amp; ISLE este realizat cu grijă în loturi mici, presat la rece și verificat cu strictețe pentru a păstra compușii activi integri.
            </p>
          </div>

          <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 p-6 rounded-2xl space-y-3 shadow-sm hover:border-teal-700/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-800/10 border border-teal-700/30 flex items-center justify-center text-teal-800 dark:text-teal-400">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-950 dark:text-white">Zero Compromis Sintetic</h3>
            <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed">
              Formulăm fără prostaglandine sintetice, siliconi, sulfați, parabeni, ftalați, conservanți industriali sau parfumuri artificiale. 100% ingrediente biologic compatibile.
            </p>
          </div>

          <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 p-6 rounded-2xl space-y-3 shadow-sm hover:border-teal-700/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-800/10 border border-teal-700/30 flex items-center justify-center text-teal-800 dark:text-teal-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-950 dark:text-white">Regulament European</h3>
            <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed">
              Formulat strict în conformitate cu Regulamentul European privind Produsele Cosmetice (CE) Nr. 1223/2009 și standardele internaționale de bune practici.
            </p>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-teal-700/30 rounded-3xl p-8 sm:p-10 space-y-6 shadow-sm dark:shadow-xl">
          <h2 className="font-serif text-2xl font-bold text-stone-950 dark:text-white">
            De ce am creat EVERGREEN &amp; ISLE?
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-zinc-300 leading-relaxed">
            <p>
              Piața tradițională a serurilor pentru gene și sprâncene a fost mult timp dominată de analogi sintetici de prostaglandine (bimatoprost, isopropyl cloprostenate). Deși produceau alungire rapidă prin forțare medicamentoasă, aceste substanțe au declanșat adesea reacții adverse documentate: hiperpigmentarea pleoapelor, cearcăne întunecate și iritații.
            </p>
            <p>
              La EVERGREEN &amp; ISLE, am dezvoltat o abordare complet naturală: activarea fiziologică a foliculului prin nutriție botanică profundă. Prin combinarea acidului ricinoleic din ricin virgin nerafinat, a uleiului esențial de rozmarin distilat cu abur și a esterilor biomimetici de jojoba, formulările noastre trezesc rădăcinile într-un mod sustenabil, sigur și respectuos cu tenul tău.
            </p>
          </div>

          <div className="pt-4 border-t border-stone-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-stone-500 dark:text-zinc-400">
              EVERGREEN &amp; ISLE • Pure Botanical Skincare Atelier
            </div>

            <Link
              href="/catalog"
              className="px-6 py-3 rounded-xl bg-teal-800 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-teal-900/20 active:scale-95"
            >
              Explorează Colecția &rarr;
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
