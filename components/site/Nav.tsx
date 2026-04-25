// Nav: sticky glass navigation with smooth anchors and a route link to show page transitions.
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gem } from "lucide-react";
import Button from "@/components/ui/Button";

const links = [
  { label: "Features", href: "/#features" },
  { label: "Highlights", href: "/#highlights" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Products", href: "/products" }
];

export default function Nav() {
  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="pointer-events-auto glass flex items-center justify-between gap-4 rounded-2xl px-4 py-3 md:px-6">
          <Link href="/" className="group inline-flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-white/[0.06] ring-1 ring-white/[0.10]">
              <Gem className="size-5 text-white/80 transition group-hover:rotate-[-8deg]" />
            </span>
            <span className="text-sm font-semibold tracking-wide">Ghanshyam Modi</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs font-semibold tracking-wide text-white/70 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <motion.div className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Button href="/products" variant="ghost" className="hidden sm:inline-flex">
              View products
            </Button>
            <Button href="/products">Explore</Button>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
