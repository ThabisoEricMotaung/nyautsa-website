"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const projects = [
  {
    location: "Garsfontein",
    label: "Residential exterior",
    src: "/photos/gasfontein2/153223bc-3637-4143-a8cf-0e7a15740dd9.JPG",
    alt: "White double-storey residence with red tiled roofing in Garsfontein",
  },
  {
    location: "West Park",
    label: "Residential exterior",
    src: "/photos/west-park/a9f6fd80-551a-4c16-b5fb-ce7111fed7e0.JPG",
    alt: "White residence with red tiled roofing and a lawn in West Park",
  },
  {
    location: "Danville",
    label: "Residential exterior",
    src: "/photos/danville/2f169013-8f21-4c84-aa70-e90fba12bde2.JPG",
    alt: "Front view of a residence with columns and tiled roofing in Danville",
  },
  {
    location: "Mamelodi",
    label: "Face-brick construction",
    src: "/photos/mamelodi/761d63d6-2a18-4884-aaee-2e7f37b20a57.JPG",
    alt: "Face-brick residence with decorative roofline detailing in Mamelodi",
  },
  {
    location: "Pebble Rocks",
    label: "Construction progress",
    src: "/photos/pebble-rocks/e96e6b66-37a3-4d5c-83e2-e7ba9ef5a6b8.JPG",
    alt: "Double-storey brick structure under construction in Pebble Rocks",
  },
];

export function HeroProjectSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setReady(true);
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const rotating =
    ready && !reducedMotion && !paused && !hovered && !focused && visible;

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % projects.length),
      7000
    );
    return () => window.clearInterval(timer);
  }, [rotating]);

  function move(direction: number) {
    setPaused(true);
    setActive((current) =>
      (current + direction + projects.length) % projects.length
    );
  }

  const project = projects[active];
  const control =
    "inline-flex h-10 w-10 items-center justify-center border border-white/35 text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#191a16]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured construction projects"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocused(false);
        }
      }}
    >
      {projects.map((item, index) => (
        <div
          key={item.src}
          aria-hidden={index !== active}
          className="absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none"
          style={{ opacity: index === active ? 1 : 0 }}
        >
          <Image
            src={item.src}
            alt={index === active ? item.alt : ""}
            fill
            priority={index === 0}
            sizes="(min-width: 1440px) 792px, (min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <div className="absolute inset-x-0 bottom-0 border-t border-white/20 bg-[#161713]/85 p-5 text-[#fffdfa] backdrop-blur-sm lg:p-7">
        <div aria-live={rotating ? "off" : "polite"} aria-atomic="true">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/70">
            Selected projects · {String(active + 1).padStart(2, "0")} / 05
          </p>
          <p className="mt-2 font-serif text-3xl">{project.location}</p>
          <p className="mt-1 text-sm text-white/80">{project.label}</p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex gap-2" aria-hidden="true">
            {projects.map((item, index) => (
              <span
                key={item.src}
                className="h-px w-6"
                style={{
                  backgroundColor:
                    index === active ? "#fffdfa" : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className={control}
              aria-label="Previous project"
              onClick={() => move(-1)}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            {!reducedMotion && (
              <button
                type="button"
                className={control}
                aria-label={paused ? "Start automatic slideshow" : "Pause automatic slideshow"}
                onClick={() => setPaused((current) => !current)}
              >
                {paused ? (
                  <Play className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Pause className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            )}
            <button
              type="button"
              className={control}
              aria-label="Next project"
              onClick={() => move(1)}
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}