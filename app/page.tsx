import Image from "next/image";
import { Building2, Brush, Fence, Hammer, House, MapPin, Phone, Route, Shovel } from "lucide-react";

import { HeroSection } from "@/components/hero-section";

const projects = [
  {
    name: "Magalise residence",
    desc: "Residential build with driveway and garage work.",
    loc: "Magalise",
    image: "/photos/magalise/photo1.jpeg",
  },
  {
    name: "Danville build",
    desc: "Residential construction and exterior finishing.",
    loc: "Danville, Pretoria",
    image: "/photos/danville/photo1.jpeg",
  },
  {
    name: "Mams project",
    desc: "Brickwork, roofing, plastering and finishing.",
    loc: "Mams",
    image: "/photos/mams/photo1.jpeg",
  },
  {
    name: "Gasfontein project",
    desc: "Site preparation and residential construction work.",
    loc: "Gasfontein",
    image: "/photos/gasfontein/photo1.jpeg",
  },
];

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
          <div className="font-serif text-sm uppercase leading-5 tracking-normal text-[#161713] sm:text-base">
            NYAUTSA SS Trading and Projects
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#6b6a5f]">
            Buildings and construction
          </div>
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

      <section className="px-5 py-14 sm:px-8 lg:px-12" id="projects">
        <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#6b6a5f]">Portfolio</p>
        <h2 className="mb-9 font-serif text-3xl font-normal text-[#161713]">Recent projects</h2>
        <div className="flex flex-col border-t border-[#ddd7cb]">
          {projects.map((project, index) => (
            <article
              className="grid grid-cols-[38px_76px_1fr] items-center gap-4 border-b border-[#ddd7cb] py-5 md:grid-cols-[60px_96px_1fr_auto_auto] md:gap-5"
              key={project.name}
            >
              <div className="font-serif text-sm italic text-[#b8b0a2]">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="relative h-16 overflow-hidden rounded-sm bg-[#ddd7cb] md:h-[72px]">
                <Image src={project.image} alt={project.name} fill sizes="96px" className="object-cover" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#161713] sm:text-base">{project.name}</h3>
                <p className="mt-1 text-xs leading-5 text-[#6b6a5f]">{project.desc}</p>
              </div>
              <div className="col-start-3 flex items-center gap-1 text-xs text-[#6b6a5f] md:col-auto">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {project.loc}
              </div>
              <div className="col-start-3 text-xs font-medium text-[#526b38] md:col-auto md:text-sm">
                Completed work
              </div>
            </article>
          ))}
        </div>
      </section>

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
            <a className="inline-flex items-center gap-2 rounded-sm bg-[#fffdfa] px-5 py-3 text-sm font-medium text-[#191a16]" href="tel:+27684461635">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call +27 68 446 1635
            </a>
            <a className="text-sm text-white/65" href="tel:+27684461635">Phone: +27 68 446 1635</a>
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-3 border-t border-[#ddd7cb] px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <div className="font-serif text-sm uppercase text-[#161713]">NYAUTSA SS Trading and Projects</div>
        <div className="text-sm text-[#6b6a5f]">Buildings, houses and construction. Phone: +27 68 446 1635</div>
      </footer>
    </main>
  );
}
