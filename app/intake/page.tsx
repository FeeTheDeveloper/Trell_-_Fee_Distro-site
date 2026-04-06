import type { Metadata } from "next";

import { IntakeForm } from "@/components/forms/intake-form";
import { Badge } from "@/components/ui/badge";
import { Surface } from "@/components/ui/surface";
import { intakeStages } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Intake",
  description:
    "Submit release details, rights information, and service scope for publishing and distribution setup.",
};

export default function IntakePage({
  searchParams,
}: {
  searchParams?: { service?: string };
}) {
  return (
    <section className="section-block">
      <div className="shell page-stack">
        <div className="page-header page-header-premium">
          <Badge tone="violet">Free Audit + Client Intake</Badge>
          <h1>Bring every release detail into one premium intake workspace.</h1>
          <p className="section-copy">
            Submit the release, rights, assets, and service needs in one place.
            Ghost validates the setup, pushes clean data into Notion, and moves the
            project into review without changing the existing integration flow.
          </p>
        </div>

        <div className="stage-strip">
          {intakeStages.map((stage) => (
            <Surface key={stage.title} className="intake-stage-card">
              <p className="eyebrow">{stage.label}</p>
              <h2>{stage.title}</h2>
              <p>{stage.detail}</p>
            </Surface>
          ))}
        </div>

        <IntakeForm servicePresetKey={searchParams?.service} />
      </div>
    </section>
  );
}
