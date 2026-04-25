// ProductGrid: renders category headers + product cards for the media-driven catalog.
import Link from "next/link";
import type { CatalogCategory } from "@/lib/catalog";
import { withBasePath } from "@/lib/paths";

export default function ProductGrid({ catalog }: { catalog: CatalogCategory[] }) {
  const maxCount = Math.max(0, ...catalog.map((c) => c.products.length));
  return (
    <section className="pt-28">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.28em] text-white/60">PRODUCTS</p>
          <h1 className="mt-4 text-balance font-[var(--font-display)] text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
            Ghanshyam Modi Jewelry
          </h1>
          <p className="mt-4 text-balance text-sm leading-relaxed text-white/70 md:text-base">
            Click any product to view its full video (if available) and complete photo gallery.
          </p>
        </div>

        <div className="mt-14 space-y-14">
          {catalog.map((c) => (
            <div key={c.slug}>
              <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-semibold tracking-[0.28em] text-white/55">CATEGORY</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <h2 className="font-[var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">{c.name}</h2>
                    {maxCount > 0 && c.products.length === maxCount ? (
                      <span className="rounded-full bg-violet-500/18 px-3 py-1 text-xs font-semibold tracking-wide text-white/80 ring-1 ring-white/[0.10]">
                        MOST PIECES
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm text-white/60">{c.products.length} products</p>
                </div>
                <Link href={`/products/${c.slug}`} className="text-xs font-semibold tracking-wide text-white/70 hover:text-white transition-colors">
                  View {c.name} →
                </Link>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {c.products.map((p) => (
                  <Link key={p.href} href={p.href} className="group glass overflow-hidden rounded-3xl">
                    <div className="relative aspect-[4/5] overflow-hidden bg-white/[0.02]">
                      {p.thumb ? (
                        withBasePath(p.thumb).endsWith(".mp4") ? (
                          <video
                            className="absolute inset-0 h-full w-full object-cover opacity-90"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            src={withBasePath(p.thumb)}
                          />
                        ) : (
                          <img
                            src={withBasePath(p.thumb)}
                            alt={p.productName}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
                          />
                        )
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-xs font-semibold tracking-[0.28em] text-white/60">{c.name}</p>
                        <p className="mt-2 text-lg font-bold">{p.productName}</p>
                        <p className="mt-2 text-sm text-white/65">
                          {p.video ? "Video + photos" : "Photos"} • {p.images.length} images
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
