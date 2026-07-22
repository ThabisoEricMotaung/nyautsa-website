"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";

type ProofPoint = {
  value: string;
  label: string;
};

const proofPoints: ProofPoint[] = [
  { value: "Gauteng", label: "Residential construction" },
  { value: "Foundation to finish", label: "Single accountable builder" },
  { value: "Portfolio-backed", label: "Recent work available to inspect" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#ddd7cb] bg-[#f7f4ee]">
      <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-[1440px] grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)]">
        <div className="flex flex-col justify-between px-5 py-14 sm:px-8 lg:px-12 lg:py-16 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-8 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em] text-[#6b6a5f]">
              <span className="h-px w-9 bg-[#9d4e31]" />
              Residential construction in Gauteng
            </div>

            <h1 className="max-w-[760px] font-serif text-[clamp(3rem,8vw,6.6rem)] leading-[0.95] tracking-normal text-[#161713]">
              Homes built with discipline, detail and care.
            </h1>

            <p className="mt-7 max-w-[560px] text-base leading-8 text-[#56564e] sm:text-lg">
              NYAUTSA SS Trading and Projects delivers residential building
              work across Gauteng, from site preparation and brickwork to
              roofing, finishes, paving and boundary walls.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#projects">
                  View recent work
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="tel:+27684461635">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call +27 68 446 1635
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.dl
            className="mt-16 grid grid-cols-1 gap-5 border-t border-[#ddd7cb] pt-6 sm:grid-cols-3 lg:mt-10"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {proofPoints.map((point) => (
              <div key={point.value}>
                <dt className="font-serif text-lg text-[#161713]">{point.value}</dt>
                <dd className="mt-1 text-xs leading-5 text-[#6b6a5f]">
                  {point.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          className="relative min-h-[520px] border-t border-[#ddd7cb] lg:min-h-full lg:border-l lg:border-t-0"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/photos/danville/photo1.jpeg"
            alt="Completed residential construction project in Danville, Gauteng"
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161713]/45 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-between gap-5 border-t border-white/20 bg-[#161713]/78 p-5 text-[#fffdfa] backdrop-blur-sm sm:flex-row sm:items-end lg:p-7">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/60">
                Featured work
              </p>
              <p className="mt-2 font-serif text-2xl">Danville residence</p>
            </div>
            <p className="max-w-[300px] text-sm leading-6 text-white/72">
              Exterior finishing, roofing, boundary walling and residential
              construction work.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
