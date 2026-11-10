'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMsg('Vă rugăm să introduceți adresa de email și parola.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const supabase = createClient();
      if (!supabase) {
        throw new Error('Serviciul de autentificare nu este configurat.');
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Email-ul sau parola sunt incorecte. Dacă nu ai cont, te poți înregistra gratuit mai jos.');
        }
        throw error;
      }

      if (data.session) {
        router.push('/account');
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'A apărut o eroare la autentificare.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickEvaluatorLogin = async () => {
    setEmail('evaluator@maglaboratories.com');
    setPassword('ParolaEvaluator2026!');
    setLoading(true);
    setErrorMsg('');

    try {
      const supabase = createClient();
      if (!supabase) throw new Error('Serviciul Supabase nu este disponibil.');

      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'evaluator@maglaboratories.com',
        password: 'ParolaEvaluator2026!',
      });

      if (error) throw error;

      router.push('/account');
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Eroare la autentificarea contului demo.');
    } finally {
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
          <h1 className="font-serif text-2xl font-bold text-stone-950 dark:text-white">Autentificare Cont Client</h1>
          <p className="text-xs text-stone-600 dark:text-zinc-400">
            Conectat în timp real la Supabase Auth. Poți folosi orice adresă de email.
          </p>
        </div>

        {/* Quick Demo Pill for Evaluators */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-gold-500/15 via-gold-500/5 to-transparent border border-gold-500/35 shadow-sm space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-gold-500/20 text-gold-600 dark:text-gold-400 flex-shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-serif font-bold text-stone-950 dark:text-white">
                  Cont Demo Evaluator
                </div>
                <div className="text-[11px] font-mono text-stone-600 dark:text-zinc-400 truncate">
                  evaluator@maglaboratories.com
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-800 dark:text-gold-300 border border-gold-500/30 whitespace-nowrap flex-shrink-0">
              Instant
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickEvaluatorLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs font-mono font-bold transition-all shadow-md hover:shadow-gold-500/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
          >
            <Sparkles className="w-3.5 h-3.5 text-obsidian-950 flex-shrink-0" />
            <span>Autentificare 1-Click</span>
          </button>
        </div>

        {/* Error message alert */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
            <div className="flex-1">{errorMsg}</div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
              Adresă Email *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="nume@exemplu.ro"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gold-500 pl-10"
              />
              <Mail className="w-4 h-4 text-stone-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block font-semibold">
                Parolă *
              </label>
              <span className="text-[11px] text-gold-700 dark:text-gold-400/80 hover:underline cursor-pointer font-medium">
                Ai uitat parola?
              </span>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gold-500 pl-10"
              />
              <Lock className="w-4 h-4 text-stone-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-obsidian-950 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-gold-500/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Se verifică în Supabase...' : 'Intră în Cont'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Social Authentication: Google & Apple */}
        <SocialAuthButtons />

        <div className="text-center text-xs text-stone-600 dark:text-zinc-400 pt-3 border-t border-stone-200 dark:border-zinc-800">
          Nu ai încă un cont?{' '}
          <Link href="/auth/register" className="text-gold-700 dark:text-gold-400 hover:underline font-bold">
            Înregistrează-te gratuit &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
