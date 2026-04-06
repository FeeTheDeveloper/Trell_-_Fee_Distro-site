export const proAffiliations = ["BMI", "ASCAP", "None"] as const;
export const releaseVersions = ["Explicit", "Clean"] as const;
export const serviceOptions = [
  "Distribution Upload",
  "Publishing Registration",
  "The MLC Setup",
  "SoundExchange Setup",
  "YouTube Content ID Monetization",
  "Full Admin",
] as const;

export type ProAffiliation = (typeof proAffiliations)[number];
export type ReleaseVersion = (typeof releaseVersions)[number];
export type ServiceOption = (typeof serviceOptions)[number];

export type IntakeSubmission = {
  artistName: string;
  email: string;
  phone: string;
  proAffiliation: ProAffiliation;
  proIpiNumber: string;
  songTitle: string;
  primaryArtist: string;
  featuredArtists: string;
  producers: string;
  genre: string;
  releaseVersion: ReleaseVersion;
  totalWriters: number;
  artistSplit: number;
  producerSplit: number;
  otherWritersSplit: number;
  wavFileUrl: string;
  coverArtUrl: string;
  lyrics: string;
  distributor: string;
  requestedReleaseDate: string;
  servicesNeeded: ServiceOption[];
  rightsConfirmed: boolean;
};

export type ValidationResult = {
  readiness_score: number;
  errors: string[];
  warnings: string[];
  recommendations: string[];
  mode: "rules-only" | "ai-enhanced";
};

export type LeadStatus =
  | "Pending Review"
  | "Metadata QA"
  | "Awaiting Assets"
  | "Ready for Release"
  | "Scheduled"
  | "Live";

export type LeadRecord = {
  id: string;
  clientName: string;
  email: string;
  songTitle: string;
  primaryArtist: string;
  status: LeadStatus;
  packageName: string;
  servicesNeeded: ServiceOption[];
  requestedReleaseDate?: string;
  createdAt: string;
  readinessScore: number;
  notes: string;
  source: "mock" | "live";
};

export type MetricCard = {
  label: string;
  value: string;
  detail: string;
};

export type PipelineStage = {
  label: LeadStatus;
  count: number;
  tone: "neutral" | "emerald" | "gold" | "slate";
};

export type ServiceBreakdown = {
  label: string;
  count: number;
};

export type DashboardSnapshot = {
  source: "mock" | "live";
  metrics: MetricCard[];
  pipeline: PipelineStage[];
  serviceBreakdown: ServiceBreakdown[];
  recentSubmissions: LeadRecord[];
  upcomingReleaseDates: LeadRecord[];
};

export type PortalChecklistItem = {
  id: string;
  label: string;
  detail: string;
  complete: boolean;
};

export type ReleaseMilestone = {
  label: string;
  date: string;
  detail: string;
  status: "complete" | "current" | "upcoming";
};

export type PortalProject = {
  id: string;
  clientName: string;
  email: string;
  projectName: string;
  songTitle: string;
  packageName: string;
  status: LeadStatus;
  nextSteps: string[];
  notes: string;
  supportEmail: string;
  managerName: string;
  checklist: PortalChecklistItem[];
  timeline: ReleaseMilestone[];
  submissions: LeadRecord[];
};

export type IntakeRouteSuccess = {
  ok: true;
  message: string;
  submissionId: string;
};

export type IntakeRouteError = {
  ok: false;
  error: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export type IntakeRouteResponse = IntakeRouteSuccess | IntakeRouteError;

export type ValidationRouteResponse =
  | {
      ok: true;
      data: ValidationResult;
      message?: string;
    }
  | {
      ok: false;
      error: string;
    };
