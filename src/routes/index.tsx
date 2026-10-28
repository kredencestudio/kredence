import { createFileRoute } from "@tanstack/react-router";
import { Nav, Hero, About, Services } from "@/components/kredence/sections-top";
import { Websites, Graphics, Videos, Logos, Brands, Industries, IndustryMarquee } from "@/components/kredence/sections-mid";
import { Process, Testimonials, FinalCTA, Footer } from "@/components/kredence/sections-end";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Kredence — Multidisciplinary Creative Studio" },
      {
        name: "description",
        content:
          "Kredence is a creative studio for branding, logo design, video editing, content, web design and marketing campaigns.",
      },
      { property: "og:title", content: "Kredence — Multidisciplinary Creative Studio" },
      {
        property: "og:description",
        content:
          "Branding, digital, content, video editing and marketing — built in-house by Kredence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Nav />
      <main>
        <Hero />
        <IndustryMarquee />
        <About />
        <Services />
        <Websites />
        <Graphics />
        <Videos />
        <Logos />
        <Brands />
        <Industries />
        <Process />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
