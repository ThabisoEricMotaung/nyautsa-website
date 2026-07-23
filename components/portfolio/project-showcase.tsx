"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/projects";

type ProjectShowcaseProps = {
  projects: Project[];
};

const itemMotion = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const shouldReduceMotion = useReducedMotion();
  const featuredProject = projects.find((project) => project.featured) ?? projects[0];
  const remainingProjects = projects.filter((project) => project.slug !== featuredProject.slug);

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.65, ease: [0.22, 1, 0.36, 1] };

  return (
    <section className="border-b border-[#ddd7cb] px-5 py-16 sm:px-8 lg:px-12" id="projects">
      <div className="mx-auto max-w-[1440px]">
        <SectionIntro />
        <div className="mt-10">
          <FeaturedProject project={featuredProject} transition={transition} />
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-14">
          {remainingProjects.map((project, index) => (
            <ProjectCard
              index={index + 2}
              key={project.slug}
              project={project}
              transition={{ ...transition, delay: shouldReduceMotion ? 0 : index * 0.06 }}
            />
          ))}
        </div>
        <ProjectCTA />
      </div>
    </section>
  );
}

function SectionIntro() {
  return (
    <div className="grid gap-6 border-t border-[#ddd7cb] pt-7 lg:grid-cols-[minmax(0,0.72fr)_minmax(360px,0.28fr)]">
      <div>
        <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#6b6a5f]">
          Portfolio
        </p>
        <h2 className="max-w-[760px] font-serif text-3xl font-normal leading-tight text-[#161713] sm:text-4xl lg:text-5xl">
          Recent work, shown as proof of workmanship.
        </h2>
      </div>
      <p className="max-w-[460px] text-sm leading-7 text-[#65645b] lg:pt-8">
        A closer look at completed residential construction work, with real
        site photography and concise project details already held in the
        Nyautsa project record.
      </p>
    </div>
  );
}

function FeaturedProject({
  project,
  transition,
}: {
  project: Project;
  transition: Record<string, unknown>;
}) {
  return (
    <motion.article
      id={project.slug}
      className="grid overflow-hidden border-y border-[#ddd7cb] lg:grid-cols-[minmax(0,1.15fr)_minmax(380px,0.85fr)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={itemMotion}
      transition={transition}
    >
      <div className="relative min-h-[420px] bg-[#ddd7cb] sm:min-h-[560px] lg:min-h-[680px]">
        <Image
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-between border-t border-[#ddd7cb] bg-[#f7f4ee] p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
        <div>
          <div className="flex items-center justify-between gap-5">
            <p className="font-serif text-sm italic text-[#b8b0a2]">01</p>
            <ProjectStatus status={project.status} />
          </div>
          <h3 className="mt-8 max-w-[520px] font-serif text-4xl font-normal leading-tight text-[#161713] sm:text-5xl">
            {project.title}
          </h3>
          <ProjectMetadata project={project} className="mt-6" />
          {project.summary ? (
            <p className="mt-8 max-w-[520px] text-base leading-8 text-[#56564e]">
              {project.summary}
            </p>
          ) : null}
        </div>

        <div className="mt-10">
          <ProjectGallery images={project.gallery} title={project.title} />
        </div>
      </div>
    </motion.article>
  );
}

function ProjectCard({
  project,
  index,
  transition,
}: {
  project: Project;
  index: number;
  transition: Record<string, unknown>;
}) {
  return (
    <motion.article
      id={project.slug}
      className="group grid border-t border-[#ddd7cb] pt-5 md:grid-rows-[auto_1fr]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={itemMotion}
      transition={transition}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#ddd7cb]">
        <Image
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          fill
          sizes="(min-width: 768px) 31vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        />
      </div>
      <div className="flex flex-col justify-between pt-5">
        <div>
          <div className="flex items-center justify-between gap-4">
            <p className="font-serif text-sm italic text-[#b8b0a2]">
              {String(index).padStart(2, "0")}
            </p>
            <ProjectStatus status={project.status} />
          </div>
          <h3 className="mt-4 font-serif text-2xl font-normal leading-tight text-[#161713]">
            {project.title}
          </h3>
          <ProjectMetadata project={project} className="mt-4" />
          {project.scope ? (
            <p className="mt-5 text-sm leading-7 text-[#65645b]">{project.scope}</p>
          ) : null}
        </div>
        <ProjectGallery images={project.gallery.slice(0, 2)} title={project.title} compact />
      </div>
    </motion.article>
  );
}

function ProjectMetadata({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  type MetadataItem = { label: string; value: string; icon?: ReactNode };

  const metadataItems: Array<MetadataItem | null> = [
    {
      label: "Location",
      value: project.location,
      icon: <MapPin className="h-3.5 w-3.5" aria-hidden="true" />,
    },
    project.category ? { label: "Category", value: project.category } : null,
    project.completionYear
      ? { label: "Completed", value: String(project.completionYear) }
      : null,
  ];

  const items = metadataItems.filter((item): item is MetadataItem => Boolean(item));

  return (
    <dl className={`flex flex-wrap gap-x-6 gap-y-3 text-xs text-[#6b6a5f] ${className}`}>
      {items.map((item) => (
        <div className="flex items-center gap-2" key={item.label}>
          {item.icon}
          <dt className="sr-only">{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProjectGallery({
  images,
  title,
  compact = false,
}: {
  images: Project["gallery"];
  title: string;
  compact?: boolean;
}) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className={compact ? "mt-6 grid grid-cols-2 gap-3" : "grid grid-cols-2 gap-3"}>
      {images.map((image) => (
        <div
          className={compact ? "relative aspect-[5/4] overflow-hidden rounded-sm bg-[#ddd7cb]" : "relative aspect-[4/3] overflow-hidden rounded-sm bg-[#ddd7cb]"}
          key={image.src}
        >
          <Image
            src={image.src}
            alt={image.alt || `${title} supporting project photograph`}
            fill
            sizes={compact ? "(min-width: 768px) 15vw, 45vw" : "(min-width: 1024px) 18vw, 45vw"}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

function ProjectStatus({ status }: { status: Project["status"] }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#526b38]">
      {status}
    </p>
  );
}

function ProjectCTA() {
  return (
    <div className="mt-12 border-t border-[#ddd7cb] pt-7">
      <p className="max-w-[580px] text-sm leading-7 text-[#65645b]">
        For a similar project, share your site, scope and preferred timing from
        the final enquiry section.
      </p>
      <Button asChild className="mt-5" variant="outline">
        <a href="#contact">
          Start quotation enquiry
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </Button>
    </div>
  );
}
