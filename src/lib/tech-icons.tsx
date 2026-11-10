import type { TechId } from "@/lib/content";

const TECH_ICON_SRC: Record<TechId, string> = {
  react: "/icons/tech/react.svg",
  nextjs: "/icons/tech/nextjs.svg",
  typescript: "/icons/tech/typescript.svg",
  tailwindcss: "/icons/tech/tailwindcss.svg",
  nodejs: "/icons/tech/nodejs.svg",
  nestjs: "/icons/tech/nestjs.svg",
  python: "/icons/tech/python.svg",
  golang: "/icons/tech/golang.svg",
  postgresql: "/icons/tech/postgresql.svg",
  prisma: "/icons/tech/prisma.svg",
  supabase: "/icons/tech/supabase.svg",
  mongodb: "/icons/tech/mongodb.svg",
  docker: "/icons/tech/docker.svg",
  aws: "/icons/tech/aws.svg",
  openai: "/icons/tech/openai.svg",
  claude: "/icons/tech/claude.svg",
};

export const TECH_COLORS: Record<TechId, { icon: string; bg: string }> = {
  react: { icon: "#61DAFB", bg: "rgba(97, 218, 251, 0.1)" },
  nextjs: { icon: "#F8FAFC", bg: "rgba(248, 250, 252, 0.08)" },
  typescript: { icon: "#3178C6", bg: "rgba(49, 120, 198, 0.14)" },
  tailwindcss: { icon: "#06B6D4", bg: "rgba(6, 182, 212, 0.12)" },
  nodejs: { icon: "#339933", bg: "rgba(51, 153, 51, 0.12)" },
  nestjs: { icon: "#E0234E", bg: "rgba(224, 35, 78, 0.12)" },
  python: { icon: "#3776AB", bg: "rgba(55, 118, 171, 0.14)" },
  golang: { icon: "#00ADD8", bg: "rgba(0, 173, 216, 0.12)" },
  postgresql: { icon: "#60A5FA", bg: "rgba(96, 165, 250, 0.12)" },
  prisma: { icon: "#818CF8", bg: "rgba(129, 140, 248, 0.12)" },
  supabase: { icon: "#3ECF8E", bg: "rgba(62, 207, 142, 0.12)" },
  mongodb: { icon: "#47A248", bg: "rgba(71, 162, 72, 0.12)" },
  docker: { icon: "#2496ED", bg: "rgba(36, 150, 237, 0.12)" },
  aws: { icon: "#FF9900", bg: "rgba(255, 153, 0, 0.12)" },
  openai: { icon: "#10A37F", bg: "rgba(16, 163, 127, 0.12)" },
  claude: { icon: "#D97757", bg: "rgba(217, 119, 87, 0.12)" },
};

export function TechIcon({
  id,
  className = "h-5 w-5",
}: {
  id: TechId;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- local static SVG brand mark
    <img
      src={TECH_ICON_SRC[id]}
      alt=""
      aria-hidden
      className={className}
      draggable={false}
    />
  );
}
