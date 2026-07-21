import type { ReactNode } from "react";
import type { Technology } from "@/lib/content";

type IconProps = { className?: string };

function ReactIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <ellipse cx="12" cy="12" rx="10" ry="4.2" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      </g>
    </svg>
  );
}

function NextIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm4.2 14.7h-1.7l-5.3-7.7v7.7H7.6V7.3h1.8l5.2 7.6V7.3h1.6Z"
      />
    </svg>
  );
}

function TypeScriptIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M3 3h18v18H3V3Zm9.3 14.2v-1.5h-3V9.6h1.5V8.2H7.6v1.4H9v6.1H6.8v1.5h5.5Zm7.1-1.1c-.3.6-.8 1-1.5 1.3-.6.2-1.4.3-2.3.3-.9 0-1.6-.1-2.2-.4-.6-.3-1-.7-1.2-1.3l1.5-.7c.1.3.3.5.6.7.4.2.8.3 1.4.3.5 0 .9-.1 1.1-.2.3-.1.4-.3.4-.6 0-.2-.1-.4-.3-.5-.2-.1-.6-.3-1.1-.4l-.8-.2c-.7-.2-1.2-.5-1.5-.8-.3-.4-.5-.8-.5-1.4 0-.5.2-1 .5-1.4.4-.4.9-.6 1.5-.8.6-.1 1.3-.2 2-.2.8 0 1.5.1 2 .4.6.3 1 .7 1.2 1.3l-1.5.6c-.1-.3-.3-.5-.6-.6-.3-.2-.7-.2-1.2-.2-.5 0-.8.1-1 .2-.2.1-.3.3-.3.5 0 .2.1.4.3.5.2.1.6.3 1.2.4l.7.2c.8.2 1.3.5 1.6.9.3.4.5.8.5 1.4 0 .6-.2 1.1-.6 1.6Z"
      />
    </svg>
  );
}

function NodeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2.2 3.8 6.9v9.4L12 21l8.2-4.7V6.9L12 2.2Zm0 2.3 6 3.4v6.9l-6 3.4-6-3.4V7.9l6-3.4Zm-.9 3.5h1.8v5.1c0 1.2-.7 1.9-1.9 1.9-.4 0-.8-.1-1.1-.2l.2-1.3c.2.1.4.1.6.1.5 0 .7-.2.7-.7V8Z"
      />
    </svg>
  );
}

function ExpressIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M2.5 11.2h7.4v1.6H2.5v-1.6Zm9.4-3.4h9.6v1.5h-6.7L22 16.2h-2.1l-6.8-6.5v6.5h-1.2V7.8Z"
      />
    </svg>
  );
}

function NestIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12.4 3.2c2.4 1.8 4.3 4.4 4.3 7.4 0 2.2-1 4.1-2.5 5.5 1.9-1 3.3-2.9 3.3-5.2 0-3.4-2.5-6.2-5.1-7.7Zm-1.3.4C8.2 5.4 6 8.4 6 11.8c0 2.8 1.6 5.1 3.9 6.3-.4-.7-.7-1.5-.7-2.4 0-2.8 1.8-5.1 4.1-6.1-1.2-.7-2.3-1.7-2.2-6Zm.7 6.2c-1.8.8-3 2.6-3 4.6 0 1.4.6 2.6 1.5 3.5 1.3.4 2.6.4 3.9 0 .9-.9 1.5-2.1 1.5-3.5 0-2-.1-3.8-3.9-4.6Z"
      />
    </svg>
  );
}

function PostgresIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12.1 2.5c-2.4 0-4.5.7-5.7 1.8-.5.5-.8 1-.9 1.6 1.6-.7 3.7-1.1 6-1.1 2.5 0 4.8.5 6.4 1.3-.1-.6-.4-1.1-.9-1.6-1.2-1.2-3.2-2-4.9-2Zm-6.8 4c-.5.7-.7 1.6-.7 2.6v.3c1.5-.9 3.7-1.5 6.2-1.5s4.7.6 6.2 1.5v-.3c0-1-.3-1.9-.7-2.6-1.5-.8-3.6-1.2-5.5-1.2-1.9 0-4 .4-5.5 1.2Zm-.7 4.2c0 3.6 3.2 6.5 7.4 6.5h.1c.4 1.2.9 2.5 1.6 3.2.2.2.5.2.7 0 .7-.7 1.2-2 1.6-3.2h.1c4.2 0 7.4-2.9 7.4-6.5 0-.3 0-.6-.1-.9-1.5 1-3.8 1.7-6.5 1.7-2.6 0-4.9-.6-6.5-1.6-.1.3-.1.5-.1.8Zm4.8 7.5c-.3.8-.7 1.5-1 1.9 1.3.3 2.7.5 4.1.5 1.4 0 2.8-.2 4.1-.5-.3-.4-.7-1.1-1-1.9-.9.1-1.9.2-3.1.2-1.1 0-2.1-.1-3.1-.2Z"
      />
    </svg>
  );
}

function DockerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M4.2 11.2h2.1v2.1H4.2v-2.1Zm2.7 0h2.1v2.1H6.9v-2.1Zm2.7 0h2.1v2.1H9.6v-2.1Zm-2.7-2.7h2.1v2.1H6.9V8.5Zm2.7 0h2.1v2.1H9.6V8.5Zm2.7 2.7h2.1v2.1h-2.1v-2.1Zm0-2.7h2.1v2.1h-2.1V8.5Zm2.7 2.7h2.1v2.1h-2.1v-2.1ZM3.4 14.2c.2 1.8 1.7 3.4 4.7 3.4h7.5c2.6 0 4.4-1.8 4.4-4.1 0-.2 0-.5-.1-.7 1-.6 1.5-1.5 1.5-2.5 0-1.5-1.2-2.6-2.8-2.6-.4 0-.8.1-1.1.2C16.8 6.6 15.5 5.7 13.7 5.7c-2 0-3.5 1.2-4 2.9-.5-.2-1-.3-1.6-.3-1.9 0-3.4 1.4-3.4 3.2 0 .2 0 .4.1.6H3.4v2.1Z"
      />
    </svg>
  );
}

function LinuxIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2.8c-1.4 0-2.5 1.8-2.5 4.1 0 1.4.3 2.6.9 3.4L8.8 14c-.8.4-2 1.3-2 2.6 0 1.4 1.2 2.1 2.4 2.1.8 0 1.5-.3 2-.8.4.9 1 1.5 1.8 1.5s1.4-.6 1.8-1.5c.5.5 1.2.8 2 .8 1.2 0 2.4-.7 2.4-2.1 0-1.3-1.2-2.2-2-2.6l-1.6-3.7c.6-.8.9-2 .9-3.4 0-2.3-1.1-4.1-2.5-4.1Zm-1.7 4.5c.3 0 .5.4.5 1s-.2 1-.5 1-.5-.4-.5-1 .2-1 .5-1Zm3.4 0c.3 0 .5.4.5 1s-.2 1-.5 1-.5-.4-.5-1 .2-1 .5-1Z"
      />
    </svg>
  );
}

function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2.2A9.8 9.8 0 0 0 2.2 12c0 4.3 2.8 8 6.7 9.3.5.1.7-.2.7-.5v-1.7c-2.7.6-3.3-1.3-3.3-1.3-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.6.4-1.1.6-1.3-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 4.9.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A9.8 9.8 0 0 0 21.8 12 9.8 9.8 0 0 0 12 2.2Z"
      />
    </svg>
  );
}

function PrismaIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="m12.9 3.2 6.4 13.1c.3.6 0 1.3-.7 1.5l-5.7 1.8c-.6.2-1.2-.3-1.2-.9L8.4 4.5c-.1-.7.6-1.2 1.2-.9l3.3-.4Zm-1.6 2.3 2.7 12.1 3.8-1.2-6.5-10.9Z"
      />
    </svg>
  );
}

function OpenAIIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M14.4 4.2c-.9-.5-2-.5-3 0L8.2 5.9l3.8 2.2 3.8-2.2-1.4-1.7Zm4.1 2.4-1.5 1.8 2.2 1.3v4.6l1.5-1.8c.9-.5 1.4-1.5 1.4-2.6 0-1.1-.5-2-1.4-2.5l-2.2-1.3ZM5.5 6.6 3.3 7.9C2.4 8.4 1.9 9.4 1.9 10.5c0 1.1.5 2 1.4 2.5l2.2 1.3L7.1 12.9 4.9 11.6V7.9l.6-.3Zm9.9 2.2-3.4 2v4.3l3.4-2V8.8Zm-4.6 2v4.3l-3.4-2V8.8l3.4 2Zm-5.8 3.5-2.2 1.3c-.9.5-1.4 1.5-1.4 2.6 0 1.1.5 2 1.4 2.5l2.2 1.3 1.5-1.8-2.2-1.3v-4.6l.7.3Zm12.3 0v4.6l-2.2 1.3-1.5 1.8 2.2-1.3c.9-.5 1.4-1.5 1.4-2.5 0-1.1-.5-2.1-1.4-2.6l-2.2-1.3 1.5-1.8 2.2 1.8ZM9.4 18.2l1.4 1.7c.9.5 2 .5 3 0l1.4-1.7-3.8-1.2-2 1.2Z"
      />
    </svg>
  );
}

function ClaudeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12.8 3.2h-1.6L4.2 20.8h2.1l1.5-3.8h8.4l1.5 3.8h2.1L12.8 3.2Zm-4.2 11.4 3.4-8.5 3.4 8.5H8.6Z"
      />
    </svg>
  );
}

function AwsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M7.2 14.8c0 .4.4.6 1 .8.5.1 1.2.2 1.9.2 1.6 0 2.8-.4 3.6-1.1.8-.7 1.2-1.7 1.2-2.9 0-1.1-.3-1.9-.9-2.5-.6-.6-1.5-.9-2.7-.9-.6 0-1.1.1-1.6.2v-2h3.8V5.4H8.3c-.7 0-1.1.4-1.1 1.1v8.3Zm2.1-4.7c.3-.1.6-.1 1-.1.6 0 1 .1 1.3.4.3.3.4.6.4 1.1 0 .5-.2.9-.5 1.2-.3.3-.8.4-1.4.4-.3 0-.5 0-.8-.1v-2.9Zm7.4-4.7h-2.1v10.4c0 .7.4 1.1 1.1 1.1h1v-11.5Zm-12 13.6c2.4 1.4 5.5 2.1 8.6 2.1 2.9 0 5.8-.6 8.4-1.9.4-.2.7.2.4.5-2.3 3.1-6.1 4.8-10.1 4.8-3.7 0-7.2-1.5-9.5-4-.3-.3 0-.8.4-.6l1.8.9Z"
      />
    </svg>
  );
}

function AzureIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="m11.2 4.2 3.4 5.9-5.8 7.2H3.5L11.2 4.2Zm1.1.1L20.5 20.5h-6.3l-3.1-5.5 4.5-5.6-3.3-5.1Z"
      />
    </svg>
  );
}

function CloudflareIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M17.9 12.2c.4-1.2 1.5-2 2.8-2 .4 0 .8.1 1.2.2l.4-1.5A4.4 4.4 0 0 0 20.7 8.5c-2 0-3.7 1.3-4.3 3.1h-.2c-2.3 0-4.1 1.8-4.1 4 0 .2 0 .5.1.7H5.5c-.5 0-1 .4-1 1s.5 1 1 1h16.2c1.2 0 2.2-1 2.2-2.2 0-1.2-1-2.1-2.2-2.1h-2.8v-.8ZM6.8 13.2h4.4c.2-.7.5-1.3.9-1.8H6.8c-1 0-1.8.5-2.1 1.4-.2.6.1 1.2.6 1.5.2.1.5.2.7.2.5 0 1-.4 1.1-.9-.1-.2-.2-.3-.3-.4Z"
      />
    </svg>
  );
}

const ICONS: Record<Technology["id"], (props: IconProps) => ReactNode> = {
  react: ReactIcon,
  nextjs: NextIcon,
  typescript: TypeScriptIcon,
  nodejs: NodeIcon,
  express: ExpressIcon,
  nestjs: NestIcon,
  postgresql: PostgresIcon,
  docker: DockerIcon,
  linux: LinuxIcon,
  github: GitHubIcon,
  prisma: PrismaIcon,
  openai: OpenAIIcon,
  claude: ClaudeIcon,
  aws: AwsIcon,
  azure: AzureIcon,
  cloudflare: CloudflareIcon,
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
  postgresql: { icon: "#4169E1", glow: "rgba(65, 105, 225, 0.22)" },
  docker: { icon: "#2496ED", glow: "rgba(36, 150, 237, 0.22)" },
  linux: { icon: "#FCC624", glow: "rgba(252, 198, 36, 0.2)" },
  github: { icon: "#FFFFFF", glow: "rgba(255, 255, 255, 0.12)" },
  prisma: { icon: "#5A67D8", glow: "rgba(90, 103, 216, 0.22)" },
  openai: { icon: "#10A37F", glow: "rgba(16, 163, 127, 0.22)" },
  claude: { icon: "#D97757", glow: "rgba(217, 119, 87, 0.22)" },
  aws: { icon: "#FF9900", glow: "rgba(255, 153, 0, 0.22)" },
  azure: { icon: "#0078D4", glow: "rgba(0, 120, 212, 0.22)" },
  cloudflare: { icon: "#F38020", glow: "rgba(243, 128, 32, 0.24)" },
};

export function TechIcon({
  id,
  className = "h-5 w-5",
}: {
  id: Technology["id"];
  className?: string;
}) {
  const Icon = ICONS[id];
  return <Icon className={className} />;
}

