import { benefitCards, trustHighlights } from "@/lib/site-content";
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
      <div className="shell trust-grid">
        <div className="trust-column">
          <SectionHeading
            eyebrow="Why Ghost Creators"
            title="Built to feel credible for artists and operationally useful for your team."
            description="This site is more than a landing page. It gives your business a cleaner front door, sharper intake quality, and stronger release visibility."
          />

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
              <div key={item} className="trust-point">
                <span className="icon-badge icon-badge-muted" aria-hidden="true">
                  <ShieldCheckIcon />
                </span>
                <span>{item}</span>
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
                  <p className="eyebrow">Operational Benefit</p>
                  <h3>{card.title}</h3>
                </div>
                <p>{card.description}</p>
              </Surface>
            );
          })}
        </div>
      </div>
    </section>
  );
}
