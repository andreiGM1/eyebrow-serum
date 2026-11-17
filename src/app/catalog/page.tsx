'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Filter,
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  RotateCcw,
  X,
  Check,
  Sparkles,
} from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '@/lib/data';
import { useProductsStore } from '@/lib/store/products-store';

function CatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const { products } = useProductsStore();
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(500);

  // Mobile Bottom Sheet Filter Drawer State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Synchronize category filter whenever URL search params change
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Lock body scroll when mobile filter drawer is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileFilterOpen]);

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      router.push('/catalog', { scroll: false });
    } else {
      router.push(`/catalog?category=${slug}`, { scroll: false });
    }
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category match
        if (selectedCategory !== 'all') {
          const cat = INITIAL_CATEGORIES.find((c) => c.slug === selectedCategory);
          if (cat && p.category_id !== cat.id) return false;
        }

        // Price filter
        if (p.price > maxPrice) return false;

        // Search match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            p.name.toLowerCase().includes(q) ||
            p.short_description.toLowerCase().includes(q) ||
            p.full_inci.toLowerCase().includes(q);
          if (!match) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy, maxPrice]);

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0) +
    (maxPrice < 500 ? 1 : 0) +
    (sortBy !== 'featured' ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setMaxPrice(500);
    router.push('/catalog', { scroll: false });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-obsidian-950 text-stone-900 dark:text-foreground py-6 sm:py-12 px-3 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-5 sm:space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-teal-800 dark:text-teal-400 font-semibold">
            EVERGREEN &amp; ISLE • NATURAL SKINCARE
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-950 dark:text-white">
            Tratamente Botanice pentru Regenerarea Sprâncenelor
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400 max-w-xl mx-auto">
            Formule concentrate de lux, 100% active, realizate în micro-loturi proaspete în atelierul nostru.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            MOBILE COMPACT FILTER BAR & TRIGGER (Screens < 640px)
           ───────────────────────────────────────────────────────────── */}
        <div className="sm:hidden space-y-3">
          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Caută ser sau ingredient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-obsidian-900 border border-stone-300 dark:border-zinc-800 rounded-xl pl-9 pr-3 py-2.5 text-base text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:border-teal-800"
              />
            </div>

            {/* Filter Drawer Trigger Button (≥44px Touch Target) */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white dark:bg-obsidian-900 border border-stone-300 dark:border-zinc-800 text-stone-800 dark:text-zinc-200 font-semibold text-xs flex items-center gap-2 active:scale-95 touch-manipulation shadow-sm cursor-pointer"
              aria-label="Deschide opțiunile de filtrare și sortare"
            >
              <SlidersHorizontal className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              <span>Filtre</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-teal-800 text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Quick Horizontal Categories Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 -mx-2 px-2 touch-manipulation">
            <button
              onClick={() => handleCategorySelect('all')}
              className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-teal-800 text-white font-bold shadow-md shadow-teal-900/20'
                  : 'bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 text-stone-700 dark:text-zinc-300'
              }`}
            >
              Toate
            </button>
            {INITIAL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.slug)}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-teal-800 text-white font-bold shadow-md shadow-teal-900/20'
                    : 'bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 text-stone-700 dark:text-zinc-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            DESKTOP INLINE FILTER BAR (Screens >= 640px)
           ───────────────────────────────────────────────────────────── */}
        <div className="hidden sm:block bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm dark:shadow-xl space-y-4 transition-colors">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 items-center">
            
            {/* Search input */}
            <div className="relative sm:col-span-2">
              <Search className="w-4 h-4 text-stone-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Caută ser, accesoriu sau ingredient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-teal-700"
              />
            </div>

            {/* Sort selector */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-stone-400 dark:text-zinc-500 flex-shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-teal-700"
              >
                <option value="featured">Sortare: Recomandate (Bestsellers)</option>
                <option value="rating">Sortare: Cele mai apreciate (Rating)</option>
                <option value="price-asc">Sortare: Preț crescător</option>
                <option value="price-desc">Sortare: Preț descrescător</option>
              </select>
            </div>

            {/* Price filter slider */}
            <div className="flex items-center gap-3">
              <div className="text-xs text-stone-600 dark:text-zinc-400 font-mono flex-shrink-0">
                Max: <strong className="text-teal-800 dark:text-teal-400">{maxPrice} RON</strong>
              </div>
              <input
                type="range"
                min="40"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-800"
              />
            </div>
          </div>

          {/* Categories Pill Tabs */}
          <div className="flex items-center gap-2 pt-2 border-t border-stone-200 dark:border-zinc-800/80 overflow-x-auto no-scrollbar py-1 sm:flex-wrap">
            <button
              onClick={() => handleCategorySelect('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-teal-800 text-white font-bold shadow-md shadow-teal-900/20'
                  : 'bg-stone-100 dark:bg-obsidian-950 border border-stone-200 dark:border-zinc-800 text-stone-700 dark:text-zinc-400 hover:text-stone-950 dark:hover:text-white hover:border-stone-300 dark:hover:border-zinc-700'
              }`}
            >
              Toate Categoriile
            </button>

            {INITIAL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-teal-800 text-white font-bold shadow-md shadow-teal-900/20'
                    : 'bg-stone-100 dark:bg-obsidian-950 border border-stone-200 dark:border-zinc-800 text-stone-700 dark:text-zinc-400 hover:text-stone-950 dark:hover:text-white hover:border-stone-300 dark:border-zinc-700'
                }`}
              >
                {cat.name}
              </button>
            ))}

            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="ml-auto text-xs text-stone-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-1 font-mono transition-colors whitespace-nowrap flex-shrink-0 pl-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Resetează</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-stone-600 dark:text-zinc-400 px-1">
          <span>
            Afișăm <strong className="text-stone-950 dark:text-white">{filteredProducts.length}</strong> produse
          </span>
          <span className="hidden sm:inline">Livrare în 24-48h prin curier rapid</span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 sm:py-20 text-center bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <SlidersHorizontal className="w-12 h-12 text-stone-400 dark:text-zinc-600 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-bold text-stone-950 dark:text-white">
              Niciun produs nu corespunde filtrelor selectate
            </h3>
            <p className="text-xs text-stone-600 dark:text-zinc-400 mt-2 max-w-sm mx-auto">
              Încearcă să resetezi căutarea sau filtrele de preț pentru a descoperi întreaga gamă EVERGREEN &amp; ISLE.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 min-h-[44px] px-6 py-2.5 rounded-full bg-teal-800 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md active:scale-95 touch-manipulation"
            >
              Resetează Toate Filtrele
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE BOTTOM SHEET FILTER DRAWER (CRO Ergonomic Sertar)
         ───────────────────────────────────────────────────────────── */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Drawer sliding up */}
          <div className="fixed inset-x-0 bottom-0 z-50 bg-white dark:bg-obsidian-950 rounded-t-3xl max-h-[85dvh] overflow-y-auto p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] shadow-2xl space-y-5 animate-in slide-in-from-bottom duration-300 border-t border-stone-200 dark:border-teal-700/30">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-teal-800 dark:text-teal-400" />
                <h3 className="font-serif font-bold text-base text-stone-950 dark:text-white">
                  Filtrează &amp; Sortează
                </h3>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white transition-colors active:scale-95 touch-manipulation"
                aria-label="Închide sertarul de filtre"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sort Order Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-zinc-400 font-bold block">
                Sortare Produse
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-stone-50 dark:bg-obsidian-900 border border-stone-300 dark:border-zinc-800 rounded-xl px-3.5 py-3 text-base text-stone-900 dark:text-white focus:outline-none focus:border-teal-800"
              >
                <option value="featured">Recomandate (Bestsellers)</option>
                <option value="rating">Cele mai apreciate (Rating)</option>
                <option value="price-asc">Preț crescător</option>
                <option value="price-desc">Preț descrescător</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="uppercase tracking-wider text-stone-600 dark:text-zinc-400 font-bold">
                  Preț Maxim:
                </span>
                <span className="font-bold text-teal-800 dark:text-teal-300 text-sm">
                  {maxPrice} RON
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-800"
              />
            </div>

            {/* Categories Selection */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-zinc-400 font-bold block">
                Categorie
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleCategorySelect('all')}
                  className={`min-h-[44px] p-2.5 rounded-xl border text-xs font-medium text-left transition-all flex items-center justify-between touch-manipulation ${
                    selectedCategory === 'all'
                      ? 'border-teal-800 bg-teal-800/10 text-teal-900 dark:text-teal-200 font-bold'
                      : 'border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-obsidian-900 text-stone-700 dark:text-zinc-300'
                  }`}
                >
                  <span>Toate Categoriile</span>
                  {selectedCategory === 'all' && <Check className="w-4 h-4 text-teal-800 dark:text-teal-400" />}
                </button>
                {INITIAL_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.slug)}
                    className={`min-h-[44px] p-2.5 rounded-xl border text-xs font-medium text-left transition-all flex items-center justify-between touch-manipulation ${
                      selectedCategory === cat.slug
                        ? 'border-teal-800 bg-teal-800/10 text-teal-900 dark:text-teal-200 font-bold'
                        : 'border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-obsidian-900 text-stone-700 dark:text-zinc-300'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    {selectedCategory === cat.slug && <Check className="w-4 h-4 text-teal-800 dark:text-teal-400 flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions: Apply & Reset */}
            <div className="pt-3 border-t border-stone-200 dark:border-zinc-800 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 min-h-[48px] py-3 px-4 rounded-xl bg-teal-800 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 touch-manipulation text-center"
              >
                Vezi Rezultatele ({filteredProducts.length})
              </button>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="min-h-[48px] px-4 py-3 rounded-xl border border-stone-300 dark:border-zinc-700 text-xs font-mono text-stone-600 dark:text-zinc-400 hover:text-red-500 transition-colors active:scale-95 touch-manipulation"
                >
                  Resetează
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] dark:bg-obsidian-950 text-stone-900 dark:text-white flex items-center justify-center font-mono text-xs">Se încarcă catalogul...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
