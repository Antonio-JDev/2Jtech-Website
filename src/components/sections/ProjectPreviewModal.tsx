"use client";

import { useEffect, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import type { CatalogProject } from "@/lib/catalog";
import { Button } from "@/components/ui/Button";

type ProjectPreviewModalProps = {
  project: CatalogProject | null;
  onClose: () => void;
};

export function ProjectPreviewModal({ project, onClose }: ProjectPreviewModalProps) {
  const [screenIndex, setScreenIndex] = useState(0);

  useEffect(() => {
    setScreenIndex(0);
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
  const screen = screens[screenIndex];

  const goPrev = useCallback(() => {
    setScreenIndex((i) => (i === 0 ? screens.length - 1 : i - 1));
  }, [screens.length]);

  const goNext = useCallback(() => {
    setScreenIndex((i) => (i === screens.length - 1 ? 0 : i + 1));
  }, [screens.length]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {project && screen ? (
        <motion.div
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
                <p className="mt-1 max-w-2xl text-sm text-white/75">{project.tagline}</p>
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

            <div className="grid min-h-0 flex-1 lg:grid-cols-[200px_1fr]">
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
                  </button>
                ))}
              </nav>

              <div className="flex min-h-0 flex-col">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 truncate rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/60">
                    app.2jtech.demo/{project.id}/{screen.id}
                  </span>
                </div>

                <div className="overflow-y-auto p-4 sm:p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={screen.id}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -18 }}
                      transition={{ duration: 0.22 }}
                      className="rounded-[18px] border border-white/10 bg-[#070707] p-4 sm:p-5"
                    >
                      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                        <div>
                          <h4 className="text-lg font-semibold text-white">{screen.title}</h4>
                          <p className="mt-1 text-sm text-white/75">{screen.description}</p>
                        </div>
                        <span
                          className="rounded-full px-3 py-1 text-xs font-semibold"
                          style={{
                            background: `${screen.accent}22`,
                            color: screen.accent,
                            border: `1px solid ${screen.accent}44`,
                          }}
                        >
                          Live preview
                        </span>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3">
                        {screen.stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="rounded-[14px] border border-white/10 bg-white/[0.03] p-3.5"
                          >
                            <p className="text-[11px] uppercase tracking-wider text-white/60">
                              {stat.label}
                            </p>
                            <p className="mt-1 text-xl font-semibold text-white">{stat.value}</p>
                            <div
                              className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"
                            >
                              <div
                                className="h-full w-[70%] rounded-full"
                                style={{ background: screen.accent }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

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
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-2 lg:hidden">
                    {screens.map((item, index) => (
                      <button
                        key={item.id}
                        type="button"
                        aria-label={item.label}
                        onClick={() => setScreenIndex(index)}
                        className={`h-2.5 w-2.5 rounded-full transition ${
                          index === screenIndex ? "bg-neon" : "bg-white/25"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="hidden text-xs text-white/55 sm:block lg:flex-1">
                    Use as setas ou o menu para navegar pelas telas do sistema.
                  </p>

                  <div className="ml-auto flex items-center gap-2">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/10 text-white transition hover:border-neon/40 hover:text-neon"
                      aria-label="Tela anterior"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/10 text-white transition hover:border-neon/40 hover:text-neon"
                      aria-label="Próxima tela"
                    >
                      <ChevronRight size={18} />
                    </button>
                    <Button href="#contato" variant="primary" className="hidden sm:inline-flex" onClick={onClose}>
                      Solicitar projeto
                      <ExternalLink size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
