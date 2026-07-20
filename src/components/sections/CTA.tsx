"use client";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/lib/reveal";

export function CTA() {
  return (
    <section className="section-padding relative overflow-hidden border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <Reveal>
          <div className="glass glow-neon-soft rounded-[28px] px-6 py-14 sm:px-12">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              Seu próximo software começa aqui.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
              Vamos transformar sua ideia em uma solução digital robusta, segura e
              preparada para crescer junto com o seu negócio.
            </p>
            <div className="mt-8">
              <Button href="#contato" variant="primary" className="px-8">
                Solicitar orçamento
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
