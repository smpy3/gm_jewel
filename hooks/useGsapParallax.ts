// useGsapParallax(): adds subtle parallax to a target element using ScrollTrigger.
"use client";

import type React from "react";
import { useEffect } from "react";
import gsap from "gsap";

export function useGsapParallax(target: React.RefObject<HTMLElement | null>, strength = 24) {
  useEffect(() => {
    if (!target.current) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: gsap.Context | undefined;

    (async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          target.current,
          { y: strength },
          {
            y: -strength,
            ease: "none",
            scrollTrigger: {
              trigger: target.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      });
    })();

    return () => ctx?.revert();
  }, [target, strength]);
}
