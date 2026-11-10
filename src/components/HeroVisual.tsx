"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  FileCheck2,
  Layers,
  Lock,
  ServerCog,
  X,
  type LucideIcon,
} from "lucide-react";

type Stage = {
  id: string;
  step: string;
  label: string;
  visualFocus: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
};

const STAGE_DURATION_MS = 4500;
const TICK_MS = 50;

const STAGES: Stage[] = [
  {
    id: "escopo",
    step: "01",
    label: "Escopo",
    visualFocus: "Checklist, documentos e fluxogramas",
    title: "Diagnóstico & Especificação",
    summary:
      "Mapeamento de regras de negócio, fluxos e riscos antes de iniciar o código.",
    image: "/hero-stages/etapa-01-escopo.jpg",
    imageAlt:
      "Etapa 01 — Diagnóstico e Especificação: checklist de fluxos, prazos contratuais e documento de escopo",
    icon: FileCheck2,
  },
  {
    id: "arquitetura",
    step: "02",
    label: "Arquitetura",
    visualFocus: "Blueprint de arquitetura, microsserviços e banco de dados",
    title: "Modelagem & Segurança LGPD",
    summary:
      "Estruturação de APIs, banco de dados, permissões e proteção de dados.",
    image: "/hero-stages/etapa-02-arquitetura.jpg",
    imageAlt:
      "Etapa 02 — Modelagem e Segurança LGPD: arquitetura de APIs, banco de dados, nuvem e contratos tipados",
    icon: Lock,
  },
  {
    id: "homologacao",
    step: "03",
    label: "Homologação",
    visualFocus: "Testes, validações e indicadores de qualidade",
    title: "Entregas Incrementais & Validação",
    summary:
      "Sprints transparentes com testes e validação em ambiente dedicado.",
    image: "/hero-stages/etapa-03-homologacao.jpg",
    imageAlt:
      "Etapa 03 — Entregas Incrementais e Validação: pipeline de build, testes, homologação e aceite por sprint",
    icon: Layers,
  },
  {
    id: "operacao",
    step: "04",
    label: "Operação",
    visualFocus: "Dashboard, monitoramento, deploy e infraestrutura",
    title: "Produção & Sustentação Contínua",
    summary:
      "Implantação assistida, monitoramento ativo e evolução contínua do sistema.",
    image: "/hero-stages/etapa-04-operacao.jpg",
    imageAlt:
      "Etapa 04 — Produção e Sustentação Contínua: deploy em nuvem, monitoramento ativo e suporte especializado",
    icon: ServerCog,
  },
];

export function HeroVisual() {
  const [{ activeIndex, progress }, setTimeline] = useState({
    activeIndex: 0,
    progress: 0,
  });
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();

  const current = STAGES[activeIndex];
  const ActiveIcon = current.icon;

  const selectStage = useCallback((index: number) => {
    setTimeline({ activeIndex: index, progress: 0 });
  }, []);

  const goPrev = useCallback(() => {
    setTimeline((prev) => ({
      activeIndex: prev.activeIndex === 0 ? STAGES.length - 1 : prev.activeIndex - 1,
      progress: 0,
    }));
  }, []);

  const goNext = useCallback(() => {
    setTimeline((prev) => ({
      activeIndex: prev.activeIndex === STAGES.length - 1 ? 0 : prev.activeIndex + 1,
      progress: 0,
    }));
  }, []);

  useEffect(() => {
    if (reduceMotion || paused || expanded) return;

    const stepIncrement = (TICK_MS / STAGE_DURATION_MS) * 100;
    const timer = window.setInterval(() => {
      setTimeline((prev) => {
        const nextProgress = prev.progress + stepIncrement;
        if (nextProgress >= 100) {
          return {
            activeIndex:
              prev.activeIndex === STAGES.length - 1 ? 0 : prev.activeIndex + 1,
            progress: 0,
          };
        }
        return {
          activeIndex: prev.activeIndex,
          progress: nextProgress,
        };
      });
    }, TICK_MS);

    return () => window.clearInterval(timer);
  }, [reduceMotion, paused, expanded]);

  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded, goPrev, goNext]);

  return (
    <>
      <div
        className="panel-elevated min-w-0 rounded-[18px] p-3.5 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:p-5"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* Card Header */}
        <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-[11px]">
              Modelo de Governança
            </p>
            <p className="mt-0.5 truncate text-xs font-medium text-foreground sm:text-sm">
              Ciclo de Engenharia 2J Tech
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Etapa anterior"
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.02] text-muted transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Próxima etapa"
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.02] text-muted transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Sleek 4-Step Auto-Advancing Progress Track */}
        <div
          className="mt-3 grid grid-cols-4 gap-1.5"
          role="tablist"
          aria-label="Progresso das etapas do ciclo de engenharia"
        >
          {STAGES.map((stage, index) => {
            const isCompleted = index < activeIndex;
            const isActive = index === activeIndex;
            const fillPercent = isCompleted
              ? 100
              : isActive
                ? reduceMotion
                  ? 100
                  : progress
                : 0;

            return (
              <button
                key={stage.id}
                id={`hero-step-${stage.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="hero-stage-panel"
                aria-label={`Etapa ${stage.step} — ${stage.label}`}
                onClick={() => selectStage(index)}
                className="group cursor-pointer rounded py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
              >
                <span className="block h-1 w-full overflow-hidden rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
                  <span
                    className={`block h-full rounded-full transition-[width] duration-75 ${
                      isActive
                        ? "bg-accent"
                        : isCompleted
                          ? "bg-accent/55"
                          : "bg-transparent"
                    }`}
                    style={{ width: `${fillPercent}%` }}
                  />
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Inner Panel */}
        <div
          id="hero-stage-panel"
          role="tabpanel"
          aria-labelledby={`hero-step-${current.id}`}
          aria-live="off"
          className="mt-2 rounded-[14px] border border-white/[0.08] bg-[#06090f] p-3 sm:p-4"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-2.5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] border border-accent/30 bg-accent/10 text-accent sm:h-9 sm:w-9">
                <ActiveIcon size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted sm:text-[11px]">
                  Etapa {current.step} · {current.label}
                </p>
                <h2 className="mt-0.5 text-sm font-semibold text-foreground sm:text-base">
                  {current.title}
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-[#cbd5e1]">
                  {current.summary}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Primary Visual Composition */}
          <div className="group relative mt-3 overflow-hidden rounded-[12px] border border-white/[0.09] bg-[#030509]">
            <div className="relative aspect-[16/9] w-full">
              {STAGES.map((stage, index) => {
                const isActive = index === activeIndex;
                return (
                  <motion.div
                    key={stage.id}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: reduceMotion ? 1 : isActive ? 1 : 1.025,
                    }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    aria-hidden={!isActive}
                    className={`absolute inset-0 ${
                      isActive ? "z-10" : "pointer-events-none z-0"
                    }`}
                  >
                    <Image
                      src={stage.image}
                      alt={stage.imageAlt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 580px"
                      className="object-cover object-center"
                    />
                  </motion.div>
                );
              })}

              <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(3,5,9,0.52)_100%)]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-11 bg-gradient-to-t from-[#06090f]/80 to-transparent" />

              <button
                type="button"
                onClick={() => setExpanded(true)}
                aria-label={`Ampliar diagrama da Etapa ${current.step}`}
                className="absolute right-2.5 top-2.5 z-30 inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-white/15 bg-[#06090f]/80 px-2 py-1 text-[11px] font-medium text-foreground/90 backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:px-2.5"
              >
                <Expand size={12} />
                <span className="hidden sm:inline">Ampliar</span>
              </button>

              <div className="pointer-events-none absolute bottom-2 left-2.5 right-2.5 z-20 flex items-center justify-between gap-2 text-[10px] sm:text-[11px]">
                <span className="truncate rounded-md border border-white/12 bg-[#06090f]/80 px-2 py-1 font-medium text-[#cbd5e1] backdrop-blur-sm sm:px-2.5">
                  {current.visualFocus}
                </span>
                <span className="shrink-0 rounded-md border border-accent/30 bg-[#06090f]/85 px-2 py-1 font-semibold tabular-nums text-accent backdrop-blur-sm">
                  {current.step} / 04
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Full-Screen Diagram Inspection */}
      <AnimatePresence>
        {expanded ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Fechar diagrama ampliado"
              className="absolute inset-0 cursor-pointer"
              onClick={() => setExpanded(false)}
            />

            <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[16px] border border-white/15 bg-[#070a10] p-3.5 shadow-2xl sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                    Etapa {current.step} · {current.label}
                  </p>
                  <p className="truncate text-sm font-semibold text-foreground sm:text-base">
                    {current.title}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Etapa anterior"
                    className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-[9px] border border-white/15 text-foreground hover:border-accent/45 hover:text-accent"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Próxima etapa"
                    className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-[9px] border border-white/15 text-foreground hover:border-accent/45 hover:text-accent"
                  >
                    <ChevronRight size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setExpanded(false)}
                    aria-label="Fechar"
                    className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-[9px] border border-white/15 text-foreground hover:border-white/35"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[12px] border border-white/10 bg-[#030509]">
                <Image
                  src={current.image}
                  alt={current.imageAlt}
                  fill
                  sizes="95vw"
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
