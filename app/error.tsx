"use client";

import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="section-block">
      <div className="shell">
        <Surface className="error-card">
          <p className="eyebrow">Something went wrong</p>
          <h1>We hit an unexpected issue loading this experience.</h1>
          <p className="section-copy">
            Try the action again. If the issue continues, re-check your environment
            variables or integration settings.
          </p>
          <Button type="button" onClick={reset}>
            Try Again
          </Button>
        </Surface>
      </div>
    </section>
  );
}
