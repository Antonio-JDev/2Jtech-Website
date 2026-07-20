import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: ComponentProps<"button">["onClick"];
} & Omit<ComponentProps<"button">, "children" | "type" | "className" | "onClick">;

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-neon text-[#050505] hover:brightness-110 glow-neon shadow-[0_0_28px_rgba(0,239,252,0.22)]",
  secondary:
    "glass text-white hover:border-neon/40 hover:bg-white/[0.06]",
  ghost: "bg-transparent text-muted hover:text-white",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  ...props
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-[18px] px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    variants[variant],
    className,
  ].join(" ");

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick as ComponentProps<"a">["onClick"]}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
