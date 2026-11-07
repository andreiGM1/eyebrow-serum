'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, ShoppingBag, FileText, CheckCircle2, Clock, Truck, LogOut, ArrowRight } from 'lucide-react';
import { useProductsStore } from '@/lib/store/products-store';

export default function AccountPage() {
  const { orders } = useProductsStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

  return (
    <div className="min-h-screen bg-obsidian-950 text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Profile Header */}
        <div className="bg-obsidian-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 font-serif font-bold text-xl">
              EI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-white">Elena Ionescu</h1>
                <span className="text-[10px] font-mono uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Client Verificat
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">elena.ionescu@exemplu.ro • +40 722 000 000</p>
              <div className="text-[11px] font-mono text-gold-400 mt-1">
                Membru Atelier MAG din Februarie 2026
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/catalog"
              className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Comandă Nouă
            </Link>
            <Link
              href="/auth/login"
              className="p-2.5 text-zinc-400 hover:text-white rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors"
              title="Deconectare"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-zinc-800 gap-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-4 text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === 'orders'
                ? 'text-gold-400 border-b-2 border-gold-500 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Istoric Comenzi & Facturi Fiscale ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-4 text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === 'profile'
                ? 'text-gold-400 border-b-2 border-gold-500 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Date Personale & Adrese Livrare
          </button>
        </div>

        {/* TAB 1: ORDERS & INVOICES */}
        {activeTab === 'orders' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {orders.length === 0 ? (
              <div className="py-16 text-center bg-obsidian-900 border border-zinc-800 rounded-3xl p-8">
                <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-white">Nu ai nicio comandă plasată</h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                  Explorează catalogul și alege serul MAG EVERGROW pentru un tratament natural de 90 de zile.
                </p>
                <Link
                  href="/catalog"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold-500 text-obsidian-950 font-bold text-xs uppercase"
                >
                  Vezi Catalogul &rarr;
                </Link>
              </div>
            ) : (
              orders.map((o) => (
                <div
                  key={o.id}
                  className="bg-obsidian-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 transition-all space-y-4 shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800 gap-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                        Comandă #{o.order_number}
                      </span>
                      <div className="text-xs font-mono text-zinc-300">
                        Plasată la {new Date(o.created_at).toLocaleDateString('ro-RO')}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Status: {o.status}</span>
                      </span>

                      <Link
                        href={`/invoice/${o.id}`}
                        className="px-3.5 py-1.5 rounded-xl bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 text-gold-300 text-xs font-mono transition-colors flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5 text-gold-400" />
                        <span>Factură Fiscală PDF</span>
                      </Link>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    {o.items.map((i, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-zinc-300">
                        <span>
                          {i.product_name} <strong className="text-white">x{i.quantity}</strong>
                        </span>
                        <span className="font-mono text-white">
                          {(i.unit_price * i.quantity).toFixed(2)} RON
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total and destination */}
                  <div className="pt-3 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-zinc-400 gap-2">
                    <div>
                      Livrare către: <strong className="text-zinc-200">{o.customer_name}</strong>,{' '}
                      {o.shipping_address.city}, {o.shipping_address.street}
                    </div>
                    <div className="font-serif font-bold text-sm text-gold-400">
                      Total Achitat: {o.total.toFixed(2)} RON (TVA inclus)
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-obsidian-900 border border-zinc-800 rounded-3xl p-8 space-y-6 animate-in fade-in duration-200">
            <h3 className="font-serif font-bold text-xl text-white">Date de Identificare & Livrare</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-zinc-500 block mb-1 font-mono">Nume Complet</label>
                <input
                  type="text"
                  defaultValue="Elena Ionescu"
                  className="w-full bg-obsidian-950 border border-zinc-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-zinc-500 block mb-1 font-mono">Adresă Email</label>
                <input
                  type="email"
                  defaultValue="elena.ionescu@exemplu.ro"
                  className="w-full bg-obsidian-950 border border-zinc-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-zinc-500 block mb-1 font-mono">Adresă Implicită Livrare</label>
                <input
                  type="text"
                  defaultValue="Calea Victoriei nr. 120, Bloc A, Ap. 4, Sector 1, București"
                  className="w-full bg-obsidian-950 border border-zinc-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>
            <button className="px-6 py-2.5 rounded-xl bg-gold-500 text-obsidian-950 font-bold text-xs uppercase">
              Actualizează Datele
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

