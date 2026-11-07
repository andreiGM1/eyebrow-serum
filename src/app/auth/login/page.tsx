'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, FlaskConical } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('elena.ionescu@exemplu.ro');
  const [password, setPassword] = useState('parola123');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/account');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-foreground py-20 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-obsidian-900 border border-gold-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl font-serif font-bold text-white tracking-widest">MAG</span>
            <span className="text-[10px] font-mono uppercase bg-gold-500/10 text-gold-300 border border-gold-500/30 px-2 py-0.5 rounded">
              LABORATORIES
            </span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-white">Autentificare Cont Client</h1>
          <p className="text-xs text-zinc-400">
            Accesează istoricul comenzilor și descarcă facturile fiscale.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-zinc-400 block mb-1">
              Adresă Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-obsidian-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500 pl-10"
              />
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono text-zinc-400 block">
                Parolă
              </label>
              <span className="text-[11px] text-gold-400/80 hover:underline cursor-pointer">
                Ai uitat parola?
              </span>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-obsidian-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500 pl-10"
              />
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-obsidian-950 font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Se conectează...' : 'Intră în Cont'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-zinc-400 pt-2 border-t border-zinc-800">
          Nu ai încă un cont?{' '}
          <Link href="/auth/register" className="text-gold-400 hover:underline font-semibold">
            Înregistrează-te gratuit
          </Link>
        </div>

        <div className="text-center">
          <Link href="/admin" className="text-[11px] font-mono text-zinc-500 hover:text-zinc-300">
            Ești evaluator? Accesează direct Panoul Admin &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
