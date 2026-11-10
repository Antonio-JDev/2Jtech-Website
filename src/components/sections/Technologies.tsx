"use client";

import { TECH_LAYERS } from "@/lib/content";
import { TECH_COLORS, TechIcon } from "@/lib/tech-icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/lib/reveal";

export function Technologies() {
  return (
    <section
      id="tecnologia"
      className="section-padding border-b border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Arquitetura & Stack"
            title="Tecnologias consolidadas organizadas por camada"
            description="Adotamos ferramentas maduras, tipagem estrita e padrões abertos para facilitar manutenção, contratação de equipe futura e evolução do produto."
          />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {TECH_LAYERS.map((group, index) => (
            <Reveal key={group.layer} delay={index * 0.03}>
              <div className="panel h-full rounded-[16px] p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {group.layer}
                </h3>
                <p className="mt-1 text-sm text-muted">{group.description}</p>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {group.items.map((tech) => {
                    const color = TECH_COLORS[tech.id];
                    return (
                      <div
                        key={tech.id}
                        className="flex items-center gap-3 rounded-[12px] border border-white/[0.08] bg-[#080b10] px-3.5 py-3"
                      >
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-white/10"
                          style={{
                            color: color.icon,
                            backgroundColor: color.bg,
                          }}
                        >
                          <TechIcon id={tech.id} className="h-4 w-4 object-contain" />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {tech.name}
                          </p>
                          <p className="truncate text-xs text-muted">
                            {tech.role}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
