"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/HeroVisual";

const HEADLINE_LEAD_WORDS = ["Desenvolvimento", "de", "software"];
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  // Words resolve from a soft blur into focus: the page's one authored entrance.
  const wordIn = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18, filter: "blur(10px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.7, delay, ease: EASE_OUT_EXPO },
        };

  const fadeUp = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE_OUT_EXPO },
        };

  return (
    <section
      id="home"
      className="relative isolate flex overflow-hidden border-b border-white/[0.06] pt-[72px]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="arch-grid arch-grid-fade absolute inset-0" />
        <div className="absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.09),transparent_65%)]" />
        <div className="hero-aurora absolute -inset-[10%]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-2 px-5 pb-8 pt-6 md:px-8 md:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:pb-10 lg:pt-[46px] xl:gap-16">
        <div className="relative z-10">
          <h1 className="max-w-[13ch] text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-[3.25rem] lg:text-[clamp(2.6rem,7.2svh,3.6rem)] xl:text-[clamp(2.6rem,7.8svh,4.25rem)]">
            {HEADLINE_LEAD_WORDS.map((word, index) => (
              <motion.span
                key={word}
                {...wordIn(0.05 + index * 0.08)}
                className="mr-[0.24em] inline-block"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              {...wordIn(0.32)}
              className="inline-block text-accent"
            >
              que transforma negócios.
            </motion.span>
          </h1>

          <motion.p
            {...fadeUp(0.45)}
            className="mt-6 text-lg leading-snug text-[#b6c2d1] lg:text-xl"
          >
            Do planejamento à entrega, tecnologia com propósito.
          </motion.p>

          <motion.div
            {...fadeUp(0.55)}
            className="mt-8 hidden flex-wrap gap-3 lg:flex"
          >
            <Button
              href="#contato"
              variant="primary"
              className="group w-full sm:w-auto"
            >
              Solicitar Proposta
              <ArrowRight
                size={16}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Button>
            <Button
              href="#cases"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Explorar Cases
            </Button>
          </motion.div>
        </div>

        <div className="min-w-0">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
