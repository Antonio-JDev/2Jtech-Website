"use client";

import { DIFFERENTIALS } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/lib/reveal";
import { FitScrollGrid } from "@/lib/fit-scroll";

export function Differentials() {
  return (
    <section className="section-padding overflow-hidden border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Diferenciais"
            title="Por que empresas escolhem a 2J Tech"
            description="Combinamos sofisticação visual, profundidade técnica e gestão responsável em cada entrega."
          />
        </Reveal>

        <FitScrollGrid className="grid gap-4 md:grid-cols-2">
          {DIFFERENTIALS.map((item) => (
            <article key={item.title} className="glass flex h-full gap-4 rounded-[18px] p-6">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-neon shadow-[0_0_12px_rgba(0,239,252,0.6)]" />
              <div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">{item.description}</p>
              </div>
            </article>
          ))}
        </FitScrollGrid>
      </div>
    </section>
  );
}
