import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/lib/content-store";
import { Reveal, SectionHeader, PlaceholderBlock, DoodleArrow } from "./bits";
import { BrandLogoCard, BRAND_DIRECTORY } from "./brand-logos";

export function Websites() {
  const { content } = useSiteContent();
  const sites = content.sites;
  const header = content.websitesHeader;

  return (
    <section id="work" className="bg-charcoal px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index={header.index}
          label={header.label}
          title={header.title}
          ghost={header.ghost}
          invert
          note={header.note}
        />
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {sites.map((s, i) => (
            <Reveal key={s.id || s.name} delay={i * 60} rotate={i % 2 ? 1.5 : -1.5}>
              <a
                href={s.url.startsWith("http") ? s.url : `https://${s.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-paper border-teal/60 relative border-2 p-3 transition-all duration-500 hover:-translate-y-2 hover:rotate-0 hover:shadow-lift block cursor-pointer"
              >
                <div className="border-charcoal/15 mb-2 flex items-center gap-2 border-b pb-2">
                  <span className="bg-teal size-2.5 rounded-full" />
                  <span className="bg-charcoal/25 size-2.5 rounded-full" />
                  <span className="bg-charcoal/25 size-2.5 rounded-full" />
                  <span className="bg-paper-dim font-mono text-charcoal/60 ml-2 flex-1 truncate px-2 py-1 text-[10px] tracking-wider">
                    {s.url}
                  </span>
                </div>
                <div className="relative overflow-hidden">
                  <PlaceholderBlock label="Website Screenshot" tall />
                  <div className="bg-teal/90 absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-500 group-hover:translate-y-0">
                    <span className="font-mono text-charcoal inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase">
                      Visit Website <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <h3 className="font-display text-charcoal text-2xl">{s.name}</h3>
                  <span className="font-mono text-charcoal/60 text-[10px] tracking-[0.2em] uppercase">
                    {s.tag}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Graphics() {
  const { content } = useSiteContent();
  const graphics = content.graphics;
  const header = content.graphicsHeader;

  return (
    <section id="graphics" className="paper-grain border-charcoal/15 overflow-hidden border-y px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index={header.index}
          label={header.label}
          title={header.title}
          ghost={header.ghost}
          note={header.note}
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {graphics.map((graphic, i) => (
            <Reveal
              key={graphic.id || graphic.title}
              delay={i * 60}
              rotate={i % 3 === 0 ? -1 : i % 3 === 1 ? 1 : -0.5}
            >
              <article className="group bg-card border-charcoal/20 relative flex flex-col border p-3 shadow-paper transition-all duration-500 hover:-translate-y-2 hover:rotate-0 hover:border-teal hover:shadow-lift">
                <div className="border-charcoal/15 mb-2 flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-teal size-2 rounded-full" />
                    <span className="font-mono text-charcoal/60 text-[10px] tracking-wider uppercase">
                      0{i + 1} / {graphic.type}
                    </span>
                  </div>
                  <span className="font-mono text-charcoal/50 text-[10px] tracking-wider">
                    {graphic.format}
                  </span>
                </div>

                <div className="bg-paper-dim relative h-[480px] w-full overflow-hidden border border-charcoal/15">
                  <iframe
                    src={graphic.embedUrl || (graphic.link.includes("instagram.com") ? `${graphic.link.split("?")[0]}embed/` : "")}
                    className="h-full w-full border-0 bg-white"
                    title={graphic.title}
                    loading="lazy"
                    allow="encrypted-media"
                    scrolling="no"
                  />
                  <a
                    href={graphic.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-charcoal/80 absolute inset-0 flex opacity-0 backdrop-blur-[2px] items-center justify-center transition-all duration-300 group-hover:opacity-100"
                  >
                    <span className="bg-teal text-charcoal font-mono inline-flex items-center gap-2 px-5 py-3 text-xs tracking-[0.2em] uppercase font-bold shadow-paper transition-transform duration-300 group-hover:scale-105">
                      Open on Instagram <ArrowUpRight className="size-4" />
                    </span>
                  </a>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <h3 className="font-display text-charcoal text-xl">{graphic.title}</h3>
                  <a
                    href={graphic.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal font-mono inline-flex items-center gap-1 text-[11px] uppercase tracking-wider hover:underline"
                  >
                    Instagram <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Videos() {
  const { content } = useSiteContent();
  const reels = content.reels;
  const header = content.videosHeader;

  return (
    <section id="videos" className="paper-grain px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index={header.index}
          label={header.label}
          title={header.title}
          ghost={header.ghost}
          note={header.note}
        />
      </div>
      <div className="scrollbar-none -mx-6 flex snap-x gap-6 overflow-x-auto px-6 pb-6 pt-2">
        {reels.map((reel, i) => (
          <Reveal key={reel.id || reel.link} delay={i * 50} rotate={i % 2 ? 1 : -1} className="shrink-0 snap-start">
            <article className="group bg-card border-charcoal/20 w-[21rem] sm:w-[23rem] flex flex-col border p-3 shadow-paper transition-all duration-400 hover:-translate-y-2 hover:border-teal hover:shadow-lift">
              <div className="border-charcoal/15 mb-2 flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="bg-teal size-2 rounded-full" />
                  <span className="font-mono text-charcoal/60 text-[10px] tracking-wider uppercase">
                    Reel 0{i + 1}
                  </span>
                </div>
                <a
                  href={reel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal font-mono inline-flex items-center gap-1 text-[10px] uppercase tracking-wider hover:underline"
                >
                  Instagram <ArrowUpRight className="size-3" />
                </a>
              </div>

              <div className="bg-paper-dim relative h-[500px] w-full overflow-hidden border border-charcoal/15">
                <iframe
                  src={reel.embedUrl || (reel.link.includes("instagram.com") ? `${reel.link.split("?")[0]}embed/` : "")}
                  className="h-[125%] w-[125%] origin-top-left scale-[0.8] border-0 bg-white"
                  title={reel.title}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  scrolling="no"
                />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <h3 className="font-mono text-charcoal text-[11px] tracking-[0.15em] uppercase truncate">
                  {reel.title}
                </h3>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Logos() {
  const { content } = useSiteContent();
  const { header, items } = content.logos;

  return (
    <section className="bg-paper border-charcoal/15 border-y px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index={header.index}
          label={header.label}
          title={header.title}
          ghost={header.ghost}
          note={header.note}
        />
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((l, i) => (
            <Reveal key={l.id || l.name} delay={i * 45} rotate={i % 2 ? 1.5 : -1.5}>
              <div
                className="group tape bg-card border-charcoal/20 grid aspect-square place-items-center border p-4 shadow-paper transition-all duration-400 hover:-translate-y-2 hover:rotate-0 hover:shadow-lift"
              >
                <div className="flex h-full w-full flex-col items-center justify-between py-2 text-center">
                  <div className="flex flex-1 items-center justify-center p-2">
                    {l.image ? (
                      <img
                        src={l.image}
                        alt={l.name}
                        className="max-h-24 max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          // Hide broken image and fallback
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="border-charcoal/30 group-hover:border-teal group-hover:bg-teal/15 mx-auto grid size-16 place-items-center border-2 transition-all duration-400">
                        <span className="font-display text-charcoal text-2xl">{l.name[0] || "K"}</span>
                      </div>
                    )}
                  </div>
                  <p className="font-mono text-charcoal/70 group-hover:text-charcoal mt-2 text-[10px] tracking-[0.2em] uppercase font-semibold transition-colors">
                    {l.name}
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

export function Brands() {
  const { content } = useSiteContent();
  const { header, items } = content.brands;
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Luxury & Fashion",
    "Real Estate & Living",
    "Media & Tech",
    "Lifestyle & Wellness",
  ];

  const filteredItems = items.filter((b) => {
    if (activeCategory === "All") return true;
    const name = typeof b === "string" ? b : b.name;
    const meta = BRAND_DIRECTORY[name];
    return meta?.category === activeCategory;
  });

  return (
    <section className="relative px-6 py-28 bg-paper">
      <DoodleArrow className="text-charcoal/20 absolute left-10 top-24 hidden size-24 lg:block pointer-events-none" />
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index={header.index}
          label={header.label}
          title={header.title}
          ghost={header.ghost}
          note={header.note || "Selected brand partners, luxury houses, and innovative leaders."}
        />

        {/* Category Filter Bar */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer",
                  isActive
                    ? "bg-charcoal text-teal border-charcoal shadow-md scale-105 font-bold"
                    : "bg-card/60 text-charcoal/70 border-charcoal/15 hover:border-teal hover:text-charcoal"
                )}
              >
                {cat}
                {cat === "All" && ` (${items.length})`}
              </button>
            );
          })}
        </div>

        {/* Brand Logos Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filteredItems.map((b, i) => (
            <Reveal key={`${typeof b === "string" ? b : b.name}-${i}`} delay={i * 35} rotate={0}>
              <BrandLogoCard item={b} />
            </Reveal>
          ))}
        </div>

        {/* Bottom Trust Badge */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between border-t border-charcoal/10 pt-6 text-charcoal/60 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-teal animate-pulse" />
            <span>Over 17+ client collaborations across 6 global sectors</span>
          </div>
          <span className="mt-2 sm:mt-0 tracking-wider uppercase text-[10px] text-charcoal/40">
            Hover logos to inspect industry specialization
          </span>
        </div>
      </div>
    </section>
  );
}

export function Industries() {
  const { content } = useSiteContent();
  const industries = content.industries;
  const header = content.industriesHeader;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const topRowCount = Math.floor(industries.length / 2);
  const topRow = industries.slice(0, topRowCount);
  const bottomRow = industries.slice(topRowCount);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setTilt({
        x: ((e.clientX - r.left) / r.width - 0.5) * 14,
        y: ((e.clientY - r.top) / r.height - 0.5) * 14,
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="bg-charcoal overflow-hidden px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index={header.index}
          label={header.label}
          title={header.title}
          ghost={header.ghost}
          invert
          note={header.note}
        />
        <div ref={wrapRef} className="flex flex-col items-center gap-4 py-6">
          {/* Top Row */}
          <div className="flex flex-wrap justify-center gap-4">
            {topRow.map((tag, i) => (
              <Reveal key={`${tag}-${i}`} delay={i * 40} rotate={0}>
                <span
                  className={cn(
                    "wiggle-hover font-mono inline-block cursor-default px-5 py-3 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:scale-110",
                    i % 2
                      ? "bg-teal text-charcoal"
                      : "text-paper border-teal/70 border-2 hover:bg-teal hover:text-charcoal",
                  )}
                  style={{
                    transform: `translate3d(${tilt.x * ((i % 4) + 1) * 0.35}px, ${tilt.y * ((i % 3) + 1) * 0.35}px, 0) rotate(${i % 2 ? 1.5 : -1.5}deg)`,
                  }}
                >
                  {tag}
                </span>
              </Reveal>
            ))}
          </div>

          {/* Bottom Row */}
          <div className="flex flex-wrap justify-center gap-4">
            {bottomRow.map((tag, idx) => {
              const i = idx + topRowCount;
              return (
                <Reveal key={`${tag}-${i}`} delay={i * 40} rotate={0}>
                  <span
                    className={cn(
                      "wiggle-hover font-mono inline-block cursor-default px-5 py-3 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:scale-110",
                      i % 2
                        ? "bg-teal text-charcoal"
                        : "text-paper border-teal/70 border-2 hover:bg-teal hover:text-charcoal",
                    )}
                    style={{
                      transform: `translate3d(${tilt.x * ((i % 4) + 1) * 0.35}px, ${tilt.y * ((i % 3) + 1) * 0.35}px, 0) rotate(${i % 2 ? 1.5 : -1.5}deg)`,
                    }}
                  >
                    {tag}
                  </span>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function IndustryMarquee() {
  const { content } = useSiteContent();
  const industries = content.industries;

  return (
    <div className="bg-charcoal border-teal/25 overflow-hidden border-y py-4">
      <div className="marquee-track flex w-max gap-10">
        {[...industries, ...industries].map((t, i) => (
          <span key={`${t}-${i}`} className="font-display text-paper/25 text-3xl sm:text-4xl whitespace-nowrap">
            {t} <span className="text-teal">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
