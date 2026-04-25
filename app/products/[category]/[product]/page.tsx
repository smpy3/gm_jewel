// Product page: shows video + image gallery for a single product folder under `public/media`.
import { notFound } from "next/navigation";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Button from "@/components/ui/Button";
import { findProduct, getAllProductParams } from "@/lib/catalog";

export function generateStaticParams() {
  return getAllProductParams();
}

export default async function ProductPage({ params }: { params: Promise<{ category: string; product: string }> }) {
  const { category, product: productSlug } = await params;
  const product = findProduct(category, productSlug);
  if (!product) notFound();

  return (
    <main className="min-h-screen">
      <Nav />
      <section className="pt-28">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.28em] text-white/60">{product.categoryName}</p>
              <h1 className="mt-4 text-balance font-[var(--font-display)] text-4xl font-bold leading-[1.02] tracking-tight md:text-5xl">
                {product.productName}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
                Full media for this piece (video + all photos).
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={`/products/${product.categorySlug}`} variant="ghost">
                  Back to {product.categoryName}
                </Button>
                <Button href="/products">All products</Button>
              </div>
            </div>

            <div className="glass w-full max-w-sm rounded-3xl p-6">
              <p className="text-xs font-semibold tracking-[0.28em] text-white/60">OWNER</p>
              <p className="mt-3 text-lg font-bold">Ghanshyam Modi</p>
              <p className="mt-2 text-sm text-white/65">For inquiries, share this product page link with customers.</p>
            </div>
          </div>

          {product.video ? (
            <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/[0.10] bg-white/[0.03] p-3">
              <div className="relative aspect-video overflow-hidden rounded-[1.6rem]">
                <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" src={product.video} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-ink-950/10 to-transparent" />
              </div>
            </div>
          ) : null}

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.images.map((src) => (
              <a
                key={src}
                href={src}
                className="group glass overflow-hidden rounded-3xl"
                aria-label={`Open image ${product.productName}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={src} alt={product.productName} loading="lazy" className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-ink-950/0 to-transparent opacity-70" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
