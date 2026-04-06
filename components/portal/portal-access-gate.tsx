"use client";

import { useState } from "react";

import type { PortalProject } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { formatDate, getInitials, formatServices } from "@/lib/utils";

function getStatusTone(status: string) {
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

export function PortalAccessGate({ projects }: { projects: PortalProject[] }) {
  const [email, setEmail] = useState("");
  const [activeProject, setActiveProject] = useState<PortalProject | null>(null);
  const [error, setError] = useState("");

  const handleAccess = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const match = projects.find(
      (project) => project.email.toLowerCase() === email.trim().toLowerCase(),
    );

    if (!match) {
      setError("No portal project matches that email yet. Try the demo access button.");
      return;
    }

    setError("");
    setActiveProject(match);
  };

  const openDemoProject = () => {
    setActiveProject(projects[0] ?? null);
    setError("");
  };

  if (!activeProject) {
    return (
      <div className="portal-gate-grid">
        <Surface className="portal-gate-card">
          <p className="eyebrow">Client Portal</p>
          <h1>Check release status, next steps, and admin progress.</h1>
          <p className="section-copy">
            This placeholder gate is designed so a real auth provider can be added
            later without redesigning the experience.
          </p>

          <form className="portal-form" onSubmit={handleAccess}>
            <label className="form-field">
              <span>Email</span>
              <input
                type="email"
                placeholder="artist@clientmail.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            {error ? (
              <p className="form-alert form-alert-error" aria-live="polite">
                {error}
              </p>
            ) : null}

            <div className="hero-actions">
              <Button type="submit">Access Portal</Button>
              <Button type="button" tone="secondary" onClick={openDemoProject}>
                Use Demo Access
              </Button>
            </div>
          </form>
        </Surface>

        <Surface className="portal-demo-card">
          <p className="eyebrow">Demo Credentials</p>
          <h2>Try the production-style portal with a sample client.</h2>
          <p className="section-copy">
            Demo email: <strong>{projects[0]?.email}</strong>
          </p>
        </Surface>
      </div>
    );
  }

  const completedItems = activeProject.checklist.filter((item) => item.complete).length;

  return (
    <div className="portal-shell">
      <Surface className="portal-hero">
        <div className="portal-identity">
          <div className="portal-avatar">{getInitials(activeProject.clientName)}</div>
          <div>
            <p className="eyebrow">Welcome back</p>
            <h1>{activeProject.clientName}</h1>
            <p className="section-copy">{activeProject.projectName}</p>
          </div>
        </div>

        <div className="portal-status">
          <Badge tone={getStatusTone(activeProject.status)}>{activeProject.status}</Badge>
          <Button type="button" tone="ghost" onClick={() => setActiveProject(null)}>
            Switch Client
          </Button>
        </div>
      </Surface>

      <div className="portal-grid">
        <Surface>
          <p className="eyebrow">Current Project</p>
          <h2>{activeProject.songTitle}</h2>
          <p className="section-copy">
            Package: <strong>{activeProject.packageName}</strong>
          </p>
          <p className="section-copy">{activeProject.notes}</p>
        </Surface>

        <Surface>
          <p className="eyebrow">Checklist Progress</p>
          <h2>
            {completedItems}/{activeProject.checklist.length} completed
          </h2>
          <div className="checklist-list">
            {activeProject.checklist.map((item) => (
              <div key={item.id} className="checklist-item">
                <div className={item.complete ? "check-dot check-complete" : "check-dot"} />
                <div>
                  <strong>{item.label}</strong>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Surface>
      </div>

      <div className="portal-grid">
        <Surface>
          <p className="eyebrow">Release Timeline</p>
          <h2>What happens next</h2>
          <div className="timeline-stack">
            {activeProject.timeline.map((milestone) => (
              <div key={milestone.label} className="timeline-row">
                <Badge
                  tone={
                    milestone.status === "complete"
                      ? "emerald"
                      : milestone.status === "current"
                        ? "gold"
                        : "slate"
                  }
                >
                  {milestone.status}
                </Badge>
                <div>
                  <strong>{milestone.label}</strong>
                  <p>{milestone.detail}</p>
                </div>
                <span>{formatDate(milestone.date)}</span>
              </div>
            ))}
          </div>
        </Surface>

        <Surface>
          <p className="eyebrow">Support</p>
          <h2>Need help or updated assets?</h2>
          <div className="support-block">
            <p>
              Account lead: <strong>{activeProject.managerName}</strong>
            </p>
            <p>
              Contact:{" "}
              <a href={`mailto:${activeProject.supportEmail}`}>
                {activeProject.supportEmail}
              </a>
            </p>
          </div>
          <div className="next-steps">
            <strong>Next steps</strong>
            <ul className="check-list compact">
              {activeProject.nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        </Surface>
      </div>

      <Surface>
        <p className="eyebrow">Submission History</p>
        <h2>Projects in this client workspace</h2>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Release</th>
                <th>Services</th>
                <th>Status</th>
                <th>Requested Date</th>
              </tr>
            </thead>
            <tbody>
              {activeProject.submissions.map((submission) => (
                <tr key={submission.id}>
                  <td>
                    <strong>{submission.songTitle}</strong>
                    <span>{submission.primaryArtist}</span>
                  </td>
                  <td>{formatServices(submission.servicesNeeded)}</td>
                  <td>
                    <Badge tone={getStatusTone(submission.status)}>
                      {submission.status}
                    </Badge>
                  </td>
                  <td>{formatDate(submission.requestedReleaseDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Surface>
    </div>
  );
}
