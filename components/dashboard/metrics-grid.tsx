import type { MetricCard } from "@/lib/types";
import { Surface } from "@/components/ui/surface";

export function MetricsGrid({ metrics }: { metrics: MetricCard[] }) {
  return (
    <div className="metrics-grid">
      {metrics.map((metric) => (
        <Surface key={metric.label} className="metric-card">
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
          <p>{metric.detail}</p>
        </Surface>
      ))}
    </div>
  );
}
