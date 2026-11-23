'use client';

import React, { useEffect, useRef } from 'react';

interface ScrollAmortizationProps {
  children: React.ReactNode;
}

/**
 * ScrollAmortization:
 * High-performance, 120 FPS physics-based elastic cushioning (amortizare)
 * at the top and bottom boundaries of the document.
 * 
 * - When scrolling very fast down to the end of the page (footer), it absorbs momentum
 *   with an elastic hydraulic rebound and returns smoothly to resting position.
 * - When scrolling very fast up to the top of the page, it cushions the arrival
 *   with an elastic rebound without hard collision or jarring stop.
 * - When scrolling beyond boundaries with wheel or touch drag, it offers smooth
 *   logarithmic spring resistance.
 */
export default function ScrollAmortization({ children }: ScrollAmortizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let currentOffset = 0;
    let velocity = 0;
    let animId: number | null = null;
    let isAnimating = false;

    // High precision velocity tracker for scroll arrival detection
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let scrollSpeed = 0; // px per millisecond

    // Spring physics constants: critically damped for luxury feel
    const springTension = 0.14; // Elastic pull
    const springDamping = 0.76; // Hydraulic cushioning

    const updatePhysics = () => {
      // Spring force: F = -k * x
      const force = -springTension * currentOffset;
      velocity = (velocity + force) * springDamping;
      currentOffset += velocity;

      // When resting threshold reached, terminate loop and clean DOM transform
      if (Math.abs(currentOffset) < 0.15 && Math.abs(velocity) < 0.15) {
        currentOffset = 0;
        velocity = 0;
        isAnimating = false;
        el.style.transform = '';
        return;
      }

      el.style.transform = `translate3d(0, ${currentOffset.toFixed(2)}px, 0)`;
      animId = requestAnimationFrame(updatePhysics);
    };

    const triggerSpring = (impulse: number) => {
      velocity += impulse;
      if (!isAnimating) {
        isAnimating = true;
        animId = requestAnimationFrame(updatePhysics);
      }
    };

    // 1. Detect high-speed scroll arrivals at boundaries
    const handleScroll = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const currentScrollY = window.scrollY;
      const dy = currentScrollY - lastScrollY;
      scrollSpeed = dy / dt; // positive = scrolling down, negative = scrolling up
      lastScrollY = currentScrollY;
      lastTime = now;

      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

      // High-speed arrival at the BOTTOM of the page
      if (currentScrollY >= maxScroll - 3 && scrollSpeed > 0.28) {
        const impulse = -Math.min(68, scrollSpeed * 24);
        triggerSpring(impulse);
      }

      // High-speed arrival at the TOP of the page
      if (currentScrollY <= 3 && scrollSpeed < -0.28) {
        const impulse = Math.min(68, Math.abs(scrollSpeed) * 24);
        triggerSpring(impulse);
      }
    };

    // 2. Wheel overscroll at boundaries (desktop mouse & trackpad)
    const handleWheel = (e: WheelEvent) => {
      const currentScrollY = window.scrollY;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

      // Top boundary: scrolling up at the very top of the page
      if (currentScrollY <= 1 && e.deltaY < 0) {
        e.preventDefault();
        const resistance = Math.max(0.12, 1 - Math.abs(currentOffset) / 85);
        velocity += -e.deltaY * 0.16 * resistance;
        if (!isAnimating) {
          isAnimating = true;
          animId = requestAnimationFrame(updatePhysics);
        }
        return;
      }

      // Bottom boundary: scrolling down at the end of the page
      if (currentScrollY >= maxScroll - 2 && e.deltaY > 0) {
        e.preventDefault();
        const resistance = Math.max(0.12, 1 - Math.abs(currentOffset) / 85);
        velocity -= e.deltaY * 0.16 * resistance;
        if (!isAnimating) {
          isAnimating = true;
          animId = requestAnimationFrame(updatePhysics);
        }
        return;
      }
    };

    // 3. Touch drag overscroll (mobile / tablet touchscreens)
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
        currentOffset = Math.min(75, deltaY * 0.35);
        el.style.transform = `translate3d(0, ${currentOffset.toFixed(2)}px, 0)`;
        return;
      }

      // Pull up at bottom
      if (currentScrollY >= maxScroll - 2 && deltaY < 0) {
        e.preventDefault();
        currentOffset = Math.max(-75, deltaY * 0.35);
        el.style.transform = `translate3d(0, ${currentOffset.toFixed(2)}px, 0)`;
        return;
      }
    };

    const handleTouchEnd = () => {
      if (Math.abs(currentOffset) > 0.5) {
        if (!isAnimating) {
          isAnimating = true;
          animId = requestAnimationFrame(updatePhysics);
        }
      }
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

