import type { LeadRecord } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Surface } from "@/components/ui/surface";
import { formatDate, getDaysUntil, getReleaseWindowLabel } from "@/lib/utils";

function getStatusTone(status: LeadRecord["status"]) {
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

export function AttentionBoard({
  submissions,
  upcomingReleaseDates,
}: {
  submissions: LeadRecord[];
  upcomingReleaseDates: LeadRecord[];
}) {
  const attentionItems = submissions
    .filter(
      (item) =>
        item.status === "Pending Review" ||
        item.status === "Awaiting Assets" ||
        item.readinessScore < 80,
    )
    .slice(0, 4);

  const urgentReleases = upcomingReleaseDates.slice(0, 3);

  return (
    <Surface className="attention-card">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">What Needs Attention Now</p>
          <h3>Focus the Ghost team on the highest-risk releases first.</h3>
        </div>
        <Badge tone="rose">{attentionItems.length || 0} active priorities</Badge>
      </div>

      <div className="attention-grid">
        <div className="attention-list">
          {attentionItems.length ? (
            attentionItems.map((item) => (
              <div key={item.id} className="attention-item">
                <div>
                  <strong>{item.songTitle}</strong>
                  <p>{item.clientName} - {item.notes}</p>
                </div>
                <div className="attention-item-meta">
                  <Badge tone={getStatusTone(item.status)}>{item.status}</Badge>
                  <Badge
                    tone={
                      item.readinessScore >= 86
                        ? "emerald"
                        : item.readinessScore >= 70
                          ? "gold"
                          : "rose"
                    }
                  >
                    {item.readinessScore} readiness
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-copy">No urgent review work is surfacing right now.</p>
          )}
        </div>

        <div className="attention-calendar">
          <div className="attention-calendar-head">
            <strong>Release pressure</strong>
            <p>Closest dates in the current window.</p>
          </div>

          {urgentReleases.length ? (
            urgentReleases.map((item) => (
              <div key={item.id} className="attention-release">
                <div>
                  <strong>{item.songTitle}</strong>
                  <p>{item.clientName}</p>
                </div>
                <div className="attention-item-meta">
                  <Badge tone={getUrgencyTone(item.requestedReleaseDate)}>
                    {getReleaseWindowLabel(item.requestedReleaseDate)}
                  </Badge>
                  <span>{formatDate(item.requestedReleaseDate)}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-copy">No upcoming release dates are currently scheduled.</p>
          )}
        </div>
      </div>
    </Surface>
  );
}
