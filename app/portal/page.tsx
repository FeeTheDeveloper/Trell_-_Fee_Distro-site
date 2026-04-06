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
        <div className="page-header">
          <Badge tone="slate">Client Workspace</Badge>
          <h1>Give artists and managers a cleaner view of release progress.</h1>
          <p className="section-copy">
            This portal is built with a lightweight placeholder gate today, with a
            clean path to Clerk, NextAuth, or Supabase auth later.
          </p>
        </div>

        <PortalAccessGate projects={projects} />
      </div>
    </section>
  );
}
