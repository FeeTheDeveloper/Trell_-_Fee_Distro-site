import { servicePlans } from "@/lib/site-content";
import { ButtonLink } from "@/components/ui/button";
import {
  ArrowUpRightIcon,
  FolderIcon,
  ShieldCheckIcon,
  WaveIcon,
} from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";

const serviceIcons = {
  "Basic Upload": {
    icon: WaveIcon,
  },
  "Full Admin": {
    icon: ShieldCheckIcon,
  },
  "Label Services": {
    icon: FolderIcon,
  },
} as const;

const serviceTrustSignals = [
  "Free audit is included before final scope is locked.",
  "Every tier is designed to reduce launch friction and support cleanup work.",
  "Upgrade paths stay clear when a project grows beyond the original request.",
];

export function ServicesSection() {
  return (
    <section id="services" className="section-block services-section">
      <div className="shell">
        <SectionHeading
          eyebrow="Service Scope"
          title="Premium service tiers built to close serious clients."
          description="Choose the level of Ghost support you need, from launch cleanup to a full admin relationship across rights, delivery, and monetization."
          actions={
            <ButtonLink href="/intake" tone="secondary" size="small" icon={<ArrowUpRightIcon />}>
              Start Free Audit
            </ButtonLink>
          }
        />

        <div className="card-grid pricing-grid">
          {servicePlans.map((plan) => {
            const meta = serviceIcons[plan.name as keyof typeof serviceIcons];
            const Icon = meta.icon;

            return (
              <Surface
                key={plan.name}
                className={plan.featured ? "pricing-card pricing-featured" : "pricing-card"}
              >
                <div className="pricing-icon-row">
                  <span className="icon-badge icon-badge-large" aria-hidden="true">
                    <Icon />
                  </span>
                  <div className="pricing-kicker">
                    <p className="eyebrow">{plan.eyebrow}</p>
                    <span>{plan.note}</span>
                  </div>
                </div>

                <div className="pricing-header">
                  <div className="pricing-title">
                    <h3>{plan.name}</h3>
                    <p className="section-copy">{plan.description}</p>
                  </div>
                  <div className="pricing-value">
                    <strong>{plan.price}</strong>
                    <span>One-time setup</span>
                  </div>
                </div>

                <ul className="check-list compact">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <div className="pricing-detail-stack">
                  <div className="pricing-detail">
                    <span>Ideal for</span>
                    <p>{plan.idealFor}</p>
                  </div>
                  <div className="pricing-detail">
                    <span>Outcome</span>
                    <p>{plan.outcome}</p>
                  </div>
                </div>

                <div className="pricing-footer">
                  <ButtonLink
                    href={plan.href}
                    tone={plan.featured ? "primary" : "secondary"}
                    icon={<ArrowUpRightIcon />}
                  >
                    {plan.ctaLabel}
                  </ButtonLink>
                </div>
              </Surface>
            );
          })}
        </div>

        <div className="trust-inline-list" aria-label="Service trust signals">
          {serviceTrustSignals.map((item) => (
            <div key={item} className="proof-chip">
              <span className="icon-badge icon-badge-muted" aria-hidden="true">
                <ShieldCheckIcon />
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
