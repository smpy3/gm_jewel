// SectionHeading: consistent premium section heading + supporting copy with reveal-ready structure.
import { cn } from "@/lib/cn";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)}>
      <p className="text-xs font-semibold tracking-[0.28em] text-white/60">{eyebrow}</p>
      <h2 className="mt-4 text-balance font-[var(--font-display)] text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-balance text-sm leading-relaxed text-white/70 md:text-base">{subtitle}</p>
    </div>
  );
}

