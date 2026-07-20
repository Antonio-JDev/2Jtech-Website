"use client";

import { useRef, Children, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

type FitScrollItemProps = {
  children: ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
  className?: string;
};

function FitScrollItem({
  children,
  index,
  total,
  progress,
  className,
}: FitScrollItemProps) {
  const reduceMotion = useReducedMotion();
  const mid = (total - 1) / 2;
  const fromCenter = index - mid;

  const x = useTransform(
    progress,
    [0, 1],
    reduceMotion ? [0, 0] : [fromCenter * 90, 0],
  );
  const y = useTransform(
    progress,
    [0, 1],
    reduceMotion ? [0, 0] : [48 + Math.abs(fromCenter) * 12, 0],
  );
  const scale = useTransform(
    progress,
    [0, 1],
    reduceMotion ? [1, 1] : [0.9, 1],
  );
  const opacity = useTransform(
    progress,
    [0, 0.25, 1],
    reduceMotion ? [1, 1, 1] : [0.25, 0.7, 1],
  );
  const rotate = useTransform(
    progress,
    [0, 1],
    reduceMotion ? [0, 0] : [fromCenter * 2.5, 0],
  );

  return (
    <motion.div style={{ x, y, scale, opacity, rotate }} className={className}>
      {children}
    </motion.div>
  );
}

type FitScrollGridProps = {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
};

/** Cards converge and lock into the grid while the section scrolls into view. */
export function FitScrollGrid({
  children,
  className,
  itemClassName,
}: FitScrollGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const items = Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      {items.map((child, index) => (
        <FitScrollItem
          key={index}
          index={index}
          total={items.length}
          progress={scrollYProgress}
          className={itemClassName}
        >
          {child}
        </FitScrollItem>
      ))}
    </div>
  );
}
