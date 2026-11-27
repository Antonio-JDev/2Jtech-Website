"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  FileCheck2,
  KeyRound,
  MessagesSquare,
  ShieldCheck,
} from "lucide-react";
import { DELIVERY_STAGES, GOVERNANCE_COMMITMENTS } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/lib/reveal";

const COMMITMENT_ICONS = [KeyRound, FileCheck2, ShieldCheck, MessagesSquare];

export function Governance() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="governanca"
      className="section-padding border-b border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            title="Previsibilidade do levantamento técnico à sustentação"
            description="Cada projeto segue um fluxo documentado e auditável, garantindo clareza de escopo, controle de qualidade e segurança jurídica para a sua empresa."
          />
        </Reveal>

        {/* Delivery timeline: the rail fills as the section enters view */}
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[15px] hidden h-px bg-white/[0.08] xl:block"
          >
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-accent via-accent/70 to-accent/20"
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <ol className="relative grid gap-10 md:grid-cols-2 md:gap-x-10 xl:grid-cols-4 xl:gap-8">
          {DELIVERY_STAGES.map((stage, index) => (
            <motion.li
              key={stage.step}
              className="relative flex flex-col"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.6,
                delay: reduceMotion ? 0 : 0.15 + index * 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="relative z-10 inline-flex h-[31px] w-fit items-center rounded-full border border-accent/40 bg-background px-3 text-xs font-semibold tabular-nums tracking-[0.08em] text-accent shadow-[0_0_0_6px_var(--color-background)]">
                Etapa {stage.step}
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-[-0.015em] text-foreground">
                {stage.title}
              </h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#b6c2d1]">
                {stage.description}
              </p>
              <p className="mt-5 min-h-[3.4rem] border-t border-white/[0.07] pt-3.5 text-xs font-medium leading-relaxed text-muted">
                {stage.artifact}
              </p>
            </motion.li>
          ))}
          </ol>
        </div>

        <Reveal delay={0.05}>
          <div className="horizon-glow mt-20 grid gap-10 rounded-[18px] border border-white/[0.08] bg-[linear-gradient(180deg,#0b1017,#080b10)] p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div>
              <ShieldCheck size={22} className="text-accent" aria-hidden />
              <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                Compromissos de Integridade Contratual
              </h3>
            </div>

            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {GOVERNANCE_COMMITMENTS.map((item, index) => {
                const Icon = COMMITMENT_ICONS[index] ?? ShieldCheck;
                return (
                  <div key={item.title} className="flex gap-3.5">
                    <Icon
                      size={18}
                      aria-hidden
                      className="mt-0.5 shrink-0 text-accent/85"
                    />
                    <div>
                      <h4 className="text-base font-semibold text-foreground">
                        {item.title}
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#b6c2d1]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
