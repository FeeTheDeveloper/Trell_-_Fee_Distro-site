import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tone = "neutral" | "emerald" | "gold" | "slate";

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span className={cn("badge", `badge-${tone}`, className)}>{children}</span>
  );
}
