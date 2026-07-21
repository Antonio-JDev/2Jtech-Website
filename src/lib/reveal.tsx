"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
};

const offsets = {
  up: { y: 12, x: 0 },
  left: { x: -14, y: 0 },
  right: { x: 14, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const offset = offsets[direction];

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.88, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: "0px 0px 10% 0px" }}
      transition={{
        duration: 0.32,
        delay: Math.min(delay, 0.04),
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
