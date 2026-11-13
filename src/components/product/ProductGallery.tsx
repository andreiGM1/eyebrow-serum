'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, ShieldCheck, Sparkles, Droplets } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const activeImage = images[selectedIndex] || '/images/mag-evergrow-bottle.png';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div
        className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-zinc-950 border border-stone-200 dark:border-zinc-800 cursor-crosshair group shadow-xl"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={activeImage}
          alt={productName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover object-center transition-transform duration-200 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          style={
            isZoomed
              ? {
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                }
              : undefined
          }
        />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
          <div className="px-3 py-1 rounded-full bg-white/95 dark:bg-obsidian-950/85 backdrop-blur-md border border-teal-700/30 dark:border-teal-500/30 text-[11px] font-mono text-teal-900 dark:text-teal-200 flex items-center gap-1.5 shadow-lg font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
            <span>100% Extracte Botanice Pure</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-white/95 dark:bg-obsidian-950/85 backdrop-blur-md border border-stone-300 dark:border-zinc-700/50 text-[11px] font-mono text-stone-800 dark:text-zinc-200 flex items-center gap-1.5 shadow-lg font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Fără Prostaglandine</span>
          </div>
        </div>

        {/* Zoom Hint Icon */}
        <div className="absolute bottom-4 right-4 p-2 rounded-full bg-white/90 dark:bg-obsidian-950/80 border border-stone-300 dark:border-zinc-700 text-stone-700 dark:text-zinc-400 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none">
          <ZoomIn className="w-4 h-4" />
        </div>
      </div>

      {/* Thumbnails Row if more than 1 image */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 dark:bg-zinc-950 border-2 transition-all flex-shrink-0 ${
                selectedIndex === idx
                  ? 'border-teal-700 dark:border-teal-400 shadow-md shadow-teal-900/15'
                  : 'border-stone-200 dark:border-zinc-800 opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Guarantee Strip */}
      <div className="p-3.5 rounded-xl bg-[#EFF6F3] dark:bg-teal-950/40 border border-teal-700/20 text-xs text-stone-800 dark:text-zinc-200 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-teal-700 dark:text-teal-400" />
          <span className="font-medium">Formulă fără apă, fără diluanți • Presat la rece</span>
        </span>
        <span className="text-[10px] font-mono text-gold-700 dark:text-gold-400 font-bold uppercase">
          ISO 22716 GMP
        </span>
      </div>
    </div>
  );
}

