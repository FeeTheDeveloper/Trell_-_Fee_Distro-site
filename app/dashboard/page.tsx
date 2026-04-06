import type { Metadata } from "next";

import { MetricsGrid } from "@/components/dashboard/metrics-grid";
import { PipelineBoard } from "@/components/dashboard/pipeline-board";
import { RecentSubmissionsTable } from "@/components/dashboard/recent-submissions-table";
import { Badge } from "@/components/ui/badge";
import { Surface } from "@/components/ui/surface";
import { getDashboardSourceLabel, getMockDashboardSnapshot } from "@/lib/mock-data";
import { getLiveDashboardSnapshot, isNotionConfigured } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Internal dashboard for leads, release pipeline, and service activity.",
};

export const dynamic = "force-dynamic";

async function getSnapshot() {
  if (!isNotionConfigured()) {
    return getMockDashboardSnapshot();
  }

  try {
    return await getLiveDashboardSnapshot();
  } catch {
    return getMockDashboardSnapshot();
  }
}

export default async function DashboardPage() {
  const snapshot = await getSnapshot();

  return (
    <section className="section-block">
      <div className="shell page-stack">
        <div className="page-header">
          <Badge tone={snapshot.source === "live" ? "emerald" : "gold"}>
            {getDashboardSourceLabel(snapshot.source)}
          </Badge>
          <h1>Internal admin dashboard for releases, leads, and service demand.</h1>
          <p className="section-copy">
            Track new submissions, full-admin demand, pending review work, and
            upcoming release pressure in one operating view.
          </p>
        </div>

        <MetricsGrid metrics={snapshot.metrics} />
        <PipelineBoard
          pipeline={snapshot.pipeline}
          serviceBreakdown={snapshot.serviceBreakdown}
        />
        <RecentSubmissionsTable
          submissions={snapshot.recentSubmissions}
          upcomingReleaseDates={snapshot.upcomingReleaseDates}
        />

        <Surface>
          <p className="eyebrow">Operational Note</p>
          <p className="section-copy">
            This dashboard uses live Notion data when the integration is configured,
            and falls back to a clear local mock snapshot when it is not.
          </p>
        </Surface>
      </div>
    </section>
  );
}
