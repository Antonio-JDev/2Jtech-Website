import type { PointerEvent } from "react";

/**
 * Pointer handler for `.spotlight` surfaces: writes the cursor position
 * as CSS custom properties so the ::before light follows the pointer.
 * Pure style writes, no React state, so it never re-renders.
 */
export function trackSpotlight(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") return;
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  el.style.setProperty("--my", `${event.clientY - rect.top}px`);
}
