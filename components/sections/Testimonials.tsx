// Testimonials: motion-enhanced testimonials with staggered reveal and subtle hover lift.
"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { useReveal } from "@/hooks/useReveal";

const testimonials = [
  {
    name: "Amina S.",
    role: "Engagement ring buyer",
    quote: "It looks like a campaign shoot in real life. The details are unreal, and the buying flow felt premium."
  },
  {
    name: "Jason M.",
    role: "Gift purchase",
    quote: "Fast, smooth, zero friction. The site is a masterclass — and the piece arrived exactly like the visuals."
  },
  {
    name: "Lea R.",
    role: "Daily wear collector",
    quote: "The comfort surprised me. It’s luxurious, but it’s also engineered for real life. 10/10 experience."
  }
];

export default function Testimonials() {
  const { container, item } = useReveal();

  return (
    <section id="testimonials" className="relative scroll-mt-28 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="SOCIAL PROOF"
          title="Loved by people who notice details."
          subtitle="Motion is subtle, the typography is bold, and the experience stays fast. That’s the whole point."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
          className="mt-14 grid gap-4 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              variants={item}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              className="glass relative overflow-hidden rounded-3xl p-7"
            >
              <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-violet-500/12 blur-3xl" />
              <blockquote className="relative text-sm leading-relaxed text-white/75">“{t.quote}”</blockquote>
              <figcaption className="relative mt-6 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="mt-1 text-xs font-semibold tracking-wide text-white/55">{t.role}</p>
                </div>
                <div className="rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-2 text-xs font-semibold text-white/70">
                  5.0
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
