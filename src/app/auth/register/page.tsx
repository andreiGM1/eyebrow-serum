'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/account');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-obsidian-950 text-stone-900 dark:text-foreground py-20 px-4 flex items-center justify-center transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-gold-500/30 rounded-3xl p-8 sm:p-10 shadow-xl dark:shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl font-serif font-bold text-stone-950 dark:text-white tracking-widest">MAG</span>
            <span className="text-[10px] font-mono uppercase bg-gold-500/10 text-gold-700 dark:text-gold-300 border border-gold-500/30 px-2 py-0.5 rounded font-bold">
              LABORATORIES
            </span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-stone-950 dark:text-white">Creează un Cont Nou</h1>
          <p className="text-xs text-stone-600 dark:text-zinc-400">
            Salvează adresele de livrare și primești un voucher de 10% la prima comandă.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
              Nume și Prenume *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Elena Ionescu"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gold-500 pl-10"
              />
              <User className="w-4 h-4 text-stone-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
              Adresă Email *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="elena.ionescu@exemplu.ro"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gold-500 pl-10"
              />
              <Mail className="w-4 h-4 text-stone-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
              Telefon
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="0722 000 000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gold-500 pl-10"
              />
              <Phone className="w-4 h-4 text-stone-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
              Parolă *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gold-500 pl-10"
              />
              <Lock className="w-4 h-4 text-stone-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-obsidian-950 font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-gold-500/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Se creează contul...' : 'Înregistrează Contul'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-stone-600 dark:text-zinc-400 pt-2 border-t border-stone-200 dark:border-zinc-800">
          Ai deja un cont creat?{' '}
          <Link href="/auth/login" className="text-gold-700 dark:text-gold-400 hover:underline font-semibold">
            Conectează-te aici
          </Link>
        </div>

      </div>
    </div>
  );
}

