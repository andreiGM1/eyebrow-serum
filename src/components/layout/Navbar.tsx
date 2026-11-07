'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  User,
  FlaskConical,
  ArrowRight,
  Sun,
  Moon,
  Feather,
  Layers,
  Compass,
} from 'lucide-react';
import { useCart } from '@/lib/store/cart-context';
import { useTheme } from '@/lib/store/theme-context';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '@/lib/data';
import { Product } from '@/lib/types';

export default function Navbar() {
  const router = useRouter();
  const { totalItemsCount, openCart } = useCart();
  const { theme, toggleTheme } = useTheme();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      const q = searchQuery.toLowerCase().trim();
      const results = INITIAL_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.short_description.toLowerCase().includes(q) ||
          p.full_inci.toLowerCase().includes(q) ||
          p.benefits.some((b) => b.toLowerCase().includes(q))
      );
      setSearchResults(results.slice(0, 5));
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleMegaMenuEnter = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setIsMegaMenuOpen(true);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 250);
  };

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-[#EFE9DF] dark:bg-botanical-950 border-b border-stone-200 dark:border-gold-500/20 text-xs py-2 px-4 text-center text-stone-800 dark:text-zinc-300 font-sans tracking-wider uppercase flex items-center justify-center gap-2 transition-colors">
        <span className="w-1.5 h-1.5 rounded-full bg-gold-600 dark:bg-gold-400 animate-ping" />
        <span className="font-medium text-[11px] sm:text-xs">
          LIVRARE GRATUITĂ ÎN TOATĂ ROMÂNIA LA COMENZI PESTE 200 RON • FORMULE BIOACTIVE COMPOUNDATE ÎN BUCUREȘTI
        </span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-obsidian-950/90 backdrop-blur-md border-b border-stone-200 dark:border-gold-500/15 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-stone-700 dark:text-zinc-300 hover:text-gold-600 dark:hover:text-gold-400 focus:outline-none transition-colors"
            aria-label="Deschide Meniul"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo */}
          <Link href="/" className="flex flex-col items-start group">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-serif tracking-[0.25em] font-bold text-stone-950 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                MAG
              </span>
              <span className="text-xs uppercase px-1.5 py-0.5 rounded bg-gold-500/15 border border-gold-500/40 text-gold-700 dark:text-gold-400 font-mono tracking-widest font-semibold">
                LABORATORIES
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-stone-500 dark:text-zinc-400 font-sans mt-0.5">
              EVERGROW • ATELIER BOTANIQUE • BUCHAREST
            </span>
          </Link>

          {/* Desktop Navigation Links & Mega Menu Trigger */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium tracking-wide">
            
            {/* Mega Menu Parent: Catalog */}
            <div
              className="relative"
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleMegaMenuLeave}
            >
              <Link
                href="/catalog"
                className="flex items-center gap-1.5 text-stone-700 dark:text-zinc-300 hover:text-gold-600 dark:hover:text-gold-400 py-6 transition-colors group"
              >
                <Layers className="w-4 h-4 text-stone-500 dark:text-zinc-400 group-hover:text-gold-600 dark:group-hover:text-gold-400 group-hover:rotate-12 transition-transform duration-300" />
                <span>CATALOG PRODUSE</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-gold-600 dark:text-gold-400' : ''}`} />
              </Link>

              {/* Mega Menu Dropdown */}
              {isMegaMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white/98 dark:bg-obsidian-900/95 backdrop-blur-xl border border-stone-200 dark:border-gold-500/30 rounded-b-2xl shadow-2xl p-6 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="col-span-2 pb-2 border-b border-stone-200 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-gold-600 dark:text-gold-400 tracking-wider flex items-center gap-1.5 font-bold">
                      <Feather className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
                      Categoriile Noastre de Excelență Botanică
                    </span>
                    <Link
                      href="/catalog"
                      onClick={() => setIsMegaMenuOpen(false)}
                      className="text-xs text-stone-500 dark:text-zinc-400 hover:text-gold-600 dark:hover:text-gold-400 flex items-center gap-1 group font-medium"
                    >
                      Vezi tot catalogul <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {INITIAL_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/catalog?category=${cat.slug}`}
                      onClick={() => setIsMegaMenuOpen(false)}
                      className="p-3.5 rounded-xl border border-stone-200 dark:border-zinc-800/80 hover:border-gold-500/50 bg-stone-50/70 dark:bg-obsidian-850/60 hover:bg-stone-100 dark:hover:bg-zinc-800/40 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="text-sm font-serif font-semibold text-stone-900 dark:text-zinc-100 group-hover:text-gold-600 dark:group-hover:text-gold-300 transition-colors flex items-center justify-between">
                          <span>{cat.name}</span>
                          <span className="text-gold-600 dark:text-gold-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                        </div>
                        <p className="text-xs text-stone-600 dark:text-zinc-400 mt-1 line-clamp-2">
                          {cat.description}
                        </p>
                      </div>
                      <span className="text-[11px] text-gold-600 dark:text-gold-400/90 font-mono mt-3 group-hover:underline">
                        Explorează categoria &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Inovativ: Simulator Creștere Sprâncene */}
            <Link
              href="/simulator"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-700 dark:text-gold-300 hover:bg-gold-500/25 transition-all text-xs tracking-wider font-semibold shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>DIAGNOSTIC & SIMULATOR</span>
            </Link>

            <Link
              href="/about"
              className="text-stone-700 dark:text-zinc-300 hover:text-gold-600 dark:hover:text-gold-400 transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-stone-500 dark:text-zinc-400" />
              <span>ATELIER BUCUREȘTI</span>
            </Link>

            <Link
              href="/admin"
              className="text-stone-600 dark:text-zinc-400 hover:text-gold-600 dark:hover:text-gold-400 flex items-center gap-1.5 text-xs font-mono transition-colors font-semibold"
            >
              <FlaskConical className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400/80" />
              <span>ADMIN</span>
            </Link>
          </nav>

          {/* Right Action Icons: Theme Toggle, Search, Account, Cart */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* LIGHT / DARK MODE TOGGLE BUTTON */}
            <button
              onClick={toggleTheme}
              className="relative p-2.5 rounded-full border border-stone-300 dark:border-gold-500/30 bg-stone-100 dark:bg-obsidian-900 hover:bg-stone-200 dark:hover:bg-zinc-800 text-stone-800 dark:text-gold-400 transition-all shadow-sm group focus:outline-none"
              aria-label={`Comută pe modul ${theme === 'dark' ? 'luminos' : 'întunecat'}`}
              title={`Comută pe modul ${theme === 'dark' ? 'Light Mode (Ivory)' : 'Dark Mode (Obsidian)'}`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300 group-hover:rotate-90 group-hover:scale-110 transition-all duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-stone-800 group-hover:-rotate-45 group-hover:scale-110 transition-all duration-300" />
              )}
            </button>

            {/* Search Trigger */}
            <button
              onClick={handleOpenSearch}
              className="p-2.5 text-stone-700 dark:text-zinc-300 hover:text-gold-600 dark:hover:text-gold-400 transition-colors rounded-full hover:bg-stone-100 dark:hover:bg-zinc-800/50"
              aria-label="Căutare produse"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Account Icon */}
            <Link
              href="/account"
              className="p-2.5 text-stone-700 dark:text-zinc-300 hover:text-gold-600 dark:hover:text-gold-400 transition-colors rounded-full hover:bg-stone-100 dark:hover:bg-zinc-800/50 hidden sm:flex"
              aria-label="Contul meu"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCart}
              className="relative p-2.5 bg-gold-500/15 hover:bg-gold-500/25 border border-gold-500/40 text-stone-900 dark:text-zinc-100 rounded-full transition-all shadow-sm group"
              aria-label="Coș de cumpărături"
            >
              <ShoppingBag className="w-4 h-4 text-gold-600 dark:text-gold-400 group-hover:scale-110 transition-transform" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold-500 text-obsidian-950 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg border border-white dark:border-obsidian-950 animate-bounce">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Dynamic Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-obsidian-900 border border-stone-300 dark:border-gold-500/40 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-stone-200 dark:border-zinc-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-gold-600 dark:text-gold-400 flex-shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Caută produse, ingrediente active (ricin, rozmarin, peptide)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 text-base focus:outline-none"
              />
              <button
                onClick={handleCloseSearch}
                className="p-1 text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Search Results */}
            <div className="max-h-96 overflow-y-auto p-4 divide-y divide-stone-200 dark:divide-zinc-800/60">
              {searchQuery.trim() === '' ? (
                <div className="py-8 text-center text-stone-500 dark:text-zinc-500 text-sm">
                  Tastați denumirea produsului sau un ingredient cheie pentru căutare live.
                </div>
              ) : searchResults.length === 0 ? (
                <div className="py-8 text-center text-stone-600 dark:text-zinc-400 text-sm">
                  Nu am găsit niciun produs care să conțină &quot;{searchQuery}&quot;.
                </div>
              ) : (
                searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      handleCloseSearch();
                      router.push(`/product/${product.slug}`);
                    }}
                    className="py-3 flex items-center justify-between hover:bg-stone-100 dark:hover:bg-zinc-800/40 px-3 rounded-lg cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 relative rounded-md overflow-hidden bg-stone-100 dark:bg-zinc-950 flex-shrink-0 border border-stone-200 dark:border-zinc-800">
                        <Image
                          src={product.images[0] || '/images/mag-evergrow-bottle.png'}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-stone-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-300 transition-colors">
                          {product.name}
                        </div>
                        <div className="text-xs text-stone-500 dark:text-zinc-400 line-clamp-1">
                          {product.short_description}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 pl-4">
                      <div className="text-sm font-serif font-bold text-gold-600 dark:text-gold-400">
                        {product.price.toFixed(2)} RON
                      </div>
                      <span className="text-[10px] text-stone-500 dark:text-zinc-500">TVA inclus</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bg-stone-50 dark:bg-obsidian-950 p-3 border-t border-stone-200 dark:border-zinc-800/80 text-center">
              <Link
                href="/catalog"
                onClick={handleCloseSearch}
                className="text-xs text-gold-600 dark:text-gold-400 font-semibold hover:underline"
              >
                Vezi toate produsele din catalog &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu with Theme Toggle */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white dark:bg-obsidian-900 border-r border-stone-200 dark:border-gold-500/20 p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-stone-200 dark:border-zinc-800">
                <span className="font-serif font-bold text-lg text-stone-900 dark:text-white tracking-widest">
                  MAG LABORATORIES
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Theme toggle in mobile drawer */}
              <div className="my-4 p-3 rounded-xl bg-stone-100 dark:bg-obsidian-950 border border-stone-200 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-mono text-stone-700 dark:text-zinc-300 font-medium">Mod Afișare:</span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gold-500/20 border border-gold-500/40 text-gold-700 dark:text-gold-300 text-xs font-mono font-semibold"
                >
                  {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>

              <div className="mt-4 flex flex-col space-y-4">
                <Link
                  href="/simulator"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-3 rounded-xl bg-gold-500/15 border border-gold-500/40 text-gold-700 dark:text-gold-300 font-medium text-sm"
                >
                  <Sparkles className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                  <span>Simulator Creștere & Quiz</span>
                </Link>

                <Link
                  href="/catalog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base text-stone-800 dark:text-zinc-200 hover:text-gold-600 dark:hover:text-gold-400 font-serif font-semibold"
                >
                  Toate Produsele
                </Link>

                <div className="pl-3 border-l-2 border-stone-200 dark:border-zinc-800 flex flex-col space-y-2">
                  {INITIAL_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/catalog?category=${cat.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm text-stone-600 dark:text-zinc-400 hover:text-gold-600 dark:hover:text-gold-300"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-stone-700 dark:text-zinc-300 hover:text-gold-600 dark:hover:text-gold-400"
                >
                  Atelier București & Tehnologie
                </Link>

                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-stone-700 dark:text-zinc-300 hover:text-gold-600 dark:hover:text-gold-400"
                >
                  Contul Meu & Facturi
                </Link>

                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-stone-600 dark:text-zinc-400 hover:text-gold-600 dark:hover:text-gold-400 font-mono"
                >
                  Panou Administrare
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200 dark:border-zinc-800 text-xs text-stone-500 dark:text-zinc-500">
              <p>MAG Laboratories Bucharest</p>
              <p className="mt-1">Regulament Cosmetic UE 1223/2009</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
