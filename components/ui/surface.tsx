import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Surface({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
}) {
  return (
    <div className={cn("surface", className)} {...props}>
      {children}
    </div>
  );
}
