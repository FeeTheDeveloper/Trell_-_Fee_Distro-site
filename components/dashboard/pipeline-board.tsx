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
  return (
    <div className="dashboard-grid">
      <Surface>
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Pipeline</p>
            <h3>Release pipeline status</h3>
          </div>
        </div>
        <div className="pipeline-list">
          {pipeline.map((stage) => (
            <div key={stage.label} className="pipeline-row">
              <div>
                <strong>{stage.label}</strong>
                <p>{stage.count} active items</p>
              </div>
              <Badge tone={stage.tone}>{stage.count}</Badge>
            </div>
          ))}
        </div>
      </Surface>

      <Surface>
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Service Mix</p>
            <h3>Current service breakdown</h3>
          </div>
        </div>
        <div className="service-breakdown">
          {serviceBreakdown.length ? (
            serviceBreakdown.map((service) => (
              <div key={service.label} className="service-row">
                <span>{service.label}</span>
                <strong>{service.count}</strong>
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
