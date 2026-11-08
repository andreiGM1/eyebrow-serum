'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Filter, SlidersHorizontal, ArrowUpDown, Search, RotateCcw } from 'lucide-react';
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

  // Synchronize category filter whenever URL search params change (Header Mega-Menu, Mobile Drawer, Footer, etc.)
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

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
        // default featured
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy, maxPrice]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setMaxPrice(500);
    router.push('/catalog', { scroll: false });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-obsidian-950 text-stone-900 dark:text-foreground py-8 sm:py-12 px-3 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold-700 dark:text-gold-400 font-semibold">
            MAG Laboratories Bucharest • Catalog Oficial
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-950 dark:text-white">
            Tratamente Botanice pentru Regenerarea Sprâncenelor
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400 max-w-xl mx-auto">
            Formule concentrate de lux, 100% active, realizate în micro-loturi proaspete în atelierul nostru.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm dark:shadow-xl space-y-4 transition-colors">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 items-center">
            
            {/* Search input */}
            <div className="relative sm:col-span-2">
              <Search className="w-4 h-4 text-stone-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Caută ser, accesoriu sau ingredient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gold-500/60"
              />
            </div>

            {/* Sort selector */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-stone-400 dark:text-zinc-500 flex-shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-gold-500/60"
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
                Max: <strong className="text-gold-700 dark:text-gold-400">{maxPrice} RON</strong>
              </div>
              <input
                type="range"
                min="40"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
            </div>
          </div>

          {/* Categories Pill Tabs (Horizontal swipeable on mobile) */}
          <div className="flex items-center gap-2 pt-2 border-t border-stone-200 dark:border-zinc-800/80 overflow-x-auto no-scrollbar py-1 -mx-2 px-2 sm:mx-0 sm:px-0 sm:flex-wrap">
            <button
              onClick={() => handleCategorySelect('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-gold-500 text-obsidian-950 font-bold shadow-md shadow-gold-500/20'
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
                    ? 'bg-gold-500 text-obsidian-950 font-bold shadow-md shadow-gold-500/20'
                    : 'bg-stone-100 dark:bg-obsidian-950 border border-stone-200 dark:border-zinc-800 text-stone-700 dark:text-zinc-400 hover:text-stone-950 dark:hover:text-white hover:border-stone-300 dark:hover:border-zinc-700'
                }`}
              >
                {cat.name}
              </button>
            ))}

            {(selectedCategory !== 'all' || searchQuery || maxPrice < 500) && (
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
          <span>Livrare în 24-48h prin curier rapid</span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
            <SlidersHorizontal className="w-12 h-12 text-stone-400 dark:text-zinc-600 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-bold text-stone-950 dark:text-white">
              Niciun produs nu corespunde filtrelor selectate
            </h3>
            <p className="text-xs text-stone-600 dark:text-zinc-400 mt-2 max-w-sm mx-auto">
              Încearcă să resetezi căutarea sau filtrele de preț pentru a descoperi întreaga gamă Evergrow.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 px-5 py-2 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase transition-colors"
            >
              Resetează Toate Filtrele
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] dark:bg-obsidian-950 text-stone-900 dark:text-white flex items-center justify-center">Se încarcă catalogul...</div>}>
      <CatalogContent />
    </Suspense>
  );
}

