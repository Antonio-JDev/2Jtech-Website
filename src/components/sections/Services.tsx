"use client";

import {
  Bot,
  Boxes,
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  LayoutTemplate,
  Network,
  ServerCog,
  Sparkles,
  Workflow,
} from "lucide-react";
import { SERVICES } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/lib/reveal";
import { FitScrollGrid } from "@/lib/fit-scroll";

const ICONS = [
  Code2,
  ServerCog,
  Boxes,
  LayoutTemplate,
  Network,
  Workflow,
  Bot,
  Sparkles,
  BriefcaseBusiness,
  FolderKanban,
];

export function Services() {
  return (
    <section id="servicos" className="section-padding relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Serviços"
            title="Soluções digitais de alto padrão"
            description="Do conceito à produção: desenvolvemos, integramos e gerimos sistemas que elevam a operação da sua empresa."
          />
        </Reveal>

        <FitScrollGrid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[index] ?? Code2;
            return (
              <article
                key={service.title}
                className="group glass h-full rounded-[18px] p-5 transition-all duration-300 hover:border-neon/30 hover:bg-white/[0.05] hover:glow-neon-soft"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.03] text-neon transition-colors group-hover:border-neon/40">
                  <Icon size={18} />
                </div>
                <h3 className="text-base font-semibold text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">
                  {service.description}
                </p>
              </article>
            );
          })}
        </FitScrollGrid>
      </div>
    </section>
  );
}
