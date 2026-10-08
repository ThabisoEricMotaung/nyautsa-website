import Image from "next/image";
import { Building2, Brush, Fence, Hammer, House, Phone, Route, Shovel } from "lucide-react";

import { HeroSection } from "@/components/hero-section";
import { ProjectShowcase } from "@/components/portfolio/project-showcase";
import { ProjectMap } from "@/components/project-map";
import { nyautsaProjectLocations, nyautsaProjects } from "@/lib/projects";

const services = [
  { icon: Building2, title: "New home construction", desc: "Full residential builds from foundation to roof." },
  { icon: Shovel, title: "Foundations and excavation", desc: "Ground preparation, excavation and foundation work for new structures." },
  { icon: Hammer, title: "Brickwork and walling", desc: "Bricklaying, structural walling and masonry work." },
  { icon: Brush, title: "Plastering and finishes", desc: "Interior and exterior plastering, finishing and surface preparation." },
  { icon: House, title: "Roofing", desc: "Roof construction and related residential roofing work." },
  { icon: Fence, title: "Boundary walls and palisade fencing", desc: "Secure boundary walls, palisade fencing and perimeter construction." },
  { icon: Route, title: "Paving", desc: "Driveways, walkways and outdoor paved surfaces." },
];

export default function Home() {
  return (
    <main>
      <nav className="flex items-center justify-between gap-6 border-b border-[#ddd7cb] bg-[#f7f4ee] px-5 py-5 sm:px-8 lg:px-12">
        <a href="#" aria-label="NYAUTSA SS Trading and Projects home">
          <Image
            src="/logo_final.png"
            alt="NYAUTSA SS Trading and Projects"
            width={1800}
            height={520}
            priority
            sizes="(min-width: 640px) 220px, 160px"
            className="h-auto w-[160px] sm:w-[220px]"
          />
        </a>
        <div className="hidden items-center gap-8 text-sm text-[#65645b] md:flex">
          <a href="#projects">Projects</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>
        <a
          className="hidden items-center gap-2 rounded-sm bg-[#191a16] px-4 py-2 text-sm font-medium text-[#fffdfa] sm:flex"
          href="tel:+27684461635"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call us
        </a>
      </nav>

      <HeroSection />

      <ProjectShowcase projects={nyautsaProjects} />

      <ProjectMap locations={nyautsaProjectLocations} />

      <section className="border-t border-[#ddd7cb] px-5 py-14 sm:px-8 lg:px-12" id="services">
        <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#6b6a5f]">Services</p>
        <h2 className="mb-9 font-serif text-3xl font-normal text-[#161713]">What we build</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article className="rounded-md border border-[#ddd7cb] bg-transparent p-6" key={service.title}>
                <Icon className="mb-3 h-7 w-7 text-[#526b38]" aria-hidden="true" />
                <h3 className="font-serif text-base text-[#161713]">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#65645b]">{service.desc}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-[#191a16] px-5 py-14 text-[#fffdfa] sm:px-8 lg:px-12" id="contact">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-[460px] font-serif text-3xl leading-tight">Have a project in mind? Let's start building.</h2>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <a className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-[#fffdfa] px-5 py-3 text-sm font-medium text-[#191a16] transition-colors hover:bg-[#eee9df] focus-visible:bg-[#eee9df]" href="tel:+27684461635">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call +27 68 446 1635
            </a>
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-3 border-t border-[#ddd7cb] px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <div className="font-serif text-sm uppercase text-[#161713]">NYAUTSA SS Trading and Projects</div>
        <div className="text-sm text-[#6b6a5f]">Buildings, houses and construction. Phone: +27 68 446 1635</div>
              <a href="https://aiformstudio.co.za/" target="_blank" rel="noopener noreferrer" className="text-xs text-[#6b6a5f] underline underline-offset-4 hover:text-[#161713]">
          Built by AiForm Studio
        </a>
      </footer>
    </main>
  );
}
