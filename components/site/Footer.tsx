// Footer: clean, premium footer with minimal links and a subtle gradient divider.
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/[0.08]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold">Ghanshyam Modi</p>
            <p className="mt-2 max-w-md text-sm text-white/60">
              Jewelry showcase built around your media collection (videos + photos) for customers to browse easily.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold tracking-wide text-white/70">
            <Link href="/#features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/#highlights" className="hover:text-white transition-colors">
              Highlights
            </Link>
            <Link href="/products" className="hover:text-white transition-colors">
              Products
            </Link>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/[0.08] pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Ghanshyam Modi. All rights reserved.</p>
          <p className="text-white/40">Built with Next.js • Tailwind • Framer Motion • GSAP</p>
        </div>
      </div>
    </footer>
  );
}
