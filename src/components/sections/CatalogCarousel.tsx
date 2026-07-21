"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { Eye } from "lucide-react";
import {
  CATALOG_PROJECTS,
  getScreenImages,
  type CatalogProject,
} from "@/lib/catalog";
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
  const photos = screen ? getScreenImages(screen) : [];
  const previewImage = photos[0];
  const totalPhotos = project.screens.reduce(
    (sum, item) => sum + getScreenImages(item).length,
    0,
  );

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      aria-label={`Abrir projeto ${project.title}`}
      className="group relative w-[280px] shrink-0 snap-center overflow-hidden rounded-[22px] border border-white/12 bg-[#0c0c0c]/90 text-left shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition duration-300 hover:border-neon/40 hover:shadow-[0_20px_60px_rgba(0,239,252,0.12)] sm:w-[320px]"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.cover}`} />
      <div className="relative p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90">
            {project.category}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-neon/30 bg-neon/10 px-2.5 py-1 text-[10px] font-semibold text-neon">
            <Eye size={12} />
            Abrir
            {totalPhotos > 0 ? (
              <span className="text-neon/80">· {totalPhotos}</span>
            ) : null}
          </span>
        </div>

        <div className="overflow-hidden rounded-[16px] border border-white/10 bg-[#080808]">
          <div className="flex items-center gap-1.5 border-b border-white/8 px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
            <span className="ml-2 truncate text-[9px] text-white/45">
              {project.domain ?? screen?.label ?? project.title}
            </span>
          </div>
          {previewImage ? (
            <div className="relative aspect-[16/10] overflow-hidden bg-[#050505]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImage}
                alt={`${project.title} — ${screen?.label ?? "preview"}`}
                className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-70" />
            </div>
          ) : (
            <div className="space-y-2 p-3">
              <div className="grid grid-cols-3 gap-1.5">
                {(screen?.stats ?? []).map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[10px] border border-white/8 bg-white/[0.03] p-2"
                  >
                    <p className="text-[8px] text-white/50">{stat.label}</p>
                    <p className="mt-0.5 text-[11px] font-semibold text-white">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full w-2/3 rounded-full"
                  style={{ background: screen?.accent ?? "#00EFFC" }}
                />
              </div>
              <div className="space-y-1">
                {(screen?.rows ?? []).slice(0, 2).map((row) => (
                  <div
                    key={row}
                    className="truncate rounded-[8px] border border-white/6 bg-white/[0.02] px-2 py-1.5 text-[9px] text-white/85"
                  >
                    {row}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <h3 className="mt-3 text-base font-semibold text-white">{project.title}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/90">
          {project.tagline}
        </p>
      </div>
    </button>
  );
}

const AUTO_SPEED = 0.45; // px per frame ~27px/s at 60fps
const RESUME_DELAY_MS = 900;

export function CatalogCarousel() {
  const [active, setActive] = useState<CatalogProject | null>(null);
  const reduceMotion = useReducedMotion();

  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const rafRef = useRef(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const holdingRef = useRef(false);
  const hoveringRef = useRef(false);
  const draggingRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const movedRef = useRef(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  const loop = [...CATALOG_PROJECTS, ...CATALOG_PROJECTS];

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    let x = offsetRef.current;
    const half = halfWidthRef.current;
    if (half > 0) {
      while (x <= -half) x += half;
      while (x > 0) x -= half;
      offsetRef.current = x;
    }

    track.style.transform = `translate3d(${x}px, 0, 0)`;
  }, []);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    halfWidthRef.current = track.scrollWidth / 2;
  }, []);

  const nudge = useCallback(
    (deltaPx: number) => {
      measure();
      offsetRef.current += deltaPx;
      applyTransform();
    },
    [applyTransform, measure],
  );

  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      holdingRef.current = false;
      draggingRef.current = false;
    }, RESUME_DELAY_MS);
  }, []);

  // Auto-scroll loop
  useEffect(() => {
    if (reduceMotion) return;

    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    const tick = () => {
      if (
        !holdingRef.current &&
        !hoveringRef.current &&
        !draggingRef.current &&
        !active
      ) {
        offsetRef.current -= AUTO_SPEED;
        applyTransform();
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [active, applyTransform, measure, reduceMotion]);

  // Trackpad two-finger sideways (and shift+wheel) moves the catalog
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      const horizontal = absX > absY || e.shiftKey;

      if (!horizontal) return;

      e.preventDefault();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

      holdingRef.current = true;
      const delta = e.shiftKey && absX < absY ? e.deltaY : e.deltaX;
      nudge(-delta);
      scheduleResume();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [nudge, scheduleResume]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

    holdingRef.current = true;
    draggingRef.current = false;
    movedRef.current = false;
    pointerIdRef.current = e.pointerId;
    startXRef.current = e.clientX;
    startOffsetRef.current = offsetRef.current;
    measure();
    // Do NOT capture yet — capture blocks the card click.
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== e.pointerId) return;

    const dx = e.clientX - startXRef.current;
    if (!draggingRef.current && Math.abs(dx) > 12) {
      draggingRef.current = true;
      movedRef.current = true;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }

    if (draggingRef.current) {
      offsetRef.current = startOffsetRef.current + dx;
      applyTransform();
    }
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== e.pointerId) return;

    const wasDragging = movedRef.current;

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // already released
    }

    pointerIdRef.current = null;
    draggingRef.current = false;
    scheduleResume();

    // Keep movedRef true through the synthetic click that follows a drag,
    // then clear on the next tick so a real click can open again.
    if (wasDragging) {
      window.setTimeout(() => {
        movedRef.current = false;
      }, 0);
    }
  };

  const openProject = (project: CatalogProject) => {
    if (movedRef.current) return;
    setActive(project);
  };

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
            description="Passe o mouse para pausar, arraste ou use dois dedos no trackpad para navegar pelos projetos."
          />
        </Reveal>
      </div>

      <div className="relative mt-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#050505] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#050505] to-transparent sm:w-24" />

        <div
          ref={viewportRef}
          className="cursor-grab overflow-hidden py-2 active:cursor-grabbing"
          onMouseEnter={() => {
            hoveringRef.current = true;
          }}
          onMouseLeave={() => {
            hoveringRef.current = false;
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{ touchAction: "pan-y" }}
        >
          <div
            ref={trackRef}
            className="flex w-max gap-5 px-5 will-change-transform"
          >
            {loop.map((project, index) => (
              <CatalogCard
                key={`${project.id}-${index}`}
                project={project}
                onOpen={openProject}
              />
            ))}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-white/80">
          Mouse pausa · Arraste ou trackpad (dois dedos para o lado) · Clique abre
        </p>
      </div>

      <ProjectPreviewModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
