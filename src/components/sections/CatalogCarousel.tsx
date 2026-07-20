"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Eye } from "lucide-react";
import { CATALOG_PROJECTS, type CatalogProject } from "@/lib/catalog";
import { ProjectPreviewModal } from "@/components/sections/ProjectPreviewModal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/lib/reveal";

function CatalogCard({
  project,
  onOpen,
}: {
  project: CatalogProject;
  onOpen: (project: CatalogProject) => void;
}) {
  const screen = project.screens[0];

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group relative w-[280px] shrink-0 snap-center overflow-hidden rounded-[22px] border border-white/12 bg-[#0c0c0c]/90 text-left shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition duration-300 hover:border-neon/40 hover:shadow-[0_20px_60px_rgba(0,239,252,0.12)] sm:w-[320px]"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.cover}`} />
      <div className="relative p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80">
            {project.category}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-neon/30 bg-neon/10 px-2.5 py-1 text-[10px] font-semibold text-neon opacity-0 transition group-hover:opacity-100">
            <Eye size={12} />
            Abrir
          </span>
        </div>

        <div className="overflow-hidden rounded-[16px] border border-white/10 bg-[#080808]">
          <div className="flex items-center gap-1.5 border-b border-white/8 px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
            <span className="ml-2 text-[9px] text-white/45">{screen.label}</span>
          </div>
          <div className="space-y-2 p-3">
            <div className="grid grid-cols-3 gap-1.5">
              {screen.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[10px] border border-white/8 bg-white/[0.03] p-2"
                >
                  <p className="text-[8px] text-white/50">{stat.label}</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full w-2/3 rounded-full"
                style={{ background: screen.accent }}
              />
            </div>
            <div className="space-y-1">
              {screen.rows.slice(0, 2).map((row) => (
                <div
                  key={row}
                  className="truncate rounded-[8px] border border-white/6 bg-white/[0.02] px-2 py-1.5 text-[9px] text-white/70"
                >
                  {row}
                </div>
              ))}
            </div>
          </div>
        </div>

        <h3 className="mt-3 text-base font-semibold text-white">{project.title}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/75">
          {project.tagline}
        </p>
      </div>
    </button>
  );
}

export function CatalogCarousel() {
  const [active, setActive] = useState<CatalogProject | null>(null);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const loop = [...CATALOG_PROJECTS, ...CATALOG_PROJECTS];

  return (
    <section
      id="catalogo"
      className="section-padding relative overflow-hidden border-t border-white/5"
      aria-label="Catálogo de projetos"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Catálogo"
            title="Explore nossos sistemas em pré-visitação"
            description="Um carrossel contínuo e pausado com projetos reais da 2J Tech. Toque ou clique em qualquer card para navegar pelas telas do sistema."
          />
        </Reveal>
      </div>

      <div
        className="relative mt-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setPaused(false);
          }
        }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#050505] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#050505] to-transparent sm:w-24" />

        <div className="overflow-hidden py-2">
          <div
            className={`flex w-max gap-5 px-5 ${
              reduceMotion ? "" : "animate-marquee-left"
            }`}
            style={{
              animationPlayState: paused || !!active ? "paused" : "running",
            }}
          >
            {loop.map((project, index) => (
              <CatalogCard
                key={`${project.id}-${index}`}
                project={project}
                onOpen={setActive}
              />
            ))}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-white/55">
          Passe o mouse ou o dedo para pausar · Clique para abrir a pré-visitação
        </p>
      </div>

      <ProjectPreviewModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
