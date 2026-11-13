'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Star,
  ShoppingBag,
  Check,
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  Droplets,
  Feather,
  ChevronDown,
  Clock,
  Eye,
  Heart,
  Leaf,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from '@/lib/data';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/store/cart-context';
import { useProductsStore } from '@/lib/store/products-store';
import ProductGallery from '@/components/product/ProductGallery';
import StockBadge from '@/components/product/StockBadge';
import ProductCard from '@/components/product/ProductCard';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const { products } = useProductsStore();
  const { addItem, openCart } = useCart();

  const baseProduct = products.find((p) => p.slug === slug) || INITIAL_PRODUCTS.find((p) => p.slug === slug);

  // Active selected option/variant (defaults to the current product, but allows switching between single, duo, complete kit)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(baseProduct || null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Customer Reviews state
  const productReviews = INITIAL_REVIEWS.filter((r) => r.product_id === baseProduct?.id);
  const [reviewsList, setReviewsList] = useState(productReviews);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    if (baseProduct) {
      setSelectedProduct(baseProduct);
    }
  }, [baseProduct]);

  // Track scroll position to reveal the Apple-style sticky sub-nav / dock
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 550) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!baseProduct || !selectedProduct) {
    return notFound();
  }

  // Treatment Format Options (Apple-style bundle switcher)
  const singleSerum = products.find((p) => p.id === 'p1111111-1111-1111-1111-111111111111') || baseProduct;
  const duoPack = products.find((p) => p.id === 'p5555555-5555-5555-5555-555555555555') || INITIAL_PRODUCTS[4];
  const completeKit = products.find((p) => p.id === 'p6666666-6666-6666-6666-666666666666') || INITIAL_PRODUCTS[5];

  const handleAddToCart = () => {
    if (selectedProduct.stock <= 0) return;
    addItem(selectedProduct, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      openCart();
    }, 700);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      product_id: selectedProduct.id,
      user_name: `${newReviewAuthor} (Client Verificat)`,
      rating: newReviewRating,
      comment: newReviewComment,
      verified_purchase: true,
      created_at: new Date().toISOString(),
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setReviewSubmitted(true);
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== baseProduct.id && p.category_id === baseProduct.category_id)
    .slice(0, 3);

  const faqItems = [
    {
      q: 'Funcționează chiar dacă m-am pensat foarte subțire ani la rând?',
      a: 'Da! Marea majoritate a clientelor noastre de peste 35-40 de ani au sprâncene subțiate din anii 90-2000. Foliculii nu sunt morți, ci blocați într-o stare de repaus prelungit (faza telogenă). Acidul ricinoleic pur și uleiul de rozmarin stimulează microcirculația papilei dermice, re-alimentând rădăcina cu nutrienți esențiali pentru a produce fire noi.',
    },
    {
      q: 'Ustură ochii sau provoacă pete întunecate pe pleoape?',
      a: 'Categoric nu. Spre deosebire de serurile convenționale care conțin bimatoprost sau derivate de prostaglandine (responsabile de cearcăne adânci și hiperpigmentarea irisului), EVERGREEN & ISLE este 100% natural, formulat doar cu lipide presate la rece, fără alcool, fără sulfați și fără parfumuri sintetice.',
    },
    {
      q: 'Cât timp durează un flacon de 3 ml și când voi vedea primele rezultate?',
      a: 'Un flacon de 3 ml este dozat milimetric pentru 90 de zile (3 luni) de aplicare zilnică nocturnă datorită bilei de inox care împiedică risipa. Primele fire mici („baby hairs”) devin vizibile între săptămânile 4 și 6, iar densitatea optimă se consolidează la finalul celor 12 săptămâni de cură.',
    },
    {
      q: 'Pot comanda cu plata la livrare (ramburs) dacă nu doresc să plătesc cu cardul online?',
      a: 'Absolut. Oferim atât plata securizată cu cardul (inclusiv Apple Pay & Google Pay), cât și plata ramburs numerar direct curierului în momentul în care primești coletul la domiciliu.',
    },
    {
      q: 'Este compatibil dacă port lentile de contact sau am pielea sensibilă?',
      a: 'Formula a fost concepută special pentru pielea sensibilă din jurul ochilor. Se aplică seara înainte de culcare pe arcada curată. Uleiul are o densitate vegetală optimă care aderă direct pe firul de păr și pe piele, fără să curgă în ochi.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-obsidian-950 text-stone-900 dark:text-foreground transition-colors selection:bg-teal-800 selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────
          1. APPLE-STYLE STICKY SUB-NAV / DOCK (Reveals on Scroll)
         ───────────────────────────────────────────────────────────── */}
      <aside
        aria-label="Bara rapidă produs"
        className={`fixed top-16 sm:top-20 inset-x-0 z-40 bg-white/95 dark:bg-obsidian-900/95 backdrop-blur-md border-b border-stone-200 dark:border-teal-700/30 shadow-md transition-all duration-300 ${
          showStickyBar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
          
          {/* Left: Product Thumbnail & Name */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 relative rounded-lg overflow-hidden border border-stone-200 dark:border-zinc-800 bg-stone-100 flex-shrink-0">
              <Image
                src={selectedProduct.images[0] || '/images/mag-evergrow-bottle.png'}
                alt={selectedProduct.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <h2 className="text-xs sm:text-sm font-serif font-bold text-stone-950 dark:text-white truncate">
                {selectedProduct.name}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-teal-800 dark:text-teal-400">
                  {selectedProduct.price.toFixed(2)} RON
                </span>
                <span className="hidden sm:inline-flex text-[10px] text-stone-500 font-mono">
                  • {selectedProduct.volume}
                </span>
              </div>
            </div>
          </div>

          {/* Center: Apple-style Story Anchor Links (Hidden on small mobile) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-stone-600 dark:text-zinc-300">
            <a href="#overview" className="hover:text-teal-800 dark:hover:text-teal-300 transition-colors">
              Prezentare
            </a>
            <a href="#benefits" className="hover:text-teal-800 dark:hover:text-teal-300 transition-colors">
              De Ce Funcționează
            </a>
            <a href="#ritual" className="hover:text-teal-800 dark:hover:text-teal-300 transition-colors">
              Ritual 3 Pași
            </a>
            <a href="#results" className="hover:text-teal-800 dark:hover:text-teal-300 transition-colors">
              Rezultate 90 Zile
            </a>
            <a href="#faq" className="hover:text-teal-800 dark:hover:text-teal-300 transition-colors">
              Întrebări Frecvente
            </a>
            <a href="#reviews" className="hover:text-teal-800 dark:hover:text-teal-300 transition-colors">
              Recenzii ({reviewsList.length + baseProduct.review_count})
            </a>
          </nav>

          {/* Right: Instant Buy Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              disabled={selectedProduct.stock <= 0}
              className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2 ${
                selectedProduct.stock <= 0
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  : isAdded
                  ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                  : 'bg-teal-800 hover:bg-teal-700 text-white shadow-teal-900/20'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Adăugat!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Adaugă în Coș</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          2. TOP PRODUCT HERO (Simple, Clear, Warm & Legible for 30-65)
         ───────────────────────────────────────────────────────────── */}
      <section id="overview" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-zinc-400 mb-6">
          <Link href="/" className="hover:text-teal-800 dark:hover:text-teal-300 transition-colors">
            Acasă
          </Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-teal-800 dark:hover:text-teal-300 transition-colors">
            Catalog Botanică
          </Link>
          <span>/</span>
          <span className="text-stone-900 dark:text-zinc-200 line-clamp-1 font-semibold">{selectedProduct.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Image Gallery with Zoom (5 Cols) */}
          <div className="lg:col-span-6">
            <ProductGallery images={selectedProduct.images} productName={selectedProduct.name} />
          </div>

          {/* Right Column: Information, Format Options & Buy Box (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header / Brand / Rating */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-800/10 dark:bg-teal-400/10 border border-teal-700/25 text-teal-900 dark:text-teal-200 text-xs font-mono font-semibold mb-3 tracking-wide">
                <Leaf className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                <span>EVERGREEN &amp; ISLE • NATURAL SKINCARE</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950 dark:text-white leading-[1.2]">
                {selectedProduct.name}
              </h1>

              {selectedProduct.subtitle && (
                <p className="text-sm font-serif italic text-teal-800 dark:text-teal-300 mt-2 font-medium">
                  {selectedProduct.subtitle}
                </p>
              )}

              {/* Star Rating & Social Proof */}
              <div className="flex items-center gap-3 mt-4 pt-1">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(selectedProduct.rating)
                          ? 'fill-amber-500 text-amber-500'
                          : 'text-stone-300 dark:text-zinc-600'
                      }`}
                    />
                  ))}
                </div>
                <a
                  href="#reviews"
                  className="text-xs font-mono text-stone-600 dark:text-zinc-300 underline hover:text-teal-800 transition-colors font-medium"
                >
                  {selectedProduct.rating.toFixed(2)} / 5.0 ({reviewsList.length + baseProduct.review_count} recenzii verificate)
                </a>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-2xl p-5 flex items-baseline justify-between shadow-sm transition-colors">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-stone-950 dark:text-white">
                    {selectedProduct.price.toFixed(2)} RON
                  </span>
                  {selectedProduct.compare_at_price && (
                    <span className="text-base text-stone-400 dark:text-zinc-500 line-through font-mono">
                      {selectedProduct.compare_at_price.toFixed(2)} RON
                    </span>
                  )}
                </div>
                <span className="text-xs text-stone-500 dark:text-zinc-400 block mt-1">
                  TVA 19% inclus • Factură fiscală automată
                </span>
              </div>

              <div>
                <StockBadge stock={selectedProduct.stock} />
              </div>
            </div>

            {/* Description (written warmly and clearly for 30-65 women) */}
            <p className="text-sm sm:text-base text-stone-700 dark:text-zinc-300 leading-relaxed font-normal">
              {selectedProduct.short_description}
            </p>

            {/* ─────────────────────────────────────────────────────────────
                APPLE-STYLE FORMAT & OPTION SELECTOR (Single / Duo / Kit)
               ───────────────────────────────────────────────────────────── */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-zinc-300 font-bold">
                  Alege Formatul Tău de Tratament:
                </label>
                <span className="text-[11px] text-teal-800 dark:text-teal-300 font-mono font-semibold">
                  Economisește până la 20%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Option 1: Flacon Unic */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProduct(singleSerum);
                    setQuantity(1);
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    selectedProduct.id === singleSerum.id
                      ? 'border-teal-800 bg-teal-800/10 dark:bg-teal-400/10 shadow-sm ring-1 ring-teal-800'
                      : 'border-stone-200 dark:border-zinc-800 bg-white dark:bg-obsidian-900 hover:border-stone-300'
                  }`}
                >
                  <div>
                    <span className="text-xs font-serif font-bold text-stone-900 dark:text-white block">
                      Flacon 3 ml
                    </span>
                    <span className="text-[10px] text-stone-500 dark:text-zinc-400 font-mono">
                      Cură 90 Zile
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-mono font-bold text-teal-800 dark:text-teal-300">
                    {singleSerum.price.toFixed(2)} RON
                  </div>
                </button>

                {/* Option 2: Duo Pack (Most Popular for 30-65) */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProduct(duoPack);
                    setQuantity(1);
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between relative ${
                    selectedProduct.id === duoPack.id
                      ? 'border-teal-800 bg-teal-800/10 dark:bg-teal-400/10 shadow-sm ring-1 ring-teal-800'
                      : 'border-stone-200 dark:border-zinc-800 bg-white dark:bg-obsidian-900 hover:border-stone-300'
                  }`}
                >
                  <span className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-full bg-teal-800 text-white text-[9px] font-mono font-bold uppercase tracking-wider shadow">
                    Cel Mai Ales • -15%
                  </span>
                  <div>
                    <span className="text-xs font-serif font-bold text-stone-900 dark:text-white block">
                      Duo Pack (2x3ml)
                    </span>
                    <span className="text-[10px] text-stone-500 dark:text-zinc-400 font-mono">
                      Cură 180 Zile
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-mono font-bold text-teal-800 dark:text-teal-300">
                    {duoPack.price.toFixed(2)} RON
                  </div>
                </button>

                {/* Option 3: Kit Complet */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProduct(completeKit);
                    setQuantity(1);
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    selectedProduct.id === completeKit.id
                      ? 'border-teal-800 bg-teal-800/10 dark:bg-teal-400/10 shadow-sm ring-1 ring-teal-800'
                      : 'border-stone-200 dark:border-zinc-800 bg-white dark:bg-obsidian-900 hover:border-stone-300'
                  }`}
                >
                  <div>
                    <span className="text-xs font-serif font-bold text-stone-900 dark:text-white block">
                      Kit Regenerare
                    </span>
                    <span className="text-[10px] text-stone-500 dark:text-zinc-400 font-mono">
                      Complet • -20%
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-mono font-bold text-teal-800 dark:text-teal-300">
                    {completeKit.price.toFixed(2)} RON
                  </div>
                </button>

              </div>
            </div>

            {/* Quantity Selector & Main Add to Cart Button */}
            <div className="pt-2 space-y-4">
              <div className="flex items-center gap-3">
                
                {/* Stepper */}
                <div className="flex items-center border border-stone-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-obsidian-900 px-3 py-2.5 shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-stone-500 hover:text-stone-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                    aria-label="Scade cantitate"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-mono font-bold text-stone-900 dark:text-white min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                    disabled={quantity >= selectedProduct.stock}
                    className="p-1 text-stone-500 hover:text-stone-900 dark:text-zinc-400 dark:hover:text-white disabled:opacity-30 transition-colors"
                    aria-label="Crește cantitate"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={handleAddToCart}
                  disabled={selectedProduct.stock <= 0}
                  className={`flex-1 py-4 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95 ${
                    selectedProduct.stock <= 0
                      ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                      : isAdded
                      ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                      : 'bg-teal-800 hover:bg-teal-700 text-white shadow-teal-900/25'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5 animate-in zoom-in" />
                      <span>Adăugat în Coș!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Adaugă în Coș ({(selectedProduct.price * quantity).toFixed(2)} RON)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees Strip (Clear, Reassuring for 30-65 demographic) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-stone-200 dark:border-zinc-800 text-xs text-stone-600 dark:text-zinc-400 font-medium">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-teal-700 dark:text-teal-400 flex-shrink-0" />
                  <span>Livrare Rapidă 24-48h</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-teal-700 dark:text-teal-400 flex-shrink-0" />
                  <span>Garanție Retur 30 Zile</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>Card sau Ramburs la Curier</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. APPLE-STYLE CINEMATIC SECTION: DE CE FUNCȚIONEAZĂ
         ───────────────────────────────────────────────────────────── */}
      <section id="benefits" className="py-20 bg-white dark:bg-obsidian-900/90 border-y border-stone-200 dark:border-zinc-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Big Bold Apple-style Statement */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-teal-800 dark:text-teal-400 font-bold flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
              Filosofia Îngrijirii Naturale la 30-65 Ani
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-950 dark:text-white leading-tight">
              Sprâncene mai dese. <br />
              <span className="teal-gradient-text">Fără chimicale agresive.</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-700 dark:text-zinc-300 leading-relaxed font-normal">
              După vârsta de 30 de ani, foliculii piloși își încetinesc regenerarea naturală, iar firele devin mai fine.
              Formula noastră nu folosește hormoni sintetici care provoacă dependență sau cearcăne, ci hrănește
              direct rădăcina cu lipide pure din prima presare la rece.
            </p>
          </div>

          {/* Apple-style 4 Bento Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Bento Card 1: Stainless steel roll-on */}
            <div className="bg-[#FAF7F2] dark:bg-obsidian-950 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm hover:border-teal-700/50 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-teal-800/10 border border-teal-700/30 flex items-center justify-center text-teal-800 dark:text-teal-300">
                <Droplets className="w-6 h-6 text-teal-700 dark:text-teal-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-950 dark:text-white">
                Bila Roll-On din Oțel Chirurgical
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400 leading-relaxed">
                Răcorește plăcut la atingere, realizează un micromasaj drenant pe arcadă și dozează exact cantitatea necesară fără risipă și fără să curgă în ochi.
              </p>
            </div>

            {/* Bento Card 2: 100% Active Lipids (Zero Water) */}
            <div className="bg-[#FAF7F2] dark:bg-obsidian-950 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm hover:border-teal-700/50 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-teal-800/10 border border-teal-700/30 flex items-center justify-center text-teal-800 dark:text-teal-300">
                <Leaf className="w-6 h-6 text-teal-700 dark:text-teal-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-950 dark:text-white">
                100% Lipide Active (Zero Apă)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400 leading-relaxed">
                Fiecare picătură este un ingredient activ hrănitor. Fără solvenți apoși, fără conservanți chimici duri și fără parfumuri sintetice iritante.
              </p>
            </div>

            {/* Bento Card 3: Safe for sensitive eyes */}
            <div className="bg-[#FAF7F2] dark:bg-obsidian-950 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm hover:border-teal-700/50 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-teal-800/10 border border-teal-700/30 flex items-center justify-center text-teal-800 dark:text-teal-300">
                <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-950 dark:text-white">
                Fără Prostaglandine &amp; Hormoni
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400 leading-relaxed">
                Zero risc de hiperpigmentare a pleoapelor, zero cearcăne întunecate și fără usturime. Sigur pentru ochi sensibili și purtătoare de lentile.
              </p>
            </div>

            {/* Bento Card 4: UV Protected Bottle */}
            <div className="bg-[#FAF7F2] dark:bg-obsidian-950 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm hover:border-teal-700/50 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-teal-800/10 border border-teal-700/30 flex items-center justify-center text-teal-800 dark:text-teal-300">
                <Award className="w-6 h-6 text-teal-700 dark:text-teal-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-950 dark:text-white">
                Flacon de Sticlă Brună Anti-UV
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400 leading-relaxed">
                Protejează uleiurile presate la rece și compușii volatili de rozmarin împotriva oxidării provocate de lumină, menținând prospețimea 24 de luni.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. APPLE-STYLE SECTION: RITUALUL SIMPLU ÎN 3 PAȘI
         ───────────────────────────────────────────────────────────── */}
      <section id="ritual" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-teal-800 dark:text-teal-400 font-bold flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
            Rutina Ta de Seară în 30 de Secunde
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950 dark:text-white">
            Un Ritual Simplu, Elegant &amp; Eficient
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400">
            Fără etape complicate. Creat să se integreze fără efort în rutina ta zilnică de îngrijire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-8 relative shadow-sm hover:border-teal-700/40 transition-colors">
            <span className="text-6xl font-serif font-black text-stone-200/80 dark:text-zinc-800/80 absolute top-4 right-6 pointer-events-none select-none">
              01
            </span>
            <div className="text-xs font-mono uppercase text-teal-800 dark:text-teal-400 font-bold mb-3">
              Pasul 1 • Pregătire
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-950 dark:text-white mb-2">
              Demachiere Delicată
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400 leading-relaxed">
              Curăță tenul și zona ochilor cu apă călduță sau cu un demachiant blând, asigurându-te că porii sunt curați și pregătiți să absoarbă nutrienții.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-8 relative shadow-sm hover:border-teal-700/40 transition-colors">
            <span className="text-6xl font-serif font-black text-stone-200/80 dark:text-zinc-800/80 absolute top-4 right-6 pointer-events-none select-none">
              02
            </span>
            <div className="text-xs font-mono uppercase text-teal-800 dark:text-teal-400 font-bold mb-3">
              Pasul 2 • Aplicare
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-950 dark:text-white mb-2">
              Masaj cu Bila Rece
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400 leading-relaxed">
              Glisează ușor bila de inox de 2-3 ori pe linia sprâncenelor, insistând cu mișcări ascendente în zonele rare sau cu goluri vizibile.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-8 relative shadow-sm hover:border-teal-700/40 transition-colors">
            <span className="text-6xl font-serif font-black text-stone-200/80 dark:text-zinc-800/80 absolute top-4 right-6 pointer-events-none select-none">
              03
            </span>
            <div className="text-xs font-mono uppercase text-teal-800 dark:text-teal-400 font-bold mb-3">
              Pasul 3 • Odihnă
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-950 dark:text-white mb-2">
              Regenerare Nocturnă
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400 leading-relaxed">
              Lasă lipidele active să acționeze peste noapte în timpul somnului. Clătește dimineața la spălarea obișnuită a feței.
            </p>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. APPLE-STYLE SECTION: REZULTATE PE SĂPTĂMÂNI (TIMELINE)
         ───────────────────────────────────────────────────────────── */}
      <section id="results" className="py-20 bg-[#F2F7F5] dark:bg-obsidian-900 border-y border-stone-200 dark:border-zinc-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-teal-800 dark:text-teal-400 font-bold flex items-center justify-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
              Cura Biologică Recomandată de 90 Zile
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950 dark:text-white">
              Ce Poți Aștepta Săptămână de Săptămână
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400">
              Creșterea naturală a părului respectă ciclul fiziologic al foliculului. Fără forțare chimică.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white dark:bg-obsidian-950 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm">
              <span className="text-xs font-mono font-bold text-teal-800 dark:text-teal-300 bg-teal-800/10 px-3 py-1 rounded-full inline-block">
                Săptămâna 1 – 2
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-950 dark:text-white">
                Fortifiere &amp; Stoparea Căderii
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400 leading-relaxed">
                Firele existente devin mai rezistente mecanic, nu se mai rup la demachiere, iar pielea arcadei este hrănită și calmată.
              </p>
            </div>

            <div className="bg-white dark:bg-obsidian-950 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm">
              <span className="text-xs font-mono font-bold text-teal-800 dark:text-teal-300 bg-teal-800/10 px-3 py-1 rounded-full inline-block">
                Săptămâna 4 – 6
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-950 dark:text-white">
                Apariția Primelor Fire Noi
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400 leading-relaxed">
                Foliculii dorminzi încep să se reactiveze. Apar primele fire fine de tip „baby hairs” în zonele unde pensatul a lăsat goluri.
              </p>
            </div>

            <div className="bg-white dark:bg-obsidian-950 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm">
              <span className="text-xs font-mono font-bold text-teal-800 dark:text-teal-300 bg-teal-800/10 px-3 py-1 rounded-full inline-block">
                Săptămâna 8 – 12
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-950 dark:text-white">
                Densitate &amp; Arc Arhitectural
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400 leading-relaxed">
                Firele nou crescute se îngroașă și se pigmentează natural. Arcada își recapătă plinătatea și conturul armonios.
              </p>
            </div>

          </div>

          <div className="text-center pt-4">
            <Link
              href="/simulator"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-teal-800 dark:text-teal-300 hover:underline uppercase tracking-wider"
            >
              <span>Vrei un diagnostic personalizat? Încearcă simulatorul timeline &rarr;</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. ACCORDION FAQ SECTION (Warm & Clear Answers for 30-65)
         ───────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-teal-800 dark:text-teal-400 font-bold flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
            Răspunsuri Transparente
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950 dark:text-white">
            Întrebări Frecvente ale Clientelor Noastre
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400">
            Află tot ce trebuie să știi înainte de prima ta aplicare.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-stone-950 dark:text-white hover:text-teal-800 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-teal-700 dark:text-teal-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 dark:text-zinc-300 leading-relaxed border-t border-stone-100 dark:border-zinc-800/80 animate-in fade-in duration-200">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. VERIFIED CUSTOMER REVIEWS
         ───────────────────────────────────────────────────────────── */}
      <section id="reviews" className="py-20 bg-white dark:bg-obsidian-900/90 border-t border-stone-200 dark:border-zinc-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-1 text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <h2 className="font-serif text-3xl font-bold text-stone-950 dark:text-white">
              Recenzii Reale de la Cliente
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400">
              Părerea sinceră a doamnelor care au testat cura botanică EVERGREEN &amp; ISLE.
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#FAF7F2] dark:bg-obsidian-950 border border-stone-200 dark:border-zinc-800 p-6 rounded-2xl space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-serif font-bold text-sm text-stone-950 dark:text-white block">
                      {rev.user_name}
                    </span>
                    {rev.verified_purchase && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Achiziție Verificată
                      </span>
                    )}
                  </div>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-stone-300 dark:text-zinc-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-zinc-300 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
            ))}
          </div>

          {/* Add Review Box */}
          <div className="bg-[#FAF7F2] dark:bg-obsidian-950 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-950 dark:text-white">
              Ai folosit produsul? Împărtășește experiența ta
            </h3>
            <p className="text-xs text-stone-600 dark:text-zinc-400">
              Părerea ta ajută alte femei să aleagă un tratament sigur și curat pentru ochii lor.
            </p>

            {reviewSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Mulțumim din suflet! Recenzia ta a fost adăugată cu succes.</span>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                      Numele Tău &amp; Vârsta / Orașul
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Elena D., 46 ani, București"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      className="w-full bg-white dark:bg-obsidian-900 border border-stone-300 dark:border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:border-teal-800"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                      Rating
                    </label>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="w-full bg-white dark:bg-obsidian-900 border border-stone-300 dark:border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-teal-800"
                    >
                      <option value="5">★★★★★ (5 stele - Excelent)</option>
                      <option value="4">★★★★☆ (4 stele - Foarte bun)</option>
                      <option value="3">★★★☆☆ (3 stele - Mediu)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                    Mesajul Tău Despre Rezultate
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Cum a răspuns arcada ta? Ai observat fire noi? Cum se simte bila rece de inox?"
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="w-full bg-white dark:bg-obsidian-900 border border-stone-300 dark:border-zinc-700 rounded-xl p-3 text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:border-teal-800"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  Publică Recenzia
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. RELATED PRODUCTS
         ───────────────────────────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-teal-800 dark:text-teal-400 font-bold block mb-1">
                Rutina Completă
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-950 dark:text-white">
                Produse Complementare Recomandate
              </h2>
            </div>
            <Link
              href="/catalog"
              className="text-xs font-mono text-stone-500 hover:text-teal-800 dark:hover:text-teal-300 flex items-center gap-1 font-semibold"
            >
              <span>Vezi tot catalogul</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          9. STICKY MOBILE BOTTOM BUY DOCK (Thumb-Friendly on Phones)
         ───────────────────────────────────────────────────────────── */}
      <div
        className={`fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-obsidian-950/95 backdrop-blur-md border-t border-stone-200 dark:border-zinc-800 p-3 sm:hidden transition-all duration-300 ${
          showStickyBar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-xs font-serif font-bold text-stone-900 dark:text-white truncate block">
              {selectedProduct.name}
            </span>
            <span className="text-xs font-mono font-bold text-teal-800 dark:text-teal-400">
              {selectedProduct.price.toFixed(2)} RON
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={selectedProduct.stock <= 0}
            className={`px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg flex-shrink-0 active:scale-95 ${
              selectedProduct.stock <= 0
                ? 'bg-stone-300 text-stone-500'
                : isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-teal-800 text-white'
            }`}
          >
            {isAdded ? 'Adăugat!' : 'Adaugă în Coș'}
          </button>
        </div>
      </div>

    </div>
  );
}
