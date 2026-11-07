import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface StockBadgeProps {
  stock: number;
}

export default function StockBadge({ stock }: StockBadgeProps) {
  if (stock <= 0) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-950/60 border border-red-500/30 text-red-300">
        <XCircle className="w-3.5 h-3.5 text-red-400" />
        <span>Epuizat temporar (Compounding nou în curs)</span>
      </div>
    );
  }

  if (stock <= 10) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-950/60 border border-amber-500/30 text-amber-300 animate-pulse-subtle">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
        <span>Stoc redus (Ultimele {stock} flacoane)</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
      <span>În stoc (Expediere în 24h)</span>
    </div>
  );
}

