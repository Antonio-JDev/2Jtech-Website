"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/HeroVisual";
import { Reveal } from "@/lib/reveal";

const HEADLINE_LEAD_WORDS = ["Desenvolvimento", "de", "software"];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[calc(100svh-72px)] items-center overflow-hidden border-b border-white/[0.06] pt-[72px]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="arch-grid absolute inset-0 opacity-70" />
        <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.08),transparent_65%)]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 md:px-8 md:py-12 lg:grid-cols-[0.94fr_1.06fr] lg:gap-10 xl:gap-14 xl:py-16">
        <div className="relative z-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-[#cbd5e1] sm:px-3.5 sm:text-xs"
          >
            <ShieldCheck size={14} className="shrink-0 text-accent" />
            <span className="truncate sm:whitespace-normal">
              Do planejamento à entrega, tecnologia com propósito.
            </span>
          </motion.div>

          <h1 className="mt-5 max-w-xl text-[2rem] font-semibold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] xl:text-[3.2rem]">
            <span className="inline-flex flex-wrap gap-x-[0.26em]">
              {HEADLINE_LEAD_WORDS.map((word, index) => (
                <motion.span
                  key={word}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.42,
                    delay: index * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>{" "}
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.24,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative inline-block"
            >
              <span className="headline-gradient-motion">
                que transforma negócios.
              </span>
              <motion.span
                aria-hidden
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.65,
                  delay: 0.42,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left rounded-full bg-gradient-to-r from-accent via-accent/60 to-transparent"
              />
            </motion.span>
          </h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28 }}
            className="mt-5 max-w-lg text-sm leading-relaxed text-[#cbd5e1] sm:text-base lg:text-[1.0625rem]"
          >
            Criamos sistemas, plataformas e soluções tecnológicas sob medida para
            empresas que precisam automatizar processos, integrar operações e
            crescer com tecnologia.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.36 }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <Button
              href="#contato"
              variant="primary"
              className="w-full sm:w-auto"
            >
              Solicitar Proposta
            </Button>
            <Button
              href="#cases"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Explorar Cases
            </Button>
          </motion.div>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.45 }}
            className="mt-6 text-xs leading-relaxed text-muted"
          >
            Sistemas sob medida · Integrações &amp; IA · Código-fonte 100% seu
          </motion.p>
        </div>

        <Reveal delay={0.05} className="min-w-0">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}
