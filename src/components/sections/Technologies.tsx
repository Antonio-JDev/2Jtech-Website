"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { TECHNOLOGIES, type Technology } from "@/lib/content";
import { TechIcon } from "@/lib/tech-icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/lib/reveal";

function TechBadge({ id, name }: Technology) {
  return (
    <div className="group flex shrink-0 items-center gap-3 rounded-[16px] border border-white/12 bg-[#0c0c0c]/90 px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.28)] transition duration-300 hover:border-white/22 hover:bg-[#101010]">
      <span className="flex h-9 w-9 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.04] text-white/90 transition duration-300 group-hover:border-neon/35 group-hover:text-neon">
        <TechIcon id={id} className="h-[18px] w-[18px]" />
      </span>
      <span className="pr-1 text-sm font-medium tracking-wide text-white/90">
        {name}
      </span>
    </div>
  );
}

function TechMarqueeRow({
  items,
  direction,
  paused,
  duration,
}: {
  items: readonly Technology[];
  direction: "left" | "right";
  paused: boolean;
  duration: number;
}) {
  const reduceMotion = useReducedMotion();
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-3 px-5 ${
          reduceMotion
            ? ""
            : direction === "left"
              ? "animate-marquee-left"
              : "animate-marquee-right"
        }`}
        style={{
          animationDuration: `${duration}s`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {loop.map((tech, index) => (
          <TechBadge key={`${tech.id}-${index}`} {...tech} />
        ))}
      </div>
    </div>
  );
}

export function Technologies() {
  const [paused, setPaused] = useState(false);
  const mid = Math.ceil(TECHNOLOGIES.length / 2);
  const rowA = TECHNOLOGIES.slice(0, mid);
  const rowB = TECHNOLOGIES.slice(mid);

  return (
    <section
      id="tecnologias"
      className="section-padding relative overflow-x-clip border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Tecnologias"
            title="Stack moderna para produtos que escalam"
            description="Ferramentas maduras que usamos no dia a dia — com movimento contínuo, como um pipeline real em operação."
          />
        </Reveal>
      </div>

      <div
        className="relative mt-2 space-y-3"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#050505] to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#050505] to-transparent sm:w-20" />

        <TechMarqueeRow
          items={rowA}
          direction="left"
          paused={paused}
          duration={42}
        />
        <TechMarqueeRow
          items={rowB}
          direction="right"
          paused={paused}
          duration={48}
        />
      </div>
    </section>
  );
}
