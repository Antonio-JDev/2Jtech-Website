"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, Boxes, BriefcaseBusiness, Check, Network, ServerCog } from "lucide-react";
import { PRACTICE_AREAS } from "@/lib/content";

const ServicesScene = dynamic(() => import("./ServicesScene"), {
  ssr: false,
  loading: () => null,
});

const ICONS = [Boxes, Network, Bot, BriefcaseBusiness, ServerCog];
const FORMATION_LABELS = ["Estrutura", "Rede", "Inteligência", "Órbita", "Sustentação"];
const AUTOPLAY_MS = 6000;

export function Services() {
  const reduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const area = PRACTICE_AREAS[active];
  const running = autoplay && !hovered && inView && !reduceMotion;

  const select = useCallback((index: number) => {
    setAutoplay(false);
    setActive(index);
  }, []);

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = PRACTICE_AREAS.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  // Track visibility so autoplay only runs on screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Entrance choreography (GSAP + ScrollTrigger)
  useEffect(() => {
    if (reduceMotion || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
        defaults: { ease: "expo.out" },
      });
      tl.from(".svc-heading > *", { y: 24, opacity: 0, filter: "blur(8px)", duration: 1, stagger: 0.08 })
        .from(".svc-tab", { y: 18, opacity: 0, duration: 0.8, stagger: 0.07 }, "-=0.7")
        .from(
          ".svc-stage",
          { opacity: 0, scale: 0.96, clipPath: "inset(8% 8% 8% 8% round 18px)", duration: 1.2 },
          "-=0.9",
        );
    }, sectionRef);
    return () => ctx.revert();
  }, [reduceMotion]);

  // Detail swap: content resolves in with a short stagger
  useEffect(() => {
    if (reduceMotion || !detailRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".svc-anim",
        { y: 10, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7, stagger: 0.06, ease: "expo.out" },
      );
    }, detailRef);
    return () => ctx.revert();
  }, [active, reduceMotion]);

  return (
    <section
      id="solucoes"
      ref={sectionRef}
      className="section-padding border-b border-white/[0.06]"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-14">
        <div>
          <div className="svc-heading">
            <h2 className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.5rem]">
              Soluções desenhadas para a realidade da operação
            </h2>
            <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-[#b6c2d1]">
              Criamos sistemas, plataformas, integrações e consultoria tecnológica sob medida —
              unindo visão de negócio e engenharia de software para entregas sustentáveis.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Áreas de atuação"
            aria-orientation="vertical"
            className="mt-8 space-y-1.5"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {PRACTICE_AREAS.map((item, index) => {
              const Icon = ICONS[index] ?? Boxes;
              const isActive = index === active;
              return (
                <button
                  key={item.code}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  id={`svc-tab-${item.code}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="svc-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(index)}
                  onKeyDown={(e) => onTabKeyDown(e, index)}
                  className={`svc-tab group relative flex w-full cursor-pointer items-center gap-3.5 overflow-hidden rounded-[12px] border px-4 py-3.5 text-left transition-[background-color,border-color] duration-300 ${
                    isActive
                      ? "border-white/[0.12] bg-white/[0.04]"
                      : "border-transparent hover:bg-white/[0.025]"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border transition-colors duration-300 ${
                      isActive
                        ? "border-accent/40 bg-accent/10 text-accent"
                        : "border-white/10 text-muted group-hover:text-foreground"
                    }`}
                  >
                    <Icon size={17} aria-hidden />
                  </span>
                  <span
                    className={`min-w-0 flex-1 text-[0.95rem] font-semibold tracking-[-0.01em] transition-colors duration-300 ${
                      isActive ? "text-foreground" : "text-[#94a3b8] group-hover:text-foreground"
                    }`}
                  >
                    {item.title}
                  </span>

                  {isActive && autoplay && !reduceMotion ? (
                    <span
                      aria-hidden
                      key={`progress-${active}`}
                      className="svc-progress absolute inset-x-4 bottom-0 h-px origin-left bg-accent/70"
                      style={{
                        animationDuration: `${AUTOPLAY_MS}ms`,
                        animationPlayState: running ? "running" : "paused",
                      }}
                      onAnimationEnd={() =>
                        setActive((i) => (i === PRACTICE_AREAS.length - 1 ? 0 : i + 1))
                      }
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id="svc-panel"
          role="tabpanel"
          aria-labelledby={`svc-tab-${area.code}`}
          className="svc-stage horizon-glow overflow-hidden rounded-[18px] border border-white/[0.09] bg-[#06090e]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(55%_50%_at_50%_38%,rgba(34,211,238,0.10),transparent_70%)]" />
            <div className="arch-grid arch-grid-fade absolute inset-0 opacity-60" />
          </div>

          <div className="relative h-[240px] sm:h-[290px]">
            <ServicesScene activeIndex={active} reduceMotion={reduceMotion} />
            <span className="pointer-events-none absolute left-5 top-4 text-[11px] font-medium tracking-[0.04em] text-muted">
              {FORMATION_LABELS[active]}
            </span>
          </div>

          <div
            ref={detailRef}
            className="relative border-t border-white/[0.07] bg-[#06090e]/35 p-5 backdrop-blur-md sm:p-6"
          >
            <p className="svc-anim max-w-xl text-sm leading-relaxed text-[#cbd5e1]">
              {area.summary}
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-1">
              {area.deliverables.map((item) => (
                <li
                  key={item}
                  className="svc-anim flex items-start gap-2.5 text-[0.85rem] leading-relaxed text-foreground/85"
                >
                  <Check size={15} aria-hidden className="mt-[3px] shrink-0 text-accent/80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
