import type { Metadata } from "next";

import { AttentionBoard } from "@/components/dashboard/attention-board";
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
  const pendingReviewMetric =
    snapshot.metrics.find((metric) => metric.label === "Pending review")?.value ?? "0";
  const upcomingMetric =
    snapshot.metrics.find((metric) => metric.label === "Upcoming release dates")?.value ?? "0";
  const premiumDemandMetric =
    snapshot.metrics.find((metric) => metric.label === "Full Admin requests")?.value ?? "0";

  return (
    <section className="section-block">
      <div className="shell page-stack">
        <div className="page-header page-header-premium">
          <Badge tone={snapshot.source === "live" ? "emerald" : "violet"}>
            {getDashboardSourceLabel(snapshot.source)}
          </Badge>
          <h1>Ghost operator control center for releases, leads, and premium demand.</h1>
          <p className="section-copy">
            Track intake pressure, release urgency, and high-value service demand
            in one view designed to help the team act instead of just observe.
          </p>
        </div>

        <Surface className="operator-banner">
          <div>
            <p className="eyebrow">Ghost Ops Control Room</p>
            <h2>See what needs attention now, what is close to launch, and where premium demand is building.</h2>
          </div>
          <div className="operator-banner-pills">
            <Badge tone="rose">{pendingReviewMetric} pending review</Badge>
            <Badge tone="gold">{upcomingMetric} upcoming releases</Badge>
            <Badge tone="violet">{premiumDemandMetric} full admin requests</Badge>
          </div>
        </Surface>

        <MetricsGrid metrics={snapshot.metrics} />
        <AttentionBoard
          submissions={snapshot.recentSubmissions}
          upcomingReleaseDates={snapshot.upcomingReleaseDates}
        />
        <PipelineBoard
          pipeline={snapshot.pipeline}
          serviceBreakdown={snapshot.serviceBreakdown}
        />
        <RecentSubmissionsTable
          submissions={snapshot.recentSubmissions}
          upcomingReleaseDates={snapshot.upcomingReleaseDates}
        />

        <Surface className="operator-note">
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
