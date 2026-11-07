'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Star,
  ShoppingBag,
  Check,
  ShieldCheck,
  Award,
  FlaskConical,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  MessageSquare,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from '@/lib/data';
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
  const { addItem } = useCart();

  const product = products.find((p) => p.slug === slug) || INITIAL_PRODUCTS.find((p) => p.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'usage' | 'reviews'>('ingredients');

  // Customer Reviews state
  const productReviews = INITIAL_REVIEWS.filter((r) => r.product_id === product?.id);
  const [reviewsList, setReviewsList] = useState(productReviews);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!product) {
    return notFound();
  }

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      product_id: product.id,
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
    .filter((p) => p.id !== product.id && p.category_id === product.category_id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-obsidian-950 text-stone-900 dark:text-foreground py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
            Acasă
          </Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
            Catalog
          </Link>
          <span>/</span>
          <span className="text-stone-900 dark:text-zinc-200 line-clamp-1 font-semibold">{product.name}</span>
        </nav>

        {/* Top Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Image Gallery with Zoom */}
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Information, Pricing & Actions */}
          <div className="space-y-6">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {product.badge && (
                  <span className="px-2.5 py-1 rounded bg-gold-500 text-obsidian-950 text-xs font-mono font-bold uppercase shadow-sm">
                    {product.badge}
                  </span>
                )}
                <span className="text-xs font-mono text-stone-500 dark:text-zinc-400">SKU: {product.sku}</span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950 dark:text-white leading-tight">
                {product.name}
              </h1>
              {product.subtitle && (
                <p className="text-sm font-serif italic text-gold-700 dark:text-gold-300 mt-2 font-medium">
                  {product.subtitle}
                </p>
              )}

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mt-4">
                <div className="flex text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-gold-500 text-gold-500'
                          : 'text-stone-300 dark:text-zinc-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-mono text-stone-600 dark:text-zinc-300">
                  {product.rating.toFixed(2)} din 5.0 ({reviewsList.length + product.review_count} recenzii verificate)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-2xl p-5 flex items-baseline justify-between shadow-sm transition-colors">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-serif font-bold text-stone-950 dark:text-white">
                    {product.price.toFixed(2)} RON
                  </span>
                  {product.compare_at_price && (
                    <span className="text-base text-stone-400 dark:text-zinc-500 line-through font-mono">
                      {product.compare_at_price.toFixed(2)} RON
                    </span>
                  )}
                </div>
                <span className="text-xs text-stone-500 dark:text-zinc-400 block mt-1">
                  Include TVA (19%). Factură fiscală emisă automat.
                </span>
              </div>

              <div>
                <StockBadge stock={product.stock} />
              </div>
            </div>

            {/* Short Description */}
            <p className="text-sm text-stone-700 dark:text-zinc-300 leading-relaxed font-normal">
              {product.short_description}
            </p>

            {/* Benefits Highlights Checklist */}
            {product.benefits && product.benefits.length > 0 && (
              <div className="bg-gold-50/50 dark:bg-obsidian-900/60 border border-gold-500/30 rounded-xl p-4 space-y-2">
                <div className="text-xs font-mono uppercase text-gold-800 dark:text-gold-400 tracking-wider font-bold">
                  Beneficii Clinice & Fiziologice:
                </div>
                <ul className="space-y-1.5">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="text-xs text-stone-700 dark:text-zinc-300 flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector & Add to Cart */}
            <div className="pt-2 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-obsidian-900 px-3 py-2 shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white transition-colors"
                    aria-label="Scade"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-mono font-bold text-stone-900 dark:text-white min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="p-1 text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white disabled:opacity-30 transition-colors"
                    aria-label="Crește"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 ${
                    product.stock <= 0
                      ? 'bg-stone-200 dark:bg-zinc-800 text-stone-400 dark:text-zinc-500 cursor-not-allowed'
                      : isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gold-500 hover:bg-gold-400 text-obsidian-950 shadow-gold-500/20 active:scale-95'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Adăugat în Coș!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Adaugă în Coș ({ (product.price * quantity).toFixed(2) } RON)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 text-[11px] text-stone-600 dark:text-zinc-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
                  <span>Livrare 24h</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
                  <span>Retur 30 Zile</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Stripe Securizat</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Tabs: Ingrediente Active, Mod de Utilizare, Recenzii */}
        <div className="pt-10 border-t border-stone-200 dark:border-zinc-800">
          
          {/* Tabs Selector */}
          <div className="flex border-b border-stone-200 dark:border-zinc-800 gap-6">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`pb-4 text-sm font-serif font-semibold transition-all relative ${
                activeTab === 'ingredients'
                  ? 'text-gold-700 dark:text-gold-400 border-b-2 border-gold-500'
                  : 'text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Compoziție & Ingrediente Active
            </button>
            <button
              onClick={() => setActiveTab('usage')}
              className={`pb-4 text-sm font-serif font-semibold transition-all relative ${
                activeTab === 'usage'
                  ? 'text-gold-700 dark:text-gold-400 border-b-2 border-gold-500'
                  : 'text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Protocol de Aplicare & Ritual
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-sm font-serif font-semibold transition-all relative ${
                activeTab === 'reviews'
                  ? 'text-gold-700 dark:text-gold-400 border-b-2 border-gold-500'
                  : 'text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Recenzii Verificate ({reviewsList.length + product.review_count})
            </button>
          </div>

          {/* Tab 1: Ingredients Content */}
          {activeTab === 'ingredients' && (
            <div className="py-8 space-y-6 animate-in fade-in duration-200">
              <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-stone-700 dark:text-zinc-300 leading-relaxed">
                <p>{product.description}</p>
              </div>

              {product.active_ingredients && product.active_ingredients.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {product.active_ingredients.map((ing, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 p-4 rounded-xl space-y-1.5 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-stone-950 dark:text-white">
                          {ing.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/30 text-gold-700 dark:text-gold-300 font-semibold">
                          {ing.pct}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed">{ing.role}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Full INCI */}
              <div className="bg-stone-100 dark:bg-obsidian-900/60 border border-stone-200 dark:border-zinc-800 rounded-xl p-4 text-xs font-mono text-stone-700 dark:text-zinc-400">
                <strong className="text-stone-900 dark:text-zinc-200 block mb-1">Lista Completă Clean INCI:</strong>
                {product.full_inci}
              </div>
            </div>
          )}

          {/* Tab 2: Usage Instructions Protocol */}
          {activeTab === 'usage' && (
            <div className="py-8 space-y-6 animate-in fade-in duration-200">
              <h3 className="font-serif text-lg font-bold text-stone-950 dark:text-white">
                Protocolul Nocturn Recomandat de Chimiștii MAG
              </h3>
              <p className="text-xs text-stone-600 dark:text-zinc-400">
                Pentru o regenerare intensivă și activarea fazei anagene de creștere, respectați pașii de mai jos în fiecare seară:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {product.usage_instructions.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-2xl p-5 relative overflow-hidden shadow-sm"
                  >
                    <span className="text-4xl font-serif font-black text-stone-200 dark:text-zinc-800/80 absolute -top-1 right-3 pointer-events-none select-none">
                      0{idx + 1}
                    </span>
                    <div className="text-xs font-mono uppercase text-gold-700 dark:text-gold-400 font-bold mb-2">
                      Pasul 0{idx + 1}
                    </div>
                    <p className="text-xs text-stone-700 dark:text-zinc-300 leading-relaxed relative z-10">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Reviews Content */}
          {activeTab === 'reviews' && (
            <div className="py-8 space-y-8 animate-in fade-in duration-200">
              
              {/* Existing Reviews Grid */}
              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-2xl p-5 space-y-2 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-stone-950 dark:text-white">
                          {rev.user_name}
                        </span>
                        {rev.verified_purchase && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/30 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-medium">
                            Achiziție Verificată
                          </span>
                        )}
                      </div>
                      <div className="flex text-gold-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? 'fill-gold-500 text-gold-500'
                                : 'text-stone-300 dark:text-zinc-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-stone-700 dark:text-zinc-300 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>

              {/* Add New Review Form */}
              <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-gold-500/20 rounded-2xl p-6 shadow-sm">
                <h4 className="font-serif text-base font-bold text-stone-950 dark:text-white mb-2">
                  Adaugă o Recenzie Despre Experiența Ta
                </h4>
                <p className="text-xs text-stone-600 dark:text-zinc-400 mb-4">
                  Părerea ta ajută comunitatea să aleagă produse sigure și curate pentru ochi.
                </p>

                {reviewSubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-300">
                    Mulțumim! Recenzia ta a fost adăugată cu succes și este vizibilă public.
                  </div>
                ) : (
                  <form onSubmit={handleAddReview} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1">
                          Numele Tău & Orașul
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Maria S. (București)"
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1">
                          Rating Acordat
                        </label>
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-gold-500"
                        >
                          <option value="5">★★★★★ (5 stele - Excelent)</option>
                          <option value="4">★★★★☆ (4 stele - Foarte bun)</option>
                          <option value="3">★★★☆☆ (3 stele - Bun)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1">
                        Comentariul Tău
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Descrie rezultatele obținute după aplicarea serului..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl p-3 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-gold-500/20 active:scale-95"
                    >
                      Trimite Recenzia
                    </button>
                  </form>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Related Products Recommendation */}
        {relatedProducts.length > 0 && (
          <div className="pt-10 border-t border-stone-200 dark:border-zinc-800 space-y-6">
            <h3 className="font-serif text-2xl font-bold text-stone-950 dark:text-white">
              Completează-ți Rutina de Îngrijire
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

