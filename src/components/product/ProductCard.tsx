'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag, Check, Eye, Sparkles, Feather } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/store/cart-context';
import StockBadge from './StockBadge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const discountPercent =
    product.compare_at_price && product.compare_at_price > product.price
      ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
      : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock <= 0) return;
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div className="group relative bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800/80 hover:border-teal-700/50 dark:hover:border-teal-400/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-900/10 flex flex-col justify-between shadow-sm">
      
      {/* Top Image Section */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100 dark:bg-zinc-950">
        <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
          <Image
            src={product.images[0] || '/images/mag-evergrow-bottle.png'}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover object-center transition-all duration-500 ease-out ${
              product.images[1] ? 'group-hover:opacity-0 group-hover:scale-105' : 'group-hover:scale-105'
            }`}
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} - Prezentare Deschis`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"
            />
          )}
        </Link>

        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start pointer-events-none">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-teal-800 text-white dark:bg-teal-700 shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-teal-200" />
              <span>{product.badge}</span>
            </span>
          )}
          {discountPercent && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-red-600 text-white shadow-md">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Volume tag (Fixed for Light & Dark mode contrast) */}
        <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-obsidian-950/85 backdrop-blur-sm border border-stone-300 dark:border-zinc-800/80 px-2.5 py-0.5 rounded text-[10px] font-mono text-stone-800 dark:text-zinc-300 shadow-sm font-semibold">
          {product.volume}
        </div>

        {/* Quick View overlay button */}
        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none"
        >
          <span className="px-4 py-2 rounded-full bg-obsidian-950/90 border border-teal-500/60 text-teal-200 text-xs font-medium flex items-center gap-1.5 shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-3.5 h-3.5 text-teal-300" />
            Vezi Detalii & Ingrediente
          </span>
        </Link>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Reviews Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-500 text-amber-500'
                      : 'text-stone-300 dark:text-zinc-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-mono text-stone-500 dark:text-zinc-400">
              {product.rating.toFixed(2)} ({product.review_count})
            </span>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif font-semibold text-base text-stone-900 dark:text-zinc-100 group-hover:text-teal-800 dark:group-hover:text-teal-300 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Subtitle / Short Description */}
          <p className="text-xs text-stone-600 dark:text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
            {product.short_description}
          </p>

          {/* Active Ingredients Highlights with Feather Pictogram */}
          {product.active_ingredients && product.active_ingredients.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {product.active_ingredients.slice(0, 3).map((ing, idx) => (
                <span
                  key={idx}
                  className="text-[9px] px-1.5 py-0.5 rounded bg-teal-800/10 text-teal-950 dark:text-teal-200 border border-teal-700/20 font-mono flex items-center gap-1 font-medium"
                >
                  <Feather className="w-2.5 h-2.5 text-teal-700 dark:text-teal-400" />
                  <span>{ing.name.split('(')[0].trim()}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Section: Stock, Price & Add Button */}
        <div className="mt-5 pt-4 border-t border-stone-200 dark:border-zinc-800/80">
          <div className="mb-3">
            <StockBadge stock={product.stock} />
          </div>

          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-serif font-bold text-stone-950 dark:text-white">
                  {product.price.toFixed(2)} RON
                </span>
                {product.compare_at_price && (
                  <span className="text-xs text-stone-400 dark:text-zinc-500 line-through font-mono">
                    {product.compare_at_price.toFixed(2)} RON
                  </span>
                )}
              </div>
              <span className="text-[10px] text-stone-500 dark:text-zinc-500 block">TVA 19% inclus</span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`px-3.5 py-2.5 rounded-xl font-medium text-xs flex items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-md ${
                product.stock <= 0
                  ? 'bg-stone-200 dark:bg-zinc-800 text-stone-400 dark:text-zinc-500 cursor-not-allowed border border-stone-300 dark:border-zinc-700/40'
                  : isAdded
                  ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                  : 'bg-teal-800 hover:bg-teal-700 text-white dark:bg-teal-700 dark:hover:bg-teal-600 font-semibold shadow-teal-900/20'
              }`}
              aria-label="Adaugă în coș"
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 animate-in zoom-in" />
                  <span>Adăugat</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Adaugă</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
