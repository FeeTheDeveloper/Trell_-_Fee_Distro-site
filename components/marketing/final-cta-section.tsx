import { ButtonLink } from "@/components/ui/button";
import { ArrowUpRightIcon, ShieldCheckIcon, SparkChartIcon } from "@/components/ui/icons";
import { Surface } from "@/components/ui/surface";

export function FinalCtaSection() {
  return (
    <section className="section-block final-cta-section">
      <div className="shell">
        <Surface className="final-cta">
          <div className="final-cta-copy">
            <div>
              <p className="eyebrow">Ready to tighten the release setup?</p>
              <h2>
                Bring intake, metadata, and monetization into one premium workflow.
              </h2>
              <p className="section-copy">
                Start with a release audit, fix the weak spots, and move forward
                with a cleaner rights stack.
              </p>
            </div>

            <div className="final-cta-points">
              <div className="proof-chip">
                <span className="icon-badge icon-badge-muted" aria-hidden="true">
                  <ShieldCheckIcon />
                </span>
                <span>Rights-first setup</span>
              </div>
              <div className="proof-chip">
                <span className="icon-badge icon-badge-muted" aria-hidden="true">
                  <SparkChartIcon />
                </span>
                <span>Better monetization visibility</span>
              </div>
            </div>
          </div>
          <div className="hero-actions">
            <ButtonLink href="/intake" icon={<ArrowUpRightIcon />}>
              Get Started
            </ButtonLink>
            <ButtonLink href="/intake" tone="secondary" icon={<ArrowUpRightIcon />}>
              Free Audit
            </ButtonLink>
          </div>
        </Surface>
      </div>
    </section>
  );
}
