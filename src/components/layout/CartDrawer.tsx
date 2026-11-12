'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  Check,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { useCart } from '@/lib/store/cart-context';

export default function CartDrawer() {
  const router = useRouter();
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingCost,
    taxAmount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Prevent background scroll on mobile/desktop when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    if (!couponCodeInput.trim()) return;

    const res = applyCoupon(couponCodeInput);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponCodeInput('');
    } else {
      setCouponError(res.message);
    }
  };

  const freeShippingThreshold = 200;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-obsidian-900 border-l border-stone-200 dark:border-teal-700/30 shadow-2xl flex flex-col justify-between text-stone-900 dark:text-zinc-100 transition-colors">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-teal-800 dark:text-teal-400" />
              <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-white">Coșul Tău de Cumpărături</h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1 text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white rounded-lg transition-colors"
              aria-label="Închide coșul"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Bar */}
          <div className="bg-stone-50 dark:bg-obsidian-950 px-6 py-3 border-b border-stone-200 dark:border-zinc-800/80">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 text-stone-700 dark:text-zinc-300">
                <Truck className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                {remainingForFreeShipping > 0 ? (
                  <>Mai adaugă <strong className="text-teal-800 dark:text-teal-300 font-mono">{remainingForFreeShipping.toFixed(2)} RON</strong> pentru transport GRATUIT</>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Felicitări! Ai transport GRATUIT</span>
                )}
              </span>
              <span className="text-[10px] font-mono text-stone-500 dark:text-zinc-500 font-semibold">
                {Math.round(freeShippingProgress)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-700 to-teal-500 transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-stone-200 dark:divide-zinc-800/60">
            {items.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-zinc-800/50 flex items-center justify-center mx-auto mb-4 border border-stone-200 dark:border-zinc-700/50">
                  <ShoppingBag className="w-8 h-8 text-stone-400 dark:text-zinc-500" />
                </div>
                <h3 className="font-serif text-base font-semibold text-stone-900 dark:text-zinc-200">
                  Coșul tău este gol
                </h3>
                <p className="text-xs text-stone-600 dark:text-zinc-400 mt-1 max-w-xs mx-auto">
                  Descoperă tratamentele botanice pure EVERGREEN &amp; ISLE și începe regenerarea naturală a sprâncenelor.
                </p>
                <Link
                  href="/catalog"
                  onClick={closeCart}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-800 hover:bg-teal-700 text-white font-semibold text-xs tracking-wider uppercase transition-colors"
                >
                  Explorează Catalogul &rarr;
                </Link>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div key={product.id} className="pt-4 first:pt-0 flex gap-4">
                  <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-stone-100 dark:bg-zinc-950 flex-shrink-0 border border-stone-200 dark:border-zinc-800">
                    <Image
                      src={product.images[0] || '/images/mag-evergrow-bottle.png'}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={closeCart}
                          className="text-xs font-serif font-semibold text-stone-900 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 transition-colors line-clamp-1"
                        >
                          {product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-stone-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400 transition-colors p-1"
                          aria-label="Șterge produs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-stone-500 dark:text-zinc-400 font-mono mt-0.5">
                        {product.volume}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-stone-300 dark:border-zinc-700 rounded-md bg-stone-50 dark:bg-zinc-900/80">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-2 py-1 text-stone-600 dark:text-zinc-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-zinc-800 transition-colors"
                          aria-label="Scade cantitate"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-medium text-stone-900 dark:text-white min-w-6 text-center font-bold">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          disabled={quantity >= product.stock}
                          className="px-2 py-1 text-stone-600 dark:text-zinc-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-zinc-800 disabled:opacity-40 transition-colors"
                          aria-label="Crește cantitate"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-serif font-bold text-teal-800 dark:text-teal-300">
                          {(product.price * quantity).toFixed(2)} RON
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-stone-50 dark:bg-obsidian-950 border-t border-stone-200 dark:border-zinc-800 space-y-4">
              
              {/* Voucher Code Form */}
              <div className="space-y-1.5">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-teal-800/10 border border-teal-700/30 px-3 py-2 rounded-lg text-xs">
                    <span className="flex items-center gap-1.5 text-teal-900 dark:text-teal-200 font-medium">
                      <Tag className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                      Cod aplicat: <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discount_percent}%)
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-stone-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400 text-xs font-mono underline"
                    >
                      Elimină
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Cod cupon (ex: EVERGREEN20)"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      className="flex-1 bg-white dark:bg-obsidian-900 border border-stone-300 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 uppercase focus:outline-none focus:border-teal-700"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-stone-800 dark:text-zinc-200 text-xs rounded-lg transition-colors font-semibold"
                    >
                      Aplică
                    </button>
                  </form>
                )}

                {couponError && (
                  <p className="text-[11px] text-red-600 dark:text-red-400 pl-1 font-medium">{couponError}</p>
                )}
                {couponSuccess && (
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 pl-1 font-medium">{couponSuccess}</p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs border-t border-stone-200 dark:border-zinc-800/80 pt-3">
                <div className="flex justify-between text-stone-600 dark:text-zinc-400">
                  <span>Subtotal produse:</span>
                  <span className="font-mono text-stone-900 dark:text-zinc-200 font-semibold">{subtotal.toFixed(2)} RON</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-teal-800 dark:text-teal-300 font-semibold">
                    <span>Discount promoțional:</span>
                    <span className="font-mono">-{discountAmount.toFixed(2)} RON</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600 dark:text-zinc-400">
                  <span>Cost livrare (Fan Courier):</span>
                  <span className="font-mono text-stone-900 dark:text-zinc-200 font-semibold">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase text-[10px]">Gratuit</span>
                    ) : (
                      `${shippingCost.toFixed(2)} RON`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-stone-500 dark:text-zinc-500 text-[11px]">
                  <span>Din care TVA (19% inclus):</span>
                  <span className="font-mono">{taxAmount.toFixed(2)} RON</span>
                </div>

                <div className="flex justify-between text-sm font-serif font-bold text-stone-950 dark:text-white pt-2 border-t border-stone-200 dark:border-zinc-800">
                  <span>Total de plată:</span>
                  <span className="text-base text-teal-800 dark:text-teal-300 font-mono font-bold">{total.toFixed(2)} RON</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    closeCart();
                    router.push('/checkout');
                  }}
                  className="w-full bg-teal-800 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 group"
                >
                  <span>Finalizează Comanda</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-center">
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="text-xs text-stone-500 dark:text-zinc-400 hover:text-teal-800 dark:hover:text-teal-300 underline"
                  >
                    Vezi pagina detaliată a coșului
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 dark:text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-zinc-400" />
                <span>Factură fiscală inclusă • Plată securizată Stripe Test</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
