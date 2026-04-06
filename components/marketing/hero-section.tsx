import Image from "next/image";

import { heroStats } from "@/lib/site-content";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import {
  ArrowUpRightIcon,
  ChecklistIcon,
  ShieldCheckIcon,
  SparkChartIcon,
} from "@/components/ui/icons";
import { Surface } from "@/components/ui/surface";

const trustSignals = [
  { label: "Rights verification", icon: ShieldCheckIcon },
  { label: "Metadata precision", icon: ChecklistIcon },
  { label: "Revenue tracking", icon: SparkChartIcon },
];

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="shell hero-stage">
        <Image
          src="/logo.png"
          alt="Ghost Creators Software Group"
          width={180}
          height={180}
          className="hero-logo"
          priority
        />

        <div className="hero-topline hero-topline-center">
          <Badge tone="slate">Ghost Creators Software Group</Badge>
          <p className="eyebrow">Music + Tech Fusion</p>
        </div>

        <div className="hero-copy hero-copy-center">
          <h1 className="hero-title">
            Get Paid From Your Music <span className="text-gradient">The Right Way</span>
          </h1>

          <p className="hero-subtext">
            Publishing / Distribution / Rights Management
          </p>

          <p className="hero-problem hero-description">
            Most artists lose money because their releases are set up wrong. We
            handle your metadata, registrations, and monetization so every dollar
            gets tracked and collected.
          </p>

          <div className="hero-actions hero-actions-center">
            <ButtonLink href="/intake" icon={<ArrowUpRightIcon />}>
              Get Started
            </ButtonLink>
            <ButtonLink href="/intake" tone="secondary" icon={<SparkChartIcon />}>
              Free Audit
            </ButtonLink>
          </div>
        </div>

        <div className="hero-proof-list hero-proof-list-center" aria-label="Core trust signals">
          {trustSignals.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="proof-chip">
                <span className="icon-badge" aria-hidden="true">
                  <Icon />
                </span>
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>

        <div className="hero-support-grid">
          <Surface className="hero-spotlight-card">
            <p className="eyebrow">Ghost Ops Console</p>
            <h2>Premium release handling without guesswork.</h2>
            <p className="section-copy">
              A darker, sharper interface built to make artists trust the process
              before they ever submit a release.
            </p>

            <div className="hero-mini-cards">
              <div className="hero-mini-card">
                <span>Core stack</span>
                <strong>Publishing + distribution + monetization</strong>
              </div>
              <div className="hero-mini-card">
                <span>Ideal for</span>
                <strong>Artists, managers, labels, and premium admin clients</strong>
              </div>
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
    </section>
  );
}
