'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  ShieldCheck,
  Truck,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';
import { useCart } from '@/lib/store/cart-context';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    discountAmount,
    shippingCost,
    taxAmount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; error: boolean } | null>(null);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponMsg(null);
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponMsg({ text: res.message, error: false });
      setCouponInput('');
    } else {
      setCouponMsg({ text: res.message, error: true });
    }
  };

  const freeShippingThreshold = 200;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] dark:bg-obsidian-950 text-stone-900 dark:text-foreground py-20 px-4 transition-colors">
        <div className="max-w-md mx-auto text-center bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-stone-100 dark:bg-zinc-800/60 flex items-center justify-center mx-auto mb-6 border border-stone-200 dark:border-zinc-700">
            <ShoppingBag className="w-10 h-10 text-teal-800 dark:text-teal-400" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-stone-950 dark:text-white">Coșul Tău este Gol</h1>
          <p className="text-xs text-stone-600 dark:text-zinc-400 mt-2 leading-relaxed">
            Nu ai adăugat încă niciun produs în coș. Explorează gama botanică pură EVERGREEN &amp; ISLE.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/catalog"
              className="min-h-[48px] px-6 py-3 rounded-full bg-teal-800 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 shadow-md shadow-teal-900/20 active:scale-95 touch-manipulation"
            >
              <span>Explorează Catalogul</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/simulator"
              className="min-h-[48px] px-6 py-3 rounded-full bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 text-stone-800 dark:text-zinc-200 font-semibold text-xs transition-colors inline-flex items-center justify-center border border-stone-200 dark:border-zinc-700 active:scale-95 touch-manipulation"
            >
              Recomandare Personalizată (Quiz)
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-obsidian-950 text-stone-900 dark:text-foreground py-8 sm:py-12 px-3 sm:px-6 lg:px-8 transition-colors pb-28 lg:pb-12">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Breadcrumb & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-zinc-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors mb-2 min-h-[44px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continuă Cumpărăturile</span>
            </Link>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950 dark:text-white">Coșul Tău de Cumpărături</h1>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-stone-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 font-mono flex items-center gap-1.5 self-start sm:self-center transition-colors min-h-[44px] py-2 touch-manipulation cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Golește Coșul</span>
          </button>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs mb-2 gap-2">
            <span className="flex items-center gap-2 text-stone-800 dark:text-zinc-200 min-w-0">
              <Truck className="w-4 h-4 text-teal-700 dark:text-teal-400 flex-shrink-0" />
              <span className="truncate">
                {remainingForFreeShipping > 0 ? (
                  <>
                    Mai adaugă produse de{' '}
                    <strong className="text-teal-800 dark:text-teal-300 font-mono">
                      {remainingForFreeShipping.toFixed(2)} RON
                    </strong>{' '}
                    pentru livrare GRATUITĂ.
                  </>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    Ai Livrare Gratuită în toată România!
                  </span>
                )}
              </span>
            </span>
            <span className="text-xs font-mono text-teal-800 dark:text-teal-300 font-bold flex-shrink-0">
              {Math.round(freeShippingProgress)}%
            </span>
          </div>
          <div className="w-full h-2 bg-stone-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-700 to-teal-500 transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Main Grid: Items Table vs Summary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          
          {/* Items List (Left Column) */}
          <div className="lg:col-span-2 bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-xl">
            <div className="divide-y divide-stone-200 dark:divide-zinc-800/80">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className="w-18 h-18 sm:w-20 sm:h-20 w-16 h-16 relative rounded-xl overflow-hidden bg-stone-100 dark:bg-zinc-950 flex-shrink-0 border border-stone-200 dark:border-zinc-800">
                      <Image
                        src={product.images[0] || '/images/mag-evergrow-bottle.png'}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/product/${product.slug}`}
                        className="font-serif font-semibold text-stone-900 dark:text-white hover:text-teal-800 dark:hover:text-teal-300 transition-colors text-sm line-clamp-1"
                      >
                        {product.name}
                      </Link>
                      <div className="text-[11px] font-mono text-stone-500 dark:text-zinc-400 mt-1">
                        Volum: {product.volume} • SKU: {product.sku}
                      </div>
                      <div className="text-xs font-serif font-bold text-teal-800 dark:text-teal-400 mt-1 sm:hidden">
                        {(product.price * quantity).toFixed(2)} RON
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6 pt-2 sm:pt-0 border-t border-stone-100 dark:border-zinc-800 sm:border-0">
                    {/* Quantity Stepper (Thumb-Zone ≥44px) */}
                    <div className="flex items-center border border-stone-300 dark:border-zinc-700 rounded-xl bg-stone-50 dark:bg-obsidian-950 shadow-sm">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 text-stone-600 dark:text-zinc-300 hover:text-stone-900 dark:hover:text-white transition-colors active:scale-95 touch-manipulation"
                        aria-label="Scade cantitate"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-stone-900 dark:text-white min-w-6 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        disabled={quantity >= product.stock}
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 text-stone-600 dark:text-zinc-300 hover:text-stone-900 dark:hover:text-white disabled:opacity-30 transition-colors active:scale-95 touch-manipulation"
                        aria-label="Crește cantitate"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total for item */}
                    <div className="text-right min-w-[100px] hidden sm:block">
                      <div className="font-serif font-bold text-base text-stone-950 dark:text-white">
                        {(product.price * quantity).toFixed(2)} RON
                      </div>
                      <span className="text-[10px] text-stone-500 dark:text-zinc-500 block font-mono">
                        {product.price.toFixed(2)} RON / buc
                      </span>
                    </div>

                    {/* Remove Button (≥44px Touch Target) */}
                    <button
                      onClick={() => removeItem(product.id)}
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-stone-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-xl hover:bg-stone-100 dark:hover:bg-zinc-800 active:scale-95 touch-manipulation"
                      aria-label="Șterge produs din coș"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary (Right Column) */}
          <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-teal-700/30 rounded-2xl p-5 sm:p-6 shadow-sm dark:shadow-xl space-y-6">
            <h2 className="font-serif font-bold text-xl text-stone-950 dark:text-white pb-4 border-b border-stone-200 dark:border-zinc-800">
              Sumar Comandă
            </h2>

            {/* Coupon Code Input */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 uppercase tracking-wider block font-semibold">
                Cupon Cadou / Voucher
              </label>

              {appliedCoupon ? (
                <div className="bg-teal-800/10 border border-teal-700/30 p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-teal-900 dark:text-teal-300 font-semibold">
                    <Tag className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                    <span>
                      Cod: <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discount_percent}%)
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="min-h-[44px] text-xs text-stone-500 dark:text-zinc-400 hover:text-red-500 underline font-mono flex items-center justify-center px-2 touch-manipulation"
                  >
                    Elimină
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCouponSubmit} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Cod voucher (ex: EVERGREEN20)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3 py-2.5 text-base sm:text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 uppercase focus:outline-none focus:border-teal-800"
                  />
                  <button
                    type="submit"
                    className="min-h-[44px] px-4 py-2 bg-stone-200 dark:bg-zinc-800 hover:bg-stone-300 dark:hover:bg-zinc-700 text-stone-800 dark:text-zinc-200 text-xs font-semibold rounded-xl transition-colors active:scale-95 touch-manipulation"
                  >
                    Aplică
                  </button>
                </form>
              )}

              {couponMsg && (
                <p
                  className={`text-[11px] ${
                    couponMsg.error ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {couponMsg.text}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs border-t border-stone-200 dark:border-zinc-800 pt-4">
              <div className="flex justify-between text-stone-600 dark:text-zinc-400">
                <span>Subtotal articole:</span>
                <span className="font-mono text-stone-900 dark:text-zinc-200 font-semibold">{subtotal.toFixed(2)} RON</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-teal-800 dark:text-teal-300 font-semibold">
                  <span>Reducere cupon:</span>
                  <span className="font-mono">-{discountAmount.toFixed(2)} RON</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600 dark:text-zinc-400">
                <span>Livrare (Fan Courier):</span>
                <span className="font-mono text-stone-900 dark:text-zinc-200 font-semibold">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold uppercase text-[10px]">
                      Gratuit
                    </span>
                  ) : (
                    `${shippingCost.toFixed(2)} RON`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-stone-500 dark:text-zinc-500 text-[11px]">
                <span>Valoare TVA (19% inclusă):</span>
                <span className="font-mono">{taxAmount.toFixed(2)} RON</span>
              </div>

              <div className="flex justify-between text-base font-serif font-bold text-stone-950 dark:text-white pt-4 border-t border-stone-200 dark:border-zinc-800">
                <span>Total de plată:</span>
                <span className="text-xl text-teal-800 dark:text-teal-300 font-mono font-bold">{total.toFixed(2)} RON</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <div className="pt-2 space-y-3">
              <button
                onClick={() => router.push('/checkout')}
                className="w-full min-h-[48px] bg-teal-800 hover:bg-teal-700 text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl shadow-teal-900/25 flex items-center justify-center gap-2 group active:scale-95 touch-manipulation"
              >
                <span>Mergi la Pasul de Plată</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 dark:text-zinc-500 pt-2 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Plată securizată Stripe • Factură fiscală inclusă</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Sticky Mobile Bottom Checkout Bar (Thumb-Zone Optimization) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-obsidian-950/95 backdrop-blur-md border-t border-stone-200 dark:border-zinc-800 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] shadow-2xl transition-all">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-stone-500 dark:text-zinc-400 block uppercase">Total Comandă</span>
            <span className="text-base font-serif font-bold text-teal-800 dark:text-teal-300 truncate block">
              {total.toFixed(2)} RON
            </span>
          </div>
          <button
            onClick={() => router.push('/checkout')}
            className="min-h-[48px] px-6 py-3 rounded-xl bg-teal-800 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 touch-manipulation flex items-center gap-2 flex-shrink-0"
          >
            <span>Pasul de Plată</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
