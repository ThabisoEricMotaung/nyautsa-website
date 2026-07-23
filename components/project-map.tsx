import type { ProjectLocation } from "@/lib/projects";

type ProjectMapProps = {
  locations: ProjectLocation[];
};

export function ProjectMap({ locations }: ProjectMapProps) {
  return (
    <section className="border-b border-[#ddd7cb] px-5 py-16 sm:px-8 lg:px-12" id="project-map">
      <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[minmax(0,0.65fr)_minmax(320px,0.35fr)] lg:items-start">
        <div>
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

          <div
            aria-label="Approximate project locations across Gauteng"
            className="relative mt-9 min-h-[360px] overflow-hidden rounded-sm border border-[#ddd7cb] bg-[#ebe6dc] sm:min-h-[480px]"
          >
            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path
                d="M18 30 C24 15 43 11 58 18 C75 25 86 42 80 59 C74 77 56 85 39 78 C22 71 11 50 18 30Z"
                fill="#d9d2c4"
              />
              <path
                d="M22 34 C32 28 45 29 55 36 C65 43 73 52 79 62"
                fill="none"
                stroke="#bdb4a5"
                strokeLinecap="round"
                strokeWidth="0.6"
              />
              <path
                d="M31 73 C38 61 48 54 63 49"
                fill="none"
                stroke="#bdb4a5"
                strokeLinecap="round"
                strokeWidth="0.6"
              />
              <path
                d="M26 48 C39 46 49 42 63 32"
                fill="none"
                stroke="#c9c0b1"
                strokeDasharray="2 2"
                strokeLinecap="round"
                strokeWidth="0.45"
              />
            </svg>

            {locations.map((location) => (
              <ProjectLocationMarker key={location.projectSlug} location={location} />
            ))}
          </div>
        </div>

        <ProjectLocationList locations={locations} />
      </div>
    </section>
  );
}

function ProjectLocationMarker({ location }: { location: ProjectLocation }) {
  return (
    <a
      aria-label={`${location.projectTitle}, ${location.locationLabel}. Approximate location.`}
      className="absolute z-10 flex min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#191a16] bg-[#f7f4ee] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#191a16] shadow-sm transition-colors hover:bg-[#191a16] hover:text-[#fffdfa] focus-visible:bg-[#191a16] focus-visible:text-[#fffdfa]"
      href={`#${location.projectSlug}`}
      style={{
        left: `${location.mapPosition.x}%`,
        top: `${location.mapPosition.y}%`,
      }}
    >
      {location.locationLabel.slice(0, 3)}
    </a>
  );
}

function ProjectLocationList({ locations }: { locations: ProjectLocation[] }) {
  return (
    <div className="border-t border-[#ddd7cb] pt-6 lg:mt-[104px]">
      <h3 className="font-serif text-xl font-normal text-[#161713]">
        Approximate project areas
      </h3>
      <ul className="mt-6 divide-y divide-[#ddd7cb]">
        {locations.map((location) => (
          <li key={location.projectSlug}>
            <a
              className="block py-4 text-[#161713] transition-colors hover:text-[#526b38] focus-visible:text-[#526b38]"
              href={`#${location.projectSlug}`}
            >
              <span className="block text-sm font-medium">{location.locationLabel}</span>
              <span className="mt-1 block text-xs leading-5 text-[#65645b]">
                {location.projectTitle} / {location.region} / approximate area
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
