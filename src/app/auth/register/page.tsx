'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password) {
      setErrorMsg('Vă rugăm să completați toate câmpurile obligatorii.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg('Parola trebuie să aibă minim 6 caractere.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const supabase = createClient();
      if (!supabase) {
        throw new Error('Serviciul Supabase nu este configurat.');
      }

      const { data, error } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName.trim(),
            phone: formData.phone.trim(),
          },
        },
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          throw new Error('Există deja un cont cu această adresă de email. Te rugăm să te autentifici.');
        }
        throw error;
      }

      setSuccessMsg('Cont creat cu succes în Supabase! Se redirecționează...');

      // Auto sign-in if session was not returned immediately
      if (!data.session) {
        await supabase.auth.signInWithPassword({
          email: formData.email.trim(),
          password: formData.password,
        });
      }

      setTimeout(() => {
        router.push('/account');
        router.refresh();
      }, 800);
    } catch (err: any) {
      setErrorMsg(err.message || 'A apărut o eroare la crearea contului.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-obsidian-950 text-stone-900 dark:text-foreground py-16 px-4 flex items-center justify-center transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-gold-500/30 rounded-3xl p-7 sm:p-10 shadow-xl dark:shadow-2xl space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl font-serif font-bold text-stone-950 dark:text-white tracking-widest">MAG</span>
            <span className="text-[10px] font-mono uppercase bg-gold-500/10 text-gold-700 dark:text-gold-300 border border-gold-500/30 px-2 py-0.5 rounded font-bold">
              LABORATORIES
            </span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-stone-950 dark:text-white">Creează un Cont Nou</h1>
          <p className="text-xs text-stone-600 dark:text-zinc-400">
            Poți folosi orice adresă de email. Validarea este instantă în Supabase.
          </p>
        </div>

        {/* Success / Error alerts */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
            <div className="flex-1">{errorMsg}</div>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs flex items-start gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
            <div className="flex-1 font-semibold">{successMsg}</div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
              Nume și Prenume *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Andrei Popescu"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gold-500 pl-10"
              />
              <User className="w-4 h-4 text-stone-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
              Adresă Email (orice e-mail) *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="email.tau@domeniu.ro"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gold-500 pl-10"
              />
              <Mail className="w-4 h-4 text-stone-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
              Număr Telefon
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
              Parolă (minim 6 caractere) *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gold-500 pl-10"
              />
              <Lock className="w-4 h-4 text-stone-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-500 dark:text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span>Datele sunt protejate conform GDPR și criptate în Supabase.</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-obsidian-950 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-gold-500/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Se înregistrează...' : 'Creează Contul Gratuit'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-stone-600 dark:text-zinc-400 pt-3 border-t border-stone-200 dark:border-zinc-800">
          Ai deja cont creat?{' '}
          <Link href="/auth/login" className="text-gold-700 dark:text-gold-400 hover:underline font-bold">
            Autentifică-te aici &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
