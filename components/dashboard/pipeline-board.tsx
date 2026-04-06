import type { PipelineStage, ServiceBreakdown } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Surface } from "@/components/ui/surface";

export function PipelineBoard({
  pipeline,
  serviceBreakdown,
}: {
  pipeline: PipelineStage[];
  serviceBreakdown: ServiceBreakdown[];
}) {
  const highestDemand = Math.max(...serviceBreakdown.map((service) => service.count), 1);

  return (
    <div className="dashboard-secondary-grid">
      <Surface className="pipeline-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Pipeline</p>
            <h3>Release pipeline status</h3>
          </div>
        </div>

        <div className="pipeline-stage-grid">
          {pipeline.map((stage) => (
            <div key={stage.label} className="pipeline-stage-card">
              <div>
                <strong>{stage.label}</strong>
                <p>{stage.count} active items</p>
              </div>
              <Badge tone={stage.tone}>{stage.count}</Badge>
            </div>
          ))}
        </div>
      </Surface>

      <Surface className="service-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Service Mix</p>
            <h3>Current service demand</h3>
          </div>
        </div>

        <div className="service-breakdown">
          {serviceBreakdown.length ? (
            serviceBreakdown.map((service) => (
              <div key={service.label} className="service-demand-card">
                <div className="service-row">
                  <span>{service.label}</span>
                  <strong>{service.count}</strong>
                </div>
                <div className="service-demand-bar" aria-hidden="true">
                  <div
                    className="service-demand-fill"
                    style={{ width: `${(service.count / highestDemand) * 100}%` }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="empty-copy">No service data available yet.</p>
          )}
        </div>
      </Surface>
    </div>
  );
}
