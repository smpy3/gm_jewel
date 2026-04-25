// CollectionGrid: a simple, premium gallery grid using existing local media assets.
"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { useReveal } from "@/hooks/useReveal";
import { withBasePath } from "@/lib/paths";

const items = [
  { title: "Halo Ring", category: "Rings", img: "/media/Rings/Product_2/c1_p2_2.jpg" },
  { title: "Classic Band", category: "Rings", img: "/media/Rings/Product_3/c1_p3_5.jpg" },
  { title: "Drop Earrings", category: "Earrings", img: "/media/Earrings/Product_1/e_p1_7.jpg" },
  { title: "Gold Bracelet", category: "Bracelets", img: "/media/Bracelets/Product_2/b_p2_6.jpg" },
  { title: "Necklace Set", category: "Necklace", img: "/media/Necklace/Product_1/n_p1_6.jpg" },
  { title: "Bangle", category: "Bangle", img: "/media/Bangle/Product_1/ba_p1_5.jpg" }
];

export default function CollectionGrid() {
  const { container, item } = useReveal();

  return (
    <section className="pt-28">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          eyebrow="COLLECTIONS"
          title="A gallery that feels cinematic."
          subtitle="This route exists mainly to show route transitions and a premium grid system using your current local media folder."
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((it) => (
            <motion.article
              key={it.title}
              variants={item}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              className="group glass overflow-hidden rounded-3xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={withBasePath(it.img)}
                  alt={it.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold tracking-[0.28em] text-white/55">{it.category}</p>
                <h3 className="mt-2 text-lg font-bold">{it.title}</h3>
                <p className="mt-2 text-sm text-white/60">Tap to view details (next: add product pages).</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
