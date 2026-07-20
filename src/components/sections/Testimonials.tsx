"use client";

import { TESTIMONIALS } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/lib/reveal";
import { FitScrollGrid } from "@/lib/fit-scroll";

export function Testimonials() {
  return (
    <section className="section-padding overflow-hidden border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Depoimentos"
            title="Confiança construída em cada projeto"
          />
        </Reveal>

        <FitScrollGrid className="grid gap-4 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <blockquote
              key={item.author}
              className="glass flex h-full flex-col rounded-[18px] p-6"
            >
              <p className="flex-1 text-base leading-relaxed text-white">
                “{item.quote}”
              </p>
              <footer className="mt-6 border-t border-white/10 pt-4">
                <cite className="not-italic">
                  <span className="block text-sm font-semibold text-white">
                    {item.author}
                  </span>
                  <span className="mt-1 block text-xs text-white/75">{item.role}</span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </FitScrollGrid>
      </div>
    </section>
  );
}
