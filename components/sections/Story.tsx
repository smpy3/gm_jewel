// Story: scroll-based storytelling with GSAP pinning on desktop and a stacked layout on mobile (no blank frames).
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    title: "Cut for light",
    body: "Every facet is measured for maximum fire. The result: sparkle that looks alive, not flat.",
    media: "/media/Earrings/Product_1/e_p1_3.jpg"
  },
  {
    title: "Built for comfort",
    body: "Balanced weight, soft edges, and durable settings so it wears like your favorite piece — daily.",
    media: "/media/Necklace/Product_1/n_p1_2.jpg"
  },
  {
    title: "Delivered like luxury",
    body: "Concierge pickup, secure packaging, and fast follow-up. The experience stays premium end-to-end.",
    media: "/media/Bracelets/Product_1/b_p1_4.jpg"
  }
];

export default function Story() {
  const root = useRef<HTMLElement>(null!);
  const panels = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!root.current) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia?.("(min-width: 768px)").matches) return;

    let ctx: gsap.Context | undefined;

    (async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const validPanels = panels.current.filter(Boolean) as HTMLDivElement[];
        if (validPanels.length === 0) return;

        gsap.set(validPanels, { autoAlpha: 0, y: 18 });
        gsap.set(validPanels[0], { autoAlpha: 1, y: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current!,
            start: "top top",
            // Why: users shouldn’t need multiple scroll “turns” to see the next step.
            // Logic: pin only a short distance per transition and remove “dead scroll” zones.
            end: () => `+=${Math.max(1, validPanels.length - 1) * window.innerHeight * 0.32}`,
            scrub: true,
            pin: true,
            anticipatePin: 1
          }
        });

        // Why: previously there were gaps between transitions (scrolling but nothing changed).
        // Logic: chain each crossfade immediately after the previous one (no empty scroll space).
        validPanels.forEach((panel, idx) => {
          if (idx === 0) return;
          const prev = validPanels[idx - 1]!;
          tl.to(prev, { autoAlpha: 0, y: -10, duration: 0.35 }, ">");
          tl.to(panel, { autoAlpha: 1, y: 0, duration: 0.35 }, "<");
        });
      }, root);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section id="story" ref={root} className="relative scroll-mt-28 overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="SCROLL-DRIVEN STORY"
          title="A narrative you can feel."
          subtitle="Pinned storytelling with parallax media and soft transitions. Smooth, tactile motion without heavy 3D overhead."
        />

        <div className="relative mt-14 grid gap-6 md:grid-cols-[.9fr_1.1fr]">
          <div className="glass rounded-3xl p-6 md:p-8">
            <p className="text-xs font-semibold tracking-[0.28em] text-white/60">THE PROCESS</p>
            <h3 className="mt-4 font-[var(--font-display)] text-3xl font-bold leading-tight tracking-tight">
              From concept to sparkle.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              We blend modern aesthetics with meticulous craft. Scroll to reveal each step — pinned in place, so it feels
              like a product film.
            </p>
            <div className="mt-8 grid gap-3">
              {steps.map((s) => (
                <div key={s.title} className="rounded-2xl border border-white/[0.10] bg-white/[0.03] px-4 py-4">
                  <p className="text-sm font-semibold">{s.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-b from-violet-500/18 via-cyan-400/10 to-transparent blur-2xl" />
            {/* Desktop pinned panels (GSAP controls visibility) */}
            <div className="hidden md:block">
              <div className="glass relative aspect-[4/5] overflow-hidden rounded-[2rem] p-3">
                <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                  {steps.map((s, idx) => (
                    <motion.div
                      key={s.title}
                      ref={(el) => {
                        panels.current[idx] = el;
                      }}
                      className="absolute inset-0"
                      initial={{ opacity: idx === 0 ? 1 : 0 }}
                    >
                      <img src={s.media} alt={s.title} className="h-full w-full object-cover scale-[1.02]" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/10 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-xs font-semibold tracking-[0.26em] text-white/65">STEP {idx + 1}</p>
                        <p className="mt-2 text-xl font-bold">{s.title}</p>
                        <p className="mt-2 max-w-md text-sm text-white/70">{s.body}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile stacked panels (always visible, no pin) */}
            <div className="md:hidden">
              <div className="glass rounded-[2rem] p-3">
                <div className="grid gap-4">
                  {steps.map((s, idx) => (
                    <div key={s.title} className="overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.03]">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img src={s.media} alt={s.title} className="h-full w-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/65 via-ink-950/10 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <p className="text-xs font-semibold tracking-[0.26em] text-white/70">STEP {idx + 1}</p>
                          <p className="mt-1 text-lg font-bold">{s.title}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm leading-relaxed text-white/70">{s.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
