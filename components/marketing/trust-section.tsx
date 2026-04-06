import { authorityStats, benefitCards, trustHighlights } from "@/lib/site-content";
import {
  DiamondIcon,
  ShieldCheckIcon,
  SparkChartIcon,
} from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";

const benefitIcons = [ShieldCheckIcon, SparkChartIcon, DiamondIcon];

export function TrustSection() {
  return (
    <section id="benefits" className="section-block trust-section">
      <div className="shell page-stack">
        <SectionHeading
          eyebrow="Why Ghost Creators"
          title="Built to close premium clients and run cleaner release operations."
          description="The site experience should feel signature, serious, and trustworthy before a client ever submits a record. Ghost Creators now reads like a flagship music ops company instead of a starter template."
        />

        <div className="stats-grid authority-band">
          {authorityStats.map((stat) => (
            <Surface key={stat.value} className="authority-stat">
              <span>{stat.value}</span>
              <strong>{stat.label}</strong>
            </Surface>
          ))}
        </div>

        <div className="trust-grid">
          <div className="trust-column">
          <Surface className="trust-callout">
            <p className="eyebrow">The real problem</p>
            <h3>Artists do not lose money from lack of talent. They lose it in setup.</h3>
            <p className="section-copy">
              Clean metadata, verified splits, and aligned registrations create the
              confidence artists want before they hand over release administration.
            </p>
          </Surface>

          <div className="trust-list">
            {trustHighlights.map((item) => (
              <div key={item.title} className="trust-point">
                <span className="icon-badge icon-badge-muted" aria-hidden="true">
                  <ShieldCheckIcon />
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          </div>

          <div className="card-stack">
            {benefitCards.map((card, index) => {
              const Icon = benefitIcons[index] ?? DiamondIcon;

              return (
                <Surface key={card.title} className="benefit-card">
                  <span className="icon-badge icon-badge-large" aria-hidden="true">
                    <Icon />
                  </span>
                  <div>
                    <p className="eyebrow">{card.eyebrow}</p>
                    <h3>{card.title}</h3>
                  </div>
                  <p>{card.description}</p>
                </Surface>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
