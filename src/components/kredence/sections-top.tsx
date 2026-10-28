import { useState } from "react";
import {
  ArrowUpRight,
  Sparkles,
  Play,
  PenTool,
  Megaphone,
  MonitorSmartphone,
  Clapperboard,
  Share2,
  Globe,
  Camera,
  Layers,
  Palette,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/lib/content-store";
import {
  Reveal,
  SectionHeader,
  useCursorParallax,
  DoodleArrow,
  DoodleStar,
  DoodleSquiggle,
  DoodleSpiral,
  PlaceholderBlock,
} from "./bits";

export function Nav() {
  const { content } = useSiteContent();
  const nav = content.nav;

  return (
    <header className="bg-paper/85 border-charcoal/15 sticky top-0 z-50 border-b backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <a href="#top" className="group flex items-center gap-3">
          <img
            src="/images/k-mark.png"
            alt={nav.brandName || "Kredence"}
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
          />
          <span className="font-display text-charcoal text-2xl tracking-tight">
            {nav.brandName || "KREDENCE"}
          </span>
        </a>
        <ul className="hidden items-center gap-9 md:flex">
          {nav.links.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="nav-link font-mono text-charcoal text-xs tracking-[0.2em] uppercase"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={nav.ctaHref || "#contact"}
          className="bg-teal font-mono text-charcoal group inline-flex items-center gap-2 border-2 border-transparent px-4 py-2 text-xs tracking-[0.18em] uppercase transition-all duration-300 hover:border-charcoal hover:shadow-sticker"
        >
          {nav.ctaText || "Let's Talk"}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
        </a>
      </nav>
    </header>
  );
}

export function Hero() {
  const { content } = useSiteContent();
  const hero = content.hero;
  const p = useCursorParallax(26);

  return (
    <section id="top" className="paper-grain relative overflow-hidden px-6 pt-24 pb-32">
      <div
        className="bg-teal/25 pointer-events-none absolute -top-40 -right-32 size-[34rem] rounded-full blur-3xl"
        style={{ transform: `translate3d(${-p.x}px, ${-p.y}px, 0)` }}
      />
      <div className="relative mx-auto max-w-6xl text-center">
        <Reveal rotate={0} className="mb-8 inline-flex">
          <span className="sticker font-mono text-charcoal inline-block -rotate-2 px-3 py-1 text-[11px] tracking-[0.24em] uppercase">
            {hero.badge}
          </span>
        </Reveal>

        <Reveal delay={60} rotate={0}>
          <h1 className="font-display text-charcoal text-[2.75rem] leading-[0.88] sm:text-7xl lg:text-[7rem]">
            {hero.titleLine1}
            <br />
            {hero.titleLine2}{" "}
            <span className="bg-teal text-charcoal px-4 py-1 -rotate-2 inline-block shadow-sticker font-display tracking-tight">
              {hero.humorHighlight}
            </span>
            <br />
            <span className="mt-6 block font-body text-xl font-medium tracking-tight text-charcoal/90 sm:text-3xl lg:text-4xl">
              <span className="marker-underline text-charcoal">{hero.subHighlight}</span>{" "}
              <span className="font-mono text-teal font-bold">{hero.subHighlightTag}</span>
            </span>
          </h1>
        </Reveal>

        <Reveal delay={140} className="mx-auto mt-8 max-w-xl">
          <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
            {hero.description}
          </p>
        </Reveal>

        <Reveal delay={200} rotate={0} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={hero.primaryCtaHref || "#work"}
            className="bg-charcoal text-paper font-mono group inline-flex items-center gap-3 px-6 py-4 text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:bg-teal hover:text-charcoal"
          >
            {hero.primaryCtaText || "See The Work"}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
          </a>
          <a
            href={hero.secondaryCtaHref || "#services"}
            className="sticker font-mono text-charcoal inline-flex items-center gap-2 px-6 py-4 text-xs tracking-[0.2em] uppercase"
          >
            <Sparkles className="text-teal size-4" /> {hero.secondaryCtaText || "What We Do"}
          </a>
        </Reveal>

        {/* Floating collage elements */}
        <div className="pointer-events-none absolute inset-x-0 inset-y-0 hidden lg:block" aria-hidden>
          {/* Left Photo + Arrow: Photo sits directly above the arrow */}
          <div
            className="floaty absolute -top-4 -left-2 lg:left-2 xl:left-6 w-36 lg:w-44 z-0 flex flex-col items-start"
            style={{ ["--r" as string]: "-7deg", transform: `translate3d(${p.x}px, ${p.y}px, 0)` }}
          >
            <div className="tape bg-card border-charcoal/20 border p-2 shadow-paper w-full rotate-[-7deg] overflow-hidden">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded bg-paper-dim border border-charcoal/10">
                <img
                  src={hero.photoImage || "/images/hero-phone.jpg"}
                  alt="Kredence Call"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <p className="font-mono text-charcoal/70 mt-2 text-[10px] tracking-widest uppercase font-semibold truncate">
                {hero.photoTag || "kredence_call.jpg"}
              </p>
            </div>
            {/* Directly beneath the photo */}
            <DoodleArrow className="text-charcoal/50 size-20 -rotate-6 mt-3 ml-2" />
          </div>

          <div
            className="floaty absolute -bottom-6 -right-4 lg:-right-8 w-36 lg:w-44 rotate-[7deg] z-0"
            style={{ ["--r" as string]: "7deg", transform: `translate3d(${-p.x}px, ${-p.y}px, 0)` }}
          >
            <div className="bg-card border-charcoal/20 border p-2 shadow-paper overflow-hidden">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded bg-paper-dim border border-charcoal/10">
                <img
                  src={hero.reelImage || "/images/hero-screen.png"}
                  alt="Kredence Screen"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <p className="font-mono text-charcoal/70 mt-2 text-[10px] tracking-widest uppercase font-semibold truncate">
                {hero.reelTag || "kredence_screen.png"}
              </p>
            </div>
          </div>

          <DoodleStar className="text-teal absolute top-20 right-16 size-12 rotate-12" />
          <DoodleSpiral className="text-charcoal/40 absolute bottom-16 left-4 size-14" />
          <DoodleSquiggle className="text-teal absolute right-1/4 bottom-2 w-28" />
        </div>
      </div>
    </section>
  );
}

export function About() {
  const { content } = useSiteContent();
  const about = content.about;

  return (
    <section id="about" className="bg-paper-dim border-charcoal/15 border-y px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index={about.header.index}
          label={about.header.label}
          title={about.header.title}
          ghost={about.header.ghost}
          note={about.header.note}
        />

        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" rotate={-2}>
            <div className="tape bg-card border-charcoal/20 relative border p-3.5 shadow-paper transition-all duration-500 hover:rotate-0 hover:shadow-lift hover:scale-[1.01] group">
              <div className="relative overflow-hidden rounded bg-paper-dim border border-charcoal/10 aspect-[4/3] flex items-center justify-center">
                <img
                  src={about.photoImage || "/images/studio-team.jpg"}
                  alt={about.photoLabel || "Kredence Studio Team"}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="font-mono text-charcoal/70 text-[10px] tracking-[0.2em] uppercase font-semibold">
                  {about.photoTag || "kredence_studio.jpg"}
                </p>
                <span className="font-mono text-[9px] text-teal tracking-wider uppercase font-bold">
                  ● In-House Team
                </span>
              </div>
              <span className="bg-teal font-mono text-charcoal absolute -right-5 -bottom-6 rotate-[-6deg] px-3.5 py-2 text-[10px] tracking-widest uppercase shadow-sticker transition-transform group-hover:rotate-0">
                {about.photoYear || "2026"}
              </span>
            </div>
          </Reveal>

          <div className="space-y-8 lg:col-span-7">
            <Reveal rotate={1}>
              <p className="font-display text-charcoal text-4xl leading-[0.95] md:text-5xl">
                {about.headline}
              </p>
            </Reveal>
            <Reveal delay={90} rotate={-1}>
              <p className="text-muted-foreground max-w-2xl leading-relaxed">
                {about.description}
              </p>
            </Reveal>
            <div className="flex flex-wrap gap-4">
              {about.stats.map((s, i) => (
                <Reveal key={`${s.k}-${i}`} delay={120 + i * 80} rotate={i % 2 ? 2 : -2}>
                  <div className="sticker px-5 py-4">
                    <p className="font-display text-charcoal text-3xl">{s.k}</p>
                    <p className="font-mono text-charcoal/60 text-[10px] tracking-[0.2em] uppercase">
                      {s.v}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            {about.handwrittenNote && (
              <Reveal delay={200} rotate={0}>
                <div className="relative inline-block">
                  <p className="font-mono text-teal text-sm -rotate-2">
                    {about.handwrittenNote}
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const ICON_MAP: Record<string, LucideIcon> = {
  PenTool,
  Clapperboard,
  Share2,
  MonitorSmartphone,
  Megaphone,
  Sparkles,
  Play,
  Globe,
  Camera,
  Layers,
  Palette,
  Briefcase,
};

const SERVICE_POS = [
  "lg:col-span-5 lg:row-span-2",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

const SERVICE_ROTS = ["-2deg", "1.5deg", "-1deg", "2deg", "-1.5deg", "1deg"];

export function Services() {
  const { content } = useSiteContent();
  const services = content.services;
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="services" className="relative px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index={services.header.index}
          label={services.header.label}
          title={services.header.title}
          ghost={services.header.ghost}
          note={services.header.note}
        />
        <div className="grid gap-6 lg:grid-cols-12">
          {services.items.map((s, i) => {
            const Icon = ICON_MAP[s.iconName] || Sparkles;
            const isOn = active === s.id;
            const posClass = SERVICE_POS[i % SERVICE_POS.length];
            const rotClass = SERVICE_ROTS[i % SERVICE_ROTS.length];

            return (
              <Reveal key={s.id || `srv-${i}`} delay={i * 70} className={cn(posClass)} rotate={0}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(s.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(s.id)}
                  onBlur={() => setActive(null)}
                  className="bg-card border-charcoal/20 group h-full w-full border p-6 text-left shadow-paper transition-all duration-400 hover:-translate-y-2 hover:shadow-lift"
                  style={{ rotate: isOn ? "0deg" : rotClass }}
                >
                  <span className="bg-teal/25 text-charcoal group-hover:bg-teal mb-5 inline-grid size-12 place-items-center transition-colors duration-300">
                    <Icon className="size-6 transition-transform duration-500 group-hover:rotate-12" />
                  </span>
                  <p className="font-mono text-charcoal/55 text-[10px] tracking-[0.24em] uppercase">
                    0{i + 1} / service
                  </p>
                  <h3 className="font-display text-charcoal mt-1 text-3xl">{s.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{s.blurb}</p>
                  <ul
                    className={cn(
                      "grid overflow-hidden transition-all duration-500",
                      isOn ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <li className="min-h-0 overflow-hidden">
                      <ul className="space-y-1.5">
                        {s.items.map((it) => (
                          <li
                            key={it}
                            className="font-mono text-charcoal/70 flex items-center gap-2 text-[11px] tracking-wider uppercase"
                          >
                            <span className="bg-teal size-1.5" /> {it}
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </button>
              </Reveal>
            );
          })}
          <Reveal delay={400} className="lg:col-span-3" rotate={3}>
            <div className="bg-teal text-charcoal flex h-full flex-col justify-between p-6 shadow-paper">
              <Play className="size-8" />
              <p className="font-display mt-8 text-3xl leading-none">
                {services.ctaBoxTitle || "Need all of it at once? That's the usual ask."}
              </p>
              <a
                href={services.ctaBoxButtonHref || "#contact"}
                className="font-mono mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase underline underline-offset-4"
              >
                {services.ctaBoxButtonText || "Start a project"}{" "}
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
