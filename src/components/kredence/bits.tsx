import { createElement, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Scroll reveal wrapper */
export function Reveal({
  children,
  className,
  delay = 0,
  rotate = -1,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  rotate?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(
    Tag,
    {
      ref,
      className: cn("reveal", inView && "is-in", className),
      style: { transitionDelay: `${delay}ms`, ["--reveal-rot" as string]: `${rotate}deg` },
    },
    children,
  );
}

/* Cursor parallax — returns offsets in px for a given strength */
export function useCursorParallax(strength = 24) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setPos({ x: x * strength, y: y * strength });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength]);
  return pos;
}

/* Section shell with eyebrow label */
export function SectionHeader({
  index,
  label,
  title,
  ghost,
  note,
  invert,
}: {
  index: string;
  label: string;
  title: string;
  ghost?: string;
  note?: string;
  invert?: boolean;
}) {
  return (
    <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
      <div>
        <Reveal className="mb-4 inline-flex items-center gap-3" rotate={0}>
          <span className="bg-teal font-mono text-charcoal px-2 py-1 text-xs tracking-widest">
            {index}
          </span>
          <span
            className={cn(
              "font-mono text-xs tracking-[0.28em] uppercase",
              invert ? "text-paper/70" : "text-muted-foreground",
            )}
          >
            {label}
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h2
            data-ghost={ghost ?? title}
            className={cn(
              "ghost-text text-5xl md:text-7xl",
              invert ? "text-paper" : "text-charcoal",
            )}
          >
            {title}
          </h2>
        </Reveal>
      </div>
      {note ? (
        <Reveal delay={140} className="max-w-sm" rotate={1}>
          <p className={cn("text-sm leading-relaxed", invert ? "text-paper/70" : "text-muted-foreground")}>
            {note}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* Doodles */
export function DoodleArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" fill="none" className={className} aria-hidden>
      <path
        d="M4 44c26-30 62-40 108-30"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M96 4c8 4 14 8 16 10-6 3-11 8-14 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function DoodleStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path
        d="M24 3c2 12 9 19 21 21-12 2-19 9-21 21-2-12-9-19-21-21 12-2 19-9 21-21Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleSquiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 24" fill="none" className={className} aria-hidden>
      <path
        d="M2 14c12-14 24 10 36-2s24 12 36 0 24 10 36-2 24 8 48 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleSpiral({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden>
      <path
        d="M30 30c0-6 8-6 8 1s-10 9-15 2-2-19 9-20 20 10 19 23c-1 15-15 24-30 21"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Placeholder swatch used inside mockups */
export function PlaceholderBlock({
  label,
  className,
  tall,
}: {
  label: string;
  className?: string;
  tall?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid-lines bg-paper-dim border-charcoal/20 flex items-center justify-center border",
        tall ? "h-56" : "h-36",
        className,
      )}
    >
      <span className="font-mono text-charcoal/45 text-[10px] tracking-[0.24em] uppercase">
        {label}
      </span>
    </div>
  );
}
