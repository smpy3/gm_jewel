// GSAP helper: registers ScrollTrigger once (client-only) and avoids double-registration in dev.
import gsap from "gsap";

let registered = false;

export function registerGsap() {
  if (registered) return;
  if (typeof window === "undefined") return;

  // Dynamic import keeps GSAP plugins out of the server bundle.
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  (async () => {
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  })();
}

