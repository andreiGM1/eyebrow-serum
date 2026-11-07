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
        <div className="max-w-md mx-auto text-center bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-10 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-stone-100 dark:bg-zinc-800/60 flex items-center justify-center mx-auto mb-6 border border-stone-200 dark:border-zinc-700">
            <ShoppingBag className="w-10 h-10 text-gold-600 dark:text-gold-400" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-stone-950 dark:text-white">Coșul Tău este Gol</h1>
          <p className="text-xs text-stone-600 dark:text-zinc-400 mt-2 leading-relaxed">
            Nu ai adăugat încă niciun produs în coș. Explorează gama MAG Evergrow formulată în laboratorul din București.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/catalog"
              className="px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 shadow-md shadow-gold-500/20 active:scale-95"
            >
              <span>Explorează Catalogul</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/simulator"
              className="px-6 py-3 rounded-full bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 text-stone-800 dark:text-zinc-200 font-semibold text-xs transition-colors inline-flex items-center justify-center border border-stone-200 dark:border-zinc-700"
            >
              Recomandare Personalizată (Quiz)
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-obsidian-950 text-stone-900 dark:text-foreground py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Breadcrumb & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-zinc-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continuă Cumpărăturile</span>
            </Link>
            <h1 className="font-serif text-3xl font-bold text-stone-950 dark:text-white">Coșul Tău de Cumpărături</h1>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-stone-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 font-mono flex items-center gap-1 self-start sm:self-center transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Golește Coșul</span>
          </button>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="flex items-center gap-2 text-stone-800 dark:text-zinc-200">
              <Truck className="w-4 h-4 text-gold-600 dark:text-gold-400" />
              {remainingForFreeShipping > 0 ? (
                <>
                  Mai adaugă produse de{' '}
                  <strong className="text-gold-700 dark:text-gold-400 font-mono">
                    {remainingForFreeShipping.toFixed(2)} RON
                  </strong>{' '}
                  pentru a beneficia de livrare GRATUITĂ prin curier rapid.
                </>
              ) : (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  Comanda ta beneficiază de Livrare Gratuită în toată România!
                </span>
              )}
            </span>
            <span className="text-xs font-mono text-gold-700 dark:text-gold-400 font-bold">
              {Math.round(freeShippingProgress)}%
            </span>
          </div>
          <div className="w-full h-2 bg-stone-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold-500 to-amber-400 transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Main Grid: Items Table vs Summary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Items List (Left Column) */}
          <div className="lg:col-span-2 bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-xl">
            <div className="divide-y divide-stone-200 dark:divide-zinc-800/80">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-stone-100 dark:bg-zinc-950 flex-shrink-0 border border-stone-200 dark:border-zinc-800">
                      <Image
                        src={product.images[0] || '/images/mag-evergrow-bottle.png'}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/product/${product.slug}`}
                        className="font-serif font-semibold text-stone-900 dark:text-white hover:text-gold-600 dark:hover:text-gold-300 transition-colors text-sm line-clamp-1"
                      >
                        {product.name}
                      </Link>
                      <div className="text-xs font-mono text-stone-500 dark:text-zinc-400 mt-1">
                        Volum: {product.volume} • SKU: {product.sku}
                      </div>
                      <div className="text-xs font-serif font-bold text-gold-700 dark:text-gold-400 mt-1 sm:hidden">
                        {product.price.toFixed(2)} RON
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                    {/* Quantity */}
                    <div className="flex items-center border border-stone-300 dark:border-zinc-700 rounded-xl bg-stone-50 dark:bg-obsidian-950 shadow-sm">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="px-2.5 py-1.5 text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white transition-colors"
                        aria-label="Scade"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-mono font-bold text-stone-900 dark:text-white min-w-6 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        disabled={quantity >= product.stock}
                        className="px-2.5 py-1.5 text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white disabled:opacity-30 transition-colors"
                        aria-label="Crește"
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

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(product.id)}
                      className="p-2 text-stone-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-stone-100 dark:hover:bg-zinc-800"
                      aria-label="Șterge produs"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary (Right Column) */}
          <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-gold-500/30 rounded-2xl p-6 shadow-sm dark:shadow-xl space-y-6">
            <h2 className="font-serif font-bold text-xl text-stone-950 dark:text-white pb-4 border-b border-stone-200 dark:border-zinc-800">
              Sumar Comandă
            </h2>

            {/* Coupon Code Input */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 uppercase tracking-wider block font-semibold">
                Cupon Cadou / Voucher
              </label>

              {appliedCoupon ? (
                <div className="bg-gold-500/10 border border-gold-500/30 p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gold-800 dark:text-gold-300 font-semibold">
                    <Tag className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                    <span>
                      Cod: <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discount_percent}%)
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-stone-500 dark:text-zinc-400 hover:text-red-500 underline font-mono"
                  >
                    Elimină
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCouponSubmit} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Cod voucher (ex: BROWVIP15)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 uppercase focus:outline-none focus:border-gold-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-200 dark:bg-zinc-800 hover:bg-stone-300 dark:hover:bg-zinc-700 text-stone-800 dark:text-zinc-200 text-xs font-semibold rounded-xl transition-colors"
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
                <div className="flex justify-between text-gold-700 dark:text-gold-400 font-semibold">
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
                <span className="text-xl text-gold-700 dark:text-gold-400 font-mono">{total.toFixed(2)} RON</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <div className="pt-2 space-y-3">
              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl shadow-gold-500/20 flex items-center justify-center gap-2 group active:scale-95"
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
    </div>
  );
}

