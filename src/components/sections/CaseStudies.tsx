"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Eye } from "lucide-react";
import {
  CATALOG_PROJECTS,
  getProjectImages,
  getScreenImages,
  type CatalogProject,
} from "@/lib/catalog";
import { ProjectPreviewModal } from "@/components/sections/ProjectPreviewModal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/lib/reveal";

function CaseCard({
  project,
  onOpen,
}: {
  project: CatalogProject;
  onOpen: (project: CatalogProject) => void;
}) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const firstScreen = project.screens[0];
  const previewImage = firstScreen ? getScreenImages(firstScreen)[0] : undefined;
  const totalPhotos = getProjectImages(project).length;
  const accordionId = `case-details-${project.id}`;

  return (
    <article className="panel group flex flex-col overflow-hidden rounded-[16px] transition-colors duration-200 hover:border-white/20">
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Abrir telas de ${project.title}`}
        className="relative block w-full cursor-pointer overflow-hidden border-b border-white/[0.08] bg-[#090c11] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#0b0f15] px-4 py-2.5">
          <span className="truncate text-xs font-medium text-muted">
            {project.domain ?? project.title}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-accent/25 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent">
            <Eye size={12} />
            {totalPhotos} telas
          </span>
        </div>

        {previewImage ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#06080c]">
            <Image
              src={previewImage}
              alt={`${project.title} — ${firstScreen?.title ?? "captura real"}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover object-top transition-transform duration-300 group-hover:scale-[1.02] ${project.thumbnailClassName ?? ""}`}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0d1117]/80 to-transparent" />
          </div>
        ) : null}
      </button>

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            {project.category}
          </span>
          <span className="text-xs text-muted">{project.sector}</span>
        </div>

        <h3 className="mt-2 text-lg font-semibold text-foreground sm:text-xl">
          {project.title}
        </h3>

        {/* Minimalist Collapsible Accordion Submenu */}
        <div className="mt-4 rounded-[12px] border border-white/[0.08] bg-[#090d13]">
          <button
            type="button"
            aria-expanded={detailsOpen}
            aria-controls={accordionId}
            onClick={() => setDetailsOpen((prev) => !prev)}
            className="flex w-full cursor-pointer items-center justify-between gap-3 px-3.5 py-2.5 text-left text-xs font-semibold text-foreground/90 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 rounded-[12px]"
          >
            <span>{detailsOpen ? "Ocultar detalhes" : "Ver descrição e escopo"}</span>
            <ChevronDown
              size={15}
              className={`shrink-0 text-muted transition-transform duration-200 ${
                detailsOpen ? "rotate-180 text-accent" : ""
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {detailsOpen ? (
              <motion.div
                id={accordionId}
                initial={
                  reduceMotion ? false : { height: 0, opacity: 0 }
                }
                animate={{ height: "auto", opacity: 1 }}
                exit={
                  reduceMotion ? undefined : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="space-y-3 border-t border-white/[0.07] px-3.5 py-3.5 text-xs leading-relaxed">
                  <p className="text-[#cbd5e1]">{project.tagline}</p>

                  <div className="space-y-2 rounded-[10px] border border-white/[0.06] bg-white/[0.02] p-3">
                    <p className="text-[#cbd5e1]">
                      <span className="font-semibold text-foreground">
                        Desafio:{" "}
                      </span>
                      {project.challenge}
                    </p>
                    <p className="text-[#cbd5e1]">
                      <span className="font-semibold text-foreground">
                        Entrega:{" "}
                      </span>
                      {project.solution}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-[#cbd5e1]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3.5">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-accent transition-colors hover:text-[#67e8f9] focus-visible:outline-none focus-visible:underline sm:text-sm"
          >
            Inspecionar telas
            <ArrowUpRight size={15} />
          </button>

          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-muted underline-offset-2 transition-colors hover:text-foreground hover:underline"
            >
              Acessar site
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function CaseStudies() {
  const [active, setActive] = useState<CatalogProject | null>(null);

  return (
    <section
      id="cases"
      className="section-padding border-b border-white/[0.06]"
      aria-label="Portfólio de software e estudos de caso"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Portfólio de Software"
            title="Sistemas e canais digitais entregues em produção"
            description="Projetos reais desenvolvidos pela 2J Tech. Expanda os detalhes de cada entrega ou clique na imagem para navegar pelas telas."
          />
        </Reveal>

        <div className="grid items-start gap-6 md:grid-cols-2">
          {CATALOG_PROJECTS.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.03}>
              <CaseCard project={project} onOpen={setActive} />
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectPreviewModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
