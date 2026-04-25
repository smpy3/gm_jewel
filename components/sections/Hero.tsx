// Hero: animated headline, premium CTA, and cinematic media preview with parallax accents.
"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { useGsapParallax } from "@/hooks/useGsapParallax";
import { useReveal } from "@/hooks/useReveal";

export default function Hero() {
  const { container, item } = useReveal();
  const mediaRef = useRef<HTMLDivElement>(null);
  useGsapParallax(mediaRef, 18);

  return (
    <section className="relative overflow-hidden pt-28">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_.9fr]">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p variants={item} className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-xs font-semibold tracking-wide text-white/75">
              <Sparkles className="size-4 text-white/70" />
              A studio-level jewelry experience
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-6 text-balance font-[var(--font-display)] text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl"
            >
              Jewelry that feels
              <span className="relative mx-2 inline-block">
                <span className="bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
                  unreal
                </span>
                <span className="absolute -inset-x-2 -bottom-2 -z-10 h-3 rounded-full bg-violet-500/25 blur-lg" />
              </span>
              .
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-xl text-balance text-sm leading-relaxed text-white/70 md:text-base">
              A premium, mobile-first showcase where customers can browse your jewelry videos + photos with smooth motion and a clean UI.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/products">
                View products <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button href="/#story" variant="ghost">
                See the craft
              </Button>
            </motion.div>

            <motion.div variants={item} className="mt-10 grid grid-cols-3 gap-3 text-left">
              {[
                { k: "4.9", v: "avg. rating" },
                { k: "48h", v: "concierge reply" },
                { k: "30d", v: "returns & resize" }
              ].map((s) => (
                <div key={s.v} className="glass rounded-2xl px-4 py-4">
                  <p className="text-lg font-bold">{s.k}</p>
                  <p className="mt-1 text-xs font-semibold tracking-wide text-white/55">{s.v}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            ref={mediaRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-b from-violet-500/20 via-cyan-400/10 to-transparent blur-2xl" />
            <div className="glass overflow-hidden rounded-[2rem] p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-white/[0.03]">
                <video
                  className="absolute inset-0 h-full w-full object-cover opacity-90"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  src="/media/Rings/Product_1/c1_p1.mp4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.24em] text-white/65">SIGNATURE DROP</p>
                    <p className="mt-2 text-lg font-bold">Halo Cut Ring</p>
                  </div>
                  <div className="rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-2 text-xs font-semibold">
                    From $1,290
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -right-8 -top-10 hidden h-44 w-44 rounded-full bg-violet-500/25 blur-3xl md:block" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 hidden h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl md:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
