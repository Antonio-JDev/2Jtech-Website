"use client";

import { Bot, Boxes, BriefcaseBusiness, Network } from "lucide-react";
import { PRACTICE_AREAS } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/lib/reveal";

const ICONS = [Boxes, Network, Bot, BriefcaseBusiness];

export function Services() {
  return (
    <section
      id="solucoes"
      className="section-padding border-b border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Áreas de Prática"
            title="Soluções desenhadas para a realidade da operação"
            description="Criamos sistemas, plataformas, integrações e consultoria tecnológica sob medida — unindo visão de negócio e engenharia de software para entregas sustentáveis."
          />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {PRACTICE_AREAS.map((area, index) => {
            const Icon = ICONS[index] ?? Boxes;
            return (
              <Reveal key={area.code} delay={index * 0.03}>
                <article className="panel flex h-full flex-col rounded-[16px] p-6 transition-colors duration-200 hover:border-white/20 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] border border-accent/30 bg-accent/10 text-accent">
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-semibold tracking-[0.18em] text-muted">
                      {area.code}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-foreground">
                    {area.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#cbd5e1]">
                    {area.summary}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-white/[0.07] pt-5">
                    {area.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-foreground/90"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
