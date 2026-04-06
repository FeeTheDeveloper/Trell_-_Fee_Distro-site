import type { MetricCard } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";

export function MetricsGrid({ metrics }: { metrics: MetricCard[] }) {
  return (
    <div className="metrics-grid">
      {metrics.map((metric, index) => (
        <Surface
          key={metric.label}
          className={cn(
            "metric-card",
            metric.emphasis === "primary" || index === 0 ? "metric-card-primary" : undefined,
          )}
        >
          <div className="metric-card-head">
            <span>{metric.label}</span>
            {metric.signal ? <Badge tone={metric.tone ?? "neutral"}>{metric.signal}</Badge> : null}
          </div>
          <strong>{metric.value}</strong>
          <p>{metric.detail}</p>
        </Surface>
      ))}
    </div>
  );
}
