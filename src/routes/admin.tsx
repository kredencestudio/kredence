import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  Download,
  ExternalLink,
  Globe,
  Image as ImageIcon,
  Plus,
  RefreshCw,
  Sparkles,
  Tag,
  Trash2,
  Upload,
  Video,
  MoveUp,
  MoveDown,
  Info,
  PenTool,
  Bookmark,
  Building,
  CheckCircle2,
  MessageSquare,
  Compass,
  FileText,
} from "lucide-react";
import {
  useSiteContent,
  parseInstagramUrl,
  type WebsiteItem,
  type GraphicItem,
  type ReelItem,
  type LogoItem,
  type ProcessStep,
  type TestimonialItem,
  type SectionHeaderInfo,
  type ServiceItem,
  type AboutStat,
  type NavItem,
  type SiteContent,
} from "@/lib/content-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [{ title: "Kredence Studio — Complete Admin Content Manager" }],
  }),
});

type AdminTab =
  | "nav-hero"
  | "about"
  | "services"
  | "websites"
  | "graphics"
  | "reels"
  | "logos"
  | "brands"
  | "industries"
  | "process"
  | "testimonials"
  | "cta"
  | "footer"
  | "data";

function HeaderEditor({
  title: editorTitle,
  header,
  onUpdate,
}: {
  title: string;
  header: SectionHeaderInfo;
  onUpdate: (field: keyof SectionHeaderInfo, val: string) => void;
}) {
  return (
    <div className="border border-paper/10 bg-card/60 p-5 shadow-paper">
      <div className="mb-4 flex items-center justify-between border-b border-paper/10 pb-2">
        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-teal">
          ⚙ Section Header ({editorTitle})
        </h3>
        <span className="font-mono text-[10px] text-paper/40 uppercase">
          Eyebrow · Title · Ghost · Note
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
            Number / Index
          </label>
          <input
            type="text"
            value={header.index}
            onChange={(e) => onUpdate("index", e.target.value)}
            className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-1.5 font-mono text-xs text-paper focus:border-teal focus:outline-none"
            placeholder="e.g. 01"
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
            Eyebrow Label
          </label>
          <input
            type="text"
            value={header.label}
            onChange={(e) => onUpdate("label", e.target.value)}
            className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-1.5 font-mono text-xs text-paper focus:border-teal focus:outline-none"
            placeholder="e.g. Who we are"
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
            Section Title
          </label>
          <input
            type="text"
            value={header.title}
            onChange={(e) => onUpdate("title", e.target.value)}
            className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-1.5 font-display text-sm text-paper focus:border-teal focus:outline-none"
            placeholder="e.g. A studio, not a factory"
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
            Ghost Watermark
          </label>
          <input
            type="text"
            value={header.ghost}
            onChange={(e) => onUpdate("ghost", e.target.value)}
            className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-1.5 font-mono text-xs text-paper focus:border-teal focus:outline-none"
            placeholder="e.g. A STUDIO"
          />
        </div>
      </div>
      <div className="mt-3">
        <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
          Side Note / Description
        </label>
        <input
          type="text"
          value={header.note}
          onChange={(e) => onUpdate("note", e.target.value)}
          className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-1.5 font-mono text-xs text-paper/80 focus:border-teal focus:outline-none"
          placeholder="Sub-note displayed on the right"
        />
      </div>
    </div>
  );
}

function AdminPage() {
  const { content, updateContent, resetToDefaults } = useSiteContent();
  const [activeTab, setActiveTab] = useState<AdminTab>("nav-hero");
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // --- Handlers: Websites ---
  const handleAddWebsite = () => {
    const newItem: WebsiteItem = {
      id: `site-${Date.now()}`,
      name: "New Project",
      url: "example.com",
      tag: "Branding",
    };
    updateContent((prev) => ({ ...prev, sites: [...prev.sites, newItem] }));
    showNotification("Added new website card");
  };

  const handleUpdateWebsite = (index: number, field: keyof WebsiteItem, value: string) => {
    updateContent((prev) => {
      const sites = [...prev.sites];
      const cur = sites[index];
      if (!cur) return prev;
      sites[index] = { ...cur, [field]: value };
      return { ...prev, sites };
    });
  };

  const handleDeleteWebsite = (index: number) => {
    if (window.confirm("Remove this website?")) {
      updateContent((prev) => ({
        ...prev,
        sites: prev.sites.filter((_, i) => i !== index),
      }));
      showNotification("Removed website");
    }
  };

  const handleMoveWebsite = (index: number, direction: "up" | "down") => {
    updateContent((prev) => {
      const sites = [...prev.sites];
      const targetIdx = direction === "up" ? index - 1 : index + 1;
      const cur = sites[index];
      const target = sites[targetIdx];
      if (!cur || !target) return prev;
      sites[index] = target;
      sites[targetIdx] = cur;
      return { ...prev, sites };
    });
  };

  // --- Handlers: Graphics ---
  const handleAddGraphic = () => {
    const newItem: GraphicItem = {
      id: `custom-${Date.now()}`,
      title: "New Graphic Campaign",
      type: "Social Carousel",
      format: "4:5",
      link: "https://www.instagram.com",
      embedUrl: "",
    };
    updateContent((prev) => ({ ...prev, graphics: [...prev.graphics, newItem] }));
    showNotification("Added static graphic");
  };

  const handleUpdateGraphicUrl = (index: number, rawUrl: string) => {
    const parsed = parseInstagramUrl(rawUrl);
    updateContent((prev) => {
      const graphics = [...prev.graphics];
      const cur = graphics[index];
      if (!cur) return prev;
      graphics[index] = {
        ...cur,
        id: parsed.id || cur.id,
        link: rawUrl,
        embedUrl: parsed.embedUrl || (rawUrl.includes("instagram.com") ? `${rawUrl.split("?")[0]}embed/` : ""),
      };
      return { ...prev, graphics };
    });
  };

  const handleUpdateGraphicField = (index: number, field: keyof GraphicItem, value: string) => {
    updateContent((prev) => {
      const graphics = [...prev.graphics];
      const cur = graphics[index];
      if (!cur) return prev;
      graphics[index] = { ...cur, [field]: value };
      return { ...prev, graphics };
    });
  };

  const handleDeleteGraphic = (index: number) => {
    if (window.confirm("Remove this static graphic?")) {
      updateContent((prev) => ({
        ...prev,
        graphics: prev.graphics.filter((_, i) => i !== index),
      }));
      showNotification("Removed static graphic");
    }
  };

  const handleMoveGraphic = (index: number, direction: "up" | "down") => {
    updateContent((prev) => {
      const graphics = [...prev.graphics];
      const targetIdx = direction === "up" ? index - 1 : index + 1;
      const cur = graphics[index];
      const target = graphics[targetIdx];
      if (!cur || !target) return prev;
      graphics[index] = target;
      graphics[targetIdx] = cur;
      return { ...prev, graphics };
    });
  };

  // --- Handlers: Reels ---
  const handleAddReel = () => {
    const newItem: ReelItem = {
      id: `reel-${Date.now()}`,
      title: "New Video Reel",
      link: "https://www.instagram.com/reel/",
      embedUrl: "",
    };
    updateContent((prev) => ({ ...prev, reels: [...prev.reels, newItem] }));
    showNotification("Added video reel");
  };

  const handleUpdateReelUrl = (index: number, rawUrl: string) => {
    const parsed = parseInstagramUrl(rawUrl);
    updateContent((prev) => {
      const reels = [...prev.reels];
      const cur = reels[index];
      if (!cur) return prev;
      reels[index] = {
        ...cur,
        id: parsed.id || cur.id,
        link: rawUrl,
        embedUrl: parsed.embedUrl || (rawUrl.includes("instagram.com") ? `${rawUrl.split("?")[0]}embed/` : ""),
      };
      return { ...prev, reels };
    });
  };

  const handleUpdateReelTitle = (index: number, title: string) => {
    updateContent((prev) => {
      const reels = [...prev.reels];
      const cur = reels[index];
      if (!cur) return prev;
      reels[index] = { ...cur, title };
      return { ...prev, reels };
    });
  };

  const handleDeleteReel = (index: number) => {
    if (window.confirm("Remove this video reel?")) {
      updateContent((prev) => ({
        ...prev,
        reels: prev.reels.filter((_, i) => i !== index),
      }));
      showNotification("Removed video reel");
    }
  };

  const handleMoveReel = (index: number, direction: "up" | "down") => {
    updateContent((prev) => {
      const reels = [...prev.reels];
      const targetIdx = direction === "up" ? index - 1 : index + 1;
      const cur = reels[index];
      const target = reels[targetIdx];
      if (!cur || !target) return prev;
      reels[index] = target;
      reels[targetIdx] = cur;
      return { ...prev, reels };
    });
  };

  // --- Handlers: Logos ---
  const handleAddLogo = () => {
    const newItem: LogoItem = {
      id: `logo-${Date.now()}`,
      name: "New Brand",
      image: "",
    };
    updateContent((prev) => ({
      ...prev,
      logos: { ...prev.logos, items: [...prev.logos.items, newItem] },
    }));
    showNotification("Added logo mark");
  };

  const handleUpdateLogo = (index: number, field: keyof LogoItem, value: string) => {
    updateContent((prev) => {
      const items = [...prev.logos.items];
      const cur = items[index];
      if (!cur) return prev;
      items[index] = { ...cur, [field]: value };
      return { ...prev, logos: { ...prev.logos, items } };
    });
  };

  const handleDeleteLogo = (index: number) => {
    if (window.confirm("Remove this logo?")) {
      updateContent((prev) => ({
        ...prev,
        logos: { ...prev.logos, items: prev.logos.items.filter((_, i) => i !== index) },
      }));
      showNotification("Removed logo");
    }
  };

  const handleMoveLogo = (index: number, direction: "up" | "down") => {
    updateContent((prev) => {
      const items = [...prev.logos.items];
      const targetIdx = direction === "up" ? index - 1 : index + 1;
      const cur = items[index];
      const target = items[targetIdx];
      if (!cur || !target) return prev;
      items[index] = target;
      items[targetIdx] = cur;
      return { ...prev, logos: { ...prev.logos, items } };
    });
  };

  // --- Handlers: Brands ---
  const [newBrandText, setNewBrandText] = useState("");
  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandText.trim()) return;
    updateContent((prev) => ({
      ...prev,
      brands: { ...prev.brands, items: [...prev.brands.items, newBrandText.trim()] },
    }));
    setNewBrandText("");
    showNotification("Added brand");
  };

  const handleDeleteBrand = (index: number) => {
    updateContent((prev) => ({
      ...prev,
      brands: { ...prev.brands, items: prev.brands.items.filter((_, i) => i !== index) },
    }));
    showNotification("Removed brand");
  };

  const handleMoveBrand = (index: number, direction: "up" | "down") => {
    updateContent((prev) => {
      const items = [...prev.brands.items];
      const targetIdx = direction === "up" ? index - 1 : index + 1;
      const cur = items[index];
      const target = items[targetIdx];
      if (cur === undefined || target === undefined) return prev;
      items[index] = target;
      items[targetIdx] = cur;
      return { ...prev, brands: { ...prev.brands, items } };
    });
  };

  // --- Handlers: Industries ---
  const [newIndustryText, setNewIndustryText] = useState("");
  const handleAddIndustry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIndustryText.trim()) return;
    updateContent((prev) => ({
      ...prev,
      industries: [...prev.industries, newIndustryText.trim()],
    }));
    setNewIndustryText("");
    showNotification("Added industry tag");
  };

  const handleDeleteIndustry = (index: number) => {
    updateContent((prev) => ({
      ...prev,
      industries: prev.industries.filter((_, i) => i !== index),
    }));
    showNotification("Removed industry tag");
  };

  const handleMoveIndustry = (index: number, direction: "up" | "down") => {
    updateContent((prev) => {
      const industries = [...prev.industries];
      const targetIdx = direction === "up" ? index - 1 : index + 1;
      const cur = industries[index];
      const target = industries[targetIdx];
      if (cur === undefined || target === undefined) return prev;
      industries[index] = target;
      industries[targetIdx] = cur;
      return { ...prev, industries };
    });
  };

  // --- Handlers: Process Steps ---
  const handleAddProcessStep = () => {
    const nextNum = (content.process.steps.length + 1).toString().padStart(2, "0");
    const newStep: ProcessStep = {
      n: nextNum,
      t: "New Step",
      d: "Describe this stage of the studio workflow.",
    };
    updateContent((prev) => ({
      ...prev,
      process: { ...prev.process, steps: [...prev.process.steps, newStep] },
    }));
    showNotification("Added process step");
  };

  const handleUpdateProcessStep = (index: number, field: keyof ProcessStep, value: string) => {
    updateContent((prev) => {
      const steps = [...prev.process.steps];
      const cur = steps[index];
      if (!cur) return prev;
      steps[index] = { ...cur, [field]: value };
      return { ...prev, process: { ...prev.process, steps } };
    });
  };

  const handleDeleteProcessStep = (index: number) => {
    if (window.confirm("Remove this process step?")) {
      updateContent((prev) => ({
        ...prev,
        process: { ...prev.process, steps: prev.process.steps.filter((_, i) => i !== index) },
      }));
      showNotification("Removed process step");
    }
  };

  const handleMoveProcessStep = (index: number, direction: "up" | "down") => {
    updateContent((prev) => {
      const steps = [...prev.process.steps];
      const targetIdx = direction === "up" ? index - 1 : index + 1;
      const cur = steps[index];
      const target = steps[targetIdx];
      if (!cur || !target) return prev;
      steps[index] = target;
      steps[targetIdx] = cur;
      return { ...prev, process: { ...prev.process, steps } };
    });
  };

  // --- Handlers: Testimonials ---
  const handleAddTestimonial = () => {
    const newTestimonial: TestimonialItem = {
      id: `quote-${Date.now()}`,
      q: "Exceptional output and clear strategic communication.",
      n: "Client Name",
      r: "Founder & CEO, Brand",
    };
    updateContent((prev) => ({
      ...prev,
      testimonials: { ...prev.testimonials, quotes: [...prev.testimonials.quotes, newTestimonial] },
    }));
    showNotification("Added testimonial");
  };

  const handleUpdateTestimonial = (index: number, field: keyof TestimonialItem, value: string) => {
    updateContent((prev) => {
      const quotes = [...prev.testimonials.quotes];
      const cur = quotes[index];
      if (!cur) return prev;
      quotes[index] = { ...cur, [field]: value };
      return { ...prev, testimonials: { ...prev.testimonials, quotes } };
    });
  };

  const handleDeleteTestimonial = (index: number) => {
    if (window.confirm("Remove this testimonial?")) {
      updateContent((prev) => ({
        ...prev,
        testimonials: {
          ...prev.testimonials,
          quotes: prev.testimonials.quotes.filter((_, i) => i !== index),
        },
      }));
      showNotification("Removed testimonial");
    }
  };

  const handleMoveTestimonial = (index: number, direction: "up" | "down") => {
    updateContent((prev) => {
      const quotes = [...prev.testimonials.quotes];
      const targetIdx = direction === "up" ? index - 1 : index + 1;
      const cur = quotes[index];
      const target = quotes[targetIdx];
      if (!cur || !target) return prev;
      quotes[index] = target;
      quotes[targetIdx] = cur;
      return { ...prev, testimonials: { ...prev.testimonials, quotes } };
    });
  };

  // --- Handlers: Services ---
  const handleAddService = () => {
    const newService: ServiceItem = {
      id: `service-${Date.now()}`,
      iconName: "Sparkles",
      title: "New Service",
      blurb: "Detailed explanation of what this service delivers.",
      items: ["Deliverable 1", "Deliverable 2", "Deliverable 3"],
    };
    updateContent((prev) => ({
      ...prev,
      services: { ...prev.services, items: [...prev.services.items, newService] },
    }));
    showNotification("Added service");
  };

  const handleUpdateService = (
    index: number,
    field: "id" | "iconName" | "title" | "blurb",
    value: string,
  ) => {
    updateContent((prev) => {
      const items = [...prev.services.items];
      const cur = items[index];
      if (!cur) return prev;
      items[index] = { ...cur, [field]: value };
      return { ...prev, services: { ...prev.services, items } };
    });
  };

  const handleUpdateServiceBullets = (index: number, rawLines: string) => {
    const list = rawLines.split("\n").map((s) => s.trim()).filter(Boolean);
    updateContent((prev) => {
      const items = [...prev.services.items];
      const cur = items[index];
      if (!cur) return prev;
      items[index] = { ...cur, items: list };
      return { ...prev, services: { ...prev.services, items } };
    });
  };

  const handleDeleteService = (index: number) => {
    if (window.confirm("Remove this service?")) {
      updateContent((prev) => ({
        ...prev,
        services: { ...prev.services, items: prev.services.items.filter((_, i) => i !== index) },
      }));
      showNotification("Removed service");
    }
  };

  const handleMoveService = (index: number, direction: "up" | "down") => {
    updateContent((prev) => {
      const items = [...prev.services.items];
      const targetIdx = direction === "up" ? index - 1 : index + 1;
      const cur = items[index];
      const target = items[targetIdx];
      if (!cur || !target) return prev;
      items[index] = target;
      items[targetIdx] = cur;
      return { ...prev, services: { ...prev.services, items } };
    });
  };

  // --- Handlers: Nav Links ---
  const handleAddNavLink = () => {
    const newLink: NavItem = { label: "New Link", href: "#top" };
    updateContent((prev) => ({
      ...prev,
      nav: { ...prev.nav, links: [...prev.nav.links, newLink] },
    }));
    showNotification("Added navigation link");
  };

  const handleUpdateNavLink = (index: number, field: keyof NavItem, value: string) => {
    updateContent((prev) => {
      const links = [...prev.nav.links];
      const cur = links[index];
      if (!cur) return prev;
      links[index] = { ...cur, [field]: value };
      return { ...prev, nav: { ...prev.nav, links } };
    });
  };

  const handleDeleteNavLink = (index: number) => {
    updateContent((prev) => ({
      ...prev,
      nav: { ...prev.nav, links: prev.nav.links.filter((_, i) => i !== index) },
    }));
    showNotification("Removed nav link");
  };

  // --- Handlers: About Stats ---
  const handleAddAboutStat = () => {
    const newStat: AboutStat = { k: "100+", v: "happy clients" };
    updateContent((prev) => ({
      ...prev,
      about: { ...prev.about, stats: [...prev.about.stats, newStat] },
    }));
    showNotification("Added stat badge");
  };

  const handleUpdateAboutStat = (index: number, field: keyof AboutStat, value: string) => {
    updateContent((prev) => {
      const stats = [...prev.about.stats];
      const cur = stats[index];
      if (!cur) return prev;
      stats[index] = { ...cur, [field]: value };
      return { ...prev, about: { ...prev.about, stats } };
    });
  };

  const handleDeleteAboutStat = (index: number) => {
    updateContent((prev) => ({
      ...prev,
      about: { ...prev.about, stats: prev.about.stats.filter((_, i) => i !== index) },
    }));
    showNotification("Removed stat badge");
  };

  // --- Backup & Reset ---
  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kredence-full-content-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification("Exported full studio content backup to JSON");
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string) as SiteContent;
        if (parsed.sites && parsed.graphics && parsed.reels) {
          updateContent(() => parsed);
          showNotification("Imported site content successfully!");
        } else {
          alert("Invalid backup file structure.");
        }
      } catch {
        alert("Could not parse JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Reset all sections back to factory studio defaults? Custom edits will be replaced.",
      )
    ) {
      resetToDefaults();
      showNotification("Reset all sections to defaults");
    }
  };

  const TABS = [
    { id: "nav-hero", label: "00 Nav & Hero", icon: Sparkles },
    { id: "about", label: "01 About", icon: FileText },
    { id: "services", label: "02 Services", icon: PenTool, count: content.services.items.length },
    { id: "websites", label: "03 Websites", icon: Globe, count: content.sites.length },
    { id: "graphics", label: "04 Graphics", icon: ImageIcon, count: content.graphics.length },
    { id: "reels", label: "05 Reels", icon: Video, count: content.reels.length },
    { id: "logos", label: "06 Logos", icon: Bookmark, count: content.logos.items.length },
    { id: "brands", label: "07 Brands", icon: Building, count: content.brands.items.length },
    { id: "industries", label: "08 Industries", icon: Tag, count: content.industries.length },
    { id: "process", label: "09 Process", icon: Compass, count: content.process.steps.length },
    { id: "testimonials", label: "10 Quotes", icon: MessageSquare, count: content.testimonials.quotes.length },
    { id: "cta", label: "11 Final CTA", icon: CheckCircle2 },
    { id: "footer", label: "12 Footer & Info", icon: Info },
    { id: "data", label: "Backup / Reset", icon: RefreshCw },
  ];

  return (
    <div className="bg-charcoal text-paper min-h-screen selection:bg-teal selection:text-charcoal pb-24">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded border-2 border-teal bg-charcoal px-4 py-3 font-mono text-xs text-teal shadow-2xl animate-in fade-in slide-in-from-bottom-2">
          <Check className="size-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header Bar */}
      <header className="sticky top-0 z-40 border-b border-teal/20 bg-charcoal/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="group flex items-center gap-2 font-mono text-xs text-paper/70 transition-colors hover:text-teal"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Site</span>
            </Link>
            <span className="text-paper/20">|</span>
            <div className="flex items-center gap-2">
              <img
                src="/images/k-mark.png"
                alt="Kredence"
                className="h-7 w-auto object-contain"
              />
              <h1 className="font-display text-xl tracking-tight uppercase sm:text-2xl">
                Studio Content Master Admin
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 font-mono text-[10px] text-teal/80 sm:flex">
              <span className="size-2 animate-ping rounded-full bg-teal" />
              Live Auto-Save Enabled
            </span>
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 border border-teal/50 bg-teal/10 px-3.5 py-1.5 font-mono text-xs text-teal transition-all hover:bg-teal hover:text-charcoal"
            >
              <span>Preview Live Site</span>
              <ExternalLink className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6 font-mono text-xs scrollbar-none">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={cn(
                  "flex items-center gap-2 border-b-2 px-3 py-3 uppercase tracking-wider transition-colors whitespace-nowrap",
                  isActive
                    ? "border-teal text-teal font-bold bg-teal/5"
                    : "border-transparent text-paper/60 hover:text-paper hover:border-paper/30",
                )}
              >
                <Icon className="size-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.2 text-[10px]",
                      isActive ? "bg-teal text-charcoal" : "bg-paper/10 text-paper/60",
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Tab Area */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* ============================================================= */}
        {/* TAB 00: NAV & HERO */}
        {/* ============================================================= */}
        {activeTab === "nav-hero" && (
          <div className="space-y-8">
            <div className="border-b border-paper/10 pb-4">
              <h2 className="font-display text-3xl uppercase tracking-tight">
                00 · Header Navigation & Hero Banner
              </h2>
              <p className="mt-1 font-mono text-xs text-paper/60">
                Configure top navbar brand details, menu links, main headline, humorous callout, description, and hero sticker tags.
              </p>
            </div>

            {/* Navbar Settings */}
            <div className="border border-paper/10 bg-card/60 p-6 shadow-paper space-y-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-teal">
                Header Navbar & Brand
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Logo Monogram Letter
                  </label>
                  <input
                    type="text"
                    maxLength={2}
                    value={content.nav.brandLetter}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        nav: { ...prev.nav, brandLetter: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-display text-lg text-paper focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Brand Logo Name
                  </label>
                  <input
                    type="text"
                    value={content.nav.brandName}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        nav: { ...prev.nav, brandName: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-display text-lg text-paper focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Header Button Text
                  </label>
                  <input
                    type="text"
                    value={content.nav.ctaText}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        nav: { ...prev.nav, ctaText: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Header Button Link
                  </label>
                  <input
                    type="text"
                    value={content.nav.ctaHref}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        nav: { ...prev.nav, ctaHref: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                  />
                </div>
              </div>

              {/* Navigation Menu Links */}
              <div className="border-t border-paper/10 pt-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-paper/70">
                    Navbar Menu Links
                  </span>
                  <button
                    onClick={handleAddNavLink}
                    className="inline-flex items-center gap-1.5 border border-teal/50 bg-teal/10 px-2.5 py-1 font-mono text-[11px] text-teal hover:bg-teal hover:text-charcoal"
                  >
                    <Plus className="size-3" /> Add Link
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {content.nav.links.map((link, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 border border-paper/10 bg-charcoal p-2.5"
                    >
                      <div className="flex-1 space-y-1">
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => handleUpdateNavLink(idx, "label", e.target.value)}
                          placeholder="Label"
                          className="w-full border-b border-paper/20 bg-transparent py-0.5 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                        />
                        <input
                          type="text"
                          value={link.href}
                          onChange={(e) => handleUpdateNavLink(idx, "href", e.target.value)}
                          placeholder="#anchor or /url"
                          className="w-full bg-transparent py-0.5 font-mono text-[10px] text-teal focus:outline-none"
                        />
                      </div>
                      <button
                        onClick={() => handleDeleteNavLink(idx)}
                        className="p-1 text-red-400 hover:text-red-300"
                        title="Delete Link"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hero Section */}
            <div className="border border-paper/10 bg-card/60 p-6 shadow-paper space-y-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-teal">
                Hero Content & Typography
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Top Sticker Badge
                  </label>
                  <input
                    type="text"
                    value={content.hero.badge}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, badge: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Humor Highlight Badge
                  </label>
                  <input
                    type="text"
                    value={content.hero.humorHighlight}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, humorHighlight: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-display text-lg text-teal focus:border-teal focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Headline Line 1
                  </label>
                  <input
                    type="text"
                    value={content.hero.titleLine1}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, titleLine1: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-display text-xl text-paper focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Headline Line 2
                  </label>
                  <input
                    type="text"
                    value={content.hero.titleLine2}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, titleLine2: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-display text-xl text-paper focus:border-teal focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Sub-Punchline (Marker Underline)
                  </label>
                  <input
                    type="text"
                    value={content.hero.subHighlight}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, subHighlight: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-sm text-paper focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Punchline Tag / Comment
                  </label>
                  <input
                    type="text"
                    value={content.hero.subHighlightTag}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, subHighlightTag: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-sm text-teal focus:border-teal focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                  Hero Paragraph Story
                </label>
                <textarea
                  rows={3}
                  value={content.hero.description}
                  onChange={(e) =>
                    updateContent((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, description: e.target.value },
                    }))
                  }
                  className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Primary Button Text
                  </label>
                  <input
                    type="text"
                    value={content.hero.primaryCtaText}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, primaryCtaText: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Primary Button Link
                  </label>
                  <input
                    type="text"
                    value={content.hero.primaryCtaHref}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, primaryCtaHref: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Secondary Button Text
                  </label>
                  <input
                    type="text"
                    value={content.hero.secondaryCtaText}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, secondaryCtaText: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Secondary Button Link
                  </label>
                  <input
                    type="text"
                    value={content.hero.secondaryCtaHref}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, secondaryCtaHref: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Floating Photo Sticker Filename
                  </label>
                  <input
                    type="text"
                    value={content.hero.photoTag}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, photoTag: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                  />
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="/images/hero-phone.jpg"
                      value={content.hero.photoImage || "/images/hero-phone.jpg"}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, photoImage: e.target.value },
                        }))
                      }
                      className="flex-1 border border-paper/20 bg-charcoal px-3 py-1.5 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                    />
                    {(content.hero.photoImage || "/images/hero-phone.jpg") && (
                      <img
                        src={content.hero.photoImage || "/images/hero-phone.jpg"}
                        alt="Hero Left Preview"
                        className="size-8 rounded object-cover border border-teal/40"
                      />
                    )}
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Floating Reel Sticker Filename
                  </label>
                  <input
                    type="text"
                    value={content.hero.reelTag}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, reelTag: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                  />
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="/images/hero-screen.png"
                      value={content.hero.reelImage || "/images/hero-screen.png"}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, reelImage: e.target.value },
                        }))
                      }
                      className="flex-1 border border-paper/20 bg-charcoal px-3 py-1.5 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                    />
                    {(content.hero.reelImage || "/images/hero-screen.png") && (
                      <img
                        src={content.hero.reelImage || "/images/hero-screen.png"}
                        alt="Hero Right Preview"
                        className="size-8 rounded object-cover border border-teal/40"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 01: ABOUT */}
        {/* ============================================================= */}
        {activeTab === "about" && (
          <div className="space-y-8">
            <div className="border-b border-paper/10 pb-4">
              <h2 className="font-display text-3xl uppercase tracking-tight">
                01 · About Section Content
              </h2>
              <p className="mt-1 font-mono text-xs text-paper/60">
                Manage Section 01 header, photo frame, main bold statement, copy, counter badges, and the handwritten sticky note.
              </p>
            </div>

            <HeaderEditor
              title="01 About"
              header={content.about.header}
              onUpdate={(f, v) =>
                updateContent((prev) => ({
                  ...prev,
                  about: { ...prev.about, header: { ...prev.about.header, [f]: v } },
                }))
              }
            />

            <div className="border border-paper/10 bg-card/60 p-6 shadow-paper space-y-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-teal">
                Studio Card & Photo Frame
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Photo Frame Label
                  </label>
                  <input
                    type="text"
                    value={content.about.photoLabel}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        about: { ...prev.about, photoLabel: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Photo File Caption
                  </label>
                  <input
                    type="text"
                    value={content.about.photoTag}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        about: { ...prev.about, photoTag: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Badge Year
                  </label>
                  <input
                    type="text"
                    value={content.about.photoYear}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        about: { ...prev.about, photoYear: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                  Studio Photo Image URL / Path
                </label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="text"
                    value={content.about.photoImage || "/images/studio-team.jpg"}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        about: { ...prev.about, photoImage: e.target.value },
                      }))
                    }
                    placeholder="/images/studio-team.jpg"
                    className="flex-1 border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                  />
                  {(content.about.photoImage || "/images/studio-team.jpg") && (
                    <img
                      src={content.about.photoImage || "/images/studio-team.jpg"}
                      alt="Studio Preview"
                      className="size-10 rounded object-cover border border-teal/40"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                  Main Headline Statement
                </label>
                <input
                  type="text"
                  value={content.about.headline}
                  onChange={(e) =>
                    updateContent((prev) => ({
                      ...prev,
                      about: { ...prev.about, headline: e.target.value },
                    }))
                  }
                  className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-display text-xl text-paper focus:border-teal focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                  Story / Description Paragraph
                </label>
                <textarea
                  rows={3}
                  value={content.about.description}
                  onChange={(e) =>
                    updateContent((prev) => ({
                      ...prev,
                      about: { ...prev.about, description: e.target.value },
                    }))
                  }
                  className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                />
              </div>

              {/* Stats badges */}
              <div className="border-t border-paper/10 pt-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-paper/70">
                    Stats Sticker Badges
                  </span>
                  <button
                    onClick={handleAddAboutStat}
                    className="inline-flex items-center gap-1.5 border border-teal/50 bg-teal/10 px-2.5 py-1 font-mono text-[11px] text-teal hover:bg-teal hover:text-charcoal"
                  >
                    <Plus className="size-3" /> Add Stat
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {content.about.stats.map((st, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 border border-paper/10 bg-charcoal p-3"
                    >
                      <div className="flex-1 space-y-1">
                        <input
                          type="text"
                          value={st.k}
                          onChange={(e) => handleUpdateAboutStat(i, "k", e.target.value)}
                          placeholder="e.g. 150+"
                          className="w-full border-b border-paper/20 bg-transparent py-0.5 font-display text-lg text-teal focus:outline-none"
                        />
                        <input
                          type="text"
                          value={st.v}
                          onChange={(e) => handleUpdateAboutStat(i, "v", e.target.value)}
                          placeholder="e.g. crazy ideas"
                          className="w-full bg-transparent py-0.5 font-mono text-[10px] text-paper/70 uppercase focus:outline-none"
                        />
                      </div>
                      <button
                        onClick={() => handleDeleteAboutStat(i)}
                        className="p-1 text-red-400 hover:text-red-300"
                        title="Delete Stat"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                  Handwritten Note Callout
                </label>
                <input
                  type="text"
                  value={content.about.handwrittenNote}
                  onChange={(e) =>
                    updateContent((prev) => ({
                      ...prev,
                      about: { ...prev.about, handwrittenNote: e.target.value },
                    }))
                  }
                  className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 02: SERVICES */}
        {/* ============================================================= */}
        {activeTab === "services" && (
          <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 border-b border-paper/10 pb-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-3xl uppercase tracking-tight">
                  02 · Services & Capabilities
                </h2>
                <p className="mt-1 font-mono text-xs text-paper/60">
                  Manage the six rooms of Kredence: icons, titles, summaries, bullet deliverables, and the CTA box.
                </p>
              </div>
              <button
                onClick={handleAddService}
                className="inline-flex items-center gap-2 bg-teal px-4 py-2 font-mono text-xs font-bold uppercase text-charcoal"
              >
                <Plus className="size-4" /> Add Service
              </button>
            </div>

            <HeaderEditor
              title="02 Services"
              header={content.services.header}
              onUpdate={(f, v) =>
                updateContent((prev) => ({
                  ...prev,
                  services: { ...prev.services, header: { ...prev.services.header, [f]: v } },
                }))
              }
            />

            {/* Service Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.services.items.map((srv, idx) => (
                <div
                  key={srv.id}
                  className="group relative flex flex-col border border-paper/15 bg-card p-5 shadow-paper transition-all hover:border-teal"
                >
                  <div className="mb-4 flex items-center justify-between border-b border-paper/10 pb-3">
                    <span className="font-mono text-xs font-bold text-teal">
                      Service 0{idx + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveService(idx, "up")}
                        disabled={idx === 0}
                        title="Move Up"
                        className="p-1 text-paper/50 hover:text-paper disabled:opacity-20"
                      >
                        <MoveUp className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveService(idx, "down")}
                        disabled={idx === content.services.items.length - 1}
                        title="Move Down"
                        className="p-1 text-paper/50 hover:text-paper disabled:opacity-20"
                      >
                        <MoveDown className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(idx)}
                        title="Delete Service"
                        className="p-1 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                          Icon Name
                        </label>
                        <select
                          value={srv.iconName}
                          onChange={(e) => handleUpdateService(idx, "iconName", e.target.value)}
                          className="mt-1 w-full border border-paper/20 bg-charcoal px-2 py-1.5 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                        >
                          <option value="PenTool">PenTool</option>
                          <option value="Clapperboard">Clapperboard</option>
                          <option value="Share2">Share2</option>
                          <option value="MonitorSmartphone">MonitorSmartphone</option>
                          <option value="Megaphone">Megaphone</option>
                          <option value="Sparkles">Sparkles</option>
                          <option value="Play">Play</option>
                          <option value="Globe">Globe</option>
                          <option value="Camera">Camera</option>
                          <option value="Layers">Layers</option>
                          <option value="Palette">Palette</option>
                          <option value="Briefcase">Briefcase</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                          Unique ID
                        </label>
                        <input
                          type="text"
                          value={srv.id}
                          onChange={(e) => handleUpdateService(idx, "id", e.target.value)}
                          className="mt-1 w-full border border-paper/20 bg-charcoal px-2 py-1.5 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                        Service Title
                      </label>
                      <input
                        type="text"
                        value={srv.title}
                        onChange={(e) => handleUpdateService(idx, "title", e.target.value)}
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-display text-lg text-paper focus:border-teal focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                        Blurb / Description
                      </label>
                      <textarea
                        rows={2}
                        value={srv.blurb}
                        onChange={(e) => handleUpdateService(idx, "blurb", e.target.value)}
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                        Bullet Items (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={srv.items.join("\n")}
                        onChange={(e) => handleUpdateServiceBullets(idx, e.target.value)}
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper/80 focus:border-teal focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Service CTA Box */}
            <div className="border border-paper/10 bg-card/60 p-5 shadow-paper space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-teal">
                Grid CTA Callout Box
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Callout Statement
                  </label>
                  <input
                    type="text"
                    value={content.services.ctaBoxTitle}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        services: { ...prev.services, ctaBoxTitle: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-display text-sm text-paper focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={content.services.ctaBoxButtonText}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        services: { ...prev.services, ctaBoxButtonText: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Button Target Link
                  </label>
                  <input
                    type="text"
                    value={content.services.ctaBoxButtonHref}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        services: { ...prev.services, ctaBoxButtonHref: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 03: WEBSITES */}
        {/* ============================================================= */}
        {activeTab === "websites" && (
          <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 border-b border-paper/10 pb-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-3xl uppercase tracking-tight">
                  03 · Websites We've Built
                </h2>
                <p className="mt-1 font-mono text-xs text-paper/60">
                  Manage the interactive browser frames under "Sites with a pulse".
                </p>
              </div>
              <button
                onClick={handleAddWebsite}
                className="inline-flex items-center gap-2 bg-teal px-4 py-2 font-mono text-xs font-bold uppercase text-charcoal"
              >
                <Plus className="size-4" /> Add Website
              </button>
            </div>

            <HeaderEditor
              title="03 Websites"
              header={content.websitesHeader}
              onUpdate={(f, v) =>
                updateContent((prev) => ({
                  ...prev,
                  websitesHeader: { ...prev.websitesHeader, [f]: v },
                }))
              }
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.sites.map((site, index) => (
                <div
                  key={site.id}
                  className="group relative flex flex-col border border-paper/15 bg-card p-5 shadow-paper transition-all hover:border-teal"
                >
                  <div className="mb-4 flex items-center justify-between border-b border-paper/10 pb-3">
                    <span className="font-mono text-xs font-bold text-teal">
                      Website 0{index + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveWebsite(index, "up")}
                        disabled={index === 0}
                        title="Move Up"
                        className="p-1 text-paper/50 hover:text-paper disabled:opacity-20"
                      >
                        <MoveUp className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveWebsite(index, "down")}
                        disabled={index === content.sites.length - 1}
                        title="Move Down"
                        className="p-1 text-paper/50 hover:text-paper disabled:opacity-20"
                      >
                        <MoveDown className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteWebsite(index)}
                        title="Delete Website"
                        className="p-1 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                        Project Name
                      </label>
                      <input
                        type="text"
                        value={site.name}
                        onChange={(e) => handleUpdateWebsite(index, "name", e.target.value)}
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-display text-lg text-paper focus:border-teal focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                        Domain / URL
                      </label>
                      <input
                        type="text"
                        value={site.url}
                        onChange={(e) => handleUpdateWebsite(index, "url", e.target.value)}
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                        Category Tag
                      </label>
                      <input
                        type="text"
                        value={site.tag}
                        onChange={(e) => handleUpdateWebsite(index, "tag", e.target.value)}
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 04: GRAPHICS */}
        {/* ============================================================= */}
        {activeTab === "graphics" && (
          <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 border-b border-paper/10 pb-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-3xl uppercase tracking-tight">
                  04 · Static Graphics & Carousels
                </h2>
                <p className="mt-1 font-mono text-xs text-paper/60">
                  Manage static Instagram embeds, campaigns, posters, and educational series.
                </p>
              </div>
              <button
                onClick={handleAddGraphic}
                className="inline-flex items-center gap-2 bg-teal px-4 py-2 font-mono text-xs font-bold uppercase text-charcoal"
              >
                <Plus className="size-4" /> Add Graphic
              </button>
            </div>

            <HeaderEditor
              title="04 Static Graphics"
              header={content.graphicsHeader}
              onUpdate={(f, v) =>
                updateContent((prev) => ({
                  ...prev,
                  graphicsHeader: { ...prev.graphicsHeader, [f]: v },
                }))
              }
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.graphics.map((g, index) => (
                <div
                  key={g.id || index}
                  className="group relative flex flex-col border border-paper/15 bg-card p-5 shadow-paper transition-all hover:border-teal"
                >
                  <div className="mb-4 flex items-center justify-between border-b border-paper/10 pb-3">
                    <span className="font-mono text-xs font-bold text-teal">
                      Graphic 0{index + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveGraphic(index, "up")}
                        disabled={index === 0}
                        title="Move Up"
                        className="p-1 text-paper/50 hover:text-paper disabled:opacity-20"
                      >
                        <MoveUp className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveGraphic(index, "down")}
                        disabled={index === content.graphics.length - 1}
                        title="Move Down"
                        className="p-1 text-paper/50 hover:text-paper disabled:opacity-20"
                      >
                        <MoveDown className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteGraphic(index)}
                        title="Delete Graphic"
                        className="p-1 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                        Title
                      </label>
                      <input
                        type="text"
                        value={g.title}
                        onChange={(e) => handleUpdateGraphicField(index, "title", e.target.value)}
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-display text-lg text-paper focus:border-teal focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                          Format
                        </label>
                        <input
                          type="text"
                          value={g.format}
                          onChange={(e) => handleUpdateGraphicField(index, "format", e.target.value)}
                          placeholder="4:5 or 1:1"
                          className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                          Type
                        </label>
                        <input
                          type="text"
                          value={g.type}
                          onChange={(e) => handleUpdateGraphicField(index, "type", e.target.value)}
                          placeholder="Social Carousel"
                          className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                        Instagram Post URL
                      </label>
                      <input
                        type="text"
                        value={g.link}
                        onChange={(e) => handleUpdateGraphicUrl(index, e.target.value)}
                        placeholder="https://www.instagram.com/p/..."
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                        Embed URL (Auto-generated or custom)
                      </label>
                      <input
                        type="text"
                        value={g.embedUrl}
                        onChange={(e) => handleUpdateGraphicField(index, "embedUrl", e.target.value)}
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-[11px] text-paper/70 focus:border-teal focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 05: REELS */}
        {/* ============================================================= */}
        {activeTab === "reels" && (
          <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 border-b border-paper/10 pb-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-3xl uppercase tracking-tight">
                  05 · Video Reels & Commercial Cuts
                </h2>
                <p className="mt-1 font-mono text-xs text-paper/60">
                  Manage horizontal scrolling video reel cards and Instagram player embeds.
                </p>
              </div>
              <button
                onClick={handleAddReel}
                className="inline-flex items-center gap-2 bg-teal px-4 py-2 font-mono text-xs font-bold uppercase text-charcoal"
              >
                <Plus className="size-4" /> Add Reel
              </button>
            </div>

            <HeaderEditor
              title="05 Video Reels"
              header={content.videosHeader}
              onUpdate={(f, v) =>
                updateContent((prev) => ({
                  ...prev,
                  videosHeader: { ...prev.videosHeader, [f]: v },
                }))
              }
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.reels.map((reel, index) => (
                <div
                  key={reel.id || index}
                  className="group relative flex flex-col border border-paper/15 bg-card p-5 shadow-paper transition-all hover:border-teal"
                >
                  <div className="mb-4 flex items-center justify-between border-b border-paper/10 pb-3">
                    <span className="font-mono text-xs font-bold text-teal">
                      Reel 0{index + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveReel(index, "up")}
                        disabled={index === 0}
                        title="Move Up"
                        className="p-1 text-paper/50 hover:text-paper disabled:opacity-20"
                      >
                        <MoveUp className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveReel(index, "down")}
                        disabled={index === content.reels.length - 1}
                        title="Move Down"
                        className="p-1 text-paper/50 hover:text-paper disabled:opacity-20"
                      >
                        <MoveDown className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteReel(index)}
                        title="Delete Reel"
                        className="p-1 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                        Title / Caption
                      </label>
                      <input
                        type="text"
                        value={reel.title}
                        onChange={(e) => handleUpdateReelTitle(index, e.target.value)}
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-display text-lg text-paper focus:border-teal focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                        Instagram Reel / Post URL
                      </label>
                      <input
                        type="text"
                        value={reel.link}
                        onChange={(e) => handleUpdateReelUrl(index, e.target.value)}
                        placeholder="https://www.instagram.com/reel/..."
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                        Embed URL
                      </label>
                      <input
                        type="text"
                        value={reel.embedUrl}
                        onChange={(e) =>
                          updateContent((prev) => {
                            const reels = [...prev.reels];
                            const cur = reels[index];
                            if (!cur) return prev;
                            reels[index] = { ...cur, embedUrl: e.target.value };
                            return { ...prev, reels };
                          })
                        }
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-[11px] text-paper/70 focus:border-teal focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 06: LOGOS */}
        {/* ============================================================= */}
        {activeTab === "logos" && (
          <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 border-b border-paper/10 pb-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-3xl uppercase tracking-tight">
                  06 · Logos & Marks on Paper
                </h2>
                <p className="mt-1 font-mono text-xs text-paper/60">
                  Manage client logo marks pinned to the studio wall.
                </p>
              </div>
              <button
                onClick={handleAddLogo}
                className="inline-flex items-center gap-2 bg-teal px-4 py-2 font-mono text-xs font-bold uppercase text-charcoal"
              >
                <Plus className="size-4" /> Add Logo
              </button>
            </div>

            <HeaderEditor
              title="06 Logos"
              header={content.logos.header}
              onUpdate={(f, v) =>
                updateContent((prev) => ({
                  ...prev,
                  logos: { ...prev.logos, header: { ...prev.logos.header, [f]: v } },
                }))
              }
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {content.logos.items.map((logo, index) => (
                <div
                  key={logo.id || index}
                  className="group relative flex flex-col border border-paper/15 bg-card p-5 shadow-paper transition-all hover:border-teal"
                >
                  <div className="mb-4 flex items-center justify-between border-b border-paper/10 pb-3">
                    <span className="font-mono text-xs font-bold text-teal">
                      Mark 0{index + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveLogo(index, "up")}
                        disabled={index === 0}
                        title="Move Up"
                        className="p-1 text-paper/50 hover:text-paper disabled:opacity-20"
                      >
                        <MoveUp className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveLogo(index, "down")}
                        disabled={index === content.logos.items.length - 1}
                        title="Move Down"
                        className="p-1 text-paper/50 hover:text-paper disabled:opacity-20"
                      >
                        <MoveDown className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteLogo(index)}
                        title="Delete Logo"
                        className="p-1 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                        Brand / Client Name
                      </label>
                      <input
                        type="text"
                        value={logo.name}
                        onChange={(e) => handleUpdateLogo(index, "name", e.target.value)}
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-display text-base text-paper focus:border-teal focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                        Image URL / File Path
                      </label>
                      <input
                        type="text"
                        value={logo.image}
                        onChange={(e) => handleUpdateLogo(index, "image", e.target.value)}
                        placeholder="/images/logos/..."
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                      />
                    </div>

                    {/* Preview box */}
                    <div className="flex h-20 items-center justify-center rounded border border-paper/10 bg-paper p-2">
                      {logo.image ? (
                        <img
                          src={logo.image}
                          alt={logo.name}
                          className="max-h-16 max-w-full object-contain mix-blend-multiply"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="font-display text-xl text-charcoal">
                          {logo.name[0] || "K"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 07: BRANDS */}
        {/* ============================================================= */}
        {activeTab === "brands" && (
          <div className="space-y-8">
            <div className="border-b border-paper/10 pb-4">
              <h2 className="font-display text-3xl uppercase tracking-tight">
                07 · Brands We've Worked With
              </h2>
              <p className="mt-1 font-mono text-xs text-paper/60">
                Manage the "Good company" brand roster displayed in the client logo grid.
              </p>
            </div>

            <HeaderEditor
              title="07 Brands"
              header={content.brands.header}
              onUpdate={(f, v) =>
                updateContent((prev) => ({
                  ...prev,
                  brands: { ...prev.brands, header: { ...prev.brands.header, [f]: v } },
                }))
              }
            />

            <form onSubmit={handleAddBrand} className="flex gap-2">
              <input
                type="text"
                value={newBrandText}
                onChange={(e) => setNewBrandText(e.target.value)}
                placeholder="Type brand name (e.g. Porsche)..."
                className="flex-1 border border-paper/20 bg-card px-4 py-2.5 font-display text-base text-paper focus:border-teal focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 bg-teal px-5 py-2.5 font-mono text-xs font-bold uppercase text-charcoal"
              >
                <Plus className="size-4" /> Add Brand
              </button>
            </form>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {content.brands.items.map((b, i) => (
                <div
                  key={`${b}-${i}`}
                  className="flex items-center justify-between border border-paper/15 bg-card p-3 shadow-paper hover:border-teal"
                >
                  <input
                    type="text"
                    value={b}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => {
                        const items = [...prev.brands.items];
                        items[i] = val;
                        return { ...prev, brands: { ...prev.brands, items } };
                      });
                    }}
                    className="flex-1 bg-transparent font-display text-lg text-paper focus:text-teal focus:outline-none"
                  />
                  <div className="flex items-center gap-1 pl-2">
                    <button
                      onClick={() => handleMoveBrand(i, "up")}
                      disabled={i === 0}
                      className="p-1 text-paper/50 hover:text-paper disabled:opacity-20"
                    >
                      <MoveUp className="size-3" />
                    </button>
                    <button
                      onClick={() => handleMoveBrand(i, "down")}
                      disabled={i === content.brands.items.length - 1}
                      className="p-1 text-paper/50 hover:text-paper disabled:opacity-20"
                    >
                      <MoveDown className="size-3" />
                    </button>
                    <button
                      onClick={() => handleDeleteBrand(i)}
                      className="p-1 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 08: INDUSTRIES */}
        {/* ============================================================= */}
        {activeTab === "industries" && (
          <div className="space-y-8">
            <div className="border-b border-paper/10 pb-4">
              <h2 className="font-display text-3xl uppercase tracking-tight">
                08 · Industries & Marquee
              </h2>
              <p className="mt-1 font-mono text-xs text-paper/60">
                Manage industry pill tags shown in the 3D cursor cloud and top animated marquee.
              </p>
            </div>

            <HeaderEditor
              title="08 Industries"
              header={content.industriesHeader}
              onUpdate={(f, v) =>
                updateContent((prev) => ({
                  ...prev,
                  industriesHeader: { ...prev.industriesHeader, [f]: v },
                }))
              }
            />

            <form onSubmit={handleAddIndustry} className="flex gap-2">
              <input
                type="text"
                value={newIndustryText}
                onChange={(e) => setNewIndustryText(e.target.value)}
                placeholder="Type industry tag (e.g. Luxury & Retail)..."
                className="flex-1 border border-paper/20 bg-card px-4 py-2.5 font-mono text-xs text-paper focus:border-teal focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 bg-teal px-5 py-2.5 font-mono text-xs font-bold uppercase text-charcoal"
              >
                <Plus className="size-4" /> Add Industry
              </button>
            </form>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {content.industries.map((tag, i) => (
                <div
                  key={`${tag}-${i}`}
                  className="flex items-center justify-between border border-paper/15 bg-card p-3 shadow-paper hover:border-teal"
                >
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateContent((prev) => {
                        const ind = [...prev.industries];
                        ind[i] = val;
                        return { ...prev, industries: ind };
                      });
                    }}
                    className="flex-1 bg-transparent font-mono text-xs text-paper uppercase tracking-wider focus:text-teal focus:outline-none"
                  />
                  <div className="flex items-center gap-1 pl-2">
                    <button
                      onClick={() => handleMoveIndustry(i, "up")}
                      disabled={i === 0}
                      className="p-1 text-paper/50 hover:text-paper disabled:opacity-20"
                    >
                      <MoveUp className="size-3" />
                    </button>
                    <button
                      onClick={() => handleMoveIndustry(i, "down")}
                      disabled={i === content.industries.length - 1}
                      className="p-1 text-paper/50 hover:text-paper disabled:opacity-20"
                    >
                      <MoveDown className="size-3" />
                    </button>
                    <button
                      onClick={() => handleDeleteIndustry(i)}
                      className="p-1 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 09: PROCESS */}
        {/* ============================================================= */}
        {activeTab === "process" && (
          <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 border-b border-paper/10 pb-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-3xl uppercase tracking-tight">
                  09 · Process & Workflow
                </h2>
                <p className="mt-1 font-mono text-xs text-paper/60">
                  Manage the six sequential phases under "How it actually goes".
                </p>
              </div>
              <button
                onClick={handleAddProcessStep}
                className="inline-flex items-center gap-2 bg-teal px-4 py-2 font-mono text-xs font-bold uppercase text-charcoal"
              >
                <Plus className="size-4" /> Add Step
              </button>
            </div>

            <HeaderEditor
              title="09 Process"
              header={content.process.header}
              onUpdate={(f, v) =>
                updateContent((prev) => ({
                  ...prev,
                  process: { ...prev.process, header: { ...prev.process.header, [f]: v } },
                }))
              }
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {content.process.steps.map((st, index) => (
                <div
                  key={st.n || index}
                  className="group relative flex flex-col border border-paper/15 bg-card p-5 shadow-paper transition-all hover:border-teal"
                >
                  <div className="mb-4 flex items-center justify-between border-b border-paper/10 pb-3">
                    <span className="font-mono text-xs font-bold text-teal">
                      Step {st.n || `0${index + 1}`}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveProcessStep(index, "up")}
                        disabled={index === 0}
                        title="Move Up"
                        className="p-1 text-paper/50 hover:text-paper disabled:opacity-20"
                      >
                        <MoveUp className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveProcessStep(index, "down")}
                        disabled={index === content.process.steps.length - 1}
                        title="Move Down"
                        className="p-1 text-paper/50 hover:text-paper disabled:opacity-20"
                      >
                        <MoveDown className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProcessStep(index)}
                        title="Delete Step"
                        className="p-1 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                          Step #
                        </label>
                        <input
                          type="text"
                          value={st.n}
                          onChange={(e) => handleUpdateProcessStep(index, "n", e.target.value)}
                          className="mt-1 w-full border border-paper/20 bg-charcoal px-2 py-1.5 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                          Step Name
                        </label>
                        <input
                          type="text"
                          value={st.t}
                          onChange={(e) => handleUpdateProcessStep(index, "t", e.target.value)}
                          className="mt-1 w-full border border-paper/20 bg-charcoal px-2 py-1.5 font-display text-base text-paper focus:border-teal focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={st.d}
                        onChange={(e) => handleUpdateProcessStep(index, "d", e.target.value)}
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 10: TESTIMONIALS */}
        {/* ============================================================= */}
        {activeTab === "testimonials" && (
          <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 border-b border-paper/10 pb-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-3xl uppercase tracking-tight">
                  10 · Testimonials & Word of Mouth
                </h2>
                <p className="mt-1 font-mono text-xs text-paper/60">
                  Manage client review cards in the interactive shuffle stack.
                </p>
              </div>
              <button
                onClick={handleAddTestimonial}
                className="inline-flex items-center gap-2 bg-teal px-4 py-2 font-mono text-xs font-bold uppercase text-charcoal"
              >
                <Plus className="size-4" /> Add Testimonial
              </button>
            </div>

            <HeaderEditor
              title="10 Testimonials"
              header={content.testimonials.header}
              onUpdate={(f, v) =>
                updateContent((prev) => ({
                  ...prev,
                  testimonials: {
                    ...prev.testimonials,
                    header: { ...prev.testimonials.header, [f]: v },
                  },
                }))
              }
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.testimonials.quotes.map((q, index) => (
                <div
                  key={q.id || index}
                  className="group relative flex flex-col border border-paper/15 bg-card p-5 shadow-paper transition-all hover:border-teal"
                >
                  <div className="mb-4 flex items-center justify-between border-b border-paper/10 pb-3">
                    <span className="font-mono text-xs font-bold text-teal">
                      Review 0{index + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveTestimonial(index, "up")}
                        disabled={index === 0}
                        title="Move Up"
                        className="p-1 text-paper/50 hover:text-paper disabled:opacity-20"
                      >
                        <MoveUp className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveTestimonial(index, "down")}
                        disabled={index === content.testimonials.quotes.length - 1}
                        title="Move Down"
                        className="p-1 text-paper/50 hover:text-paper disabled:opacity-20"
                      >
                        <MoveDown className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(index)}
                        title="Delete Review"
                        className="p-1 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                        Quote Content
                      </label>
                      <textarea
                        rows={3}
                        value={q.q}
                        onChange={(e) => handleUpdateTestimonial(index, "q", e.target.value)}
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                        Client Name
                      </label>
                      <input
                        type="text"
                        value={q.n}
                        onChange={(e) => handleUpdateTestimonial(index, "n", e.target.value)}
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-display text-base text-paper focus:border-teal focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                        Client Role / Brand Name
                      </label>
                      <input
                        type="text"
                        value={q.r}
                        onChange={(e) => handleUpdateTestimonial(index, "r", e.target.value)}
                        className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper/70 focus:border-teal focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 11: FINAL CTA */}
        {/* ============================================================= */}
        {activeTab === "cta" && (
          <div className="space-y-8">
            <div className="border-b border-paper/10 pb-4">
              <h2 className="font-display text-3xl uppercase tracking-tight">
                11 · Final Call To Action Banner
              </h2>
              <p className="mt-1 font-mono text-xs text-paper/60">
                Manage the big teal closing banner, headline, description, and conversation button.
              </p>
            </div>

            <div className="border border-paper/10 bg-card/60 p-6 shadow-paper space-y-6">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                  Big Ghost Headline
                </label>
                <input
                  type="text"
                  value={content.finalCta.headline}
                  onChange={(e) =>
                    updateContent((prev) => ({
                      ...prev,
                      finalCta: { ...prev.finalCta, headline: e.target.value },
                    }))
                  }
                  className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-display text-xl text-teal focus:border-teal focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                  Description Text
                </label>
                <textarea
                  rows={2}
                  value={content.finalCta.description}
                  onChange={(e) =>
                    updateContent((prev) => ({
                      ...prev,
                      finalCta: { ...prev.finalCta, description: e.target.value },
                    }))
                  }
                  className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Primary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={content.finalCta.buttonText}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        finalCta: { ...prev.finalCta, buttonText: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Primary CTA Button Link
                  </label>
                  <input
                    type="text"
                    value={content.finalCta.buttonLink}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        finalCta: { ...prev.finalCta, buttonLink: e.target.value },
                      }))
                    }
                    placeholder="mailto:kredence.co@gmail.com"
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 12: FOOTER & STUDIO INFO */}
        {/* ============================================================= */}
        {activeTab === "footer" && (
          <div className="space-y-8">
            <div className="border-b border-paper/10 pb-4">
              <h2 className="font-display text-3xl uppercase tracking-tight">
                12 · Footer & Studio Contact Information
              </h2>
              <p className="mt-1 font-mono text-xs text-paper/60">
                Manage global studio contact details, footer description, copyright, and menu columns.
              </p>
            </div>

            {/* Studio Contact info */}
            <div className="border border-paper/10 bg-card/60 p-6 shadow-paper space-y-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-teal">
                Studio Global Contact Details
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Studio Email Address
                  </label>
                  <input
                    type="email"
                    value={content.contact.email}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, email: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Studio Phone Number
                  </label>
                  <input
                    type="text"
                    value={content.contact.phone}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, phone: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Instagram Profile Link
                  </label>
                  <input
                    type="text"
                    value={content.contact.instagram}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, instagram: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    LinkedIn Profile Link
                  </label>
                  <input
                    type="text"
                    value={content.contact.linkedin}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, linkedin: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-teal focus:border-teal focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Footer Content */}
            <div className="border border-paper/10 bg-card/60 p-6 shadow-paper space-y-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-teal">
                Footer Brand & Copyright
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Footer Brand Name
                  </label>
                  <input
                    type="text"
                    value={content.footer.brandName}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        footer: { ...prev.footer, brandName: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-display text-lg text-paper focus:border-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                    Copyright Line
                  </label>
                  <input
                    type="text"
                    value={content.footer.copyright}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        footer: { ...prev.footer, copyright: e.target.value },
                      }))
                    }
                    className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
                  Footer Summary Bio
                </label>
                <textarea
                  rows={2}
                  value={content.footer.summary}
                  onChange={(e) =>
                    updateContent((prev) => ({
                      ...prev,
                      footer: { ...prev.footer, summary: e.target.value },
                    }))
                  }
                  className="mt-1 w-full border border-paper/20 bg-charcoal px-3 py-2 font-mono text-xs text-paper focus:border-teal focus:outline-none"
                />
              </div>

              {/* Columns */}
              <div className="border-t border-paper/10 pt-4">
                <span className="mb-3 block font-mono text-xs font-bold uppercase tracking-wider text-paper/70">
                  Footer Navigation Columns
                </span>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {content.footer.columns.map((col, idx) => (
                    <div
                      key={idx}
                      className="border border-paper/10 bg-charcoal p-3 space-y-2"
                    >
                      <input
                        type="text"
                        value={col.h}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateContent((prev) => {
                            const columns = [...prev.footer.columns];
                            const cur = columns[idx];
                            if (!cur) return prev;
                            columns[idx] = { ...cur, h: val };
                            return { ...prev, footer: { ...prev.footer, columns } };
                          });
                        }}
                        className="w-full border-b border-paper/20 bg-transparent py-1 font-mono text-xs font-bold text-teal uppercase tracking-widest focus:outline-none"
                      />
                      <textarea
                        rows={4}
                        value={col.l.join("\n")}
                        onChange={(e) => {
                          const lines = e.target.value
                            .split("\n")
                            .map((s) => s.trim())
                            .filter(Boolean);
                          updateContent((prev) => {
                            const columns = [...prev.footer.columns];
                            const cur = columns[idx];
                            if (!cur) return prev;
                            columns[idx] = { ...cur, l: lines };
                            return { ...prev, footer: { ...prev.footer, columns } };
                          });
                        }}
                        placeholder="Link items (one per line)"
                        className="w-full bg-transparent font-mono text-[11px] text-paper/70 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB: BACKUP & RESET */}
        {/* ============================================================= */}
        {activeTab === "data" && (
          <div className="space-y-8">
            <div className="border-b border-paper/10 pb-4">
              <h2 className="font-display text-3xl uppercase tracking-tight">
                Backup, Export & Reset
              </h2>
              <p className="mt-1 font-mono text-xs text-paper/60">
                Download your current site settings to JSON, restore from a file, or reset all sections back to factory defaults.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="border border-paper/15 bg-card p-6 shadow-paper">
                <Download className="mb-4 size-8 text-teal" />
                <h3 className="font-display text-xl">Export Backup (JSON)</h3>
                <p className="mt-2 font-mono text-xs leading-relaxed text-paper/60">
                  Download a complete JSON file containing all sections, copy, links, graphics, and reels.
                </p>
                <button
                  onClick={handleExportJson}
                  className="mt-6 inline-flex items-center gap-2 bg-teal px-4 py-2 font-mono text-xs font-bold uppercase text-charcoal hover:scale-105"
                >
                  <Download className="size-4" /> Download Backup
                </button>
              </div>

              <div className="border border-paper/15 bg-card p-6 shadow-paper">
                <Upload className="mb-4 size-8 text-teal" />
                <h3 className="font-display text-xl">Import Backup (JSON)</h3>
                <p className="mt-2 font-mono text-xs leading-relaxed text-paper/60">
                  Upload a previously saved JSON file to restore all content instantly.
                </p>
                <label className="mt-6 inline-flex cursor-pointer items-center gap-2 border border-teal/50 bg-teal/10 px-4 py-2 font-mono text-xs font-bold uppercase text-teal hover:bg-teal hover:text-charcoal">
                  <Upload className="size-4" />
                  <span>Upload File</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJson}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="border border-red-500/20 bg-card p-6 shadow-paper">
                <RefreshCw className="mb-4 size-8 text-red-400" />
                <h3 className="font-display text-xl text-red-400">Factory Reset</h3>
                <p className="mt-2 font-mono text-xs leading-relaxed text-paper/60">
                  Revert all sections back to the original studio defaults.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 inline-flex items-center gap-2 border border-red-500/40 bg-red-500/10 px-4 py-2 font-mono text-xs font-bold uppercase text-red-400 hover:bg-red-500 hover:text-charcoal"
                >
                  <RefreshCw className="size-4" /> Reset To Factory
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
