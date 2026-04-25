// useLenis(): adds smooth scrolling with good performance and respects reduced motion settings.
"use client";

import { useEffect } from "react";

export function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;
    let lenis: any;

    (async () => {
      const { default: Lenis } = await import("lenis");
      lenis = new Lenis({
        duration: 1.15,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.15,
        smoothWheel: true,
        syncTouch: false
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };
      rafId = window.requestAnimationFrame(raf);
    })();

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      lenis?.destroy?.();
    };
  }, []);
}

