// App providers: enables smooth scrolling (Lenis) and registers GSAP plugins safely on the client.
"use client";

import { useEffect } from "react";
import { useLenis } from "@/hooks/useLenis";
import { registerGsap } from "@/lib/gsap";

export default function Providers({ children }: { children: React.ReactNode }) {
  useLenis();

  useEffect(() => {
    registerGsap();
  }, []);

  return <>{children}</>;
}

