"use client";

import { ShieldCheck } from "lucide-react";
import { DELIVERY_STAGES, GOVERNANCE_COMMITMENTS } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/lib/reveal";

export function Governance() {
  return (
    <section
      id="governanca"
      className="section-padding border-b border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Governança & Método"
            title="Previsibilidade do levantamento técnico à sustentação"
            description="Cada projeto segue um fluxo documentado e auditável, garantindo clareza de escopo, controle de qualidade e segurança jurídica para a sua empresa."
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {DELIVERY_STAGES.map((stage, index) => (
            <Reveal key={stage.step} delay={index * 0.03}>
              <article className="panel flex h-full flex-col rounded-[16px] p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Etapa {stage.step}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">
                  {stage.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#cbd5e1]">
                  {stage.description}
                </p>
                <p className="mt-5 border-t border-white/[0.07] pt-3.5 text-xs font-medium text-muted">
                  {stage.artifact}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.05}>
          <div className="mt-10 rounded-[18px] border border-white/[0.09] bg-[#0a0e14] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-accent" />
              <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-foreground">
                Compromissos de Integridade Contratual
              </h3>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {GOVERNANCE_COMMITMENTS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[12px] border border-white/[0.07] bg-white/[0.02] p-5"
                >
                  <h4 className="text-base font-semibold text-foreground">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#cbd5e1]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

