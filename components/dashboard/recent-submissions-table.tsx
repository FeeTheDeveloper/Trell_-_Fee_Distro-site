import type { LeadRecord } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Surface } from "@/components/ui/surface";
import { formatDate, formatServices } from "@/lib/utils";

function getBadgeTone(status: LeadRecord["status"]) {
  if (status === "Live") {
    return "emerald" as const;
  }

  if (status === "Scheduled" || status === "Ready for Release") {
    return "gold" as const;
  }

  if (status === "Metadata QA") {
    return "slate" as const;
  }

  return "neutral" as const;
}

export function RecentSubmissionsTable({
  submissions,
  upcomingReleaseDates,
}: {
  submissions: LeadRecord[];
  upcomingReleaseDates: LeadRecord[];
}) {
  return (
    <div className="dashboard-grid">
      <Surface>
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
                  <th>Services</th>
                  <th>Status</th>
                  <th>Release Date</th>
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
                    <td>{formatServices(submission.servicesNeeded)}</td>
                    <td>
                      <Badge tone={getBadgeTone(submission.status)}>
                        {submission.status}
                      </Badge>
                    </td>
                    <td>{formatDate(submission.requestedReleaseDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty-copy">No submissions yet. New leads will appear here.</p>
        )}
      </Surface>

      <Surface>
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Calendar</p>
            <h3>Upcoming release dates</h3>
          </div>
        </div>

        {upcomingReleaseDates.length ? (
          <div className="upcoming-list">
            {upcomingReleaseDates.map((submission) => (
              <div key={submission.id} className="upcoming-item">
                <div>
                  <strong>{submission.songTitle}</strong>
                  <p>{submission.clientName}</p>
                </div>
                <span>{formatDate(submission.requestedReleaseDate)}</span>
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
