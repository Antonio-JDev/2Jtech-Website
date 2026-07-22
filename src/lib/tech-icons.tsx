import type { Technology } from "@/lib/content";

/**
 * Brand icons mostly from Devicon (https://devicon.dev/).
 * Fallbacks: Simple Icons or custom marks when Devicon has no compact icon.
 */
const TECH_ICON_SRC: Record<Technology["id"], string> = {
  react: "/icons/tech/react.svg",
  nextjs: "/icons/tech/nextjs.svg",
  typescript: "/icons/tech/typescript.svg",
  nodejs: "/icons/tech/nodejs.svg",
  express: "/icons/tech/express.svg",
  nestjs: "/icons/tech/nestjs.svg",
  golang: "/icons/tech/golang.svg",
  python: "/icons/tech/python.svg",
  svelte: "/icons/tech/svelte.svg",
  html: "/icons/tech/html.svg",
  css: "/icons/tech/css.svg",
  tailwindcss: "/icons/tech/tailwindcss.svg",
  vite: "/icons/tech/vite.svg",
  webpack: "/icons/tech/webpack.svg",
  vitest: "/icons/tech/vitest.svg",
  jest: "/icons/tech/jest.svg",
  zustand: "/icons/tech/zustand.svg",
  yaml: "/icons/tech/yaml.svg",
  graphql: "/icons/tech/graphql.svg",
  trpc: "/icons/tech/trpc.svg",
  grpc: "/icons/tech/grpc.svg",
  swagger: "/icons/tech/swagger.svg",
  http: "/icons/tech/http.svg",
  http2: "/icons/tech/http2.svg",
  oauth: "/icons/tech/oauth.svg",
  oauth2: "/icons/tech/oauth2.svg",
  rtmp: "/icons/tech/rtmp.svg",
  mcp: "/icons/tech/mcp.svg",
  postgresql: "/icons/tech/postgresql.svg",
  mongodb: "/icons/tech/mongodb.svg",
  mysql: "/icons/tech/mysql.svg",
  prisma: "/icons/tech/prisma.svg",
  supabase: "/icons/tech/supabase.svg",
  pandas: "/icons/tech/pandas.svg",
  docker: "/icons/tech/docker.svg",
  portainer: "/icons/tech/portainer.svg",
  nginx: "/icons/tech/nginx.svg",
  traefik: "/icons/tech/traefik.svg",
  linux: "/icons/tech/linux.svg",
  npm: "/icons/tech/npm.svg",
  pnpm: "/icons/tech/pnpm.svg",
  github: "/icons/tech/github.svg",
  vercel: "/icons/tech/vercel.svg",
  netlify: "/icons/tech/netlify.svg",
  aws: "/icons/tech/aws.svg",
  azure: "/icons/tech/azure.svg",
  cloudflare: "/icons/tech/cloudflare.svg",
  openai: "/icons/tech/openai.svg",
  claude: "/icons/tech/claude.svg",
  solidity: "/icons/tech/solidity.svg",
  "clean-architecture": "/icons/tech/clean-architecture.svg",
  trello: "/icons/tech/trello.svg",
  jira: "/icons/tech/jira.svg",
  notion: "/icons/tech/notion.svg",
};

/** Official / widely recognized brand colors */
export const TECH_COLORS: Record<
  Technology["id"],
  { icon: string; glow: string }
> = {
  react: { icon: "#61DAFB", glow: "rgba(97, 218, 251, 0.22)" },
  nextjs: { icon: "#FFFFFF", glow: "rgba(255, 255, 255, 0.14)" },
  typescript: { icon: "#3178C6", glow: "rgba(49, 120, 198, 0.25)" },
  nodejs: { icon: "#339933", glow: "rgba(51, 153, 51, 0.22)" },
  express: { icon: "#FFFFFF", glow: "rgba(255, 255, 255, 0.12)" },
  nestjs: { icon: "#E0234E", glow: "rgba(224, 35, 78, 0.22)" },
  golang: { icon: "#00ADD8", glow: "rgba(0, 173, 216, 0.22)" },
  python: { icon: "#3776AB", glow: "rgba(55, 118, 171, 0.22)" },
  svelte: { icon: "#FF3E00", glow: "rgba(255, 62, 0, 0.22)" },
  html: { icon: "#E34F26", glow: "rgba(227, 79, 38, 0.22)" },
  css: { icon: "#1572B6", glow: "rgba(21, 114, 182, 0.22)" },
  tailwindcss: { icon: "#06B6D4", glow: "rgba(6, 182, 212, 0.22)" },
  vite: { icon: "#646CFF", glow: "rgba(100, 108, 255, 0.22)" },
  webpack: { icon: "#8DD6F9", glow: "rgba(141, 214, 249, 0.22)" },
  vitest: { icon: "#729B1B", glow: "rgba(114, 155, 27, 0.22)" },
  jest: { icon: "#C21325", glow: "rgba(194, 19, 37, 0.22)" },
  zustand: { icon: "#4338CA", glow: "rgba(67, 56, 202, 0.22)" },
  yaml: { icon: "#CB171E", glow: "rgba(203, 23, 30, 0.22)" },
  graphql: { icon: "#E10098", glow: "rgba(225, 0, 152, 0.22)" },
  trpc: { icon: "#398CCB", glow: "rgba(57, 140, 203, 0.22)" },
  grpc: { icon: "#00AEEF", glow: "rgba(0, 174, 239, 0.22)" },
  swagger: { icon: "#85EA2D", glow: "rgba(133, 234, 45, 0.2)" },
  http: { icon: "#58A6FF", glow: "rgba(88, 166, 255, 0.22)" },
  http2: { icon: "#7EE787", glow: "rgba(126, 231, 135, 0.2)" },
  oauth: { icon: "#EB5424", glow: "rgba(235, 84, 36, 0.22)" },
  oauth2: { icon: "#F78C40", glow: "rgba(247, 140, 64, 0.22)" },
  rtmp: { icon: "#FF6B35", glow: "rgba(255, 107, 53, 0.22)" },
  mcp: { icon: "#FFFFFF", glow: "rgba(255, 255, 255, 0.14)" },
  postgresql: { icon: "#4169E1", glow: "rgba(65, 105, 225, 0.22)" },
  mongodb: { icon: "#47A248", glow: "rgba(71, 162, 72, 0.22)" },
  mysql: { icon: "#4479A1", glow: "rgba(68, 121, 161, 0.22)" },
  prisma: { icon: "#5A67D8", glow: "rgba(90, 103, 216, 0.22)" },
  supabase: { icon: "#3ECF8E", glow: "rgba(62, 207, 142, 0.22)" },
  pandas: { icon: "#150458", glow: "rgba(130, 140, 255, 0.22)" },
  docker: { icon: "#2496ED", glow: "rgba(36, 150, 237, 0.22)" },
  portainer: { icon: "#13BEF9", glow: "rgba(19, 190, 249, 0.22)" },
  nginx: { icon: "#009639", glow: "rgba(0, 150, 57, 0.22)" },
  traefik: { icon: "#24A1C1", glow: "rgba(36, 161, 193, 0.22)" },
  linux: { icon: "#FCC624", glow: "rgba(252, 198, 36, 0.2)" },
  npm: { icon: "#CB3837", glow: "rgba(203, 56, 55, 0.22)" },
  pnpm: { icon: "#F69220", glow: "rgba(246, 146, 32, 0.22)" },
  github: { icon: "#FFFFFF", glow: "rgba(255, 255, 255, 0.12)" },
  vercel: { icon: "#FFFFFF", glow: "rgba(255, 255, 255, 0.14)" },
  netlify: { icon: "#00C7B7", glow: "rgba(0, 199, 183, 0.22)" },
  aws: { icon: "#FF9900", glow: "rgba(255, 153, 0, 0.22)" },
  azure: { icon: "#0078D4", glow: "rgba(0, 120, 212, 0.22)" },
  cloudflare: { icon: "#F38020", glow: "rgba(243, 128, 32, 0.24)" },
  openai: { icon: "#10A37F", glow: "rgba(16, 163, 127, 0.22)" },
  claude: { icon: "#D97757", glow: "rgba(217, 119, 87, 0.22)" },
  solidity: { icon: "#FFFFFF", glow: "rgba(255, 255, 255, 0.14)" },
  "clean-architecture": { icon: "#A78BFA", glow: "rgba(167, 139, 250, 0.22)" },
  trello: { icon: "#0052CC", glow: "rgba(0, 82, 204, 0.22)" },
  jira: { icon: "#2684FF", glow: "rgba(38, 132, 255, 0.22)" },
  notion: { icon: "#FFFFFF", glow: "rgba(255, 255, 255, 0.14)" },
};

export function TechIcon({
  id,
  className = "h-5 w-5",
}: {
  id: Technology["id"];
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- local SVG brand marks; no optimization needed
    <img
      src={TECH_ICON_SRC[id]}
      alt=""
      aria-hidden
      className={className}
      draggable={false}
    />
  );
}
