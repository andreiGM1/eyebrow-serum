'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User as UserIcon,
  ShoppingBag,
  FileText,
  CheckCircle2,
  Clock,
  Truck,
  LogOut,
  ArrowRight,
  ShieldCheck,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useProductsStore } from '@/lib/store/products-store';
import { createClient } from '@/lib/supabase/client';

export default function AccountPage() {
  const router = useRouter();
  const { orders } = useProductsStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<{
    fullName: string;
    email: string;
    phone: string;
    role: string;
    createdAt?: string;
  }>({
    fullName: '',
    email: '',
    phone: '',
    role: 'customer',
  });
  const [updateMsg, setUpdateMsg] = useState('');

  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      try {
        const supabase = createClient();
        if (!supabase) {
          setLoading(false);
          return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user);

          // Fetch profile from supabase profiles table
          const { data: profData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (profData) {
            setProfile({
              fullName: profData.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Client MAG',
              email: profData.email || user.email || '',
              phone: profData.phone || user.user_metadata?.phone || '',
              role: profData.role || 'customer',
              createdAt: profData.created_at || user.created_at,
            });
          } else {
            setProfile({
              fullName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Client MAG',
              email: user.email || '',
              phone: user.user_metadata?.phone || '',
              role: 'customer',
              createdAt: user.created_at,
            });
          }
        }
      } catch (err) {
        console.error('Error loading user session:', err);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
      setUser(null);
      router.push('/auth/login');
      router.refresh();
    } catch (err) {
      console.error('Sign out error:', err);
      router.push('/auth/login');
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateMsg('');
    try {
      const supabase = createClient();
      if (supabase && user) {
        await supabase
          .from('profiles')
          .update({
            full_name: profile.fullName,
            phone: profile.phone,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
      }
      setUpdateMsg('Datele au fost actualizate cu succes în baza de date Supabase!');
      setTimeout(() => setUpdateMsg(''), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  const initials = profile.fullName
    ? profile.fullName
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'MG';

  // If not logged in
  if (!loading && !user) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] dark:bg-obsidian-950 text-stone-900 dark:text-foreground py-20 px-4 flex items-center justify-center transition-colors">
        <div className="max-w-md w-full bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-xl dark:shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto text-gold-700 dark:text-gold-400">
            <UserIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-stone-950 dark:text-white">Nu ești autentificat</h1>
            <p className="text-xs text-stone-600 dark:text-zinc-400 mt-2">
              Pentru a-ți vizualiza contul, istoricul comenzilor și facturile emise, te rugăm să te autentifici.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/auth/login"
              className="w-full py-3.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Autentificare Cont</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/auth/register"
              className="w-full py-3 px-4 rounded-xl bg-stone-100 dark:bg-obsidian-950 hover:bg-stone-200 dark:hover:bg-zinc-800 border border-stone-200 dark:border-zinc-800 text-stone-800 dark:text-zinc-200 font-semibold text-xs transition-colors"
            >
              Creează Cont Gratuit
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-obsidian-950 text-stone-900 dark:text-foreground py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Profile Header */}
        <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm dark:shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gold-500/15 border border-gold-500/40 flex items-center justify-center text-gold-700 dark:text-gold-400 font-serif font-bold text-xl shadow-inner overflow-hidden flex-shrink-0">
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt={profile.fullName || 'Avatar'}
                  className="w-full h-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-stone-950 dark:text-white">
                  {profile.fullName || 'Client MAG'}
                </h1>
                
                {/* Social Auth Provider Badge */}
                {(user?.user_metadata?.provider === 'google' || user?.app_metadata?.provider === 'google') && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 px-2 py-0.5 rounded-full font-semibold">
                    <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    Google
                  </span>
                )}

                {(user?.user_metadata?.provider === 'apple' || user?.app_metadata?.provider === 'apple') && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase bg-stone-100 dark:bg-zinc-800 text-stone-900 dark:text-white border border-stone-300 dark:border-zinc-700 px-2 py-0.5 rounded-full font-semibold">
                    <svg className="w-3 h-3 flex-shrink-0 fill-current" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.66-1.06 1.73-.93 2.76 1 .08 2.02-.51 2.64-1.26z"/>
                    </svg>
                    Apple ID
                  </span>
                )}

                <span className="text-[10px] font-mono uppercase bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                  Autentificat Supabase
                </span>
                {profile.role === 'admin' && (
                  <span className="text-[10px] font-mono uppercase bg-gold-500 text-obsidian-950 font-bold px-2 py-0.5 rounded-full">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-600 dark:text-zinc-400 mt-1">
                {profile.email} {profile.phone && `• ${profile.phone}`}
              </p>
              <div className="text-[11px] font-mono text-gold-700 dark:text-gold-400 mt-1 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>ID Supabase: {user?.id?.substring(0, 13)}...</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/catalog"
              className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-gold-500/20 active:scale-95"
            >
              Comandă Nouă
            </Link>
            <button
              onClick={handleSignOut}
              className="p-2.5 text-stone-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 rounded-xl border border-stone-200 dark:border-zinc-800 hover:border-red-300 dark:hover:border-red-900/60 transition-colors"
              title="Deconectare din cont"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-stone-200 dark:border-zinc-800 gap-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-4 text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === 'orders'
                ? 'text-gold-700 dark:text-gold-400 border-b-2 border-gold-500 font-bold'
                : 'text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Istoric Comenzi & Facturi Fiscale ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-4 text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === 'profile'
                ? 'text-gold-700 dark:text-gold-400 border-b-2 border-gold-500 font-bold'
                : 'text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Date Personale & Securitate Cont
          </button>
        </div>

        {/* TAB 1: ORDERS & INVOICES */}
        {activeTab === 'orders' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {orders.length === 0 ? (
              <div className="py-16 text-center bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
                <ShoppingBag className="w-12 h-12 text-stone-400 dark:text-zinc-600 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-stone-950 dark:text-white">Nu ai nicio comandă plasată</h3>
                <p className="text-xs text-stone-600 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
                  Explorează catalogul și alege serul MAG EVERGROW pentru un tratament natural de 90 de zile.
                </p>
                <Link
                  href="/catalog"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase shadow-md shadow-gold-500/20 active:scale-95"
                >
                  Vezi Catalogul &rarr;
                </Link>
              </div>
            ) : (
              orders.map((o) => (
                <div
                  key={o.id}
                  className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 hover:border-gold-500/40 rounded-2xl p-6 transition-all space-y-4 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 dark:border-zinc-800 gap-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-stone-500 dark:text-zinc-500 block">
                        Comandă #{o.order_number}
                      </span>
                      <div className="text-xs font-mono text-stone-700 dark:text-zinc-300">
                        Plasată la {new Date(o.created_at).toLocaleDateString('ro-RO')}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Status: {o.status}</span>
                      </span>

                      <Link
                        href={`/invoice/${o.id}`}
                        className="px-3.5 py-1.5 rounded-xl bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 text-gold-700 dark:text-gold-300 text-xs font-mono transition-colors flex items-center gap-1.5 font-semibold"
                      >
                        <FileText className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
                        <span>Factură Fiscală PDF</span>
                      </Link>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    {o.items.map((i, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-stone-700 dark:text-zinc-300">
                        <span>
                          {i.product_name} <strong className="text-stone-950 dark:text-white">x{i.quantity}</strong>
                        </span>
                        <span className="font-mono text-stone-900 dark:text-white font-semibold">
                          {(i.unit_price * i.quantity).toFixed(2)} RON
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total and destination */}
                  <div className="pt-3 border-t border-stone-200 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-600 dark:text-zinc-400 gap-2">
                    <div>
                      Livrare către: <strong className="text-stone-900 dark:text-zinc-200">{o.customer_name}</strong>,{' '}
                      {o.shipping_address?.city}, {o.shipping_address?.street}
                    </div>
                    <div className="font-serif font-bold text-sm text-gold-700 dark:text-gold-400">
                      Total Achitat: {o.total.toFixed(2)} RON (TVA inclus)
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: PROFILE */}
        {activeTab === 'profile' && (
          <form onSubmit={handleUpdateProfile} className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-8 space-y-6 animate-in fade-in duration-200 shadow-sm">
            <h3 className="font-serif font-bold text-xl text-stone-950 dark:text-white">Date de Identificare & Contact</h3>

            {updateMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span className="font-semibold">{updateMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-stone-600 dark:text-zinc-400 block mb-1 font-mono font-semibold">Nume Complet</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-stone-900 dark:text-white focus:outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="text-stone-600 dark:text-zinc-400 block mb-1 font-mono font-semibold">Adresă Email (Conectată Supabase)</label>
                <input
                  type="email"
                  disabled
                  value={profile.email}
                  className="w-full bg-stone-100 dark:bg-zinc-800/50 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-stone-500 dark:text-zinc-400 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-stone-600 dark:text-zinc-400 block mb-1 font-mono font-semibold">Număr Telefon</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="0722 000 000"
                  className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-stone-900 dark:text-white focus:outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="text-stone-600 dark:text-zinc-400 block mb-1 font-mono font-semibold">Rol Utilizator</label>
                <input
                  type="text"
                  disabled
                  value={profile.role === 'admin' ? 'Administrator' : 'Client Înregistrat'}
                  className="w-full bg-stone-100 dark:bg-zinc-800/50 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-stone-500 dark:text-zinc-400 cursor-not-allowed capitalize font-mono"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase shadow-md shadow-gold-500/20 active:scale-95 transition-all"
              >
                Salvează Modificările în Supabase
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
