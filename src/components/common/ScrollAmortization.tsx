'use client';

import React, { useEffect, useRef } from 'react';

interface ScrollAmortizationProps {
  children: React.ReactNode;
}

/**
 * ScrollAmortization:
 * Ultra-smooth, slow monotonic deceleration cushion (amortizare lină, lentă, fără bounce).
 * 
 * Design:
 * - ZERO oscillation / bounce: uses monotonic exponential ease-out that never overshoots zero.
 * - Soft, subtle cushion (max ~18-20px) when scrolling fast to the top or bottom of the page.
 * - Slow, velvety decay back to resting state.
 * - Seamless 120 FPS GPU composite transforms with automatic style reset at rest.
 */
export default function ScrollAmortization({ children }: ScrollAmortizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let currentOffset = 0;
    let targetOffset = 0;
    let animId: number | null = null;
    let isRunning = false;

    // Velocity tracker for fast arrivals
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let scrollSpeed = 0; // px / ms

    // Animation loop: monotonic lerp with gradual decay (Mathematically CANNOT bounce)
    const updateMotion = () => {
      // 1. Target exponentially decays towards 0 (slowly)
      targetOffset *= 0.88;

      // 2. Current offset smoothly and slowly follows targetOffset
      currentOffset += (targetOffset - currentOffset) * 0.065;

      // 3. Resting check: when settled, cleanly clear the transform
      if (Math.abs(currentOffset) < 0.12 && Math.abs(targetOffset) < 0.12) {
        currentOffset = 0;
        targetOffset = 0;
        isRunning = false;
        el.style.transform = '';
        return;
      }

      el.style.transform = `translate3d(0, ${currentOffset.toFixed(2)}px, 0)`;
      animId = requestAnimationFrame(updateMotion);
    };

    const startMotion = () => {
      if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(updateMotion);
      }
    };

    // 1. Detect fast scroll arrivals at document boundaries
    const handleScroll = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const currentScrollY = window.scrollY;
      const dy = currentScrollY - lastScrollY;
      scrollSpeed = dy / dt; // positive = downward, negative = upward
      lastScrollY = currentScrollY;
      lastTime = now;

      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

      // Fast arrival at BOTTOM (footer): soft, slow upward cushion (max -18px)
      if (currentScrollY >= maxScroll - 2 && scrollSpeed > 0.3) {
        const cushion = -Math.min(18, Math.max(6, scrollSpeed * 8));
        if (cushion < targetOffset) {
          targetOffset = cushion;
          startMotion();
        }
      }

      // Fast arrival at TOP: soft, slow downward cushion (max +18px)
      if (currentScrollY <= 2 && scrollSpeed < -0.3) {
        const cushion = Math.min(18, Math.max(6, Math.abs(scrollSpeed) * 8));
        if (cushion > targetOffset) {
          targetOffset = cushion;
          startMotion();
        }
      }
    };

    // 2. Wheel overscroll at boundaries (desktop / trackpad)
    const handleWheel = (e: WheelEvent) => {
      const currentScrollY = window.scrollY;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

      // Scrolling UP at the very top of the page
      if (currentScrollY <= 1 && e.deltaY < 0) {
        e.preventDefault();
        const resistance = Math.max(0.08, 1 - Math.abs(targetOffset) / 22);
        targetOffset = Math.min(20, targetOffset - e.deltaY * 0.035 * resistance);
        startMotion();
        return;
      }

      // Scrolling DOWN at the bottom of the page
      if (currentScrollY >= maxScroll - 2 && e.deltaY > 0) {
        e.preventDefault();
        const resistance = Math.max(0.08, 1 - Math.abs(targetOffset) / 22);
        targetOffset = Math.max(-20, targetOffset - e.deltaY * 0.035 * resistance);
        startMotion();
        return;
      }
    };

    // 3. Touch pull at boundaries (mobile / tablet)
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - touchStartY;
      const currentScrollY = window.scrollY;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

      // Pull down at top
      if (currentScrollY <= 1 && deltaY > 0) {
        e.preventDefault();
        targetOffset = Math.min(20, deltaY * 0.12);
        startMotion();
        return;
      }

      // Pull up at bottom
      if (currentScrollY >= maxScroll - 2 && deltaY < 0) {
        e.preventDefault();
        targetOffset = Math.max(-20, deltaY * 0.12);
        startMotion();
        return;
      }
    };

    const handleTouchEnd = () => {
      startMotion();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col min-h-screen will-change-transform"
      style={{ transformOrigin: 'center top' }}
    >
      {children}
    </div>
  );
}
