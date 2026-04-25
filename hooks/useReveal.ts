// useReveal(): Framer Motion variants for staggered, scroll-based text + card reveals.
import { type Variants } from "framer-motion";

export function useReveal() {
  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.075, delayChildren: 0.05 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 16, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return { container, item };
}

