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
} from 'lucide-react';
import { useCart } from '@/lib/store/cart-context';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '@/lib/data';
import { Product } from '@/lib/types';

export default function Navbar() {
  const router = useRouter();
  const { totalItemsCount, openCart } = useCart();
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
      <div className="bg-botanical-950 border-b border-gold-500/20 text-xs py-2 px-4 text-center text-zinc-300 font-sans tracking-wider uppercase flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
        <span>
          LIVRARE GRATUITĂ ÎN TOATĂ ROMÂNIA LA COMENZI PESTE 200 RON • FORMULE BIOACTIVE COMPOUNDATE ÎN BUCUREȘTI
        </span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-obsidian-950/90 backdrop-blur-md border-b border-gold-500/15 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-zinc-300 hover:text-gold-400 focus:outline-none transition-colors"
            aria-label="Deschide Meniul"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo */}
          <Link href="/" className="flex flex-col items-start group">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-serif tracking-[0.25em] font-bold text-white group-hover:text-gold-300 transition-colors">
                MAG
              </span>
              <span className="text-xs uppercase px-1.5 py-0.5 rounded bg-gold-500/10 border border-gold-500/30 text-gold-400 font-mono tracking-widest">
                LABORATORIES
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 font-sans mt-0.5">
              EVERGROW • ATELIER BOTANIQUE • BUCHAREST
            </span>
          </Link>

          {/* Desktop Navigation Links & Mega Menu Trigger */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide">
            
            {/* Mega Menu Parent: Catalog */}
            <div
              className="relative"
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleMegaMenuLeave}
            >
              <Link
                href="/catalog"
                className="flex items-center gap-1.5 text-zinc-300 hover:text-gold-400 py-6 transition-colors"
              >
                <span>CATALOG PRODUSE</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-gold-400' : ''}`} />
              </Link>

              {/* Mega Menu Dropdown */}
              {isMegaMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-obsidian-900/95 backdrop-blur-xl border border-gold-500/30 rounded-b-xl shadow-2xl p-6 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="col-span-2 pb-2 border-b border-zinc-800 flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-gold-400 tracking-wider">
                      Categoriile Noastre de Excelență Botanică
                    </span>
                    <Link
                      href="/catalog"
                      onClick={() => setIsMegaMenuOpen(false)}
                      className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 group"
                    >
                      Vezi tot catalogul <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                  {INITIAL_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/catalog?category=${cat.slug}`}
                      onClick={() => setIsMegaMenuOpen(false)}
                      className="p-3 rounded-lg border border-zinc-800/80 hover:border-gold-500/40 bg-obsidian-850/60 hover:bg-zinc-900/80 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="text-sm font-serif font-semibold text-zinc-100 group-hover:text-gold-300 transition-colors">
                          {cat.name}
                        </div>
                        <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                          {cat.description}
                        </p>
                      </div>
                      <span className="text-[11px] text-gold-400/80 font-mono mt-3 flex items-center gap-1 group-hover:underline">
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 hover:bg-gold-500/20 hover:text-gold-200 transition-all text-xs tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>DIAGNOSTIC & SIMULATOR TIMELINE</span>
            </Link>

            <Link
              href="/about"
              className="text-zinc-300 hover:text-gold-400 transition-colors"
            >
              ATELIER BUCUREȘTI
            </Link>

            <Link
              href="/admin"
              className="text-zinc-400 hover:text-gold-400 flex items-center gap-1 text-xs font-mono transition-colors"
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>ADMIN</span>
            </Link>
          </nav>

          {/* Right Action Icons: Search, Account, Cart */}
          <div className="flex items-center space-x-4">
            
            {/* Search Trigger */}
            <button
              onClick={handleOpenSearch}
              className="p-2 text-zinc-300 hover:text-gold-400 transition-colors rounded-full hover:bg-zinc-800/50"
              aria-label="Căutare produse"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Icon */}
            <Link
              href="/account"
              className="p-2 text-zinc-300 hover:text-gold-400 transition-colors rounded-full hover:bg-zinc-800/50 hidden sm:flex"
              aria-label="Contul meu"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCart}
              className="relative p-2.5 bg-botanical-800/60 hover:bg-botanical-700/80 border border-gold-500/30 text-zinc-100 rounded-full transition-all group"
              aria-label="Coș de cumpărături"
            >
              <ShoppingBag className="w-5 h-5 text-gold-400 group-hover:scale-110 transition-transform" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold-500 text-obsidian-950 text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg border border-obsidian-950 animate-in zoom-in-50 duration-200">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Dynamic Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200">
          <div className="bg-obsidian-900 border border-gold-500/40 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-gold-400 flex-shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Caută produse, ingrediente active (ricin, rozmarin, peptide)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-zinc-500 text-base focus:outline-none"
              />
              <button
                onClick={handleCloseSearch}
                className="p-1 text-zinc-400 hover:text-white rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Search Results */}
            <div className="max-h-96 overflow-y-auto p-4 divide-y divide-zinc-800/60">
              {searchQuery.trim() === '' ? (
                <div className="py-8 text-center text-zinc-500 text-sm">
                  Tastați denumirea produsului sau un ingredient cheie pentru căutare live.
                </div>
              ) : searchResults.length === 0 ? (
                <div className="py-8 text-center text-zinc-400 text-sm">
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
                    className="py-3 flex items-center justify-between hover:bg-zinc-800/40 px-3 rounded-lg cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 relative rounded-md overflow-hidden bg-zinc-900 flex-shrink-0 border border-zinc-800">
                        <Image
                          src={product.images[0] || '/images/mag-evergrow-bottle.png'}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white group-hover:text-gold-300 transition-colors">
                          {product.name}
                        </div>
                        <div className="text-xs text-zinc-400 line-clamp-1">
                          {product.short_description}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 pl-4">
                      <div className="text-sm font-serif font-bold text-gold-400">
                        {product.price.toFixed(2)} RON
                      </div>
                      <span className="text-[10px] text-zinc-500">TVA inclus</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bg-obsidian-950 p-3 border-t border-zinc-800/80 text-center">
              <Link
                href="/catalog"
                onClick={handleCloseSearch}
                className="text-xs text-gold-400 hover:underline"
              >
                Vezi toate produsele din catalog &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-obsidian-900 border-r border-gold-500/20 p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                <span className="font-serif font-bold text-lg text-white tracking-widest">
                  MAG LABORATORIES
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-6 flex flex-col space-y-4">
                <Link
                  href="/simulator"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-3 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-300 font-medium text-sm"
                >
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  <span>Simulator Creștere & Quiz</span>
                </Link>

                <Link
                  href="/catalog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base text-zinc-200 hover:text-gold-400 font-serif font-semibold"
                >
                  Toate Produsele
                </Link>

                <div className="pl-3 border-l-2 border-zinc-800 flex flex-col space-y-2">
                  {INITIAL_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/catalog?category=${cat.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm text-zinc-400 hover:text-gold-300"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-zinc-300 hover:text-gold-400"
                >
                  Atelier București & Tehnologie
                </Link>

                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-zinc-300 hover:text-gold-400"
                >
                  Contul Meu & Facturi
                </Link>

                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-zinc-400 hover:text-gold-400 font-mono"
                >
                  Panou Administrare
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 text-xs text-zinc-500">
              <p>MAG Laboratories Bucharest</p>
              <p className="mt-1">Regulament Cosmetic UE 1223/2009</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
