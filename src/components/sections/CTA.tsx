"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/lib/reveal";
import { SITE_PHONE_RAW } from "@/lib/seo";

export function CTA() {
  return (
    <section className="section-padding border-b border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[18px] border border-white/[0.09] bg-[#080b10] px-6 pb-16 pt-16 text-center sm:px-12 sm:pb-24 sm:pt-24">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="arch-grid arch-grid-fade absolute inset-0 opacity-80" />
              <div className="cta-horizon absolute inset-0" />
              <div className="cta-horizon-line absolute inset-x-0 bottom-0 h-px" />
            </div>

            <h2 className="mx-auto max-w-[20ch] text-[2rem] font-semibold leading-[1.06] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-[3.5rem]">
              Precisa estruturar ou modernizar o sistema da sua empresa?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#b6c2d1] sm:text-lg">
              Conversamos diretamente sobre requisitos, riscos técnicos, prazos e investimento para
              definir uma arquitetura segura e realista.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button href="#contato" variant="primary" className="group px-6 py-3.5">
                Solicitar Proposta Técnica
                <ArrowRight
                  size={16}
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Button>
              <a
                href={`https://wa.me/${SITE_PHONE_RAW}?text=${encodeURIComponent(
                  "Olá! Gostaria de conversar com a equipe da 2J Tech sobre um projeto de software.",
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-[12px] border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/[0.08]"
              >
                <MessageCircle size={16} aria-hidden />
                Conversar pelo WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
