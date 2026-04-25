// Collections page: alias to products listing (kept for backwards links and simple navigation).
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import ProductGrid from "@/components/sections/ProductGrid";
import { getCatalog } from "@/lib/catalog";

export default function CollectionsPage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <ProductGrid catalog={getCatalog()} />
      <Footer />
    </main>
  );
}
