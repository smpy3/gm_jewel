// Category page: lists products for a single category (e.g. Rings) from `public/media`.
import { notFound } from "next/navigation";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import ProductGrid from "@/components/sections/ProductGrid";
import { findCategory, getCatalog } from "@/lib/catalog";

export function generateStaticParams() {
  return getCatalog().map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = findCategory(categorySlug);
  if (!category) notFound();

  return (
    <main className="min-h-screen">
      <Nav />
      <ProductGrid catalog={[category]} />
      <Footer />
    </main>
  );
}
