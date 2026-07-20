"use client";

import { TECHNOLOGIES } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/lib/reveal";

export function Technologies() {
  return (
    <section id="tecnologias" className="section-padding border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Tecnologias"
            title="Stack moderna para produtos que escalam"
            description="Escolhemos ferramentas maduras e performáticas para entregar sistemas seguros e evolutivos."
          />
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap justify-center gap-3">
            {TECHNOLOGIES.map((tech) => (
              <span
                key={tech}
                className="glass rounded-[18px] px-4 py-2.5 text-sm font-medium text-white/90 transition-all duration-300 hover:border-neon/35 hover:text-white hover:glow-neon-soft"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
