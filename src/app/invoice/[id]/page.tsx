'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Printer,
  Download,
  ArrowLeft,
  CheckCircle2,
  Building,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';
import { Order } from '@/lib/types';
import { getStoredOrders } from '@/lib/store/products-store';
import { INITIAL_ORDERS } from '@/lib/data';

interface InvoicePageProps {
  params: Promise<{ id: string }>;
}

export default function InvoicePage({ params }: InvoicePageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Check in session storage or stored orders
    const saved = sessionStorage.getItem('evergrow_last_order');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.id === id || id === 'latest') {
          setOrder(parsed);
          return;
        }
      } catch {}
    }

    const orders = getStoredOrders();
    const found = orders.find((o) => o.id === id) || INITIAL_ORDERS.find((o) => o.id === id);
    if (found) {
      setOrder(found);
    } else if (INITIAL_ORDERS.length > 0) {
      setOrder(INITIAL_ORDERS[0]);
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] dark:bg-obsidian-950 text-stone-900 dark:text-white flex items-center justify-center p-4">
        <p>Se încarcă factura fiscală...</p>
      </div>
    );
  }

  // VAT calculations: 19%
  const subtotalWithoutVat = Number(((order.total - order.shipping_cost) / 1.19).toFixed(2));
  const vatAmount = Number((order.total - order.shipping_cost - subtotalWithoutVat).toFixed(2));

  return (
    <div className="min-h-screen bg-[#EFECE6] dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8 font-sans transition-colors">
      
      {/* Top Action Bar (Hidden when printed) */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-stone-600 dark:text-zinc-400 hover:text-stone-950 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Înapoi la Magazin</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Tipărește Factura / Salvează PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Invoice Sheet (A4 Format) */}
      <div className="max-w-4xl mx-auto bg-white text-zinc-900 rounded-2xl p-8 sm:p-12 shadow-2xl invoice-container border border-zinc-200">
        
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start pb-8 border-b-2 border-zinc-900 gap-6">
          <div>
            <div className="flex flex-col items-start">
              <span className="text-xl sm:text-2xl font-serif font-black tracking-[0.16em] text-[#143D36]">
                EVERGREEN &amp; ISLE
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#658777] font-sans font-medium">
                NATURAL SKINCARE
              </span>
            </div>
            <p className="text-xs uppercase font-serif tracking-widest text-zinc-600 mt-2">
              Atelier Botanique
            </p>
            <div className="text-[11px] text-zinc-600 mt-3 space-y-0.5">
              <p><strong>EVERGREEN &amp; ISLE SKINCARE SRL</strong></p>
              <p>C.I.F. / C.U.I.: <strong>RO48921820</strong></p>
              <p>Nr. Reg. Com.: J40/12450/2021</p>
              <p>Sediul: Calea Victoriei nr. 142, Sector 1, București</p>
              <p>IBAN: RO49 BTRL 0000 1234 5678 90XX • Banca Transilvania</p>
              <p>Email: contact@evergreenandisle.com</p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950">
              FACTURĂ FISCALĂ
            </h1>
            <div className="text-xs font-mono text-zinc-700 mt-2 space-y-1">
              <p>
                Serie: <strong className="text-zinc-950 font-bold">{order.invoice_series}</strong>
              </p>
              <p>
                Număr: <strong className="text-zinc-950 font-bold">{order.invoice_number}</strong>
              </p>
              <p>
                Data emiterii: <strong>{new Date(order.created_at).toLocaleDateString('ro-RO')}</strong>
              </p>
              <p>
                Comandă asociată: <strong>{order.order_number}</strong>
              </p>
              <p className="text-emerald-700 font-bold flex items-center sm:justify-end gap-1 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> ACHITAT CU CARD (STRIPE)
              </p>
            </div>
          </div>
        </div>

        {/* Buyer Details Section */}
        <div className="py-6 border-b border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div>
            <h3 className="font-mono uppercase text-[11px] font-bold text-zinc-500 mb-2">
              Cumpărător / Beneficiar:
            </h3>
            <p className="font-bold text-sm text-zinc-950">
              {order.billing_address?.companyName || order.customer_name}
            </p>
            {order.billing_address?.cui && (
              <p className="text-zinc-700 font-mono">C.U.I.: {order.billing_address.cui}</p>
            )}
            {order.billing_address?.regCom && (
              <p className="text-zinc-700 font-mono">Reg. Com.: {order.billing_address.regCom}</p>
            )}
            <p className="text-zinc-700 mt-1">{order.shipping_address.street}</p>
            <p className="text-zinc-700">
              {order.shipping_address.city}, Județ: {order.shipping_address.county}, {order.shipping_address.country}
            </p>
            <p className="text-zinc-700">Telefon: {order.customer_phone}</p>
            <p className="text-zinc-700">Email: {order.customer_email}</p>
          </div>

          <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-zinc-600 flex flex-col justify-between">
            <div>
              <span className="font-mono uppercase text-[10px] font-bold text-zinc-500 block">
                Detalii Expediere & Plată
              </span>
              <p className="mt-1">
                <strong>Metodă Livrare:</strong> Fan Courier Express (24h)
              </p>
              <p>
                <strong>Metodă Plată:</strong> Stripe Electronic Card Sandbox (3D Secure)
              </p>
              <p className="font-mono text-[10px] text-zinc-500 mt-1">
                Tranzacție: {order.payment_intent_id || 'pi_test_evergrow_stripe'}
              </p>
            </div>
            <div className="text-[10px] text-zinc-500 pt-2 border-t border-zinc-200">
              Factură conformă cu Legea nr. 227/2015 privind Codul Fiscal.
            </div>
          </div>
        </div>

        {/* Invoice Items Table */}
        <div className="py-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-zinc-900 font-mono uppercase text-[10px] text-zinc-600">
                <th className="py-2.5 px-2">Nr.</th>
                <th className="py-2.5 px-3">Denumire Produs / Serviciu</th>
                <th className="py-2.5 px-2 text-center">U.M.</th>
                <th className="py-2.5 px-2 text-center">Cant.</th>
                <th className="py-2.5 px-3 text-right">Preț Unitar (fără TVA)</th>
                <th className="py-2.5 px-3 text-right">TVA (19%)</th>
                <th className="py-2.5 px-3 text-right">Valoare Totală (RON)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-zinc-800">
              {order.items.map((item, idx) => {
                const itemWithoutVat = Number((item.unit_price / 1.19).toFixed(2));
                const itemVat = Number((item.unit_price - itemWithoutVat).toFixed(2));
                const itemTotal = item.unit_price * item.quantity;
                const totalItemVat = Number((itemVat * item.quantity).toFixed(2));

                return (
                  <tr key={idx} className="hover:bg-zinc-50">
                    <td className="py-3 px-2 font-mono">{idx + 1}</td>
                    <td className="py-3 px-3">
                      <strong className="text-zinc-950 block">{item.product_name}</strong>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        Formulă cosmetică conform Reg. (CE) 1223/2009
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center font-mono">Buc</td>
                    <td className="py-3 px-2 text-center font-mono font-bold">{item.quantity}</td>
                    <td className="py-3 px-3 text-right font-mono">{itemWithoutVat.toFixed(2)}</td>
                    <td className="py-3 px-3 text-right font-mono">{totalItemVat.toFixed(2)}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-zinc-950">
                      {itemTotal.toFixed(2)}
                    </td>
                  </tr>
                );
              })}

              {/* Shipping Row if applicable */}
              {order.shipping_cost > 0 && (
                <tr className="hover:bg-zinc-50">
                  <td className="py-3 px-2 font-mono">{order.items.length + 1}</td>
                  <td className="py-3 px-3">Servicii de transport și curierat rapid (Fan Courier)</td>
                  <td className="py-3 px-2 text-center font-mono">Serv</td>
                  <td className="py-3 px-2 text-center font-mono font-bold">1</td>
                  <td className="py-3 px-3 text-right font-mono">
                    {(order.shipping_cost / 1.19).toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    {(order.shipping_cost - order.shipping_cost / 1.19).toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-zinc-950">
                    {order.shipping_cost.toFixed(2)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Invoice Summary Totals */}
        <div className="pt-4 border-t-2 border-zinc-900 flex flex-col sm:flex-row justify-between items-start gap-6">
          <div className="text-[11px] text-zinc-500 max-w-sm space-y-1">
            <p>Factura este valabilă fără semnătură și ștampilă conform Codului Fiscal, Art. 319 (29).</p>
            <p>Produsele cosmetice au o valabilitate de 24 luni sigilate / 6 luni de la deschidere (PAO).</p>
            <p className="font-mono text-zinc-600">EVERGREEN &amp; ISLE • Pure Natural Skincare Atelier</p>
          </div>

          <div className="w-full sm:w-72 space-y-2 text-xs">
            <div className="flex justify-between text-zinc-600">
              <span>Total fără TVA:</span>
              <span className="font-mono">{subtotalWithoutVat.toFixed(2)} RON</span>
            </div>

            {order.discount_amount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Discount voucher ({order.coupon_code}):</span>
                <span className="font-mono">-{order.discount_amount.toFixed(2)} RON</span>
              </div>
            )}

            <div className="flex justify-between text-zinc-600">
              <span>TVA Colectată (19%):</span>
              <span className="font-mono">{vatAmount.toFixed(2)} RON</span>
            </div>

            <div className="flex justify-between text-base font-serif font-bold text-zinc-950 pt-2 border-t-2 border-zinc-900">
              <span>TOTAL GENERAL:</span>
              <span className="text-xl font-mono">{order.total.toFixed(2)} RON</span>
            </div>
          </div>
        </div>

        {/* Stamp / Signature placeholder block */}
        <div className="mt-12 pt-6 border-t border-zinc-200 flex justify-between text-[11px] text-zinc-500 font-mono">
          <div>
            <span>Întocmit de:</span>
            <p className="font-bold text-zinc-900 mt-1">Departament Financiar EVERGREEN &amp; ISLE</p>
          </div>
          <div className="text-right">
            <span>Semnătură de primire:</span>
            <p className="font-bold text-zinc-900 mt-1">Confirmat electronic prin Stripe</p>
          </div>
        </div>

      </div>

    </div>
  );
}

