import type { Metadata } from "next";

import { PortalAccessGate } from "@/components/portal/portal-access-gate";
import { Badge } from "@/components/ui/badge";
import { getMockPortalProjects } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Portal",
  description:
    "Client-facing release portal for project status, checklists, and next steps.",
};

export default function PortalPage() {
  const projects = getMockPortalProjects();

  return (
    <section className="section-block">
      <div className="shell page-stack">
        <div className="page-header page-header-premium">
          <Badge tone="violet">Client Workspace</Badge>
          <h1>Give artists and managers a premium, trust-first view of release progress.</h1>
          <p className="section-copy">
            This portal keeps the lightweight placeholder gate in place for now,
            while making the client-facing experience feel far more polished,
            informed, and production-ready.
          </p>
        </div>

        <PortalAccessGate projects={projects} />
      </div>
    </section>
  );
}
