// Button: premium CTA button with glow, focus styles, and subtle hover motion.
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  children: React.ReactNode;
  className?: string;
};

export default function Button({ href, onClick, variant = "primary", children, className }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950";

  const styles =
    variant === "primary"
      ? "glass glow hover:bg-white/[0.10] text-white"
      : "border border-white/[0.14] bg-white/[0.03] hover:bg-white/[0.06] text-white";

  const Comp: any = href ? Link : "button";

  return (
    <motion.div whileHover={{ y: -1 }} whileTap={{ y: 0 }} transition={{ type: "spring", stiffness: 500, damping: 40 }}>
      <Comp href={href as any} onClick={onClick} className={cn(base, styles, className)}>
        {children}
      </Comp>
    </motion.div>
  );
}

