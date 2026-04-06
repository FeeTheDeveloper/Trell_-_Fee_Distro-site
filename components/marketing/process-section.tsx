import { processSteps } from "@/lib/site-content";
import {
  CalendarIcon,
  ChecklistIcon,
  ShieldCheckIcon,
  SparkChartIcon,
} from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";

const processIcons = [
  ChecklistIcon,
  ShieldCheckIcon,
  SparkChartIcon,
  CalendarIcon,
];

export function ProcessSection() {
  return (
    <section id="process" className="section-block process-section">
      <div className="shell">
        <SectionHeading
          eyebrow="How It Works"
          title="A tighter release system from client intake to launch confidence."
          description="The Ghost workflow is built to reduce avoidable revenue leaks before they turn into cleanup work, missed royalties, or client friction."
          actions={<Badge tone="slate">Intake to release day</Badge>}
        />

        <div className="timeline-grid">
          {processSteps.map((step, index) => {
            const Icon = processIcons[index] ?? ChecklistIcon;

            return (
              <Surface key={step.title} className="timeline-card">
                <div className="timeline-card-head">
                  <span className="timeline-index">{step.timeframe}</span>
                  <span className="icon-badge icon-badge-muted" aria-hidden="true">
                    <Icon />
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className="timeline-note">
                  <span>Operator note</span>
                  <strong>{step.operatorNote}</strong>
                </div>
              </Surface>
            );
          })}
        </div>
      </div>
    </section>
  );
}
