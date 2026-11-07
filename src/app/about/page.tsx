import React from 'react';
import Link from 'next/link';
import { FlaskConical, ShieldCheck, Leaf, Award, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-obsidian-950 text-stone-900 dark:text-foreground py-16 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-700 dark:text-gold-300 text-xs font-mono font-semibold">
            <FlaskConical className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
            <span>MANIFESTUL MAG LABORATORIES • BUCUREȘTI</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-950 dark:text-white">
            Atelierul de Precizie Botanică
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            În inima Bucureștiului, MAG creează formulări curate de înaltă performanță cosmetică,
            la intersecția dintre tradiția farmaceutică europeană și biologia celulară modernă a foliculului pilos.
          </p>
        </div>

        {/* The 3 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 p-6 rounded-2xl space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600 dark:text-gold-400">
              <FlaskConical className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-950 dark:text-white">Micro-Loturi Artizanale</h3>
            <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed">
              Refuzăm liniile de producție de masă. Fiecare flacon MAG EVERGROW este compus, presat la rece și verificat individual în laboratorul nostru pentru a preveni oxidarea compușilor volatili.
            </p>
          </div>

          <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 p-6 rounded-2xl space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600 dark:text-gold-400">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-950 dark:text-white">Zero Compromis Curat</h3>
            <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed">
              Formulăm fără prostaglandine sintetice, siliconi, sulfați, parabeni, ftalați, conservanți industriali sau parfumuri artificiale. 100% ingrediente biologic active.
            </p>
          </div>

          <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 p-6 rounded-2xl space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600 dark:text-gold-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-950 dark:text-white">Regulament European</h3>
            <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed">
              Formulat strict în conformitate cu Regulamentul European privind Produsele Cosmetice (CE) Nr. 1223/2009 și standardele GMP ISO 22716.
            </p>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-gold-500/20 rounded-3xl p-8 sm:p-10 space-y-6 shadow-sm dark:shadow-xl">
          <h2 className="font-serif text-2xl font-bold text-stone-950 dark:text-white">
            De ce am creat MAG EVERGROW?
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-zinc-300 leading-relaxed">
            <p>
              Piața internațională a serurilor pentru gene și sprâncene a fost dominată în ultimul deceniu de analogi sintetici de prostaglandine (bimatoprost, isopropyl cloprostenate). Deși produceau alungire rapidă prin forțare medicamentoasă, aceste substanțe au declanșat reacții adverse documentate oftalmologic: hiperpigmentarea ireversibilă a irisului, cearcăne întunecate profunde și atrofie a grăsimii orbitale.
            </p>
            <p>
              Echipa noastră de chimiști cosmetici din București a dezvoltat o abordare complet diferită: activarea nativă a tecii foliculare prin nutriție lipidică profundă. Prin utilizarea unui raport optim de acid ricinoleic din ricin virgin nerafinat, combinat cu stimulatorul microcirculator de rozmarin distilat cu abur și esteri de jojoba ce mimică sebumul uman, MAG EVERGROW trezește rădăcinile dorminde în mod fiziologic și durabil.
            </p>
          </div>

          <div className="pt-4 border-t border-stone-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-stone-500 dark:text-zinc-400">
              Laborator & Punct de Lucru: Calea Victoriei nr. 142, București, România
            </div>

            <Link
              href="/catalog"
              className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-gold-500/20 active:scale-95"
            >
              Explorează Catalogul &rarr;
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

