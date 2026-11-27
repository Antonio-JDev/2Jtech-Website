import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-10 max-w-3xl sm:mb-14 ${
        align === "center" ? "mx-auto text-center" : "text-left"
      }`}
    >
      <h2 className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.75rem] lg:text-[3.1rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#b6c2d1] sm:mt-5 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
