// Catalog loader: scans `public/media` and turns folders into categories/products for static pages.
import "server-only";

import fs from "node:fs";
import path from "node:path";

export type CatalogProduct = {
  categoryName: string;
  categorySlug: string;
  productName: string;
  productSlug: string;
  href: string;
  video?: string;
  images: string[];
  thumb?: string;
};

export type CatalogCategory = {
  name: string;
  slug: string;
  products: CatalogProduct[];
  thumb?: string;
};

type CategorySummary = { name: string; slug: string; count: number; thumb?: string; href: string };

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function safeReadDir(dir: string) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function productDisplayName(folderName: string) {
  const m = /^product_(\d+)$/i.exec(folderName);
  if (m) return `Product ${m[1]}`;
  return folderName.replace(/_/g, " ");
}

function urlJoin(...segments: string[]) {
  return segments
    .map((s) => encodeURIComponent(s).replace(/%2F/g, "/"))
    .join("/")
    .replace(/\/+/g, "/");
}

export function getCatalog(): CatalogCategory[] {
  const base = path.join(process.cwd(), "public", "media");
  const categoryDirs = safeReadDir(base).filter((d) => d.isDirectory());

  const categories: CatalogCategory[] = categoryDirs
    .map((c) => {
      const categoryName = c.name;
      const categorySlug = slugify(categoryName);
      const categoryPath = path.join(base, c.name);

      const productDirs = safeReadDir(categoryPath).filter((d) => d.isDirectory());
      const products: CatalogProduct[] = productDirs
        .map((p) => {
          const productFolder = p.name;
          const productName = productDisplayName(productFolder);
          const productSlug = slugify(productFolder);
          const productPath = path.join(categoryPath, productFolder);

          const files = safeReadDir(productPath).filter((f) => f.isFile()).map((f) => f.name);
          const video = files.find((f) => f.toLowerCase().endsWith(".mp4"));
          const images = files
            .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
            .map((f) => urlJoin("", "media", categoryName, productFolder, f));

          const videoUrl = video ? urlJoin("", "media", categoryName, productFolder, video) : undefined;
          const thumb = images[0] ?? videoUrl;

          return {
            categoryName,
            categorySlug,
            productName,
            productSlug,
            href: `/products/${categorySlug}/${productSlug}`,
            video: videoUrl,
            images,
            thumb
          };
        })
        .sort((a, b) => a.productName.localeCompare(b.productName, undefined, { numeric: true, sensitivity: "base" }));

      const thumb = products.find((p) => p.thumb)?.thumb;
      return { name: categoryName, slug: categorySlug, products, thumb };
    })
    .filter((c) => c.products.length > 0)
    .sort((a, b) => a.name.localeCompare(b.name));

  return categories;
}

export function getCategorySummaries(limit = 6): CategorySummary[] {
  const cats = getCatalog();
  return cats
    .map((c) => ({
      name: c.name,
      slug: c.slug,
      count: c.products.length,
      thumb: c.thumb,
      href: `/products/${c.slug}`
    }))
    .slice(0, limit);
}

export function getCatalogSortedByCount(): CatalogCategory[] {
  // Why: user wants categories with more products first.
  // Logic: stable sort by product count (desc), then name (asc).
  return [...getCatalog()].sort((a, b) => {
    const diff = b.products.length - a.products.length;
    if (diff !== 0) return diff;
    return a.name.localeCompare(b.name);
  });
}

export function getTopCategorySummaries(limit = 6): CategorySummary[] {
  const cats = getCatalogSortedByCount();
  return cats.slice(0, limit).map((c) => ({
    name: c.name,
    slug: c.slug,
    count: c.products.length,
    thumb: c.thumb,
    href: `/products/${c.slug}`
  }));
}

export function getFeaturedProducts(limit = 8): CatalogProduct[] {
  // Why: homepage should highlight real products, not generic CTA cards.
  // Logic: take from biggest categories first, then fall back to the rest.
  const cats = getCatalogSortedByCount();
  const picked: CatalogProduct[] = [];

  // First pass: one per category
  for (const c of cats) {
    const first = c.products[0];
    if (!first) continue;
    picked.push(first);
    if (picked.length >= limit) return picked;
  }

  // Second pass: fill remaining
  for (const c of cats) {
    for (const p of c.products.slice(1)) {
      picked.push(p);
      if (picked.length >= limit) return picked;
    }
  }

  return picked.slice(0, limit);
}

export function getFeaturedCategories(limit = 6): CategorySummary[] {
  // Why: homepage should avoid generic "Product 1" naming.
  // Logic: feature categories (sorted by most pieces) with a representative thumbnail.
  return getCatalogSortedByCount()
    .slice(0, limit)
    .map((c) => ({
      name: c.name,
      slug: c.slug,
      count: c.products.length,
      thumb: c.thumb,
      href: `/products/${c.slug}`
    }));
}

export function getAllProductParams(): Array<{ category: string; product: string }> {
  return getCatalog()
    .flatMap((c) => c.products.map((p) => ({ category: p.categorySlug, product: p.productSlug })))
    .sort((a, b) => (a.category + a.product).localeCompare(b.category + b.product));
}

export function findProduct(categorySlug: string, productSlug: string): CatalogProduct | null {
  const cat = getCatalog().find((c) => c.slug === categorySlug);
  if (!cat) return null;
  return cat.products.find((p) => p.productSlug === productSlug) ?? null;
}

export function findCategory(categorySlug: string): CatalogCategory | null {
  return getCatalog().find((c) => c.slug === categorySlug) ?? null;
}
