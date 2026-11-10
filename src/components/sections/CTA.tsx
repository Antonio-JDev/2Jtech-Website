"use client";

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/lib/reveal";
import { SITE_PHONE_RAW } from "@/lib/seo";

export function CTA() {
  return (
    <section className="section-padding border-b border-white/[0.06]">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <div className="panel-elevated rounded-[18px] px-6 py-10 text-center sm:px-12 sm:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Próximo Passo
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Precisa estruturar ou modernizar o sistema da sua empresa?
            </h2>
            <p className="mx-auto mt-3.5 max-w-2xl text-base leading-relaxed text-[#cbd5e1]">
              Conversamos diretamente sobre requisitos, riscos técnicos, prazos e investimento para
              definir uma arquitetura segura e realista.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button href="#contato" variant="primary">
                Solicitar Proposta Técnica
              </Button>
              <a
                href={`https://wa.me/${SITE_PHONE_RAW}?text=${encodeURIComponent(
                  "Olá! Gostaria de conversar com a equipe da 2J Tech sobre um projeto de software.",
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex cursor-pointer items-center justify-center rounded-[12px] border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-white/30 hover:bg-white/[0.08]"
              >
                Conversar pelo WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
