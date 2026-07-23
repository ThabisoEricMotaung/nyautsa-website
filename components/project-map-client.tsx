"use client";

import dynamic from "next/dynamic";

import type { ProjectLocation } from "@/lib/projects";

const ProjectMapCanvas = dynamic(
  () => import("@/components/project-map-canvas").then((mod) => mod.ProjectMapCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="mt-9 min-h-[360px] animate-pulse rounded-sm border border-[#ddd7cb] bg-[#ebe6dc] sm:min-h-[480px]" />
    ),
  }
);

export function ProjectMapClient({ locations }: { locations: ProjectLocation[] }) {
  return <ProjectMapCanvas locations={locations} />;
}
