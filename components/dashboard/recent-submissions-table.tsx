import type { LeadRecord } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Surface } from "@/components/ui/surface";
import { formatDate, formatServices, getDaysUntil, getReleaseWindowLabel } from "@/lib/utils";

function getBadgeTone(status: LeadRecord["status"]) {
  if (status === "Live") {
    return "emerald" as const;
  }

  if (status === "Pending Review") {
    return "rose" as const;
  }

  if (status === "Scheduled" || status === "Ready for Release") {
    return "gold" as const;
  }

  if (status === "Metadata QA") {
    return "slate" as const;
  }

  return "neutral" as const;
}

function getReadinessTone(score: number) {
  if (score >= 86) {
    return "emerald" as const;
  }

  if (score >= 70) {
    return "gold" as const;
  }

  return "rose" as const;
}

function getUrgencyTone(date?: string) {
  const daysUntil = getDaysUntil(date);

  if (daysUntil === null) {
    return "neutral" as const;
  }

  if (daysUntil <= 3) {
    return "rose" as const;
  }

  if (daysUntil <= 10) {
    return "gold" as const;
  }

  return "slate" as const;
}

export function RecentSubmissionsTable({
  submissions,
  upcomingReleaseDates,
}: {
  submissions: LeadRecord[];
  upcomingReleaseDates: LeadRecord[];
}) {
  return (
    <div className="dashboard-secondary-grid">
      <Surface className="table-card">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Recent Submissions</p>
            <h3>New leads and active client work</h3>
          </div>
        </div>

        {submissions.length ? (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Artist</th>
                  <th>Release</th>
                  <th>Scope</th>
                  <th>Status</th>
                  <th>Readiness</th>
                  <th>Release Window</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td>
                      <strong>{submission.clientName}</strong>
                      <span>{submission.email}</span>
                    </td>
                    <td>
                      <strong>{submission.songTitle}</strong>
                      <span>{submission.primaryArtist}</span>
                    </td>
                    <td>
                      <strong>{submission.packageName}</strong>
                      <span>{formatServices(submission.servicesNeeded)}</span>
                    </td>
                    <td>
                      <Badge tone={getBadgeTone(submission.status)}>
                        {submission.status}
                      </Badge>
                    </td>
                    <td>
                      <Badge tone={getReadinessTone(submission.readinessScore)}>
                        {submission.readinessScore}
                      </Badge>
                    </td>
                    <td>
                      <Badge tone={getUrgencyTone(submission.requestedReleaseDate)}>
                        {getReleaseWindowLabel(submission.requestedReleaseDate)}
                      </Badge>
                      <span>{formatDate(submission.requestedReleaseDate)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty-copy">No submissions yet. New leads will appear here.</p>
        )}
      </Surface>

      <Surface className="calendar-card">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Calendar</p>
            <h3>Upcoming release timeline</h3>
          </div>
        </div>

        {upcomingReleaseDates.length ? (
          <div className="upcoming-list">
            {upcomingReleaseDates.map((submission) => (
              <div key={submission.id} className="upcoming-item">
                <div>
                  <strong>{submission.songTitle}</strong>
                  <p>
                    {submission.clientName} • {submission.status}
                  </p>
                </div>
                <div className="attention-item-meta">
                  <Badge tone={getUrgencyTone(submission.requestedReleaseDate)}>
                    {getReleaseWindowLabel(submission.requestedReleaseDate)}
                  </Badge>
                  <span>{formatDate(submission.requestedReleaseDate)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-copy">
            No upcoming release dates are currently scheduled.
          </p>
        )}
      </Surface>
    </div>
  );
}
