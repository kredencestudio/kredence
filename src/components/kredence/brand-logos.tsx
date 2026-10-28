import React from "react";

export interface BrandMeta {
  name: string;
  category: "Luxury & Fashion" | "Real Estate & Living" | "Media & Tech" | "Lifestyle & Wellness";
  tagline: string;
  image?: string;
}

export const BRAND_DIRECTORY: Record<string, BrandMeta> = {
  "Porsche": {
    name: "Porsche",
    category: "Luxury & Fashion",
    tagline: "Automotive Luxury",
  },
  "The Bicester Collection": {
    name: "The Bicester Collection",
    category: "Luxury & Fashion",
    tagline: "Global Designer Retail",
  },
  "Radhika Ramuka Jewellery": {
    name: "Radhika Ramuka Jewellery",
    category: "Luxury & Fashion",
    tagline: "Haute Joaillerie",
  },
  "Get FiBAR": {
    name: "Get FiBAR",
    category: "Lifestyle & Wellness",
    tagline: "Active Nutrition & Fitness",
  },
  "Modinea": {
    name: "Modinea",
    category: "Real Estate & Living",
    tagline: "Interior & Architecture",
    image: "/images/logos/modinea.png",
  },
  "Second Brick": {
    name: "Second Brick",
    category: "Real Estate & Living",
    tagline: "Commercial Construction",
  },
  "Shubh Sagar Virar": {
    name: "Shubh Sagar Virar",
    category: "Real Estate & Living",
    tagline: "Premium Residential",
  },
  "N1 True Media": {
    name: "N1 True Media",
    category: "Media & Tech",
    tagline: "Digital Production",
    image: "/images/logos/n1truemedia.png",
  },
  "Rituraj Gupta": {
    name: "Rituraj Gupta",
    category: "Media & Tech",
    tagline: "Creator & Strategy",
    image: "/images/logos/riturajgupta.png",
  },
  "Crylic Claws": {
    name: "Crylic Claws",
    category: "Luxury & Fashion",
    tagline: "Nail Atelier & Beauty",
  },
  "Arabic Scent House": {
    name: "Arabic Scent House",
    category: "Lifestyle & Wellness",
    tagline: "Haute Parfumerie",
  },
  "Cinephile In Frame": {
    name: "Cinephile In Frame",
    category: "Media & Tech",
    tagline: "Cinematography",
    image: "/images/logos/cinephile.png",
  },
  "Neeleshwer Developers": {
    name: "Neeleshwer Developers",
    category: "Real Estate & Living",
    tagline: "Infrastructure & Living",
    image: "/images/logos/neeleshwer.png",
  },
  "Poonam Sharma": {
    name: "Poonam Sharma",
    category: "Luxury & Fashion",
    tagline: "Couture Design",
  },
  "The Blossom Story": {
    name: "The Blossom Story",
    category: "Lifestyle & Wellness",
    tagline: "Floral & Spatial Design",
  },
  "Pro-Dev": {
    name: "Pro-Dev",
    category: "Media & Tech",
    tagline: "Software & Digital Systems",
  },
  "World of Badge": {
    name: "World of Badge",
    category: "Lifestyle & Wellness",
    tagline: "Bespoke Badges & Regalia",
  },
};

export function BrandLogoSvg({ name }: { name: string }) {
  const norm = name.trim().toLowerCase();

  // Porsche
  if (norm.includes("porsche")) {
    return (
      <div className="flex flex-col items-center justify-center gap-1">
        <svg viewBox="0 0 160 30" className="h-6 w-auto fill-current tracking-widest" aria-label="Porsche">
          <text
            x="50%"
            y="21"
            textAnchor="middle"
            fontFamily="'Oswald', sans-serif"
            fontSize="21"
            fontWeight="700"
            letterSpacing="0.45em"
          >
            PORSCHE
          </text>
        </svg>
        <span className="text-[8px] font-mono tracking-[0.35em] uppercase text-charcoal/40 group-hover:text-teal font-medium">
          STUTTGART
        </span>
      </div>
    );
  }

  // The Bicester Collection
  if (norm.includes("bicester")) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 group-hover:text-teal transition-colors">
          <svg viewBox="0 0 24 16" className="h-3 w-5 fill-current">
            <path d="M12 1L14.5 6L20 7L16 11L17 16L12 13.5L7 16L8 11L4 7L9.5 6Z" />
          </svg>
        </div>
        <span className="font-serif text-[15px] font-bold tracking-[0.18em] uppercase leading-tight mt-0.5">
          The Bicester
        </span>
        <span className="font-serif text-[10px] tracking-[0.3em] uppercase text-charcoal/60 group-hover:text-teal font-light">
          Collection
        </span>
      </div>
    );
  }

  // Radhika Ramuka Jewellery
  if (norm.includes("radhika") || norm.includes("ramuka")) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <svg viewBox="0 0 32 20" className="h-4 w-7 fill-none stroke-current stroke-[1.4] mb-0.5 group-hover:text-teal">
          <polygon points="16,2 29,8 16,18 3,8" />
          <line x1="16" y1="2" x2="16" y2="18" />
          <line x1="3" y1="8" x2="29" y2="8" />
        </svg>
        <span className="font-serif text-sm font-semibold tracking-[0.16em] uppercase">
          RADHIKA RAMUKA
        </span>
        <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-charcoal/50 group-hover:text-teal">
          FINE JEWELLERY
        </span>
      </div>
    );
  }

  // Get FiBAR
  if (norm.includes("fibar")) {
    return (
      <div className="flex items-center justify-center gap-1.5">
        <div className="flex size-7 items-center justify-center rounded bg-charcoal text-paper group-hover:bg-teal group-hover:text-charcoal transition-colors">
          <svg viewBox="0 0 20 20" className="size-4 fill-current">
            <path d="M11 2L4 11h5l-2 7 9-10h-5l3-6z" />
          </svg>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-charcoal/50 group-hover:text-teal">
            GET
          </span>
          <span className="font-display text-xl font-black italic tracking-wide uppercase">
            FiBAR
          </span>
        </div>
      </div>
    );
  }

  // Second Brick
  if (norm.includes("second brick")) {
    return (
      <div className="flex items-center justify-center gap-2">
        <svg viewBox="0 0 28 28" className="size-7 fill-current text-charcoal/70 group-hover:text-teal transition-colors">
          <rect x="2" y="3" width="11" height="6" rx="1" />
          <rect x="15" y="3" width="11" height="6" rx="1" />
          <rect x="2" y="11" width="16" height="6" rx="1" />
          <rect x="20" y="11" width="6" height="6" rx="1" />
          <rect x="2" y="19" width="10" height="6" rx="1" />
          <rect x="14" y="19" width="12" height="6" rx="1" />
        </svg>
        <div className="flex flex-col text-left leading-none">
          <span className="font-display text-base font-bold tracking-tight uppercase">
            SECOND BRICK
          </span>
          <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-charcoal/40 group-hover:text-teal font-medium">
            CONSTRUCT CO.
          </span>
        </div>
      </div>
    );
  }

  // Shubh Sagar Virar
  if (norm.includes("shubh sagar")) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <svg viewBox="0 0 36 20" className="h-4 w-9 fill-none stroke-current stroke-[1.5] mb-1 group-hover:text-teal">
          <path d="M2 18 C 10 12, 16 12, 24 18" />
          <path d="M12 18 C 18 14, 26 14, 34 18" />
          <circle cx="18" cy="8" r="4" className="fill-current" />
        </svg>
        <span className="font-display text-sm font-bold tracking-[0.14em] uppercase">
          SHUBH SAGAR
        </span>
        <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-charcoal/50 group-hover:text-teal">
          VIRAR RESIDENCES
        </span>
      </div>
    );
  }

  // Crylic Claws
  if (norm.includes("crylic") || norm.includes("claws")) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-1 text-teal">
          <span className="text-xs">✦</span>
          <span className="text-sm">★</span>
          <span className="text-xs">✦</span>
        </div>
        <span className="font-serif italic text-base font-bold tracking-wide">
          Crylic Claws
        </span>
        <span className="text-[8px] font-mono tracking-[0.35em] uppercase text-charcoal/50 group-hover:text-teal font-medium">
          NAIL ATELIER
        </span>
      </div>
    );
  }

  // Arabic Scent House
  if (norm.includes("arabic scent") || norm.includes("scent house")) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-[1.5] mb-0.5 group-hover:text-teal">
          <path d="M12 3c-1.5 0-2.5 1-2.5 2v2h5V5c0-1-1-2-2.5-2z" />
          <path d="M6 8h12l2 12H4L6 8z" />
          <circle cx="12" cy="14" r="2.5" />
        </svg>
        <span className="font-serif text-xs font-bold tracking-[0.16em] uppercase">
          ARABIC SCENT HOUSE
        </span>
        <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-charcoal/45 group-hover:text-teal">
          HAUTE PARFUMERIE
        </span>
      </div>
    );
  }

  // Poonam Sharma
  if (norm.includes("poonam")) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <div className="font-serif text-lg font-light italic leading-none text-charcoal/80 group-hover:text-teal mb-0.5">
          P · S
        </div>
        <span className="font-serif text-xs font-semibold tracking-[0.25em] uppercase">
          POONAM SHARMA
        </span>
        <span className="text-[8px] font-mono tracking-[0.35em] uppercase text-charcoal/40 group-hover:text-teal">
          COUTURE
        </span>
      </div>
    );
  }

  // The Blossom Story
  if (norm.includes("blossom")) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-[1.4] mb-0.5 group-hover:text-teal">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3a4 4 0 0 1 4 4c0 3-4 5-4 5s-4-2-4-5a4 4 0 0 1 4-4z" />
          <path d="M21 12a4 4 0 0 1-4 4c-3 0-5-4-5-4s2-4 5-4a4 4 0 0 1 4 4z" />
          <path d="M12 21a4 4 0 0 1-4-4c0-3 4-5 4-5s4 2 4 5a4 4 0 0 1-4 4z" />
          <path d="M3 12a4 4 0 0 1 4-4c3 0 5 4 5 4s-2 4-5 4a4 4 0 0 1-4-4z" />
        </svg>
        <span className="font-serif text-xs font-semibold tracking-[0.15em] uppercase">
          THE BLOSSOM STORY
        </span>
        <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-charcoal/40 group-hover:text-teal">
          BOTANICAL &amp; DESIGN
        </span>
      </div>
    );
  }

  // Pro-Dev
  if (norm.includes("pro-dev") || norm.includes("pro dev")) {
    return (
      <div className="flex items-center justify-center gap-1.5">
        <div className="flex size-7 items-center justify-center rounded-md border border-charcoal/30 bg-charcoal/5 font-mono text-xs font-bold text-teal group-hover:border-teal group-hover:bg-teal/15 transition-all">
          {"{ }"}
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-mono text-sm font-bold tracking-tight uppercase">
            PRO-DEV
          </span>
          <span className="text-[8px] font-mono tracking-widest text-charcoal/50 group-hover:text-teal">
            SYSTEMS
          </span>
        </div>
      </div>
    );
  }

  // World of Badge
  if (norm.includes("badge")) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-[1.5] mb-0.5 group-hover:text-teal">
          <path d="M12 2l7 4v6c0 5-3.5 9.5-7 11-3.5-1.5-7-6-7-11V6l7-4z" />
          <polygon points="12,7 13.5,10.5 17,11 14.5,13.5 15,17 12,15 9,17 9.5,13.5 7,11 10.5,10.5" className="fill-current" />
        </svg>
        <span className="font-display text-xs font-bold tracking-[0.14em] uppercase">
          WORLD OF BADGE
        </span>
        <span className="text-[8px] font-mono tracking-[0.25em] uppercase text-charcoal/45 group-hover:text-teal">
          BESPOKE EMBLEMS
        </span>
      </div>
    );
  }

  // Fallback for any other brand
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-1 grid size-7 place-items-center rounded-full border border-charcoal/30 bg-card font-display text-sm font-bold text-charcoal group-hover:border-teal group-hover:text-teal group-hover:shadow-sm transition-all">
        {name[0] || "K"}
      </div>
      <span className="font-display text-sm font-bold tracking-wider uppercase">
        {name}
      </span>
    </div>
  );
}

export function BrandLogoCard({
  item,
}: {
  item: string | { name: string; image?: string; category?: string };
}) {
  const brandName = typeof item === "string" ? item : item.name;
  const customImage = typeof item === "object" ? item.image : undefined;
  const meta = BRAND_DIRECTORY[brandName];
  const imageSrc = customImage || meta?.image;
  const category = (typeof item === "object" && item.category) || meta?.category || "Client Partner";

  return (
    <div className="group relative flex h-36 flex-col items-center justify-center rounded-xl border border-charcoal/15 bg-card/70 p-4 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-teal/70 hover:bg-card hover:shadow-xl hover:shadow-teal/10">
      {/* Top category label pill (reveals smoothly on hover) */}
      <span className="absolute top-2.5 right-3 font-mono text-[9px] uppercase tracking-wider text-charcoal/40 transition-colors group-hover:text-teal font-medium">
        {category}
      </span>

      {/* Centered Logo Display */}
      <div className="flex h-20 w-full items-center justify-center px-3 transition-transform duration-300 group-hover:scale-105">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={brandName}
            className="max-h-14 max-w-[85%] object-contain opacity-75 grayscale contrast-125 transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:contrast-100"
            onError={(e) => {
              // Hide image on load failure and fallback to SVG
              (e.target as HTMLElement).style.display = "none";
              const parent = (e.target as HTMLElement).parentElement;
              if (parent) {
                const fallback = document.createElement("div");
                fallback.innerText = brandName;
                fallback.className = "font-display text-lg font-bold text-charcoal group-hover:text-teal";
                parent.appendChild(fallback);
              }
            }}
          />
        ) : (
          <div className="text-charcoal/80 transition-colors duration-300 group-hover:text-charcoal">
            <BrandLogoSvg name={brandName} />
          </div>
        )}
      </div>

      {/* Bottom Subtle Name Indicator */}
      <div className="absolute bottom-2 left-0 right-0 px-2 text-center">
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-charcoal/40 transition-colors group-hover:text-charcoal/80 font-medium truncate block">
          {brandName}
        </span>
      </div>
    </div>
  );
}
