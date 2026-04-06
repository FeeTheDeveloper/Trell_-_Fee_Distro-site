import type {
  DashboardSnapshot,
  LeadRecord,
  LeadStatus,
  PortalProject,
  ServiceOption,
} from "@/lib/types";
import { formatDate, formatNumber } from "@/lib/utils";

export const mockSubmissions: LeadRecord[] = [
  {
    id: "lead_001",
    clientName: "Avery Lane",
    email: "avery@artistmail.com",
    songTitle: "Midnight Signal",
    primaryArtist: "Avery Lane",
    status: "Pending Review",
    packageName: "Publishing Registration",
    servicesNeeded: [
      "Publishing Registration",
      "The MLC Setup",
      "SoundExchange Setup",
    ],
    requestedReleaseDate: "2026-04-18",
    createdAt: "2026-04-03T10:15:00.000Z",
    readinessScore: 78,
    notes: "Awaiting final cover art link and writer IPI confirmation.",
    source: "mock",
  },
  {
    id: "lead_002",
    clientName: "Jordan Price",
    email: "jordan@ghostclients.com",
    songTitle: "Northside Echo",
    primaryArtist: "Jordan Price",
    status: "Metadata QA",
    packageName: "Full Admin",
    servicesNeeded: [
      "Distribution Upload",
      "Publishing Registration",
      "Full Admin",
    ],
    requestedReleaseDate: "2026-04-23",
    createdAt: "2026-04-02T08:45:00.000Z",
    readinessScore: 86,
    notes: "Split sheet delivered. Final producer credit formatting in review.",
    source: "mock",
  },
  {
    id: "lead_003",
    clientName: "Nova Bloom",
    email: "nova@artistmail.com",
    songTitle: "Signal Fade",
    primaryArtist: "Nova Bloom",
    status: "Awaiting Assets",
    packageName: "Distribution Upload",
    servicesNeeded: ["Distribution Upload"],
    requestedReleaseDate: "2026-05-02",
    createdAt: "2026-03-31T14:05:00.000Z",
    readinessScore: 62,
    notes: "Waiting on WAV link and clean cover art export.",
    source: "mock",
  },
  {
    id: "lead_004",
    clientName: "Cass & Co.",
    email: "ops@cassco.com",
    songTitle: "Gold Skyline",
    primaryArtist: "Cass & Co.",
    status: "Ready for Release",
    packageName: "Full Admin",
    servicesNeeded: [
      "Distribution Upload",
      "Publishing Registration",
      "YouTube Content ID Monetization",
      "Full Admin",
    ],
    requestedReleaseDate: "2026-04-12",
    createdAt: "2026-03-29T12:30:00.000Z",
    readinessScore: 94,
    notes: "Cleared for scheduling after final DSP artwork crop review.",
    source: "mock",
  },
  {
    id: "lead_005",
    clientName: "Mira Saint",
    email: "mira@artistmail.com",
    songTitle: "Afterglow Policy",
    primaryArtist: "Mira Saint",
    status: "Scheduled",
    packageName: "Publishing Registration",
    servicesNeeded: ["Publishing Registration", "The MLC Setup"],
    requestedReleaseDate: "2026-04-10",
    createdAt: "2026-03-27T16:55:00.000Z",
    readinessScore: 91,
    notes: "All registrations queued. Monitoring launch window.",
    source: "mock",
  },
  {
    id: "lead_006",
    clientName: "Dorian Vale",
    email: "dorian@artistmail.com",
    songTitle: "Clear Receipt",
    primaryArtist: "Dorian Vale",
    status: "Live",
    packageName: "Full Admin",
    servicesNeeded: [
      "Distribution Upload",
      "Publishing Registration",
      "SoundExchange Setup",
      "Full Admin",
    ],
    requestedReleaseDate: "2026-04-01",
    createdAt: "2026-03-20T09:00:00.000Z",
    readinessScore: 97,
    notes: "Launch complete. Collection monitoring in progress.",
    source: "mock",
  },
];

export const mockPortalProjects: PortalProject[] = [
  {
    id: "portal_001",
    clientName: "Jordan Price",
    email: "jordan@ghostclients.com",
    projectName: "Northside Echo Campaign",
    songTitle: "Northside Echo",
    packageName: "Full Admin",
    status: "Metadata QA",
    nextSteps: [
      "Approve the final producer credit line.",
      "Confirm distributor destination account.",
      "Upload the final mastered WAV before end of day.",
    ],
    notes:
      "Your release is progressing well. We are finishing metadata QA before the distribution handoff.",
    supportEmail: "support@ghostcreatorsgroup.com",
    managerName: "Ghost Ops Admin",
    checklist: [
      {
        id: "check_001",
        label: "Intake approved",
        detail: "We received your release details and rights confirmation.",
        complete: true,
      },
      {
        id: "check_002",
        label: "Split review complete",
        detail: "Writer and producer percentages are balanced at 100%.",
        complete: true,
      },
      {
        id: "check_003",
        label: "Metadata QA",
        detail: "Final pass on contributor formatting and release metadata.",
        complete: false,
      },
      {
        id: "check_004",
        label: "DSP handoff",
        detail: "Release will be delivered after QA sign-off.",
        complete: false,
      },
    ],
    timeline: [
      {
        label: "Submission received",
        date: "2026-04-02",
        detail: "Intake entered into the admin pipeline.",
        status: "complete",
      },
      {
        label: "Rights review",
        date: "2026-04-04",
        detail: "Split and ownership confirmation complete.",
        status: "complete",
      },
      {
        label: "Metadata QA",
        date: "2026-04-06",
        detail: "Current stage. Final formatting pass is underway.",
        status: "current",
      },
      {
        label: "Distributor scheduling",
        date: "2026-04-08",
        detail: "Queued after approvals and asset lock.",
        status: "upcoming",
      },
    ],
    submissions: mockSubmissions.filter(
      (submission) => submission.email === "jordan@ghostclients.com",
    ),
  },
  {
    id: "portal_002",
    clientName: "Avery Lane",
    email: "avery@artistmail.com",
    projectName: "Midnight Signal Release",
    songTitle: "Midnight Signal",
    packageName: "Publishing Registration",
    status: "Pending Review",
    nextSteps: [
      "Send the final cover art export.",
      "Confirm PRO IPI number.",
      "Review the draft service scope summary.",
    ],
    notes:
      "We are waiting on a couple of missing details before we move this into registrations.",
    supportEmail: "support@ghostcreatorsgroup.com",
    managerName: "Ghost Rights Desk",
    checklist: [
      {
        id: "check_005",
        label: "Intake submitted",
        detail: "Your project is in the queue for admin review.",
        complete: true,
      },
      {
        id: "check_006",
        label: "Required assets complete",
        detail: "WAV and cover art links still need confirmation.",
        complete: false,
      },
      {
        id: "check_007",
        label: "Registration prep",
        detail: "Registration work starts after asset and rights review.",
        complete: false,
      },
    ],
    timeline: [
      {
        label: "Submission received",
        date: "2026-04-03",
        detail: "Initial intake received.",
        status: "complete",
      },
      {
        label: "Pending review",
        date: "2026-04-05",
        detail: "Current stage. Missing items are being reconciled.",
        status: "current",
      },
      {
        label: "Registration kickoff",
        date: "2026-04-08",
        detail: "Starts once missing items are confirmed.",
        status: "upcoming",
      },
    ],
    submissions: mockSubmissions.filter(
      (submission) => submission.email === "avery@artistmail.com",
    ),
  },
];

const pipelineLabels: LeadStatus[] = [
  "Pending Review",
  "Metadata QA",
  "Awaiting Assets",
  "Ready for Release",
  "Scheduled",
  "Live",
];

function countServices(submissions: LeadRecord[]) {
  const counts = new Map<string, number>();

  submissions.forEach((submission) => {
    submission.servicesNeeded.forEach((service) => {
      counts.set(service, (counts.get(service) ?? 0) + 1);
    });
  });

  return Array.from(counts.entries())
    .sort((left, right) => right[1] - left[1])
    .map(([label, count]) => ({ label, count }));
}

function countUpcoming(submissions: LeadRecord[]) {
  return submissions
    .filter((submission) => Boolean(submission.requestedReleaseDate))
    .sort((left, right) => {
      return (
        new Date(left.requestedReleaseDate ?? 0).getTime() -
        new Date(right.requestedReleaseDate ?? 0).getTime()
      );
    })
    .slice(0, 5);
}

export function buildDashboardSnapshot(
  submissions: LeadRecord[],
  source: DashboardSnapshot["source"],
): DashboardSnapshot {
  const now = new Date("2026-04-05T00:00:00.000Z");
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  const totalLeads = submissions.length;
  const newSubmissions = submissions.filter((submission) => {
    return new Date(submission.createdAt) >= sevenDaysAgo;
  }).length;
  const fullAdminRequests = submissions.filter((submission) =>
    submission.servicesNeeded.includes("Full Admin"),
  ).length;
  const pendingReview = submissions.filter(
    (submission) =>
      submission.status === "Pending Review" ||
      submission.status === "Awaiting Assets",
  ).length;
  const upcomingReleaseDates = submissions.filter((submission) => {
    if (!submission.requestedReleaseDate) {
      return false;
    }

    return new Date(submission.requestedReleaseDate) >= now;
  }).length;

  return {
    source,
    metrics: [
      {
        label: "Total leads",
        value: formatNumber(totalLeads),
        detail: "Across intake submissions and retained client work.",
      },
      {
        label: "New submissions",
        value: formatNumber(newSubmissions),
        detail: "Captured within the last seven days.",
      },
      {
        label: "Full Admin requests",
        value: formatNumber(fullAdminRequests),
        detail: "Premium admin packages currently in the mix.",
      },
      {
        label: "Pending review",
        value: formatNumber(pendingReview),
        detail: "Need metadata, rights, or asset follow-up.",
      },
      {
        label: "Upcoming release dates",
        value: formatNumber(upcomingReleaseDates),
        detail: "Scheduled or requested releases still ahead.",
      },
    ],
    pipeline: pipelineLabels.map((label) => ({
      label,
      count: submissions.filter((submission) => submission.status === label).length,
      tone:
        label === "Live"
          ? "emerald"
          : label === "Scheduled"
            ? "gold"
            : label === "Metadata QA"
              ? "slate"
              : "neutral",
    })),
    serviceBreakdown: countServices(submissions),
    recentSubmissions: submissions
      .slice()
      .sort(
        (left, right) =>
          new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
      )
      .slice(0, 6),
    upcomingReleaseDates: countUpcoming(submissions),
  };
}

export function getMockDashboardSnapshot() {
  return buildDashboardSnapshot(mockSubmissions, "mock");
}

export function getMockPortalProjects() {
  return mockPortalProjects;
}

export function getDashboardSourceLabel(source: DashboardSnapshot["source"]) {
  return source === "live"
    ? "Live Notion data"
    : `Demo snapshot updated for ${formatDate("2026-04-05")}`;
}

export function getServiceLabel(services: ServiceOption[]) {
  if (services.includes("Full Admin")) {
    return "Full Admin";
  }

  return services[0] ?? "Custom";
}
