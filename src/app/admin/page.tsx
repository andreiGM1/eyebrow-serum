'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  ShoppingBag,
  Users,
  TrendingUp,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  FileText,
  Save,
  X,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  DollarSign,
} from 'lucide-react';
import { useProductsStore } from '@/lib/store/products-store';
import { INITIAL_CATEGORIES } from '@/lib/data';
import { OrderStatus, Product } from '@/lib/types';
import StockBadge from '@/components/product/StockBadge';
import { useAuth } from '@/lib/store/auth-context';

export default function AdminPage() {
  const { user, isAdmin, isLoading } = useAuth();
  const { products, orders, addProduct, updateProduct, deleteProduct, updateOrderStatus } =
    useProductsStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'customers'>(
    'overview'
  );

  // New product modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    subtitle: '',
    slug: '',
    category_id: INITIAL_CATEGORIES[0].id,
    price: 195,
    compare_at_price: 245,
    stock: 30,
    sku: '',
    volume: '3 ml',
    short_description: '',
    description: '',
    badge: 'NOU',
    is_featured: true,
  });

  // Inline editing product state
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);

  // Aggregate metrics
  const totalRevenue = orders.reduce((acc, o) => acc + (o.payment_status === 'paid' ? o.total : 0), 0);
  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 10).length;

  // Customers unique list
  const customersMap = new Map();
  orders.forEach((o) => {
    if (!customersMap.has(o.customer_email)) {
      customersMap.set(o.customer_email, {
        name: o.customer_name,
        email: o.customer_email,
        phone: o.customer_phone,
        city: o.shipping_address.city,
        ordersCount: 1,
        totalSpent: o.total,
      });
    } else {
      const existing = customersMap.get(o.customer_email);
      existing.ordersCount += 1;
      existing.totalSpent += o.total;
    }
  });
  const customersList = Array.from(customersMap.values());

  const handleStartEdit = (product: Product) => {
    setEditingProductId(product.id);
    setEditPrice(product.price);
    setEditStock(product.stock);
  };

  const handleSaveEdit = (id: string) => {
    updateProduct(id, { price: editPrice, stock: editStock });
    setEditingProductId(null);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductForm.name || !newProductForm.sku) return;

    const slug =
      newProductForm.slug ||
      newProductForm.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    addProduct({
      ...newProductForm,
      slug,
      images: ['/images/mag-evergrow-bottle.png'],
      active_ingredients: [],
      full_inci: 'Formulă cosmetică laborator MAG Bucharest.',
      usage_instructions: ['Aplicați pe sprâncene seara.'],
      benefits: ['Densitate accelerată', 'Formulă activă'],
      rating: 5.0,
      review_count: 1,
    });

    setIsAddModalOpen(false);
    setNewProductForm({
      name: '',
      subtitle: '',
      slug: '',
      category_id: INITIAL_CATEGORIES[0].id,
      price: 195,
      compare_at_price: 245,
      stock: 30,
      sku: '',
      volume: '3 ml',
      short_description: '',
      description: '',
      badge: 'NOU',
      is_featured: true,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] dark:bg-obsidian-950 text-stone-900 dark:text-foreground py-20 px-4 flex items-center justify-center transition-colors">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="text-xs font-mono text-stone-600 dark:text-zinc-400">Se verifică permisiunile de acces...</div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] dark:bg-obsidian-950 text-stone-900 dark:text-foreground py-20 px-4 flex items-center justify-center transition-colors">
        <div className="max-w-md w-full bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-gold-500/30 rounded-3xl p-8 sm:p-10 shadow-xl dark:shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/60 px-2 py-0.5 rounded-full font-bold">
              Acces Restricționat
            </span>
            <h1 className="font-serif text-2xl font-bold text-stone-950 dark:text-white mt-3">
              Panou de Administrare Protejat
            </h1>
            <p className="text-xs text-stone-600 dark:text-zinc-400 mt-2 leading-relaxed">
              Această secțiune este rezervată exclusiv contului demo evaluator (<strong>evaluator@maglaboratories.com</strong>) sau administratorilor autorizați.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/auth/login"
              className="w-full py-3.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Autentificare Cont Demo</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
            <Link
              href="/"
              className="w-full py-3 px-4 rounded-xl bg-stone-100 dark:bg-obsidian-950 hover:bg-stone-200 dark:hover:bg-zinc-800 border border-stone-200 dark:border-zinc-800 text-stone-800 dark:text-zinc-200 font-semibold text-xs transition-colors"
            >
              Înapoi pe Pagina Principală
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-obsidian-950 text-stone-900 dark:text-foreground py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase bg-gold-500/10 text-gold-700 dark:text-gold-300 border border-gold-500/30 px-2.5 py-0.5 rounded-full font-bold">
                ADMIN ACCESS LEVEL
              </span>
              <span className="text-xs font-mono text-stone-500 dark:text-zinc-500">role = &apos;admin&apos;</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-stone-950 dark:text-white mt-1">
              Panou Administrare • MAG Laboratories
            </h1>
            <p className="text-xs text-stone-600 dark:text-zinc-400 mt-1">
              Gestiune completă a catalogului de produse, comenzi, stocuri și clienți înregistrați.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-stone-600 dark:text-zinc-400 hover:text-gold-600 dark:hover:text-gold-400 border border-stone-300 dark:border-zinc-800 hover:border-stone-400 dark:hover:border-zinc-700 px-4 py-2 rounded-xl transition-colors self-start sm:self-center font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Mergi în Magazin</span>
          </Link>
        </div>

        {/* 4 Metric Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs font-mono uppercase text-stone-500 dark:text-zinc-400 font-semibold">Venituri Totale</span>
              <div className="text-2xl font-serif font-bold text-stone-950 dark:text-white mt-1">
                {totalRevenue.toFixed(2)} RON
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">Încasat prin Stripe</span>
            </div>
            <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs font-mono uppercase text-stone-500 dark:text-zinc-400 font-semibold">Comenzi Plasate</span>
              <div className="text-2xl font-serif font-bold text-stone-950 dark:text-white mt-1">
                {totalOrdersCount}
              </div>
              <span className="text-[10px] text-stone-500 dark:text-zinc-400 font-mono">Facturate fiscal</span>
            </div>
            <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs font-mono uppercase text-stone-500 dark:text-zinc-400 font-semibold">Produse Active</span>
              <div className="text-2xl font-serif font-bold text-stone-950 dark:text-white mt-1">
                {totalProductsCount}
              </div>
              <span className="text-[10px] text-stone-500 dark:text-zinc-400 font-mono">În 4 categorii</span>
            </div>
            <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs font-mono uppercase text-stone-500 dark:text-zinc-400 font-semibold">Clienți Înregistrați</span>
              <div className="text-2xl font-serif font-bold text-stone-950 dark:text-white mt-1">
                {customersList.length}
              </div>
              <span className="text-[10px] text-stone-500 dark:text-zinc-400 font-mono">Bază de date Supabase</span>
            </div>
            <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 dark:border-zinc-800 gap-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-4 text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === 'overview'
                ? 'text-gold-700 dark:text-gold-400 border-b-2 border-gold-500 font-bold'
                : 'text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Prezentare Generală
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-4 text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === 'products'
                ? 'text-gold-700 dark:text-gold-400 border-b-2 border-gold-500 font-bold'
                : 'text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Catalog & Gestiune Stocuri ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-4 text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === 'orders'
                ? 'text-gold-700 dark:text-gold-400 border-b-2 border-gold-500 font-bold'
                : 'text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Comenzi & Facturi ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`pb-4 text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === 'customers'
                ? 'text-gold-700 dark:text-gold-400 border-b-2 border-gold-500 font-bold'
                : 'text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Clienți Înregistrați ({customersList.length})
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Quick Alerts */}
            {lowStockCount > 0 && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-500/30 text-xs text-amber-800 dark:text-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>
                    Atenție stoc redus: Există <strong>{lowStockCount} produse</strong> cu stoc mai mic sau egal cu 10 bucăți.
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('products')}
                  className="font-mono text-gold-700 dark:text-gold-400 hover:underline font-bold"
                >
                  Vezi produsele &rarr;
                </button>
              </div>
            )}

            {/* Recent Orders Preview */}
            <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-zinc-800">
                <h3 className="font-serif font-bold text-base text-stone-950 dark:text-white">Ultimele Comenzi Plasate</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-gold-700 dark:text-gold-400 hover:underline font-mono font-semibold"
                >
                  Toate comenzile &rarr;
                </button>
              </div>

              <div className="divide-y divide-stone-200 dark:divide-zinc-800/80">
                {orders.slice(0, 3).map((o) => (
                  <div key={o.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-stone-950 dark:text-white font-mono">{o.order_number}</strong>
                      <span className="text-stone-600 dark:text-zinc-400 block">{o.customer_name} ({o.customer_email})</span>
                    </div>
                    <div className="text-right">
                      <div className="font-serif font-bold text-gold-700 dark:text-gold-400">{o.total.toFixed(2)} RON</div>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-bold">{o.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS CRUD & STOCK MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif font-bold text-xl text-stone-950 dark:text-white">Catalog & Gestiune Stocuri</h2>
                <p className="text-xs text-stone-600 dark:text-zinc-400 mt-0.5">
                  Actualizează prețurile și stocul în timp real sau adaugă formule cosmetice noi.
                </p>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Adaugă Produs Nou</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-2xl overflow-x-auto shadow-sm dark:shadow-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-zinc-800 font-mono uppercase text-[10px] text-stone-500 dark:text-zinc-400 bg-stone-50 dark:bg-obsidian-950/60 font-semibold">
                    <th className="py-3 px-4">Produs & SKU</th>
                    <th className="py-3 px-3">Categorie</th>
                    <th className="py-3 px-3">Preț (RON)</th>
                    <th className="py-3 px-3">Stoc Disponibil</th>
                    <th className="py-3 px-3">Stare Stoc</th>
                    <th className="py-3 px-4 text-right">Acțiuni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-zinc-800/80 text-stone-700 dark:text-zinc-300">
                  {products.map((p) => {
                    const isEditing = editingProductId === p.id;
                    const cat = INITIAL_CATEGORIES.find((c) => c.id === p.category_id);

                    return (
                      <tr key={p.id} className="hover:bg-stone-50 dark:hover:bg-zinc-800/30 transition-colors">
                        <td className="py-3.5 px-4">
                          <strong className="text-stone-950 dark:text-white block font-serif">{p.name}</strong>
                          <span className="text-[10px] text-stone-500 dark:text-zinc-500 font-mono">
                            SKU: {p.sku} • {p.volume}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-stone-600 dark:text-zinc-400">
                          {cat ? cat.name : 'Cosmetic'}
                        </td>
                        <td className="py-3.5 px-3">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editPrice}
                              onChange={(e) => setEditPrice(Number(e.target.value))}
                              className="w-20 bg-white dark:bg-obsidian-950 border border-gold-500 rounded px-2 py-1 text-xs text-stone-900 dark:text-white font-mono"
                            />
                          ) : (
                            <strong className="font-mono text-gold-700 dark:text-gold-400">{p.price.toFixed(2)}</strong>
                          )}
                        </td>
                        <td className="py-3.5 px-3">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editStock}
                              onChange={(e) => setEditStock(Number(e.target.value))}
                              className="w-20 bg-white dark:bg-obsidian-950 border border-gold-500 rounded px-2 py-1 text-xs text-stone-900 dark:text-white font-mono"
                            />
                          ) : (
                            <span className="font-mono font-bold text-stone-950 dark:text-white">{p.stock} buc.</span>
                          )}
                        </td>
                        <td className="py-3.5 px-3">
                          <StockBadge stock={isEditing ? editStock : p.stock} />
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {isEditing ? (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleSaveEdit(p.id)}
                                className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-sm"
                                title="Salvează modificările"
                              >
                                <Save className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setEditingProductId(null)}
                                className="p-1.5 bg-stone-200 dark:bg-zinc-700 hover:bg-stone-300 dark:hover:bg-zinc-600 text-stone-800 dark:text-white rounded-lg"
                                title="Anulează"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleStartEdit(p)}
                                className="p-1.5 text-stone-500 dark:text-zinc-400 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-stone-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                                title="Editează preț / stoc"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteProduct(p.id)}
                                className="p-1.5 text-stone-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-stone-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                                title="Șterge produs"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif font-bold text-xl text-stone-950 dark:text-white">Gestionare Comenzi & Facturi</h2>
              <p className="text-xs text-stone-600 dark:text-zinc-400 mt-0.5">
                Urmărește statusul comenzilor plătite cu Stripe, emite și vizualizează facturile fiscale.
              </p>
            </div>

            <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-2xl overflow-x-auto shadow-sm dark:shadow-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-zinc-800 font-mono uppercase text-[10px] text-stone-500 dark:text-zinc-400 bg-stone-50 dark:bg-obsidian-950/60 font-semibold">
                    <th className="py-3 px-4">Comandă & Dată</th>
                    <th className="py-3 px-3">Client & Contact</th>
                    <th className="py-3 px-3">Articole Comandate</th>
                    <th className="py-3 px-3">Total (TVA 19%)</th>
                    <th className="py-3 px-3">Status Comandă</th>
                    <th className="py-3 px-4 text-right">Factură</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-zinc-800/80 text-stone-700 dark:text-zinc-300">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-stone-50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <strong className="text-stone-950 dark:text-white font-mono">{o.order_number}</strong>
                        <span className="text-[10px] text-stone-500 dark:text-zinc-500 block font-mono">
                          {new Date(o.created_at).toLocaleDateString('ro-RO')}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <strong className="text-stone-950 dark:text-white block">{o.customer_name}</strong>
                        <span className="text-[10px] text-stone-500 dark:text-zinc-400">{o.customer_email}</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="text-stone-700 dark:text-zinc-300">
                          {o.items.map((i) => `${i.product_name} (x${i.quantity})`).join(', ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <strong className="font-mono text-gold-700 dark:text-gold-400">{o.total.toFixed(2)} RON</strong>
                        <span className="text-[10px] text-stone-500 dark:text-zinc-500 block">TVA: {o.tax_amount.toFixed(2)}</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                          className="bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-gold-500 font-mono"
                        >
                          <option value="paid">Plătită (Paid)</option>
                          <option value="processing">În procesare</option>
                          <option value="shipped">Expediată (Fan Courier)</option>
                          <option value="completed">Finalizată</option>
                          <option value="cancelled">Anulată</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/invoice/${o.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 text-gold-700 dark:text-gold-400 text-xs font-mono transition-colors border border-stone-200 dark:border-zinc-700 font-semibold"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Factură #{o.invoice_number}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: REGISTERED CUSTOMERS */}
        {activeTab === 'customers' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif font-bold text-xl text-stone-950 dark:text-white">Listă Clienți Înregistrați</h2>
              <p className="text-xs text-stone-600 dark:text-zinc-400 mt-0.5">
                Baza de date a clienților cu comenzi plasate pe platforma Evergrow.
              </p>
            </div>

            <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-2xl overflow-x-auto shadow-sm dark:shadow-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-zinc-800 font-mono uppercase text-[10px] text-stone-500 dark:text-zinc-400 bg-stone-50 dark:bg-obsidian-950/60 font-semibold">
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-3">Email</th>
                    <th className="py-3 px-3">Telefon</th>
                    <th className="py-3 px-3">Oraș</th>
                    <th className="py-3 px-3 text-center">Comenzi</th>
                    <th className="py-3 px-4 text-right">Total Cheltuit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-zinc-800/80 text-stone-700 dark:text-zinc-300">
                  {customersList.map((c, idx) => (
                    <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-stone-950 dark:text-white font-serif">{c.name}</td>
                      <td className="py-3.5 px-3 font-mono text-stone-600 dark:text-zinc-400">{c.email}</td>
                      <td className="py-3.5 px-3 font-mono">{c.phone}</td>
                      <td className="py-3.5 px-3">{c.city}</td>
                      <td className="py-3.5 px-3 text-center font-mono font-bold text-stone-950 dark:text-white">
                        {c.ordersCount}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-gold-700 dark:text-gold-400 font-bold">
                        {c.totalSpent.toFixed(2)} RON
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal: Add New Product */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-gold-500/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-zinc-800">
                <h3 className="font-serif font-bold text-xl text-stone-950 dark:text-white">Adăugare Produs Nou în Catalog</h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                    Denumire Produs *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: MAG Complex Keratin Fortifier 4ml"
                    value={newProductForm.name}
                    onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                    className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                      Categorie
                    </label>
                    <select
                      value={newProductForm.category_id}
                      onChange={(e) => setNewProductForm({ ...newProductForm, category_id: e.target.value })}
                      className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-gold-500"
                    >
                      {INITIAL_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                      SKU Unic *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MAG-KER-004"
                      value={newProductForm.sku}
                      onChange={(e) => setNewProductForm({ ...newProductForm, sku: e.target.value })}
                      className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-stone-900 dark:text-white uppercase font-mono focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                      Preț (RON) *
                    </label>
                    <input
                      type="number"
                      required
                      value={newProductForm.price}
                      onChange={(e) => setNewProductForm({ ...newProductForm, price: Number(e.target.value) })}
                      className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-stone-900 dark:text-white font-mono focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                      Preț Tăiat (RON)
                    </label>
                    <input
                      type="number"
                      value={newProductForm.compare_at_price}
                      onChange={(e) => setNewProductForm({ ...newProductForm, compare_at_price: Number(e.target.value) })}
                      className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-stone-900 dark:text-white font-mono focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                      Stoc Inițial *
                    </label>
                    <input
                      type="number"
                      required
                      value={newProductForm.stock}
                      onChange={(e) => setNewProductForm({ ...newProductForm, stock: Number(e.target.value) })}
                      className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-stone-900 dark:text-white font-mono focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                    Descriere Scurtă
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Descriere sumară pentru catalog..."
                    value={newProductForm.short_description}
                    onChange={(e) => setNewProductForm({ ...newProductForm, short_description: e.target.value })}
                    className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl p-3 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-stone-300 dark:border-zinc-700 text-xs text-stone-700 dark:text-zinc-300 hover:bg-stone-100 dark:hover:bg-zinc-800"
                  >
                    Anulează
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase"
                  >
                    Salvează Produsul
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

