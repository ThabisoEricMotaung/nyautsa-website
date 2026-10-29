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
  coordinates: {
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
      src: "/photos/danville/2f169013-8f21-4c84-aa70-e90fba12bde2.JPG",
      alt: "Danville residential construction and exterior finishing",
    },
    gallery: [
      {
        src: "/photos/danville/2df210f5-a6a1-4293-b2ca-249c1f084d4d.JPG",
        alt: "Additional view of Danville residential construction work",
      },
      {
        src: "/photos/danville/c32ca3cf-c6d1-418f-bf40-639b61bc080b.JPG",
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
      src: "/photos/mamelodi/761d63d6-2a18-4884-aaee-2e7f37b20a57.JPG",
      alt: "Mamelodi project brickwork, roofing, plastering and finishing",
    },
    gallery: [
      {
        src: "/photos/mamelodi/c190db1a-a58d-4f94-90c3-e54a5ef4f4ba.JPG",
        alt: "Additional view of Mamelodi project work",
      },
      {
        src: "/photos/mamelodi/01d5c61a-e496-465f-9357-d116e04c8466.JPG",
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
      src: "/photos/gasfontein2/153223bc-3637-4143-a8cf-0e7a15740dd9.JPG",
      alt: "Garsfontein site preparation and residential construction work",
    },
    gallery: [
      {
        src: "/photos/gasfontein2/783918ab-1e0f-4d26-8f57-41dceefa250f.JPG",
        alt: "Additional view of Garsfontein project work",
      },
      {
        src: "/photos/gasfontein2/e47d109c-9d13-4c8a-972b-628180e0f9a1.JPG",
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
    coordinates: { latitude: -25.722, longitude: 28.1425 },
    approximate: true,
  },
  {
    projectSlug: "mamelodi-project",
    projectTitle: "Mamelodi project",
    locationLabel: "Mamelodi",
    region: "Gauteng",
    coordinates: { latitude: -25.7099, longitude: 28.3733 },
    approximate: true,
  },
  {
    projectSlug: "garsfontein-project",
    projectTitle: "Garsfontein project",
    locationLabel: "Garsfontein",
    region: "Gauteng",
    coordinates: { latitude: -25.8043, longitude: 28.2867 },
    approximate: true,
  },
  {
    projectSlug: "magalies-residence",
    projectTitle: "Magalies residence",
    locationLabel: "Magalies",
    region: "Gauteng",
    coordinates: { latitude: -25.6867, longitude: 28.1731 },
    approximate: true,
  },
];
