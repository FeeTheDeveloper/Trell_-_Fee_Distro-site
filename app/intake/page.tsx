import type { Metadata } from "next";

import { IntakeForm } from "@/components/forms/intake-form";
import { Badge } from "@/components/ui/badge";
import { Surface } from "@/components/ui/surface";

export const metadata: Metadata = {
  title: "Intake",
  description:
    "Submit release details, rights information, and service scope for publishing and distribution setup.",
};

export default function IntakePage() {
  return (
    <section className="section-block">
      <div className="shell page-stack">
        <div className="page-header">
          <Badge tone="emerald">New Client Intake</Badge>
          <h1>Bring every release detail into one premium intake workflow.</h1>
          <p className="section-copy">
            Submit the release, rights, assets, and service needs in one place. We
            will validate the setup, push clean data into Notion, and move the
            project into review.
          </p>
        </div>

        <div className="intake-page-grid">
          <IntakeForm />

          <Surface className="intake-note">
            <p className="eyebrow">What happens after submission</p>
            <h2>We audit the release before anything starts moving.</h2>
            <ul className="check-list compact">
              <li>Metadata and contributor formatting review</li>
              <li>Split verification and rights confirmation</li>
              <li>Service-scope assignment for publishing and distribution</li>
              <li>Admin follow-up if files, credits, or dates need cleanup</li>
            </ul>
          </Surface>
        </div>
      </div>
    </section>
  );
}
