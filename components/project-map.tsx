import { ProjectMapClient } from "@/components/project-map-client";
import type { ProjectLocation } from "@/lib/projects";

type ProjectMapProps = {
  locations: ProjectLocation[];
};

export function ProjectMap({ locations }: ProjectMapProps) {
  return (
    <section className="border-b border-[#ddd7cb] px-5 py-16 sm:px-8 lg:px-12" id="project-map">
      <div className="mx-auto max-w-[1440px]">
        <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#6b6a5f]">
          Gauteng footprint
        </p>
        <h2 className="font-serif text-3xl font-normal leading-tight text-[#161713] sm:text-4xl">
          Projects across Gauteng
        </h2>
        <p className="mt-5 max-w-[640px] text-sm leading-7 text-[#65645b]">
          A suburb-level view of recent work. Markers are approximate and do
          not identify residential addresses.
        </p>

        <ProjectMapClient locations={locations} />
      </div>
    </section>
  );
}
