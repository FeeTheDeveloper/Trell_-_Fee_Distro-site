"use client";

import Image from "next/image";
import { useState } from "react";

import type { PortalProject } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { formatDate, formatServices, getInitials } from "@/lib/utils";

function getStatusTone(status: string) {
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
          <div className="portal-brand-row">
            <span className="brand-glyph brand-logo-wrap portal-logo-wrap" aria-hidden="true">
              <Image src="/logo.png" alt="" width={54} height={54} className="brand-logo" />
            </span>
            <Badge tone="violet">Ghost Client Workspace</Badge>
          </div>

          <h1>Check release status, next steps, and admin progress with confidence.</h1>
          <p className="section-copy">
            This client portal is designed to feel reassuring, premium, and easy
            to understand while keeping the door open for a future auth provider.
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
          <p className="eyebrow">Demo Preview</p>
          <h2>See the premium client experience before real auth is added.</h2>
          <p className="section-copy">
            Demo email: <strong>{projects[0]?.email ?? "Unavailable"}</strong>
          </p>
          <ul className="check-list compact">
            <li>Clear project overview with current stage and support lead.</li>
            <li>Checklist progress and release timeline in one workspace.</li>
            <li>Submission history that makes status easy to understand.</li>
          </ul>
        </Surface>
      </div>
    );
  }

  const completedItems = activeProject.checklist.filter((item) => item.complete).length;
  const progressPercent = Math.round(
    (completedItems / Math.max(activeProject.checklist.length, 1)) * 100,
  );
  const currentMilestone = activeProject.timeline.find((item) => item.status === "current");
  const nextMilestone = activeProject.timeline.find((item) => item.status === "upcoming");

  return (
    <div className="portal-shell">
      <Surface className="portal-overview">
        <div className="portal-overview-main">
          <div className="portal-overview-top">
            <div className="portal-brand-row">
              <span className="brand-glyph brand-logo-wrap portal-logo-wrap" aria-hidden="true">
                <Image src="/logo.png" alt="" width={48} height={48} className="brand-logo" />
              </span>
              <Badge tone="violet">Ghost Client Workspace</Badge>
            </div>

            <Button type="button" tone="ghost" onClick={() => setActiveProject(null)}>
              Switch Client
            </Button>
          </div>

          <div className="portal-identity">
            <div className="portal-avatar">{getInitials(activeProject.clientName)}</div>
            <div>
              <p className="eyebrow">Welcome back</p>
              <h1>{activeProject.clientName}</h1>
              <p className="section-copy">{activeProject.projectName}</p>
            </div>
          </div>

          <p className="section-copy">{activeProject.notes}</p>

          <div className="portal-overview-pills">
            <Badge tone={getStatusTone(activeProject.status)}>{activeProject.status}</Badge>
            <Badge tone="slate">{activeProject.packageName}</Badge>
            {currentMilestone ? <Badge tone="gold">Current: {currentMilestone.label}</Badge> : null}
          </div>
        </div>

        <div className="project-health">
          <p className="eyebrow">Project health</p>
          <h2>{progressPercent}% complete</h2>
          <div className="progress-meter" aria-hidden="true">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>

          <div className="project-health-list">
            <div>
              <span>Next milestone</span>
              <strong>{nextMilestone?.label ?? "Awaiting Ghost update"}</strong>
            </div>
            <div>
              <span>Support lead</span>
              <strong>{activeProject.managerName}</strong>
            </div>
            <div>
              <span>Current release</span>
              <strong>{activeProject.songTitle}</strong>
            </div>
          </div>
        </div>
      </Surface>

      <div className="portal-grid">
        <Surface className="portal-summary-card">
          <p className="eyebrow">Project overview</p>
          <h2>{activeProject.songTitle}</h2>
          <div className="portal-summary-list">
            <div>
              <span>Package</span>
              <strong>{activeProject.packageName}</strong>
            </div>
            <div>
              <span>Current stage</span>
              <strong>{currentMilestone?.label ?? activeProject.status}</strong>
            </div>
            <div>
              <span>Support contact</span>
              <strong>{activeProject.supportEmail}</strong>
            </div>
          </div>
        </Surface>

        <Surface className="portal-checklist-card">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Checklist Progress</p>
              <h2>
                {completedItems}/{activeProject.checklist.length} completed
              </h2>
            </div>
            <Badge tone={progressPercent >= 80 ? "emerald" : "gold"}>
              {progressPercent}% done
            </Badge>
          </div>

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
        <Surface className="portal-timeline-card">
          <p className="eyebrow">Release timeline</p>
          <h2>What has happened and what comes next.</h2>
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

        <Surface className="support-card">
          <p className="eyebrow">Support and next steps</p>
          <h2>Need help, updated assets, or release clarification?</h2>
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

      <Surface className="portal-history-card">
        <p className="eyebrow">Submission history</p>
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
                  <td>
                    <strong>{submission.packageName}</strong>
                    <span>{formatServices(submission.servicesNeeded)}</span>
                  </td>
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
