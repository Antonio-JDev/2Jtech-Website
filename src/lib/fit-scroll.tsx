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
    : Math.min(index * 0.045, 0.28);
  const end = sequential
    ? Math.min(start + 0.16, 0.96)
    : Math.min(0.42 + index * 0.045, 0.92);

  const local = useTransform(progress, [start, end], [0, 1], {
    clamp: true,
  });

  const eased = useTransform(local, (t) => {
    const c = Math.min(Math.max(t, 0), 1);
    return 1 - Math.pow(1 - c, 2.2);
  });

  // Desktop gets a clearer travel — compact keeps the mobile feel that already works.
  const xFrom = compact
    ? 0
    : Math.sign(fromCenter) * Math.min(distance * 22, 56);
  const yFrom = compact ? 10 : 36 + Math.min(distance * 8, 28);

  const x = useTransform(eased, (t) => (reduceMotion ? 0 : xFrom * (1 - t)));
  const y = useTransform(eased, (t) => (reduceMotion ? 0 : yFrom * (1 - t)));
  const scale = useTransform(eased, (t) =>
    reduceMotion ? 1 : compact ? 0.985 + 0.015 * t : 0.92 + 0.08 * t,
  );
  const opacity = useTransform(eased, (t) =>
    reduceMotion ? 1 : compact ? 0.92 + 0.08 * t : 0.72 + 0.28 * t,
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
  /**
   * On large screens, add a short scroll “break” (sticky + taller track)
   * so progress maps mainly to card entrances — not the whole section pass.
   */
  pinEntrance?: boolean;
};

/**
 * Scroll-linked card entrance. Optional pinEntrance creates a brief
 * sticky window on desktop so the motion reads clearly.
 */
export function FitScrollGrid({
  children,
  className,
  itemClassName,
  variant = "default",
  pinEntrance = false,
}: FitScrollGridProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const compact = useMediaQuery("(max-width: 779px)", true);
  const sequential = variant === "tall" && compact;
  const usePin = pinEntrance && !compact && !reduceMotion;

  const { scrollYProgress } = useScroll({
    target: usePin ? pinRef : trackRef,
    offset: sequential
      ? ["start end", "end start"]
      : usePin
        ? ["start end", "end end"]
        : ["start end", "start 35%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: sequential ? 170 : usePin ? 140 : 120,
    damping: sequential ? 34 : usePin ? 30 : 28,
    mass: 0.24,
    restDelta: 0.001,
    restSpeed: 0.001,
  });

  const progress = reduceMotion ? scrollYProgress : smoothProgress;
  const items = Children.toArray(children);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const grid = (
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

  if (!usePin) return grid;

  return (
    <div
      ref={pinRef}
      className="relative"
      style={{ height: variant === "tall" ? "155vh" : "130vh" }}
    >
      <div className="sticky top-[min(18vh,7rem)]">{grid}</div>
    </div>
  );
}
