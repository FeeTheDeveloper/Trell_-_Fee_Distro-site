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

const serviceMeta = {
  "Basic Upload": {
    icon: WaveIcon,
    label: "Launch support",
    note: "Fast release setup with sharper metadata and cleaner launch prep.",
  },
  "Full Admin": {
    icon: ShieldCheckIcon,
    label: "Rights setup",
    note: "Built for artists who want a premium partner across admin and setup.",
  },
  "Label Services": {
    icon: FolderIcon,
    label: "White-glove ops",
    note: "Structured for teams running multiple releases or higher-touch operations.",
  },
} as const;

export function ServicesSection() {
  return (
    <section id="services" className="section-block services-section">
      <div className="shell">
        <SectionHeading
          eyebrow="Service Scope"
          title="Premium setup packages built for release accuracy."
          description="Choose the level of support you need, from guided distribution delivery to full rights administration."
        />

        <div className="card-grid">
          {servicePlans.map((plan) => {
            const meta = serviceMeta[plan.name as keyof typeof serviceMeta];
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
                    <p className="eyebrow">
                      {plan.featured ? "Most Requested" : meta.label}
                    </p>
                    <span>{meta.note}</span>
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

                <ButtonLink
                  href={plan.href}
                  tone={plan.featured ? "primary" : "secondary"}
                  icon={<ArrowUpRightIcon />}
                >
                  Get Started
                </ButtonLink>
              </Surface>
            );
          })}
        </div>
      </div>
    </section>
  );
}
