export type ProjectStatus = "Completed work" | "In progress" | "Planned";

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: string | null;
  status: ProjectStatus;
  completionYear: number | null;
  scope: string | null;
  summary: string | null;
  coverImage: ProjectImage;
  gallery: ProjectImage[];
  services: string[];
  featured: boolean;
  clientApproved: boolean;
};

export type ProjectLocation = {
  projectSlug: string;
  projectTitle: string;
  locationLabel: string;
  region: string;
  mapPosition: {
    x: number;
    y: number;
  };
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  approximate: boolean;
};

export const nyautsaProjects: Project[] = [
  {
    slug: "magalies-residence",
    title: "Magalies residence",
    location: "Magalies",
    category: null,
    status: "Completed work",
    completionYear: null,
    scope: "Residential build with driveway and garage work.",
    summary: "Residential build with driveway and garage work.",
    coverImage: {
      src: "/photos/magalise/photo1.jpeg",
      alt: "Magalies residence construction work",
    },
    gallery: [
      {
        src: "/photos/magalise/photo2.jpeg",
        alt: "Additional view of Magalies residence work",
      },
      {
        src: "/photos/magalise/photo3.jpeg",
        alt: "Project detail from Magalies residence",
      },
    ],
    services: [],
    featured: false,
    clientApproved: false,
  },
  {
    slug: "danville-residence",
    title: "Danville Residence",
    location: "Danville",
    category: null,
    status: "Completed work",
    completionYear: null,
    scope: "Residential construction and exterior finishing.",
    summary: "Residential construction and exterior finishing.",
    coverImage: {
      src: "/photos/danville/photo1.jpeg",
      alt: "Danville residential construction and exterior finishing",
    },
    gallery: [
      {
        src: "/photos/danville/photo2.jpeg",
        alt: "Additional view of Danville residential construction work",
      },
      {
        src: "/photos/danville/photo3.jpeg",
        alt: "Project detail from Danville Residence",
      },
    ],
    services: [],
    featured: true,
    clientApproved: false,
  },
  {
    slug: "mamelodi-project",
    title: "Mamelodi project",
    location: "Mamelodi",
    category: null,
    status: "Completed work",
    completionYear: null,
    scope: "Brickwork, roofing, plastering and finishing.",
    summary: "Brickwork, roofing, plastering and finishing.",
    coverImage: {
      src: "/photos/mams/photo1.jpeg",
      alt: "Mamelodi project brickwork, roofing, plastering and finishing",
    },
    gallery: [
      {
        src: "/photos/mams/photo2.jpeg",
        alt: "Additional view of Mamelodi project work",
      },
      {
        src: "/photos/mams/photo3.jpeg",
        alt: "Project detail from Mamelodi project",
      },
    ],
    services: [],
    featured: false,
    clientApproved: false,
  },
  {
    slug: "garsfontein-project",
    title: "Garsfontein project",
    location: "Garsfontein",
    category: null,
    status: "Completed work",
    completionYear: null,
    scope: "Site preparation and residential construction work.",
    summary: "Site preparation and residential construction work.",
    coverImage: {
      src: "/photos/gasfontein/photo1.jpeg",
      alt: "Garsfontein site preparation and residential construction work",
    },
    gallery: [
      {
        src: "/photos/gasfontein/photo2.jpeg",
        alt: "Additional view of Garsfontein project work",
      },
      {
        src: "/photos/gasfontein/photo3.jpeg",
        alt: "Project detail from Garsfontein project",
      },
    ],
    services: [],
    featured: false,
    clientApproved: false,
  },
];

export const nyautsaProjectLocations: ProjectLocation[] = [
  {
    projectSlug: "danville-residence",
    projectTitle: "Danville Residence",
    locationLabel: "Danville",
    region: "Gauteng",
    mapPosition: { x: 46, y: 42 },
    approximate: true,
  },
  {
    projectSlug: "mamelodi-project",
    projectTitle: "Mamelodi project",
    locationLabel: "Mamelodi",
    region: "Gauteng",
    mapPosition: { x: 68, y: 39 },
    approximate: true,
  },
  {
    projectSlug: "garsfontein-project",
    projectTitle: "Garsfontein project",
    locationLabel: "Garsfontein",
    region: "Gauteng",
    mapPosition: { x: 61, y: 51 },
    approximate: true,
  },
  {
    projectSlug: "magalies-residence",
    projectTitle: "Magalies residence",
    locationLabel: "Magalies",
    region: "Gauteng",
    mapPosition: { x: 28, y: 36 },
    approximate: true,
  },
];
