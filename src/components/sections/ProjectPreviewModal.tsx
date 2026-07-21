"use client";

import { useEffect, useCallback, useState } from "react";
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
  buildQuoteHref,
  getScreenImages,
  type CatalogProject,
} from "@/lib/catalog";
import { Button } from "@/components/ui/Button";

type ProjectPreviewModalProps = {
  project: CatalogProject | null;
  onClose: () => void;
};

export function ProjectPreviewModal({ project, onClose }: ProjectPreviewModalProps) {
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
  const activePhoto = photos[Math.min(photoIndex, Math.max(photos.length - 1, 0))] ?? null;
  const hasMultipleScreens = screens.length > 1;
  const hasMultiplePhotos = photos.length > 1;

  const allProjectPhotos = (() => {
    if (!project) return [] as string[];
    const seen = new Set<string>();
    const list: string[] = [];
    for (const item of project.screens) {
      for (const src of getScreenImages(item)) {
        if (!seen.has(src)) {
          seen.add(src);
          list.push(src);
        }
      }
    }
    return list;
  })();

  useEffect(() => {
    setPhotoIndex(0);
  }, [screenIndex]);

  useEffect(() => {
    if (!project) return;
    project.screens.forEach((item) => {
      getScreenImages(item).forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    });
  }, [project?.id]); // eslint-disable-line react-hooks/exhaustive-deps

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
    onClose();
    window.setTimeout(() => {
      window.location.href = buildQuoteHref(project);
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
          transition={{ duration: 0.2 }}
        >
        <button
          type="button"
          aria-label="Fechar pré-visualização"
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
          onClick={onClose}
        />

        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-title"
          className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[22px] border border-white/15 bg-[#0a0a0a] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neon">
                Pré-visitação · {project.category}
              </p>
              <h3 id="preview-title" className="mt-1 text-xl font-semibold text-white sm:text-2xl">
                {project.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-white/90">{project.tagline}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-white/10 text-white/80 transition hover:border-white/25 hover:text-white"
              aria-label="Fechar"
            >
              <X size={18} />
            </button>
          </div>

          <div
            className={`grid min-h-0 flex-1 ${
              hasMultipleScreens ? "lg:grid-cols-[200px_1fr]" : ""
            }`}
          >
            {hasMultipleScreens ? (
              <nav
                className="hidden flex-col gap-1 border-r border-white/10 p-3 lg:flex"
                aria-label="Telas do sistema"
              >
                {screens.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setScreenIndex(index)}
                    className={`rounded-[12px] px-3 py-2.5 text-left text-sm transition ${
                      index === screenIndex
                        ? "bg-neon/15 text-neon"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {getScreenImages(item).length > 0 ? (
                      <span className="mt-0.5 block text-[10px] text-white/45">
                        {getScreenImages(item).length} foto
                        {getScreenImages(item).length > 1 ? "s" : ""}
                      </span>
                    ) : null}
                  </button>
                ))}
              </nav>
            ) : null}

            <div className="flex min-h-0 flex-col">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-2 truncate rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/60">
                  {project.domain
                    ? `${project.domain}${screen ? `/${screen.id}` : ""}`
                    : `app.2jtech.demo/${project.id}`}
                </span>
              </div>

              <div className="overflow-y-auto p-4 sm:p-6">
                  <div className="rounded-[18px] border border-white/10 bg-[#070707] p-4 sm:p-5">
                    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <h4 className="text-lg font-semibold text-white">
                          {screen?.title ?? project.title}
                        </h4>
                        <p className="mt-1 text-sm text-white/90">
                          {screen?.description ?? project.tagline}
                        </p>
                      </div>
                      <span
                        className="rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                          background: `${screen?.accent ?? "#00EFFC"}22`,
                          color: screen?.accent ?? "#00EFFC",
                          border: `1px solid ${screen?.accent ?? "#00EFFC"}44`,
                        }}
                      >
                        {photos.length > 0
                          ? `${photos.length} foto${photos.length > 1 ? "s" : ""}`
                          : "Detalhes do projeto"}
                      </span>
                    </div>

                    {photos.length > 0 ? (
                      <div className="mb-4">
                        <button
                          type="button"
                          onClick={() => activePhoto && setLightbox(activePhoto)}
                          className="group relative block w-full overflow-hidden rounded-[14px] border border-white/10 bg-black text-left"
                          aria-label="Ampliar foto"
                        >
                          {/* Keep one slot; swap src instantly — no exit/enter animation. */}
                          <div className="relative flex min-h-[220px] max-h-[48vh] w-full items-center justify-center bg-black">
                            {allProjectPhotos.map((src) => (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                key={src}
                                src={src}
                                alt={`${project.title} — ${screen?.title ?? "preview"}`}
                                className={`h-auto max-h-[48vh] w-full object-contain object-top ${
                                  src === activePhoto ? "relative block" : "hidden"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/70 px-2.5 py-1 text-[10px] font-semibold text-white opacity-0 transition group-hover:opacity-100">
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
                                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-[10px] border ${
                                  index === photoIndex
                                    ? "border-neon"
                                    : "border-white/10 opacity-70 hover:opacity-100"
                                }`}
                                aria-label={`Foto ${index + 1}`}
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={src}
                                  alt=""
                                  className="h-full w-full object-cover object-top"
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
                            className="rounded-[14px] border border-white/10 bg-white/[0.03] p-3.5"
                          >
                            <p className="text-[11px] uppercase tracking-wider text-white/60">
                              {stat.label}
                            </p>
                            <p className="mt-1 text-xl font-semibold text-white">
                              {stat.value}
                            </p>
                            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                              <div
                                className="h-full w-[70%] rounded-full"
                                style={{ background: screen.accent }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {screen?.rows?.length ? (
                      <div className="mt-4 space-y-2">
                        {screen.rows.map((row) => (
                          <div
                            key={row}
                            className="flex items-center justify-between rounded-[12px] border border-white/8 bg-white/[0.02] px-3.5 py-3"
                          >
                            <span className="text-sm text-white/90">{row}</span>
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ background: screen.accent }}
                            />
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2">
                  {hasMultipleScreens
                    ? screens.map((item, index) => (
                        <button
                          key={item.id}
                          type="button"
                          aria-label={item.label}
                          onClick={() => setScreenIndex(index)}
                          className={`h-2.5 w-2.5 rounded-full transition ${
                            index === screenIndex ? "bg-neon" : "bg-white/25"
                          }`}
                        />
                      ))
                    : hasMultiplePhotos
                      ? photos.map((src, index) => (
                          <button
                            key={src}
                            type="button"
                            aria-label={`Foto ${index + 1}`}
                            onClick={() => setPhotoIndex(index)}
                            className={`h-2.5 w-2.5 rounded-full transition ${
                              index === photoIndex ? "bg-neon" : "bg-white/25"
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
                        className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/10 text-white transition hover:border-neon/40 hover:text-neon"
                        aria-label="Anterior"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/10 text-white transition hover:border-neon/40 hover:text-neon"
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
                      className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/30"
                    >
                      Visitar site
                      <ExternalLink size={14} />
                    </a>
                  ) : null}

                  <Button
                    type="button"
                    variant="primary"
                    className="inline-flex"
                    onClick={requestQuote}
                  >
                    Solicitar orçamento
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
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/90 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                type="button"
                aria-label="Fechar foto"
                className="absolute inset-0"
                onClick={() => setLightbox(null)}
              />
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/15 bg-black/60 text-white"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox}
                alt="Foto ampliada do projeto"
                className="relative z-[1] max-h-[90vh] max-w-full rounded-[12px] object-contain"
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
