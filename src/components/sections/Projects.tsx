"use client";

import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/lib/reveal";
import { FitScrollGrid } from "@/lib/fit-scroll";

export function Projects() {
  return (
    <section id="projetos" className="section-padding overflow-x-hidden border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Projetos"
            title="Casos que mostram nossa entrega"
            description="Seleção de trabalhos que unem engenharia sólida, experiência premium e impacto de negócio."
          />
        </Reveal>

        <FitScrollGrid className="grid gap-5 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <article
              key={project.title}
              className="group glass relative h-full overflow-hidden rounded-[18px] p-6 transition-all duration-300 hover:border-neon/30 hover:glow-neon-soft"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neon/[0.07] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neon">
                {project.category}
              </p>
              <h3 className="mt-3 flex items-start justify-between gap-3 text-xl font-semibold text-white">
                {project.title}
                <ArrowUpRight
                  size={18}
                  className="mt-1 shrink-0 text-muted transition-colors group-hover:text-neon"
                />
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/95">{project.description}</p>
            </article>
          ))}
        </FitScrollGrid>
      </div>
    </section>
  );
}
