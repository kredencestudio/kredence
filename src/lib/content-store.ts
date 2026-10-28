import { useEffect, useState } from "react";

export interface NavItem {
  label: string;
  href: string;
}

export interface NavContent {
  brandLetter: string;
  brandName: string;
  links: NavItem[];
  ctaText: string;
  ctaHref: string;
}

export interface HeroContent {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  humorHighlight: string;
  subHighlight: string;
  subHighlightTag: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  photoTag: string;
  photoImage?: string;
  reelTag: string;
  reelImage?: string;
}

export interface SectionHeaderInfo {
  index: string;
  label: string;
  title: string;
  ghost: string;
  note: string;
}

export interface AboutStat {
  k: string;
  v: string;
}

export interface AboutContent {
  header: SectionHeaderInfo;
  photoLabel: string;
  photoTag: string;
  photoYear: string;
  photoImage?: string;
  headline: string;
  headlineHighlight: string;
  description: string;
  stats: AboutStat[];
  handwrittenNote: string;
}

export interface ServiceItem {
  id: string;
  iconName: string;
  title: string;
  blurb: string;
  items: string[];
}

export interface ServicesContent {
  header: SectionHeaderInfo;
  items: ServiceItem[];
  ctaBoxTitle: string;
  ctaBoxButtonText: string;
  ctaBoxButtonHref: string;
}

export interface WebsiteItem {
  id: string;
  name: string;
  url: string;
  tag: string;
}

export interface GraphicItem {
  id: string;
  title: string;
  type: string;
  format: string;
  link: string;
  embedUrl: string;
}

export interface ReelItem {
  id: string;
  title: string;
  link: string;
  embedUrl: string;
}

export interface LogoItem {
  id: string;
  name: string;
  image: string;
}

export interface LogosContent {
  header: SectionHeaderInfo;
  items: LogoItem[];
}

export interface BrandsContent {
  header: SectionHeaderInfo;
  items: string[];
}

export interface ProcessStep {
  n: string;
  t: string;
  d: string;
}

export interface ProcessContent {
  header: SectionHeaderInfo;
  steps: ProcessStep[];
}

export interface TestimonialItem {
  id: string;
  q: string;
  n: string;
  r: string;
}

export interface TestimonialsContent {
  header: SectionHeaderInfo;
  quotes: TestimonialItem[];
}

export interface FinalCtaContent {
  headline: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  instagram: string;
  linkedin: string;
  tagline: string;
}

export interface FooterColumn {
  h: string;
  l: string[];
}

export interface FooterContent {
  brandName: string;
  summary: string;
  copyright: string;
  columns: FooterColumn[];
}

export interface SiteContent {
  nav: NavContent;
  hero: HeroContent;
  about: AboutContent;
  services: ServicesContent;
  websitesHeader: SectionHeaderInfo;
  sites: WebsiteItem[];
  graphicsHeader: SectionHeaderInfo;
  graphics: GraphicItem[];
  videosHeader: SectionHeaderInfo;
  reels: ReelItem[];
  logos: LogosContent;
  brands: BrandsContent;
  industriesHeader: SectionHeaderInfo;
  industries: string[];
  process: ProcessContent;
  testimonials: TestimonialsContent;
  finalCta: FinalCtaContent;
  contact: ContactInfo;
  footer: FooterContent;
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  nav: {
    brandLetter: "K",
    brandName: "KREDENCE",
    links: [
      { label: "Work", href: "#work" },
      { label: "Services", href: "#services" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    ctaText: "Let's Talk",
    ctaHref: "#contact",
  },
  hero: {
    badge: "Multidisciplinary Creative Studio · Est. Mumbai",
    titleLine1: "MARKETING",
    titleLine2: "WITHOUT",
    humorHighlight: "HUMOR",
    subHighlight: "is like rajma without chawal",
    subHighlightTag: "(ugh)",
    description:
      "Kredence is a creative studio stitching together strategy, branding, content, video, digital and marketing — one messy, deliberate collage at a time.",
    primaryCtaText: "See The Work",
    primaryCtaHref: "#work",
    secondaryCtaText: "What We Do",
    secondaryCtaHref: "#services",
    photoTag: "kredence_call.jpg",
    photoImage: "/images/hero-phone.jpg",
    reelTag: "kredence_screen.png",
    reelImage: "/images/hero-screen.png",
  },
  about: {
    header: {
      index: "01",
      label: "Who we are",
      title: "A studio, not a factory",
      ghost: "A STUDIO",
      note: "Small team, wide range. Everything is made in-house, which is why the strategy and the last frame of the edit still sound like the same brand.",
    },
    photoLabel: "Studio Photo",
    photoTag: "kredence_studio.jpg",
    photoYear: "2026",
    photoImage: "/images/studio-team.jpg",
    headline: "We treat brand, content and media as one continuous conversation.",
    headlineHighlight: "one continuous",
    description:
      "You bring the idea, product, or growth challenge. Kredence connects high-level business strategy, in-house podcast and video production, custom digital development, and search marketing into one deliberate, continuous workflow.",
    stats: [
      { k: "150+", v: "crazy ideas" },
      { k: "60+", v: "revolutions" },
      { k: "3", v: "people doing just what they feel like" },
    ],
    handwrittenNote: "↳ handwritten note: “make it weird, keep it useful”",
  },
  services: {
    header: {
      index: "02",
      label: "Services",
      title: "Six rooms, one studio",
      ghost: "SIX ROOMS",
      note: "Hover any node to straighten it out and see what's inside.",
    },
    items: [
      {
        id: "branding",
        iconName: "PenTool",
        title: "Branding & Logo",
        blurb: "Identity systems built to survive contact with the real world.",
        items: ["Positioning & naming", "Logo & identity", "Brand guidelines", "Packaging"],
      },
      {
        id: "content",
        iconName: "Clapperboard",
        title: "Content & Video",
        blurb: "Shoot, edit, grade, deliver — long form to nine-second hooks.",
        items: ["Video editing", "Motion graphics", "Photography", "Reels & shorts"],
      },
      {
        id: "social",
        iconName: "Share2",
        title: "Social Media",
        blurb: "Always-on calendars that actually sound like the brand.",
        items: ["Content calendars", "Community", "Creator collabs", "Reporting"],
      },
      {
        id: "digital",
        iconName: "MonitorSmartphone",
        title: "Digital & Web",
        blurb: "Sites and interfaces that load fast and feel handmade.",
        items: ["Web design", "Development", "UI systems", "E-commerce"],
      },
      {
        id: "marketing",
        iconName: "Megaphone",
        title: "Marketing & Campaigns",
        blurb: "Ideas with a media plan attached.",
        items: ["Campaign strategy", "Performance media", "Launches", "Influencer"],
      },
    ],
    ctaBoxTitle: "Need all of it at once? That's the usual ask.",
    ctaBoxButtonText: "Start a project",
    ctaBoxButtonHref: "#contact",
  },
  websitesHeader: {
    index: "03",
    label: "Websites we've built",
    title: "Sites with a pulse",
    ghost: "SITES",
    note: "Hover a frame to wake the site up.",
  },
  sites: [
    { id: "site-1", name: "Modinea", url: "modinea.in", tag: "E-Commerce" },
    { id: "site-2", name: "Pro-Dev", url: "pro-dev.in", tag: "Development" },
    { id: "site-3", name: "Second Brick", url: "secondbrick.in", tag: "Real Estate" },
    { id: "site-4", name: "Ni True Media", url: "nitruemedia.vercel.app", tag: "Media" },
    { id: "site-5", name: "Rituraj Gupta", url: "riturajgupta.vercel.app", tag: "Personal Brand" },
    { id: "site-6", name: "World of Badge", url: "worldofbadge.com", tag: "Branding" },
  ],
  graphicsHeader: {
    index: "04",
    label: "Static graphics",
    title: "Made to hold a gaze",
    ghost: "GRAPHICS",
    note: "Campaigns, posters, social systems and printed pieces — pinned to one working wall.",
  },
  graphics: [
    {
      id: "DRZS6L6jRtL",
      title: "Astrology Carousel",
      type: "Social Carousel",
      format: "4:5",
      link: "https://www.instagram.com/p/DRZS6L6jRtL/?stkn=bjNmY2R3eHNpNWpy",
      embedUrl: "https://www.instagram.com/p/DRZS6L6jRtL/embed/",
    },
    {
      id: "DbsFtamjHuT",
      title: "Jewellery Carousel",
      type: "Product Carousel",
      format: "4:5",
      link: "https://www.instagram.com/p/DbsFtamjHuT/?stkn=eHo1ZWd4ODRwdTJy",
      embedUrl: "https://www.instagram.com/p/DbsFtamjHuT/embed/",
    },
    {
      id: "Db2ZntBODIq",
      title: "Restaurant Post",
      type: "Social Feed Post",
      format: "1:1",
      link: "https://www.instagram.com/p/Db2ZntBODIq/?stkn=MXY5azRiZTd0d2llMA==",
      embedUrl: "https://www.instagram.com/p/Db2ZntBODIq/embed/",
    },
    {
      id: "DOtEW_Hkwev",
      title: "Artrooms Carousel",
      type: "Editorial Carousel",
      format: "4:5",
      link: "https://www.instagram.com/p/DOtEW_Hkwev/?stkn=MWE4ZGNjZDdqcWQ4bA==",
      embedUrl: "https://www.instagram.com/p/DOtEW_Hkwev/embed/",
    },
    {
      id: "DRl4A9BjNd8",
      title: "Educational Carousel",
      type: "Educational Series",
      format: "4:5",
      link: "https://www.instagram.com/p/DRl4A9BjNd8/?stkn=aHdqYnAzZHIxNHIx",
      embedUrl: "https://www.instagram.com/p/DRl4A9BjNd8/embed/",
    },
    {
      id: "DL9_WJpSb8J",
      title: "Educational Carousel 2",
      type: "Guide & Insights",
      format: "4:5",
      link: "https://www.instagram.com/p/DL9_WJpSb8J/?img_index=1&stkn=YTN6d3Y0dzY4bjgx",
      embedUrl: "https://www.instagram.com/p/DL9_WJpSb8J/embed/",
    },
  ],
  videosHeader: {
    index: "05",
    label: "Videos edited",
    title: "Cuts that hold",
    ghost: "CUTS",
    note: "Scroll sideways to browse and play all reels.",
  },
  reels: [
    {
      id: "Dc5ZYpwO-JI",
      title: "Brand Reel · Visual Story",
      link: "https://www.instagram.com/reel/Dc5ZYpwO-JI/?stkn=MTF6c3N2OGlnMThwNA==",
      embedUrl: "https://www.instagram.com/reel/Dc5ZYpwO-JI/embed/",
    },
    {
      id: "Db2aVfAuRRs",
      title: "Culinary Cut · Commercial",
      link: "https://www.instagram.com/p/Db2aVfAuRRs/?stkn=aHc2Z3B2dHE0bXQ=",
      embedUrl: "https://www.instagram.com/p/Db2aVfAuRRs/embed/",
    },
    {
      id: "DcLkvqSOTnB",
      title: "Fashion & Lifestyle Reel",
      link: "https://www.instagram.com/p/DcLkvqSOTnB/?stkn=MW5reDF6OW1maDd2eA==",
      embedUrl: "https://www.instagram.com/p/DcLkvqSOTnB/embed/",
    },
    {
      id: "Db2ZntBODIq-reel",
      title: "Dining Experience Feature",
      link: "https://www.instagram.com/p/Db2ZntBODIq/?stkn=NzVrcGNyOXRwNHRs",
      embedUrl: "https://www.instagram.com/p/Db2ZntBODIq/embed/",
    },
    {
      id: "DbumLRsosPp",
      title: "Product Launch Sequence",
      link: "https://www.instagram.com/reel/DbumLRsosPp/?stkn=MXVjMDNvcjQxejE1dw==",
      embedUrl: "https://www.instagram.com/reel/DbumLRsosPp/embed/",
    },
    {
      id: "Dbi4Z4wIQDn",
      title: "Dynamic Visual Edit",
      link: "https://www.instagram.com/reel/Dbi4Z4wIQDn/?stkn=MTY5eXQ4cWU1b2Y2Mw==",
      embedUrl: "https://www.instagram.com/reel/Dbi4Z4wIQDn/embed/",
    },
    {
      id: "Dbdh8MhIlUL",
      title: "Motion Campaign Reel",
      link: "https://www.instagram.com/reel/Dbdh8MhIlUL/?stkn=aG9ubW05NmIzdHpw",
      embedUrl: "https://www.instagram.com/reel/Dbdh8MhIlUL/embed/",
    },
    {
      id: "DRZS6L6jRtL-reel",
      title: "Astrology & Insight Reel",
      link: "https://www.instagram.com/p/DRZS6L6jRtL/?stkn=bjNmY2R3eHNpNWpy",
      embedUrl: "https://www.instagram.com/p/DRZS6L6jRtL/embed/",
    },
  ],
  logos: {
    header: {
      index: "06",
      label: "Logos & marks",
      title: "Marks on paper",
      ghost: "MARKS",
      note: "Each one pinned up, slightly crooked. Hover to bring it into focus.",
    },
    items: [
      { id: "logo-1", name: "Cinephile In Frame", image: "/images/logos/cinephile.png" },
      { id: "logo-2", name: "N1 True Media", image: "/images/logos/n1truemedia.png" },
      { id: "logo-3", name: "Neeleshwer Developers", image: "/images/logos/neeleshwer.png" },
      { id: "logo-4", name: "Modinea", image: "/images/logos/modinea.png" },
      { id: "logo-5", name: "Rituraj Gupta", image: "/images/logos/riturajgupta.png" },
    ],
  },
  brands: {
    header: {
      index: "07",
      label: "Brands we've worked with",
      title: "Good company",
      ghost: "GOOD",
      note: "Selected brand partners, luxury houses, and innovative leaders.",
    },
    items: [
      "Porsche",
      "The Bicester Collection",
      "Radhika Ramuka Jewellery",
      "Get FiBAR",
      "Modinea",
      "Second Brick",
      "Shubh Sagar Virar",
      "N1 True Media",
      "Rituraj Gupta",
      "Crylic Claws",
      "Arabic Scent House",
      "Cinephile In Frame",
      "Neeleshwer Developers",
      "Poonam Sharma",
      "The Blossom Story",
      "Pro-Dev",
      "World of Badge",
    ],
  },
  industriesHeader: {
    index: "08",
    label: "Industries",
    title: "Where we've worked",
    ghost: "WHERE",
    note: "Move your cursor — the cloud leans with you.",
  },
  industries: [
    "Luxury & Retail",
    "Beauty",
    "Real Estate",
    "Film Equipment",
    "Personal Brands",
    "Spiritual & Wellbeing",
    "Astrology",
    "Media",
    "Fragrance & Lifestyle",
    "Fashion",
    "Education",
  ],
  process: {
    header: {
      index: "09",
      label: "Process",
      title: "How it actually goes",
      ghost: "HOW",
      note: "Six steps, hover to open one up.",
    },
    steps: [
      { n: "01", t: "Discover", d: "Interviews, audits and a lot of listening before anything gets designed." },
      { n: "02", t: "Define", d: "We name the problem, the audience and the one thing worth saying." },
      { n: "03", t: "Strategise", d: "Positioning, messaging and a channel plan that fits the budget." },
      { n: "04", t: "Create", d: "Identity, content and interfaces built as one connected system." },
      { n: "05", t: "Activate", d: "Launch across web, social and paid with everything on-brand." },
      { n: "06", t: "Optimise", d: "Read the numbers, cut what's dead, double down on what works." },
    ],
  },
  testimonials: {
    header: {
      index: "10",
      label: "Testimonials",
      title: "Word of mouth",
      ghost: "WORD",
      note: "Click a card to shuffle the stack.",
    },
    quotes: [
      {
        id: "quote-1",
        q: "They rebuilt our brand and our content engine in the same quarter. Everything finally looks and sounds like one company.",
        n: "Client Name",
        r: "Founder, Retail Brand",
      },
      {
        id: "quote-2",
        q: "The edits landed a week early and outperformed everything we'd run before. Rare combination.",
        n: "Client Name",
        r: "Head of Marketing, Automotive",
      },
      {
        id: "quote-3",
        q: "Kredence treats a small budget like it matters. We got studio-level work without the studio circus.",
        n: "Client Name",
        r: "Director, Hospitality Group",
      },
    ],
  },
  finalCta: {
    headline: "WHAT ARE YOU BUILDING?",
    description:
      "Bring us a launch, a rebrand, a backlog of unedited footage — or just a rough idea and a deadline.",
    buttonText: "Start a conversation",
    buttonLink: "mailto:kredence.co@gmail.com",
  },
  contact: {
    email: "kredence.co@gmail.com",
    phone: "+91 8879513666",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    tagline: "A multidisciplinary creative studio — branding, digital, content, video and marketing under one roof.",
  },
  footer: {
    brandName: "KREDENCE",
    summary:
      "A multidisciplinary creative studio — branding, digital, content, video and marketing under one roof.",
    copyright: "© 2026 Kredence Studio · All rights reserved",
    columns: [
      { h: "Work", l: ["Websites", "Graphics", "Videos", "Logos"] },
      { h: "Services", l: ["Branding", "Content", "Social", "Digital"] },
      { h: "About", l: ["Studio", "Process", "Industries", "Clients"] },
      { h: "Contact", l: ["Email", "Phone", "Instagram", "LinkedIn"] },
    ],
  },
};

const STORAGE_KEY = "kredence_studio_content_v2";
const LEGACY_STORAGE_KEY = "kredence_studio_content_v1";

export function parseInstagramUrl(rawUrl: string): {
  id: string;
  isReel: boolean;
  canonicalUrl: string;
  embedUrl: string;
} {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return { id: "", isReel: false, canonicalUrl: "", embedUrl: "" };
  }

  const reelMatch = trimmed.match(/\/reel\/([A-Za-z0-9_-]+)/);
  const postMatch = trimmed.match(/\/p\/([A-Za-z0-9_-]+)/);
  const tvMatch = trimmed.match(/\/tv\/([A-Za-z0-9_-]+)/);

  if (reelMatch && reelMatch[1]) {
    const id = reelMatch[1];
    return {
      id,
      isReel: true,
      canonicalUrl: `https://www.instagram.com/reel/${id}/`,
      embedUrl: `https://www.instagram.com/reel/${id}/embed/`,
    };
  }

  if (postMatch && postMatch[1]) {
    const id = postMatch[1];
    return {
      id,
      isReel: false,
      canonicalUrl: `https://www.instagram.com/p/${id}/`,
      embedUrl: `https://www.instagram.com/p/${id}/embed/`,
    };
  }

  if (tvMatch && tvMatch[1]) {
    const id = tvMatch[1];
    return {
      id,
      isReel: false,
      canonicalUrl: `https://www.instagram.com/tv/${id}/`,
      embedUrl: `https://www.instagram.com/p/${id}/embed/`,
    };
  }

  const idOnly = trimmed.replace(/[^A-Za-z0-9_-]/g, "");
  return {
    id: idOnly,
    isReel: false,
    canonicalUrl: `https://www.instagram.com/p/${idOnly}/`,
    embedUrl: `https://www.instagram.com/p/${idOnly}/embed/`,
  };
}

function deepMergeDefaults<T>(defaults: T, stored: any): T {
  if (!stored || typeof stored !== "object") return defaults;
  if (Array.isArray(defaults)) {
    return (Array.isArray(stored) ? stored : defaults) as unknown as T;
  }
  const result: any = { ...defaults };
  for (const key of Object.keys(defaults as any)) {
    if (stored[key] === undefined || stored[key] === null) {
      result[key] = (defaults as any)[key];
    } else if (
      typeof (defaults as any)[key] === "object" &&
      (defaults as any)[key] !== null &&
      !Array.isArray((defaults as any)[key])
    ) {
      result[key] = deepMergeDefaults((defaults as any)[key], stored[key]);
    } else {
      result[key] = stored[key];
    }
  }
  return result as T;
}

export function getStoredSiteContent(): SiteContent {
  if (typeof window === "undefined") return DEFAULT_SITE_CONTENT;
  try {
    let stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Check legacy key
      stored = localStorage.getItem(LEGACY_STORAGE_KEY);
    }
    if (!stored) return DEFAULT_SITE_CONTENT;
    const parsed = JSON.parse(stored);
    return deepMergeDefaults(DEFAULT_SITE_CONTENT, parsed);
  } catch {
    return DEFAULT_SITE_CONTENT;
  }
}

export function saveSiteContent(content: SiteContent) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    window.dispatchEvent(new Event("kredence-content-update"));
  } catch (err) {
    console.error("Failed to save content to localStorage", err);
  }
}

export function resetSiteContentToDefaults(): SiteContent {
  saveSiteContent(DEFAULT_SITE_CONTENT);
  return DEFAULT_SITE_CONTENT;
}

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setContent(getStoredSiteContent());
    setIsLoaded(true);

    const onUpdate = () => {
      setContent(getStoredSiteContent());
    };

    window.addEventListener("kredence-content-update", onUpdate);
    window.addEventListener("storage", onUpdate);

    return () => {
      window.removeEventListener("kredence-content-update", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  const updateContent = (updater: (prev: SiteContent) => SiteContent) => {
    setContent((prev) => {
      const next = updater(prev);
      saveSiteContent(next);
      return next;
    });
  };

  return {
    content,
    isLoaded,
    updateContent,
    resetToDefaults: () => {
      const def = resetSiteContentToDefaults();
      setContent(def);
    },
  };
}
