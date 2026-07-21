import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-6 max-w-3xl sm:mb-8 ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-neon">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-white/95 sm:mt-4 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
