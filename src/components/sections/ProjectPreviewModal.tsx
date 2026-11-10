"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Expand,
  X,
} from "lucide-react";
import {
  getScreenImages,
  type CatalogProject,
} from "@/lib/catalog";
import { Button } from "@/components/ui/Button";

type ProjectPreviewModalProps = {
  project: CatalogProject | null;
  onClose: () => void;
};

export function ProjectPreviewModal({
  project,
  onClose,
}: ProjectPreviewModalProps) {
  const [screenIndex, setScreenIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    setScreenIndex(0);
    setPhotoIndex(0);
    setLightbox(null);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [project]);

  const screens = project?.screens ?? [];
  const screen = screens[screenIndex] ?? screens[0];
  const photos = screen ? getScreenImages(screen) : [];
  const activePhoto =
    photos[Math.min(photoIndex, Math.max(photos.length - 1, 0))] ?? null;
  const hasMultipleScreens = screens.length > 1;
  const hasMultiplePhotos = photos.length > 1;

  useEffect(() => {
    setPhotoIndex(0);
  }, [screenIndex]);

  const goPrev = useCallback(() => {
    if (hasMultiplePhotos) {
      setPhotoIndex((i) => (i === 0 ? photos.length - 1 : i - 1));
      return;
    }
    setScreenIndex((i) => (i === 0 ? screens.length - 1 : i - 1));
  }, [hasMultiplePhotos, photos.length, screens.length]);

  const goNext = useCallback(() => {
    if (hasMultiplePhotos) {
      setPhotoIndex((i) => (i === photos.length - 1 ? 0 : i + 1));
      return;
    }
    setScreenIndex((i) => (i === screens.length - 1 ? 0 : i + 1));
  }, [hasMultiplePhotos, photos.length, screens.length]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox) {
          setLightbox(null);
          return;
        }
        onClose();
      }
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose, goPrev, goNext, lightbox]);

  const requestQuote = () => {
    if (!project) return;
    const detail = { id: project.id, title: project.title };
    onClose();
    window.setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("2jtech:quote-project", { detail }),
      );
      const url = new URL(window.location.href);
      url.searchParams.set("projeto", project.id);
      url.searchParams.set("titulo", project.title);
      url.hash = "contato";
      window.history.replaceState({}, "", url.toString());
      document
        .getElementById("contato")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key={project.id}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            aria-label="Fechar estudo de caso"
            className="absolute inset-0 cursor-pointer bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="preview-title"
            className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[18px] border border-white/15 bg-[#0b0e14] shadow-[0_30px_80px_rgba(0,0,0,0.65)]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22 }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Estudo de Caso · {project.category}
                </p>
                <h3
                  id="preview-title"
                  className="mt-1 text-xl font-semibold text-foreground sm:text-2xl"
                >
                  {project.title}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-[#cbd5e1]">
                  {project.tagline}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-white/12 text-[#cbd5e1] transition-colors hover:border-white/30 hover:text-foreground"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            <div
              className={`grid min-h-0 flex-1 ${
                hasMultipleScreens ? "lg:grid-cols-[210px_1fr]" : ""
              }`}
            >
              {hasMultipleScreens ? (
                <nav
                  className="hidden flex-col gap-1 border-r border-white/10 bg-[#080b10] p-3 lg:flex"
                  aria-label="Módulos do projeto"
                >
                  {screens.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setScreenIndex(index)}
                      className={`cursor-pointer rounded-[10px] px-3 py-2.5 text-left text-sm transition-colors ${
                        index === screenIndex
                          ? "border border-accent/35 bg-accent/10 font-medium text-accent"
                          : "border border-transparent text-[#cbd5e1] hover:bg-white/[0.04] hover:text-foreground"
                      }`}
                    >
                      {item.label}
                      {getScreenImages(item).length > 0 ? (
                        <span className="mt-0.5 block text-[11px] text-muted">
                          {getScreenImages(item).length} tela
                          {getScreenImages(item).length > 1 ? "s" : ""}
                        </span>
                      ) : null}
                    </button>
                  ))}
                </nav>
              ) : null}

              <div className="flex min-h-0 flex-col">
                {hasMultipleScreens ? (
                  <div className="flex gap-2 overflow-x-auto border-b border-white/10 px-4 py-2.5 lg:hidden">
                    {screens.map((item, index) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setScreenIndex(index)}
                        className={`shrink-0 cursor-pointer rounded-md border px-3 py-1.5 text-xs font-medium ${
                          index === screenIndex
                            ? "border-accent/40 bg-accent/10 text-accent"
                            : "border-white/10 text-[#cbd5e1]"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                ) : null}

                <div className="overflow-y-auto p-4 sm:p-6">
                  <div className="rounded-[14px] border border-white/10 bg-[#07090d] p-4 sm:p-5">
                    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground">
                          {screen?.title ?? project.title}
                        </h4>
                        <p className="mt-1 text-sm text-[#cbd5e1]">
                          {screen?.description ?? project.tagline}
                        </p>
                      </div>
                      <span className="rounded-md border border-white/12 bg-white/[0.03] px-3 py-1 text-xs font-medium text-[#cbd5e1]">
                        {project.domain ?? project.sector}
                      </span>
                    </div>

                    {photos.length > 0 && activePhoto ? (
                      <div className="mb-5">
                        <button
                          type="button"
                          onClick={() => setLightbox(activePhoto)}
                          className="group relative block w-full cursor-pointer overflow-hidden rounded-[12px] border border-white/10 bg-black text-left"
                          aria-label="Ampliar captura de tela"
                        >
                          <div className="relative h-[300px] w-full bg-[#05070a] sm:h-[380px]">
                            <Image
                              src={activePhoto}
                              alt={`${project.title} — ${screen?.title ?? "preview"}`}
                              fill
                              sizes="(max-width: 1024px) 95vw, 760px"
                              className="object-contain object-top"
                            />
                          </div>
                          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md border border-white/20 bg-black/75 px-2.5 py-1 text-[11px] font-medium text-white opacity-90 transition-opacity group-hover:opacity-100">
                            <Expand size={12} />
                            Ampliar
                          </span>
                        </button>

                        {hasMultiplePhotos ? (
                          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                            {photos.map((src, index) => (
                              <button
                                key={src}
                                type="button"
                                onClick={() => setPhotoIndex(index)}
                                className={`relative h-14 w-24 shrink-0 cursor-pointer overflow-hidden rounded-[8px] border ${
                                  index === photoIndex
                                    ? "border-accent"
                                    : "border-white/10 opacity-70 hover:opacity-100"
                                }`}
                                aria-label={`Tela ${index + 1}`}
                              >
                                <Image
                                  src={src}
                                  alt=""
                                  fill
                                  sizes="96px"
                                  className="object-cover object-top"
                                />
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {screen?.stats?.length ? (
                      <div className="grid gap-3 sm:grid-cols-3">
                        {screen.stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="rounded-[12px] border border-white/[0.08] bg-white/[0.02] p-3.5"
                          >
                            <p className="text-[11px] uppercase tracking-wider text-muted">
                              {stat.label}
                            </p>
                            <p className="mt-1 text-base font-semibold text-foreground">
                              {stat.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {screen?.rows?.length ? (
                      <ul className="mt-4 space-y-2">
                        {screen.rows.map((row) => (
                          <li
                            key={row}
                            className="flex items-center justify-between gap-3 rounded-[10px] border border-white/[0.07] bg-white/[0.02] px-3.5 py-2.5 text-sm text-[#cbd5e1]"
                          >
                            <span>{row}</span>
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-6">
                  <div className="flex items-center gap-2">
                    {hasMultipleScreens
                      ? screens.map((item, index) => (
                          <button
                            key={item.id}
                            type="button"
                            aria-label={item.label}
                            onClick={() => setScreenIndex(index)}
                            className={`h-2.5 w-2.5 cursor-pointer rounded-full transition-colors ${
                              index === screenIndex ? "bg-accent" : "bg-white/25"
                            }`}
                          />
                        ))
                      : null}
                  </div>

                  <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
                    {(hasMultipleScreens || hasMultiplePhotos) && (
                      <>
                        <button
                          type="button"
                          onClick={goPrev}
                          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] border border-white/12 text-foreground transition-colors hover:border-accent/45 hover:text-accent"
                          aria-label="Anterior"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={goNext}
                          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] border border-white/12 text-foreground transition-colors hover:border-accent/45 hover:text-accent"
                          aria-label="Próximo"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </>
                    )}

                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-[12px] border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-white/30"
                      >
                        Visitar site
                        <ExternalLink size={14} />
                      </a>
                    ) : null}

                    <Button
                      type="button"
                      variant="primary"
                      onClick={requestQuote}
                    >
                      Solicitar proposta sob medida
                      <FileText size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {lightbox ? (
              <motion.div
                className="fixed inset-0 z-[90] flex items-center justify-center bg-black/92 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <button
                  type="button"
                  aria-label="Fechar foto ampliada"
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => setLightbox(null)}
                />
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] border border-white/20 bg-black/75 text-white"
                  aria-label="Fechar"
                >
                  <X size={18} />
                </button>
                <div className="relative z-[1] h-[86vh] w-full max-w-6xl">
                  <Image
                    src={lightbox}
                    alt={`${project.title} — imagem ampliada`}
                    fill
                    sizes="95vw"
                    className="object-contain"
                  />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
