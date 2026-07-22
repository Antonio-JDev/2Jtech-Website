"use client";

import { PROCESS_STEPS } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/lib/reveal";
import { FitScrollGrid } from "@/lib/fit-scroll";

export function Process() {
  return (
    <section id="sobre" className="section-padding relative overflow-x-hidden border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,239,252,0.06),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Como trabalhamos"
            title="Um processo claro, do briefing à evolução"
            description="Método consultivo com entregas previsíveis, comunicação transparente e foco em resultado."
          />
        </Reveal>

        <FitScrollGrid pinEntrance className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <article
              key={step.step}
              className="glass relative h-full overflow-hidden rounded-[18px] p-6"
            >
              <span className="text-4xl font-semibold text-neon/45">{step.step}</span>
              <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/95">{step.description}</p>
            </article>
          ))}
        </FitScrollGrid>
      </div>
    </section>
  );
}
