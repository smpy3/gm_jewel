// Highlights: stable (non-pinned) section that shows how to browse + a small featured media montage (no scroll blanking).
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { useReveal } from "@/hooks/useReveal";
import { withBasePath } from "@/lib/paths";

type CategorySummary = { name: string; slug: string; count: number; thumb?: string; href: string };

function MediaTile({ c }: { c: CategorySummary }) {
  if (!c.thumb) return null;
  const thumb = withBasePath(c.thumb);
  const isVideo = thumb.endsWith(".mp4");

  return (
    <Link href={c.href} className="group glass overflow-hidden rounded-3xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.02]">
        {isVideo ? (
          <video className="absolute inset-0 h-full w-full object-cover opacity-90" autoPlay muted loop playsInline preload="metadata" src={thumb} />
        ) : (
          <img
            src={thumb}
            alt={c.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs font-semibold tracking-[0.28em] text-white/60">{c.name}</p>
          <p className="mt-2 text-lg font-bold">View all products</p>
          <p className="mt-2 text-sm text-white/65">{c.count} pieces</p>
        </div>
      </div>
    </Link>
  );
}

export default function Highlights({ categories }: { categories: CategorySummary[] }) {
  const { container, item } = useReveal();
  const tiles = categories.filter((c) => c.thumb).slice(0, 4);

  return (
    <section id="highlights" className="relative scroll-mt-28 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="EASY TO VIEW"
          title="Everything is one click away."
          subtitle="Open a category, tap a piece, and view the full photos (and video when available)."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          className="mt-14 grid gap-6 md:grid-cols-2"
        >
          <motion.div variants={item} className="glass rounded-3xl p-7 md:p-8">
            <p className="text-xs font-semibold tracking-[0.28em] text-white/60">HOW TO VIEW</p>
            <h3 className="mt-4 font-[var(--font-display)] text-3xl font-bold leading-tight tracking-tight">
              Browse → open piece → view everything.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
              Tap a category to see all pieces. Open any piece to view the full gallery in high quality.
            </p>

            <ul className="mt-7 space-y-3 text-sm text-white/70">
              {["Full photos for each piece", "Video included when available", "Share product links easily"].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-0.5 grid size-5 place-items-center rounded-full bg-white/[0.06] ring-1 ring-white/[0.10]">
                    <Check className="size-3" />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/products">
                Open products <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button href="/products/rings" variant="ghost">
                View rings
              </Button>
            </div>
          </motion.div>

          <motion.div variants={item} className="grid gap-4 sm:grid-cols-2">
            {tiles.map((c) => (
              <MediaTile key={c.href} c={c} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
