import { processSteps } from "@/lib/site-content";
import {
  CalendarIcon,
  ChecklistIcon,
  ShieldCheckIcon,
  SparkChartIcon,
} from "@/components/ui/icons";
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
          title="A tighter release process from intake to collection."
          description="The platform is designed to reduce avoidable revenue leaks before they turn into support tickets or missed royalties."
        />

        <div className="timeline-grid">
          {processSteps.map((step, index) => {
            const Icon = processIcons[index] ?? ChecklistIcon;

            return (
              <Surface key={step.title} className="timeline-card">
                <div className="timeline-card-head">
                  <span className="timeline-index">0{index + 1}</span>
                  <span className="icon-badge icon-badge-muted" aria-hidden="true">
                    <Icon />
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </Surface>
            );
          })}
        </div>
      </div>
    </section>
  );
}
