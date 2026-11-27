"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Expand } from "lucide-react";
import { CATALOG_PROJECTS, type CatalogProject } from "@/lib/catalog";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/lib/reveal";
import { trackSpotlight } from "@/lib/spotlight";

// The gallery modal ships in its own chunk, fetched on the first "inspect".
const ProjectPreviewModal = dynamic(
  () => import("@/components/sections/ProjectPreviewModal").then((m) => m.ProjectPreviewModal),
  { ssr: false },
);

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const SLIDE_MS = 3800;

type Slide = { src: string; label: string };

function getSlides(project: CatalogProject): Slide[] {
  return project.screens.flatMap((screen) =>
    (screen.images ?? []).map((src) => ({ src, label: screen.label })),
  );
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/* ---------- Shared bits ---------- */

function StackTags({ project }: { project: CatalogProject }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {project.stack.map((tag) => (
        <li
          key={tag}
          className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-[#cbd5e1]"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function Actions({
  project,
  onOpen,
}: {
  project: CatalogProject;
  onOpen: (project: CatalogProject) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="group/btn inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-[#67e8f9]"
      >
        Inspecionar telas
        <ArrowRight
          size={15}
          aria-hidden
          className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
        />
      </button>
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          Acessar site
          <ArrowUpRight size={14} aria-hidden />
        </a>
      ) : null}
    </div>
  );
}

/* ---------- Desktop stage: sticky browser frame cycling through screens ---------- */

function Stage({
  project,
  onOpen,
}: {
  project: CatalogProject;
  onOpen: (project: CatalogProject) => void;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const slides = useMemo(() => getSlides(project), [project]);
  const [slide, setSlide] = useState(0);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const running = !reduceMotion && !hovered && inView && slides.length > 1;

  // New project: start from its cover
  useEffect(() => setSlide(0), [project.id]);

  const current = slides[slide] ?? slides[0];

  return (
    <div
      ref={ref}
      onPointerMove={trackSpotlight}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="panel spotlight horizon-glow overflow-hidden rounded-[18px]"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-white/[0.07] bg-[#0b0f15] px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </span>
        <div className="relative h-5 min-w-0 flex-1 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={project.id}
              initial={reduceMotion ? false : { y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduceMotion ? undefined : { y: -14, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              className="absolute inset-0 truncate text-center text-xs font-medium leading-5 text-muted"
            >
              {project.domain ?? project.title}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="w-[52px] text-right text-[11px] tabular-nums text-muted">
          {slides.length ? `${pad(slide + 1)}/${pad(slides.length)}` : ""}
        </span>
      </div>

      {/* Screen */}
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Abrir telas de ${project.title}`}
        className="group/screen relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden bg-[#06080c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
      >
        <AnimatePresence initial={false}>
          {current ? (
            <motion.div
              key={current.src}
              className="absolute inset-0"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, scale: 1.06, filter: "blur(10px)" }
              }
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={reduceMotion ? undefined : { opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
            >
              <Image
                src={current.src}
                alt={`${project.title} — ${current.label}`}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className={`object-cover transition-transform duration-700 ease-out group-hover/screen:scale-[1.025] ${
                  slide === 0 ? project.thumbnailClassName ?? "object-top" : "object-top"
                }`}
              />
            </motion.div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div aria-hidden className="arch-grid arch-grid-fade absolute inset-0" />
              <span className="relative text-3xl font-semibold tracking-[-0.03em] text-foreground/90">
                {project.title}
              </span>
            </div>
          )}
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#06080c]/90 to-transparent" />
        <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-foreground opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover/screen:opacity-100">
          <Expand size={12} aria-hidden />
          Ampliar
        </span>
        {current ? (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`${project.id}-${current.label}`}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
              className="pointer-events-none absolute bottom-3.5 left-4 text-xs font-semibold text-foreground/90"
            >
              {current.label}
            </motion.span>
          </AnimatePresence>
        ) : null}
      </button>

      {/* Story-style progress: one segment per screen, click to jump */}
      {slides.length > 1 ? (
        <div className="flex gap-1.5 px-4 pt-3" role="group" aria-label="Telas do projeto">
          {slides.map((s, i) => (
            <button
              key={`${project.id}-${s.src}`}
              type="button"
              onClick={() => setSlide(i)}
              aria-label={`Ver tela ${i + 1}: ${s.label}`}
              aria-current={i === slide}
              className="group/seg relative h-4 flex-1 cursor-pointer"
            >
              <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/10 transition-colors group-hover/seg:bg-white/20">
                {i < slide ? (
                  <span className="absolute inset-0 bg-accent/60" />
                ) : i === slide ? (
                  <span
                    key={`${project.id}-${slide}`}
                    className="svc-progress absolute inset-0 origin-left bg-accent"
                    style={{
                      animationDuration: `${SLIDE_MS}ms`,
                      animationPlayState: running ? "running" : "paused",
                      transform: reduceMotion ? "scaleX(1)" : undefined,
                    }}
                    onAnimationEnd={() => setSlide((n) => (n + 1) % slides.length)}
                  />
                ) : null}
              </span>
            </button>
          ))}
        </div>
      ) : null}

      {/* Details */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={project.id}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          className="space-y-4 p-5 sm:p-6"
        >
          <p className="text-sm leading-relaxed text-[#cbd5e1]">{project.tagline}</p>
          <StackTags project={project} />
          <div className="border-t border-white/[0.07] pt-4">
            <Actions project={project} onOpen={onOpen} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------- Mobile inline preview under the active row ---------- */

function InlinePreview({
  project,
  onOpen,
}: {
  project: CatalogProject;
  onOpen: (project: CatalogProject) => void;
}) {
  const cover = getSlides(project)[0];
  const count = getSlides(project).length;
  return (
    <div className="space-y-4 px-3 pb-5 pt-1 sm:px-4">
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Abrir telas de ${project.title}`}
        className="relative block aspect-[16/10] w-full overflow-hidden rounded-[12px] border border-white/[0.08] bg-[#06080c]"
      >
        {cover ? (
          <Image
            src={cover.src}
            alt={`${project.title} — ${cover.label}`}
            fill
            sizes="100vw"
            className={`object-cover ${project.thumbnailClassName ?? "object-top"}`}
          />
        ) : null}
        <span className="absolute right-2.5 top-2.5 rounded-md border border-white/10 bg-black/55 px-2 py-0.5 text-[11px] font-semibold text-foreground backdrop-blur-md">
          {count} {count === 1 ? "tela" : "telas"}
        </span>
      </button>
      <p className="text-sm leading-relaxed text-[#cbd5e1]">{project.tagline}</p>
      <StackTags project={project} />
      <Actions project={project} onOpen={onOpen} />
    </div>
  );
}

/* ---------- Section ---------- */

export function CaseStudies() {
  const reduceMotion = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalProject, setModalProject] = useState<CatalogProject | null>(null);
  // Mount the lazy modal only once someone opens a project (keeps exit animations after).
  const [modalLoaded, setModalLoaded] = useState(false);
  useEffect(() => {
    if (modalProject) setModalLoaded(true);
  }, [modalProject]);
  const project = CATALOG_PROJECTS[activeIndex];
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

  // On small screens the tapped row expands inline; once the previous one has
  // collapsed, bring the opened row to the top so the page doesn't jump away.
  const selectRow = (index: number) => {
    setActiveIndex(index);
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    window.setTimeout(() => {
      rowRefs.current[index]?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }, 480);
  };

  return (
    <section
      id="cases"
      className="section-padding border-b border-white/[0.06]"
      aria-label="Portfólio de software e estudos de caso"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            title="Sistemas e canais digitais entregues em produção"
            description="Projetos reais desenvolvidos pela 2J Tech. Passe pela lista para ver cada entrega e clique na tela para navegar pelas capturas."
          />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-14">
          {/* Index */}
          <div>
            <div className="mb-3 flex items-baseline justify-between px-4 text-[11px] font-medium text-muted">
              <span>Projeto</span>
              <span className="tabular-nums">{pad(CATALOG_PROJECTS.length)} entregas</span>
            </div>
            <ol className="border-t border-white/[0.08]">
              {CATALOG_PROJECTS.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <motion.li
                    key={item.id}
                    ref={(el) => {
                      rowRefs.current[index] = el;
                    }}
                    className={`transition-[background-color,border-color,margin] duration-500 ease-out ${
                      isActive
                        ? "border-b border-white/[0.08] horizon-glow lg:after:hidden max-lg:my-3 max-lg:rounded-[16px] max-lg:border max-lg:border-white/[0.1] max-lg:bg-[#0b0f15]"
                        : "border-b border-white/[0.08]"
                    }`}
                    initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, delay: index * 0.05, ease: EASE_OUT_EXPO }}
                  >
                    <button
                      type="button"
                      onClick={() => selectRow(index)}
                      onMouseEnter={() => {
                        if (window.matchMedia("(min-width: 1024px)").matches) setActiveIndex(index);
                      }}
                      onFocus={() => {
                        if (window.matchMedia("(min-width: 1024px)").matches) setActiveIndex(index);
                      }}
                      aria-expanded={isActive}
                      className="group relative isolate grid w-full cursor-pointer grid-cols-[1.75rem_minmax(0,1fr)_auto] items-center gap-3 rounded-[12px] px-3 py-3.5 text-left sm:px-4 lg:my-1 lg:grid-cols-[2.25rem_minmax(0,1fr)_auto] lg:py-[1.1rem]"
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="case-active-row"
                          aria-hidden
                          className="absolute inset-0 -z-10 hidden rounded-[12px] border border-white/[0.1] bg-white/[0.04] lg:block"
                          transition={{ type: "spring", stiffness: 420, damping: 38 }}
                        />
                      ) : null}
                      <span
                        className={`text-xs font-semibold tabular-nums transition-colors duration-300 ${
                          isActive ? "text-accent" : "text-muted/70"
                        }`}
                      >
                        {pad(index + 1)}
                      </span>
                      <span className="min-w-0">
                        <span
                          translate="no"
                          className={`block truncate text-[1.05rem] font-semibold tracking-[-0.02em] transition-[color,transform] duration-300 ease-out sm:text-lg lg:text-xl ${
                            isActive
                              ? "text-foreground lg:translate-x-1"
                              : "text-[#94a3b8] group-hover:text-foreground"
                          }`}
                        >
                          {item.title}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-muted">
                          <span className="lg:hidden">{item.sector}</span>
                          <span className="hidden lg:inline">
                            {item.category} · {item.sector}
                          </span>
                        </span>
                      </span>

                      {/* Mobile: tiny cover while closed, chevron while open */}
                      <span className="relative flex h-10 w-16 items-center justify-center lg:hidden">
                        <span
                          className={`absolute inset-0 overflow-hidden rounded-[8px] border border-white/10 bg-[#06080c] transition-[opacity,transform] duration-300 ease-out ${
                            isActive ? "scale-90 opacity-0" : "scale-100 opacity-100"
                          }`}
                        >
                          {getSlides(item)[0] ? (
                            <Image
                              src={getSlides(item)[0].src}
                              alt=""
                              fill
                              sizes="64px"
                              className={`object-cover ${item.thumbnailClassName ?? "object-top"}`}
                            />
                          ) : null}
                        </span>
                        <ChevronDown
                          size={18}
                          aria-hidden
                          className={`relative text-accent transition-[opacity,transform] duration-300 ease-out ${
                            isActive ? "rotate-180 opacity-100" : "rotate-0 opacity-0"
                          }`}
                        />
                      </span>

                      <ArrowUpRight
                        size={18}
                        aria-hidden
                        className={`hidden shrink-0 transition-[opacity,transform,color] duration-300 ease-out lg:block ${
                          isActive
                            ? "translate-x-0 text-accent opacity-100"
                            : "-translate-x-1 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        }`}
                      />
                    </button>

                    {/* Mobile / tablet: preview expands inline */}
                    <AnimatePresence initial={false}>
                      {isActive ? (
                        <motion.div
                          key="inline"
                          className="overflow-hidden lg:hidden"
                          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                        >
                          <InlinePreview project={item} onOpen={setModalProject} />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          {/* Desktop stage */}
          <Reveal className="hidden lg:sticky lg:top-24 lg:block">
            <Stage project={project} onOpen={setModalProject} />
          </Reveal>
        </div>
      </div>

      {modalLoaded ? (
        <ProjectPreviewModal project={modalProject} onClose={() => setModalProject(null)} />
      ) : null}
    </section>
  );
}
