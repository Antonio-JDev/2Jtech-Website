"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TECH_LAYERS } from "@/lib/content";
import { TECH_COLORS, TechIcon } from "@/lib/tech-icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/lib/reveal";

// Layout effect on the client so rows are hidden before first paint (no flash).
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Technologies() {
  const reduceMotion = useReducedMotion() ?? false;
  const listRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    if (reduceMotion || !listRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".tech-row");
      const distance = window.innerWidth < 640 ? 44 : 96;

      rows.forEach((row, index) => {
        // Even rows enter from the left, odd rows from the right.
        const dir = index % 2 === 0 ? -1 : 1;
        const head = row.querySelector(".tech-head");
        const items = row.querySelectorAll(".tech-item");
        const icons = row.querySelectorAll(".tech-icon");
        const line = row.querySelector(".tech-line");
        const sweep = row.querySelector(".tech-sweep");

        const tl = gsap.timeline({
          defaults: { ease: "expo.out" },
          scrollTrigger: {
            trigger: row,
            start: "top 86%",
            // Plays on the way down, rewinds when scrolled back above,
            // so every pass through the section replays the choreography.
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          line,
          { scaleX: 0, transformOrigin: dir < 0 ? "left center" : "right center" },
          { scaleX: 1, duration: 1.3 },
          0,
        )
          .fromTo(
            sweep,
            { xPercent: dir < 0 ? -120 : 420, opacity: 1 },
            { xPercent: dir < 0 ? 420 : -120, opacity: 0, duration: 1.6, ease: "power2.inOut" },
            0.05,
          )
          .from(
            head,
            { x: dir * distance, opacity: 0, filter: "blur(10px)", duration: 1.1 },
            0,
          )
          .from(
            items,
            {
              x: dir * distance * 0.7,
              opacity: 0,
              filter: "blur(8px)",
              duration: 1,
              stagger: { each: 0.07, from: dir < 0 ? "start" : "end" },
            },
            0.12,
          )
          .from(
            icons,
            {
              scale: 0.4,
              rotate: dir * -24,
              duration: 0.9,
              ease: "back.out(2.2)",
              stagger: { each: 0.07, from: dir < 0 ? "start" : "end" },
            },
            0.22,
          );
      });
    }, listRef);

    // Sections above change height (case accordions on mobile); keep trigger
    // positions in sync with the real layout.
    let refreshTimer = 0;
    let lastHeight = document.body.scrollHeight;
    const ro = new ResizeObserver(() => {
      const height = document.body.scrollHeight;
      if (Math.abs(height - lastHeight) < 2) return;
      lastHeight = height;
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [reduceMotion]);

  return (
    <section
      id="tecnologia"
      className="section-padding overflow-x-clip border-b border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            title="Tecnologias consolidadas organizadas por camada"
            description="Adotamos ferramentas maduras, tipagem estrita e padrões abertos para facilitar manutenção, contratação de equipe futura e evolução do produto."
          />
        </Reveal>

        <div ref={listRef} className="border-t border-white/[0.08]">
          {TECH_LAYERS.map((group) => (
            <div
              key={group.layer}
              className="tech-row relative grid gap-6 py-8 sm:py-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-12"
            >
              {/* Hairline that draws from the entry side, with a light streak */}
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
                <span className="tech-line absolute inset-0 bg-white/[0.08]" />
                <span className="tech-sweep absolute inset-y-0 left-0 w-1/4 bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.9),transparent)] opacity-0" />
              </span>

              <div className="tech-head">
                <h3 className="text-lg font-semibold tracking-[-0.015em] text-foreground">
                  {group.layer}
                </h3>
                <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted">
                  {group.description}
                </p>
              </div>

              <ul className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                {group.items.map((tech) => {
                  const color = TECH_COLORS[tech.id];
                  return (
                    <li key={tech.id} className="tech-item group flex items-center gap-3">
                      <span
                        className="tech-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] border border-white/[0.08] transition-[border-color,box-shadow] duration-300 ease-out group-hover:border-white/20 group-hover:shadow-[0_0_24px_-6px_rgba(34,211,238,0.45)]"
                        style={{
                          color: color.icon,
                          backgroundColor: color.bg,
                        }}
                      >
                        <TechIcon id={tech.id} className="h-[18px] w-[18px] object-contain" />
                      </span>
                      <div className="min-w-0">
                        <p translate="no" className="truncate text-sm font-semibold text-foreground">
                          {tech.name}
                        </p>
                        <p className="truncate text-xs text-muted">{tech.role}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
