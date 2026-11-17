'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, ShieldCheck, Sparkles, Droplets, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Touch swipe gesture tracking for mobile viewports
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const minSwipeDistance = 40;

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsZoomed(false);
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && selectedIndex < images.length - 1) {
      setSelectedIndex((prev) => prev + 1);
    }
    if (isRightSwipe && selectedIndex > 0) {
      setSelectedIndex((prev) => prev - 1);
    }
  };

  const activeImage = images[selectedIndex] || '/images/mag-evergrow-bottle.png';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Image Container with Touch-Swipe & Desktop Hover Zoom */}
      <div
        className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-zinc-950 border border-stone-200 dark:border-zinc-800 cursor-crosshair group shadow-xl touch-manipulation select-none"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={activeImage}
          alt={productName}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
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
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-1.5 sm:gap-2 pointer-events-none z-10">
          <div className="px-2.5 py-1 rounded-full bg-white/95 dark:bg-obsidian-950/85 backdrop-blur-md border border-teal-700/30 dark:border-teal-500/30 text-[10px] sm:text-[11px] font-mono text-teal-900 dark:text-teal-200 flex items-center gap-1.5 shadow-lg font-semibold">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-700 dark:text-teal-400" />
            <span>100% Extracte Botanice Pure</span>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-white/95 dark:bg-obsidian-950/85 backdrop-blur-md border border-stone-300 dark:border-zinc-700/50 text-[10px] sm:text-[11px] font-mono text-stone-800 dark:text-zinc-200 flex items-center gap-1.5 shadow-lg font-semibold">
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Fără Prostaglandine</span>
          </div>
        </div>

        {/* Swipe arrow hint controls on mobile */}
        {images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none sm:hidden">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
              }}
              disabled={selectedIndex === 0}
              className={`p-2 rounded-full bg-white/80 dark:bg-obsidian-900/80 backdrop-blur-sm border border-stone-200 dark:border-zinc-800 pointer-events-auto transition-opacity active:scale-95 ${
                selectedIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-80'
              }`}
              aria-label="Imaginea anterioară"
            >
              <ChevronLeft className="w-4 h-4 text-stone-800 dark:text-white" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (selectedIndex < images.length - 1) setSelectedIndex(selectedIndex + 1);
              }}
              disabled={selectedIndex === images.length - 1}
              className={`p-2 rounded-full bg-white/80 dark:bg-obsidian-900/80 backdrop-blur-sm border border-stone-200 dark:border-zinc-800 pointer-events-auto transition-opacity active:scale-95 ${
                selectedIndex === images.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-80'
              }`}
              aria-label="Imaginea următoare"
            >
              <ChevronRight className="w-4 h-4 text-stone-800 dark:text-white" />
            </button>
          </div>
        )}

        {/* Zoom Hint Icon (Desktop only) */}
        <div className="hidden sm:block absolute bottom-4 right-4 p-2 rounded-full bg-white/90 dark:bg-obsidian-950/80 border border-stone-300 dark:border-zinc-700 text-stone-700 dark:text-zinc-400 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none">
          <ZoomIn className="w-4 h-4" />
        </div>
      </div>

      {/* Mobile Swipe Pagination Dots */}
      {images.length > 1 && (
        <div className="flex sm:hidden items-center justify-center gap-2 py-1">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                selectedIndex === idx
                  ? 'w-6 bg-teal-800 dark:bg-teal-400'
                  : 'w-2 bg-stone-300 dark:bg-zinc-700'
              }`}
              aria-label={`Vezi imaginea ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Thumbnails Row if more than 1 image (Thumb-friendly minimum 48px touch targets) */}
      {images.length > 1 && (
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 no-scrollbar touch-manipulation">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative min-w-[56px] min-h-[56px] sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-stone-100 dark:bg-zinc-950 border-2 transition-all flex-shrink-0 active:scale-95 cursor-pointer ${
                selectedIndex === idx
                  ? 'border-teal-700 dark:border-teal-400 shadow-md shadow-teal-900/15'
                  : 'border-stone-200 dark:border-zinc-800 opacity-60 hover:opacity-100'
              }`}
              aria-label={`Selectează imaginea ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Guarantee Strip */}
      <div className="p-3 sm:p-3.5 rounded-xl bg-[#EFF6F3] dark:bg-teal-950/40 border border-teal-700/20 text-xs text-stone-800 dark:text-zinc-200 flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 min-w-0">
          <Droplets className="w-4 h-4 text-teal-700 dark:text-teal-400 flex-shrink-0" />
          <span className="font-medium truncate">Formulă fără apă, fără diluanți • Presat la rece</span>
        </span>
        <span className="text-[10px] font-mono text-gold-700 dark:text-gold-400 font-bold uppercase flex-shrink-0">
          ISO 22716 GMP
        </span>
      </div>
    </div>
  );
}
