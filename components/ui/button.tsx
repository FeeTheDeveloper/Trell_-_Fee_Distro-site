import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonTone = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "small";

function getButtonClasses(tone: ButtonTone, size: ButtonSize) {
  return cn(
    "button",
    `button-${tone}`,
    size === "small" ? "button-small" : undefined,
  );
}

export function ButtonLink({
  href,
  children,
  tone = "primary",
  size = "default",
  className,
  icon,
  iconPosition = "right",
}: {
  href: string;
  children: ReactNode;
  tone?: ButtonTone;
  size?: ButtonSize;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}) {
  return (
    <Link href={href} className={cn(getButtonClasses(tone, size), className)}>
      {icon && iconPosition === "left" ? (
        <span className="button-icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="button-label">{children}</span>
      {icon && iconPosition === "right" ? (
        <span className="button-icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
    </Link>
  );
}

export function Button({
  children,
  tone = "primary",
  size = "default",
  className,
  icon,
  iconPosition = "right",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  tone?: ButtonTone;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}) {
  return (
    <button
      className={cn(getButtonClasses(tone, size), className)}
      {...props}
    >
      {icon && iconPosition === "left" ? (
        <span className="button-icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="button-label">{children}</span>
      {icon && iconPosition === "right" ? (
        <span className="button-icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
    </button>
  );
}
