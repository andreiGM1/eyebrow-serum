'use client';

import React, { useState } from 'react';
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
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-obsidian-900 border-l border-gold-500/20 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <h2 className="font-serif font-bold text-lg text-white">Coșul Tău de Cumpărături</h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1 text-zinc-400 hover:text-white rounded-lg transition-colors"
              aria-label="Închide coșul"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Bar */}
          <div className="bg-obsidian-950 px-6 py-3 border-b border-zinc-800/80">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Truck className="w-3.5 h-3.5 text-gold-400" />
                {remainingForFreeShipping > 0 ? (
                  <>Mai adaugă <strong className="text-gold-400 font-mono">{remainingForFreeShipping.toFixed(2)} RON</strong> pentru transport GRATUIT</>
                ) : (
                  <span className="text-emerald-400 font-semibold">Felicitări! Ai transport GRATUIT</span>
                )}
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                {Math.round(freeShippingProgress)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold-500 to-amber-300 transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-zinc-800/60">
            {items.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mx-auto mb-4 border border-zinc-700/50">
                  <ShoppingBag className="w-8 h-8 text-zinc-500" />
                </div>
                <h3 className="font-serif text-base font-semibold text-zinc-200">
                  Coșul tău este gol
                </h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
                  Descoperă serurile bio-active MAG EVERGROW și începe regenerarea completă a sprâncenelor.
                </p>
                <Link
                  href="/catalog"
                  onClick={closeCart}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-semibold text-xs tracking-wider uppercase transition-colors"
                >
                  Explorează Catalogul &rarr;
                </Link>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div key={product.id} className="pt-4 first:pt-0 flex gap-4">
                  <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-zinc-950 flex-shrink-0 border border-zinc-800">
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
                          className="text-xs font-serif font-semibold text-white hover:text-gold-300 transition-colors line-clamp-1"
                        >
                          {product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                          aria-label="Șterge produs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                        {product.volume}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-zinc-700 rounded-md bg-zinc-900/80">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-2 py-1 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                          aria-label="Scade cantitate"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-medium text-white min-w-6 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          disabled={quantity >= product.stock}
                          className="px-2 py-1 text-zinc-300 hover:text-white hover:bg-zinc-800 disabled:opacity-40 transition-colors"
                          aria-label="Crește cantitate"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-serif font-bold text-gold-400">
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
            <div className="p-6 bg-obsidian-950 border-t border-zinc-800 space-y-4">
              
              {/* Voucher Code Form */}
              <div className="space-y-1.5">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-gold-500/10 border border-gold-500/30 px-3 py-2 rounded-lg text-xs">
                    <span className="flex items-center gap-1.5 text-gold-300">
                      <Tag className="w-3.5 h-3.5 text-gold-400" />
                      Cod aplicat: <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discount_percent}%)
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-zinc-400 hover:text-red-400 text-xs font-mono underline"
                    >
                      Elimină
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Cod cupon (ex: BROWVIP15)"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      className="flex-1 bg-obsidian-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 uppercase focus:outline-none focus:border-gold-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs rounded-lg transition-colors font-medium"
                    >
                      Aplică
                    </button>
                  </form>
                )}

                {couponError && (
                  <p className="text-[11px] text-red-400 pl-1">{couponError}</p>
                )}
                {couponSuccess && (
                  <p className="text-[11px] text-emerald-400 pl-1">{couponSuccess}</p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs border-t border-zinc-800/80 pt-3">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal produse:</span>
                  <span className="font-mono text-zinc-200">{subtotal.toFixed(2)} RON</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-gold-400 font-medium">
                    <span>Discount promoțional:</span>
                    <span className="font-mono">-{discountAmount.toFixed(2)} RON</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-400">
                  <span>Cost livrare (Fan Courier):</span>
                  <span className="font-mono text-zinc-200">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-400 font-semibold uppercase text-[10px]">Gratuit</span>
                    ) : (
                      `${shippingCost.toFixed(2)} RON`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-zinc-500 text-[11px]">
                  <span>Din care TVA (19% inclus):</span>
                  <span className="font-mono">{taxAmount.toFixed(2)} RON</span>
                </div>

                <div className="flex justify-between text-sm font-serif font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Total de plată:</span>
                  <span className="text-base text-gold-400 font-mono">{total.toFixed(2)} RON</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    closeCart();
                    router.push('/checkout');
                  }}
                  className="w-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 group"
                >
                  <span>Finalizează Comanda</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-center">
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="text-xs text-zinc-400 hover:text-gold-300 underline"
                  >
                    Vezi pagina detaliată a coșului
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                <span>Factură fiscală inclusă • Plată securizată Stripe Test</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
