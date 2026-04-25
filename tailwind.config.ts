// Tailwind config: defines content paths and a premium, typography-forward theme.
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05060A",
          900: "#090B12",
          800: "#0E1120"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,.06), 0 20px 80px rgba(130,90,255,.14)",
        glass: "0 0 0 1px rgba(255,255,255,.08), 0 30px 120px rgba(0,0,0,.55)"
      },
      backgroundImage: {
        "radial-fade": "radial-gradient(1200px circle at var(--x,50%) var(--y,30%), rgba(160,120,255,.25), rgba(10,10,16,0) 55%)",
        "mesh-ink":
          "radial-gradient(900px circle at 20% 10%, rgba(138,99,255,.24), transparent 55%), radial-gradient(900px circle at 80% 20%, rgba(0,212,255,.15), transparent 55%), radial-gradient(900px circle at 50% 90%, rgba(255,175,125,.12), transparent 60%)"
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" }
        }
      },
      animation: {
        floaty: "floaty 8s ease-in-out infinite"
      }
    }
  },
  plugins: []
} satisfies Config;

