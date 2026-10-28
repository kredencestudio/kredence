import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, Phone, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/lib/content-store";
import { Reveal, SectionHeader, DoodleSquiggle } from "./bits";

export function Process() {
  const { content } = useSiteContent();
  const { header, steps } = content.process;
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        let i = 0;
        const t = setInterval(() => {
          i += 1;
          setCount(i);
          if (i >= steps.length) clearInterval(t);
        }, 160);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [steps.length]);

  return (
    <section className="bg-paper-dim border-charcoal/15 border-y px-6 py-28">
      <div className="mx-auto max-w-7xl" ref={ref}>
        <SectionHeader
          index={header.index}
          label={header.label}
          title={header.title}
          ghost={header.ghost}
          note={header.note}
        />
        <div className="relative grid gap-4 lg:grid-cols-6">
          <div className="bg-teal/40 absolute top-10 right-0 left-0 hidden h-0.5 lg:block" />
          {steps.map((s, i) => (
            <Reveal key={s.n || `step-${i}`} delay={i * 80} rotate={i % 2 ? 1.5 : -1.5}>
              <div
                onMouseEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                tabIndex={0}
                className={cn(
                  "bg-card border-charcoal/20 relative h-full cursor-default border p-5 shadow-paper transition-all duration-400 hover:-translate-y-2 hover:rotate-0 hover:shadow-lift",
                  open === i && "border-teal",
                )}
              >
                <span
                  className={cn(
                    "font-display grid size-12 place-items-center text-2xl transition-colors duration-300",
                    count > i ? "bg-teal text-charcoal" : "bg-paper-dim text-charcoal/40",
                  )}
                >
                  {count > i ? s.n : "00"}
                </span>
                <h3 className="font-display text-charcoal mt-4 text-2xl">{s.t}</h3>
                <div
                  className={cn(
                    "grid overflow-hidden transition-all duration-500",
                    open === i ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <p className="text-muted-foreground min-h-0 overflow-hidden text-sm leading-relaxed">
                    {s.d}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const { content } = useSiteContent();
  const { header, quotes } = content.testimonials;
  const [top, setTop] = useState(0);

  return (
    <section className="paper-grain px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index={header.index}
          label={header.label}
          title={header.title}
          ghost={header.ghost}
          note={header.note}
        />
        <div className="grid gap-8 lg:grid-cols-3">
          {quotes.map((c, i) => {
            const isTop = i === top;
            return (
              <Reveal key={c.id || `${c.n}-${i}`} delay={i * 90} rotate={i % 2 ? 2 : -2}>
                <button
                  type="button"
                  onClick={() => setTop(i)}
                  className={cn(
                    "bg-card border-charcoal/20 h-full w-full border p-7 text-left shadow-paper transition-all duration-500 hover:-translate-y-2 hover:rotate-0",
                    isTop ? "border-teal -translate-y-3 rotate-0 shadow-lift" : "rotate-[1.5deg]",
                  )}
                >
                  <Quote className={cn("size-8", isTop ? "text-teal" : "text-charcoal/30")} />
                  <p className="text-charcoal mt-5 leading-relaxed">{c.q}</p>
                  <div className="border-charcoal/15 mt-6 border-t pt-4">
                    <p className="font-display text-charcoal text-xl">{c.n}</p>
                    <p className="font-mono text-charcoal/60 text-[10px] tracking-[0.2em] uppercase">
                      {c.r}
                    </p>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const { content } = useSiteContent();
  const finalCta = content.finalCta;
  const contact = content.contact;

  return (
    <section id="contact" className="bg-teal relative overflow-hidden px-6 py-32">
      <DoodleSquiggle className="text-charcoal/30 absolute top-10 left-1/4 w-48" />
      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal rotate={0}>
          <h2
            data-ghost={finalCta.headline}
            className="ghost-text font-display text-charcoal text-6xl leading-[0.88] md:text-8xl lg:text-9xl"
          >
            {finalCta.headline}
          </h2>
        </Reveal>
        <Reveal delay={100} className="mx-auto mt-8 max-w-xl">
          <p className="text-charcoal/80 leading-relaxed">
            {finalCta.description}
          </p>
        </Reveal>
        <Reveal delay={160} rotate={0} className="mt-10">
          <a
            href={finalCta.buttonLink || `mailto:${contact.email}`}
            className="bg-paper text-charcoal font-mono group inline-flex items-center gap-3 border-2 border-charcoal px-8 py-4 text-xs tracking-[0.2em] uppercase shadow-sticker transition-transform duration-300 hover:-translate-y-1"
          >
            {finalCta.buttonText || "Start a conversation"}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
          </a>
        </Reveal>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <Reveal delay={220} rotate={-3}>
            <a
              href={`mailto:${contact.email}`}
              className="sticker font-mono inline-flex items-center gap-2 px-4 py-3 text-[11px] tracking-[0.18em] uppercase"
            >
              <Mail className="text-teal size-4" /> {contact.email}
            </a>
          </Reveal>
          <Reveal delay={280} rotate={3}>
            <a
              href={`tel:${contact.phone}`}
              className="sticker font-mono inline-flex items-center gap-2 px-4 py-3 text-[11px] tracking-[0.18em] uppercase"
            >
              <Phone className="text-teal size-4" /> {contact.phone}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { content } = useSiteContent();
  const footer = content.footer;
  const contact = content.contact;

  return (
    <footer className="bg-paper border-charcoal/15 border-t px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/k-mark.png"
                alt={footer.brandName || "KREDENCE"}
                className="h-10 w-auto object-contain"
              />
              <span className="font-display text-charcoal text-2xl">
                {footer.brandName || "KREDENCE"}
              </span>
            </div>
            <p className="text-muted-foreground mt-4 max-w-xs text-sm leading-relaxed">
              {footer.summary}
            </p>
          </div>
          {footer.columns.map((c) => (
            <div key={c.h} className="lg:col-span-2">
              <p className="font-mono text-charcoal/55 text-[10px] tracking-[0.24em] uppercase">
                {c.h}
              </p>
              <ul className="mt-4 space-y-2">
                {c.l.map((x) => (
                  <li key={x}>
                    <a href="#top" className="nav-link text-charcoal text-sm">
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-charcoal/15 mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
          <p className="font-mono text-charcoal/55 text-[10px] tracking-[0.2em] uppercase">
            {footer.copyright}
          </p>
          <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] uppercase">
            <span className="text-charcoal/70">
              {contact.email} · {contact.phone}
            </span>
            <span className="text-charcoal/30">|</span>
            <a
              href="/admin"
              className="border border-teal/50 bg-teal/10 px-2.5 py-1 text-teal transition-colors hover:bg-teal hover:text-charcoal"
            >
              ⚙ Admin Manager
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
