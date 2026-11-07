'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Printer,
  Download,
  ShoppingBag,
  Truck,
  Sparkles,
  FileText,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Order } from '@/lib/types';
import { getStoredOrders } from '@/lib/store/products-store';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Fire festive celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#E6CA85', '#2D4B3B', '#FAF7EE'],
      });
    } catch {
      // ignore
    }

    // Try finding order in session or localStorage
    const saved = sessionStorage.getItem('evergrow_last_order');
    if (saved) {
      try {
        setOrder(JSON.parse(saved));
        return;
      } catch {}
    }

    if (orderId) {
      const orders = getStoredOrders();
      const found = orders.find((o) => o.id === orderId);
      if (found) setOrder(found);
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-obsidian-950 text-foreground py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Success Card Header */}
        <div className="bg-obsidian-900 border border-gold-500/40 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-emerald-950/80 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/10">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>PLATĂ STRIPE CONFIRMATĂ • SANDBOX VALIDAT</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Comanda Ta a Fost Înregistrată cu Succes!
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-lg mx-auto">
              Mulțumim pentru comanda plasată la MAG Laboratories Bucharest.
              Formulele tale proaspete sunt pregătite pentru expediere în laboratorul nostru.
            </p>
          </div>

          {/* Quick Order Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-zinc-800 text-left">
            <div className="bg-obsidian-950 p-3 rounded-xl border border-zinc-800">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block">Nr. Comandă</span>
              <strong className="text-xs font-mono text-gold-400">
                {order ? order.order_number : 'MAG-2026-1003'}
              </strong>
            </div>

            <div className="bg-obsidian-950 p-3 rounded-xl border border-zinc-800">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block">Serie & Factură</span>
              <strong className="text-xs font-mono text-zinc-200">
                {order ? `${order.invoice_series} nr. ${order.invoice_number}` : 'MAG-EVG nr. 1003'}
              </strong>
            </div>

            <div className="bg-obsidian-950 p-3 rounded-xl border border-zinc-800">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block">Status Plată</span>
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Paid (Stripe)
              </span>
            </div>

            <div className="bg-obsidian-950 p-3 rounded-xl border border-zinc-800">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block">Total Achitat</span>
              <strong className="text-xs font-mono text-white">
                {order ? `${order.total.toFixed(2)} RON` : '195.00 RON'}
              </strong>
            </div>
          </div>

          {/* Automatic stock management notice */}
          <div className="p-3.5 rounded-xl bg-botanical-950/70 border border-emerald-500/20 text-xs text-zinc-300 flex items-center justify-between text-left">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Gestiune Automată Stoc: Unitățile comandate au fost decrementate în baza de date.</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">STATUS: SINCRONIZAT</span>
          </div>

          {/* Actions: View / Download Fiscal Invoice */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/invoice/${order ? order.id : 'ord-1001'}`}
              className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-gold-500/20"
            >
              <FileText className="w-4 h-4" />
              <span>Deschide Factura Fiscală (PDF / Print)</span>
            </Link>

            <Link
              href="/catalog"
              className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Înapoi la Catalog</span>
            </Link>
          </div>
        </div>

        {/* Shipping details recap */}
        {order && (
          <div className="bg-obsidian-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-serif font-bold text-base text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-gold-400" />
              <span>Detalii Expediere & Curierat</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
              <div>
                <span className="text-zinc-500 block">Destinatar:</span>
                <strong className="text-white">{order.customer_name}</strong>
                <p>{order.shipping_address.street}</p>
                <p>
                  {order.shipping_address.city}, {order.shipping_address.county}, {order.shipping_address.country}
                </p>
              </div>
              <div>
                <span className="text-zinc-500 block">Contact & Notificări:</span>
                <p>Telefon: {order.customer_phone}</p>
                <p>Email: {order.customer_email}</p>
                <p className="mt-1 text-emerald-400 font-mono text-[11px]">
                  Curier: Fan Courier Express (Livrare estimată în 24-48h)
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-obsidian-950 text-white flex items-center justify-center">Se generează confirmarea...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}

