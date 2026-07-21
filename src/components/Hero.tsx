"use client";

import { Check } from "lucide-react";
import { BENEFITS, HERO_STATS } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/lib/reveal";
import { HeroVisual } from "@/components/HeroVisual";

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden pt-[72px] max-[779px]:min-h-0 min-h-[100svh]"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-2 lg:gap-10 lg:py-20">
        <Reveal direction="left" className="relative z-10">
          <h1 className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
            Transformamos desafios em{" "}
            <span className="text-neon">Soluções Digitais</span>.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            Desenvolvemos sistemas web, plataformas, APIs, Inteligência Artificial,
            integrações e soluções sob medida para empresas que desejam crescer com
            tecnologia.
          </p>

          <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {BENEFITS.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/90">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-neon/15 text-neon">
                  <Check size={12} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#contato" variant="primary">
              Solicitar Projeto
            </Button>
            <Button href="#servicos" variant="secondary">
              Conheça nossos serviços
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {HERO_STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={`glass glow-neon-soft rounded-[18px] p-3.5 ${
                  index % 2 === 0 ? "animate-float-a" : "animate-float-b"
                }`}
              >
                <p className="text-lg font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-[11px] leading-snug text-white/90">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal direction="right">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}
