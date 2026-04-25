// Home page: composes the six required sections into a high-end landing experience.
import Nav from "@/components/site/Nav";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/sections/Testimonials";
import Highlights from "@/components/sections/Highlights";
import Showcase from "@/components/sections/Showcase";
import Footer from "@/components/site/Footer";
import { getFeaturedCategories, getTopCategorySummaries } from "@/lib/catalog";

export default function Page() {
  // Why: homepage should highlight the biggest categories + real products.
  const topCategories = getTopCategorySummaries(6);
  const featuredCategories = getFeaturedCategories(6);
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Features />
      <Highlights categories={featuredCategories} />
      <Testimonials />
      <Showcase topCategories={topCategories} featuredCategories={featuredCategories} />
      <Footer />
    </main>
  );
}
