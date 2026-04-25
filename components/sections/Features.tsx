// Features: animated cards with hover micro-interactions and scroll-triggered reveal.
"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkle, TimerReset, Wand2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useReveal } from "@/hooks/useReveal";

const features = [
  {
    icon: Sparkle,
    title: "Cinematic product media",
    desc: "Studio-lit video loops and crisp photography that loads fast and looks expensive."
  },
  {
    icon: Wand2,
    title: "Glass + glow UI system",
    desc: "A premium dark palette with gradients, glassmorphism, and subtle luminous edges."
  },
  {
    icon: TimerReset,
    title: "Concierge speed",
    desc: "Design-first flows that keep users moving, without jank or heavy UI."
  },
  {
    icon: ShieldCheck,
    title: "Accessible by default",
    desc: "Focus-visible states, contrast, reduced motion support, and semantic structure."
  }
];

export default function Features() {
  const { container, item } = useReveal();

  return (
    <section id="features" className="relative scroll-mt-28 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="DESIGNED LIKE AN AGENCY PROJECT"
          title="Everything feels polished — because it is."
          subtitle="A premium landing built with motion, depth, and careful UX details. Scroll to see parallax, staggered reveals, and micro-interactions."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
          className="mt-14 grid gap-4 md:grid-cols-2"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              className="group glass relative overflow-hidden rounded-3xl p-7"
            >
              <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-violet-500/15 blur-3xl transition-opacity group-hover:opacity-80" />
              <div className="absolute -bottom-14 -left-10 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl transition-opacity group-hover:opacity-80" />

              <div className="relative flex items-start gap-4">
                <div className="grid size-12 place-items-center rounded-2xl bg-white/[0.06] ring-1 ring-white/[0.10]">
                  <f.icon className="size-6 text-white/80" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{f.desc}</p>
                </div>
              </div>

              <div className="relative mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/[0.14] to-transparent" />
              <p className="relative mt-5 text-xs font-semibold tracking-[0.24em] text-white/55">
                HOVER TO FEEL THE DEPTH
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
