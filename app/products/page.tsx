// Products index: shows all categories and product cards generated from `public/media`.
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import ProductGrid from "@/components/sections/ProductGrid";
import { getCatalogSortedByCount } from "@/lib/catalog";

export default function ProductsPage() {
  // Why: categories with more products should appear first.
  const catalog = getCatalogSortedByCount();
  return (
    <main className="min-h-screen">
      <Nav />
      <ProductGrid catalog={catalog} />
      <Footer />
    </main>
  );
}
