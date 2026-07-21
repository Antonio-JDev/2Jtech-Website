"use client";

import {
  useRef,
  useState,
  useEffect,
  Children,
  type ReactNode,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

function useMediaQuery(query: string, initial = false) {
  const [matches, setMatches] = useState(initial);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}

type FitScrollItemProps = {
  children: ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
  compact: boolean;
  sequential: boolean;
  className?: string;
};

function FitScrollItem({
  children,
  index,
  total,
  progress,
  compact,
  sequential,
  className,
}: FitScrollItemProps) {
  const reduceMotion = useReducedMotion();
  const mid = (total - 1) / 2;
  const fromCenter = index - mid;
  const distance = Math.abs(fromCenter);

  const start = sequential
    ? (index / Math.max(total, 1)) * 0.72
    : Math.min(index * 0.03, 0.16);
  const end = sequential
    ? Math.min(start + 0.16, 0.96)
    : Math.min(0.5 + index * 0.03, 0.88);

  const local = useTransform(progress, [start, end], [0, 1], {
    clamp: true,
  });

  const eased = useTransform(local, (t) => {
    const c = Math.min(Math.max(t, 0), 1);
    return 1 - Math.pow(1 - c, 2.2);
  });

  const xFrom = compact
    ? 0
    : Math.sign(fromCenter) * Math.min(distance * 10, 24);
  const yFrom = compact ? 10 : 14 + Math.min(distance * 3, 10);

  const x = useTransform(eased, (t) => (reduceMotion ? 0 : xFrom * (1 - t)));
  const y = useTransform(eased, (t) => (reduceMotion ? 0 : yFrom * (1 - t)));
  const scale = useTransform(eased, (t) =>
    reduceMotion ? 1 : 0.985 + 0.015 * t,
  );
  // Stay readable the whole time — motion should not hide copy.
  const opacity = useTransform(eased, (t) =>
    reduceMotion ? 1 : 0.92 + 0.08 * t,
  );

  return (
    <motion.div style={{ x, y, scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

type FitScrollGridProps = {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  variant?: "default" | "tall";
};

/**
 * Scroll-linked fit without pinning — avoids empty dead zones
 * and keeps section context on screen while reading.
 */
export function FitScrollGrid({
  children,
  className,
  itemClassName,
  variant = "default",
}: FitScrollGridProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const compact = useMediaQuery("(max-width: 779px)", true);
  const sequential = variant === "tall" && compact;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: sequential
      ? ["start end", "end start"]
      : ["start end", "start 50%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: sequential ? 170 : 120,
    damping: sequential ? 34 : 28,
    mass: 0.24,
    restDelta: 0.001,
    restSpeed: 0.001,
  });

  const progress = reduceMotion ? scrollYProgress : smoothProgress;
  const items = Children.toArray(children);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={trackRef} className={className}>
      {items.map((child, index) => (
        <FitScrollItem
          key={index}
          index={index}
          total={items.length}
          progress={progress}
          compact={compact}
          sequential={sequential}
          className={itemClassName}
        >
          {child}
        </FitScrollItem>
      ))}
    </div>
  );
}
