"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

const HeroMarkScene = dynamic(() => import("./HeroMarkScene"), {
  ssr: false,
  loading: () => null,
});

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// Founders portrait (transparent cut-out) in front of the 2J mark rendered
// as a living particle sculpture. Frameless: the floor dissolves into the page.
export function HeroVisual() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <figure className="@container relative isolate mx-auto w-full max-w-[640px] pt-[20%] lg:max-w-[min(640px,calc((100svh_-_170px)_*_1.15))]">
      {/* Cyan floor light that anchors the portrait to the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[8%] bottom-[4%] -z-10 h-1/2 bg-[radial-gradient(60%_70%_at_50%_100%,rgba(34,211,238,0.22),transparent_70%)] blur-2xl"
      />

      {/* 2J mark, behind the founders */}
      <div className="pointer-events-none absolute left-1/2 -top-[4%] z-0 aspect-square w-[96%] -translate-x-1/2 [mask-image:linear-gradient(to_bottom,#000_62%,transparent_88%)]">
        <div
          aria-hidden
          className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.16),transparent_68%)] blur-2xl"
        />
        <HeroMarkScene reduceMotion={reduceMotion} />
      </div>

      <motion.div
        className="portrait-fade relative z-10 aspect-[3/2] w-full"
        {...(reduceMotion
          ? {}
          : {
              initial: { opacity: 0, scale: 1.04, filter: "blur(12px)" },
              animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
              transition: { duration: 1.2, delay: 0.25, ease: EASE_OUT_EXPO },
            })}
      >
        <Image
          src="/hero-stages/Retrato%20corporativo%202J%20TECH.png"
          alt="Sócios-fundadores da 2J Tech, de braços cruzados, vestindo camisas pretas com a marca"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 640px"
          className="object-cover object-top"
        />
      </motion.div>

      {/* Hairline horizon under the portrait, same language as .horizon-glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[12%] bottom-[7%] h-px bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.7),transparent)]"
      />

      <figcaption className="absolute inset-x-0 z-20 bottom-[10%] flex justify-center px-3">
        <motion.div
          className="glass flex max-w-full items-center gap-3 rounded-full py-2 pl-4 pr-3 text-xs shadow-[0_12px_32px_rgba(0,0,0,0.45)] sm:text-[13px]"
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.85, ease: EASE_OUT_EXPO },
              })}
        >
          <span className="whitespace-nowrap font-semibold text-foreground">
            Sócios-fundadores
          </span>
          <span aria-hidden className="h-3.5 w-px bg-white/15" />
          <span className="hidden whitespace-nowrap text-[#cbd5e1] @[540px]:inline">
            Você fala direto com quem desenvolve
          </span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-accent/25 bg-accent/10 px-2 py-0.5 font-medium text-accent">
            <MapPin size={12} aria-hidden />
            Itajaí · SC
          </span>
        </motion.div>
      </figcaption>
    </figure>
  );
}
