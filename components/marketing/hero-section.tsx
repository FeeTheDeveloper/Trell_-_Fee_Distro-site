import Image from "next/image";

import {
  heroConsoleChecks,
  heroConsoleMetrics,
  heroConsoleNotes,
  heroProofs,
  heroStats,
} from "@/lib/site-content";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import {
  ArrowUpRightIcon,
  ChecklistIcon,
  LayersIcon,
  ShieldCheckIcon,
  SparkChartIcon,
} from "@/components/ui/icons";
import { Surface } from "@/components/ui/surface";

const proofIcons = [
  { label: "Rights verification", icon: ShieldCheckIcon },
  { label: "Metadata precision", icon: ChecklistIcon },
  { label: "Revenue tracking", icon: SparkChartIcon },
];

const heroServiceSignals = [
  {
    title: "Rights review",
    detail: "Writers, splits, IPI details, and ownership confirmation before delivery.",
  },
  {
    title: "Release operations",
    detail: "Distributor timing, asset readiness, and handoff notes managed in one lane.",
  },
  {
    title: "Monetization setup",
    detail: "Publishing, MLC, SoundExchange, and admin scope aligned before launch.",
  },
];

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="shell hero-stage">
        <div className="hero-frame">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="hero-brand-lockup">
                <div className="hero-logo-orb">
                  <Image
                    src="/logo.png"
                    alt="Ghost Creators Software Group"
                    width={180}
                    height={180}
                    className="hero-logo"
                    priority
                  />
                </div>

                <div className="hero-brand-copy">
                  <Badge tone="violet">Ghost Creators Software Group</Badge>
                  <p className="hero-subtext">Flagship music operations desk</p>
                </div>
              </div>

              <div className="hero-copy-shell">
                <p className="eyebrow">Premium release infrastructure</p>
                <h1 className="hero-title">
                  The operator-grade release workflow behind a premium artist brand.
                </h1>

                <p className="hero-problem hero-description">
                  Ghost Creators handles metadata, rights, release ops, and
                  monetization readiness before small errors turn into lost money,
                  weak client trust, or launch-week chaos.
                </p>
              </div>

              <div className="hero-actions">
                <ButtonLink href="/intake" icon={<ArrowUpRightIcon />}>
                  Book Free Audit
                </ButtonLink>
                <ButtonLink href="/#services" tone="secondary" icon={<LayersIcon />}>
                  See Service Tiers
                </ButtonLink>
              </div>

              <div className="hero-proof-list" aria-label="Core trust signals">
                {heroProofs.map((label, index) => {
                  const Icon = proofIcons[index]?.icon ?? ShieldCheckIcon;

                  return (
                    <div key={label} className="proof-chip">
                      <span className="icon-badge" aria-hidden="true">
                        <Icon />
                      </span>
                      <span>{label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="hero-service-rail">
                {heroServiceSignals.map((item) => (
                  <div key={item.title} className="hero-service-card">
                    <span>{item.title}</span>
                    <strong>{item.detail}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-support-grid">
              <Surface className="hero-console hero-console-primary">
                <div className="hero-console-head">
                  <div>
                    <p className="eyebrow">Ghost Ops Console</p>
                    <h2>Luxury front-end. Serious release operations underneath.</h2>
                  </div>
                  <Badge tone="slate">Operator live view</Badge>
                </div>

                <div className="console-metrics">
                  {heroConsoleMetrics.map((metric) => (
                    <div key={metric.label} className="console-metric">
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                      <p>{metric.detail}</p>
                    </div>
                  ))}
                </div>

                <div className="console-list">
                  {heroConsoleChecks.map((item) => (
                    <div key={item} className="console-row">
                      <span className="icon-badge icon-badge-muted" aria-hidden="true">
                        <ChecklistIcon />
                      </span>
                      <div>
                        <strong>Audit checkpoint</strong>
                        <p>{item}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hero-panel-stack hero-console-foot">
                  {heroConsoleNotes.map((note) => (
                    <div key={note.label}>
                      <span>{note.label}</span>
                      <strong>{note.value}</strong>
                    </div>
                  ))}
                </div>
              </Surface>

              <div className="stats-grid" aria-label="Operational highlights">
                {heroStats.map((stat) => (
                  <Surface key={stat.label} className="stat-card neon-card">
                    <p className="stat-label">Operational proof</p>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </Surface>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
