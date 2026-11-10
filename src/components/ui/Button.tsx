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
    "bg-accent text-[#061018] hover:bg-[#38dcf4] shadow-[0_4px_20px_rgba(34,211,238,0.18)]",
  secondary:
    "border border-white/15 bg-white/[0.04] text-foreground hover:border-white/30 hover:bg-white/[0.08]",
  ghost: "bg-transparent text-muted hover:text-foreground",
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
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[12px] px-5 py-3 text-sm font-semibold tracking-wide transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-50",
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
