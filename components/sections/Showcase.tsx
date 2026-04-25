// Showcase: homepage section that highlights top categories + featured products from `public/media`.
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { useReveal } from "@/hooks/useReveal";
import { withBasePath } from "@/lib/paths";

type CategorySummary = { name: string; slug: string; count: number; thumb?: string; href: string };

export default function Showcase({
  topCategories,
  featuredCategories
}: {
  topCategories: CategorySummary[];
  featuredCategories: CategorySummary[];
}) {
  const { container, item } = useReveal();
  // Why: avoid empty/blank columns when featured card heights differ.
  // Logic: split featured into a hero + side stack + extra grid to fill the layout on desktop.
  const hero = featuredCategories[0];
  const side = featuredCategories.slice(1, 5);
  const extra = featuredCategories.slice(5, 9);

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="BROWSE THE COLLECTION"
          title="Featured pieces, instantly."
          subtitle="Top categories come first, and every product page shows the full video (if available) plus all photos."
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {topCategories.map((c) => (
            <Link
              key={c.slug}
              href={c.href}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide text-white/80 hover:bg-white/[0.09] transition-colors"
            >
              <span>{c.name}</span>
              <span className="rounded-full bg-white/[0.06] px-2 py-1 text-[10px] font-bold text-white/70 ring-1 ring-white/[0.10]">
                {c.count}
              </span>
            </Link>
          ))}
          <Button href="/products" variant="ghost" className="ml-1">
            View all <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          className="mt-12 grid gap-4 md:grid-cols-12"
        >
          {/* Left: hero + extra grid to prevent blank space */}
          <motion.div variants={item} className="md:col-span-7">
            <div className="glass group relative overflow-hidden rounded-[2.2rem]">
              {hero?.thumb ? (
                <div className="relative aspect-[16/10] overflow-hidden md:aspect-[16/9]">
                  {withBasePath(hero.thumb).endsWith(".mp4") ? (
                    <video
                      className="absolute inset-0 h-full w-full object-cover opacity-90"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      src={withBasePath(hero.thumb)}
                    />
                  ) : (
                    <img
                      src={withBasePath(hero.thumb)}
                      alt={hero.name}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/15 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.28em] text-white/65">
                        <Sparkles className="size-4" /> TOP CATEGORY
                      </p>
                      <p className="mt-3 text-2xl font-bold">View all products</p>
                      <p className="mt-2 text-sm text-white/70">
                        {hero.name} • {hero.count} pieces
                      </p>
                    </div>
                    <Button href={hero.href}>Open category</Button>
                  </div>
                </div>
              ) : (
                <div className="p-10">
                  <p className="text-lg font-bold">No media found</p>
                  <p className="mt-2 text-sm text-white/60">Add product folders under `public/media`.</p>
                </div>
              )}
            </div>

            {extra.length ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {extra.map((c) => (
                  <Link key={c.href} href={c.href} className="group glass overflow-hidden rounded-3xl">
                    <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.02]">
                      {c.thumb ? (
                        withBasePath(c.thumb).endsWith(".mp4") ? (
                          <video
                            className="absolute inset-0 h-full w-full object-cover opacity-90"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            src={withBasePath(c.thumb)}
                          />
                        ) : (
                          <img
                            src={withBasePath(c.thumb)}
                            alt={c.name}
                            className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                            loading="lazy"
                          />
                        )
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-xs font-semibold tracking-[0.28em] text-white/60">{c.name}</p>
                        <p className="mt-2 text-lg font-bold">View all products</p>
                        <p className="mt-2 text-sm text-white/65">{c.count} pieces</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </motion.div>

          {/* Right: featured stack */}
          <motion.div variants={item} className="md:col-span-5">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
              {side.map((c) => (
                <Link key={c.href} href={c.href} className="group glass overflow-hidden rounded-3xl">
                  <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.02]">
                    {c.thumb ? (
                      withBasePath(c.thumb).endsWith(".mp4") ? (
                        <video
                          className="absolute inset-0 h-full w-full object-cover opacity-90"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          src={withBasePath(c.thumb)}
                        />
                      ) : (
                        <img
                          src={withBasePath(c.thumb)}
                          alt={c.name}
                          className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                          loading="lazy"
                        />
                      )
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs font-semibold tracking-[0.28em] text-white/60">{c.name}</p>
                      <p className="mt-2 text-lg font-bold">View all products</p>
                      <p className="mt-2 text-sm text-white/65">{c.count} pieces</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
