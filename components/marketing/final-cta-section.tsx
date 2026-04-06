import { ButtonLink } from "@/components/ui/button";
import { ArrowUpRightIcon, ShieldCheckIcon, SparkChartIcon } from "@/components/ui/icons";
import { Surface } from "@/components/ui/surface";
import { finalCtaPoints } from "@/lib/site-content";

export function FinalCtaSection() {
  return (
    <section className="section-block final-cta-section">
      <div className="shell">
        <Surface className="final-cta">
          <div className="final-cta-copy">
            <div>
              <p className="eyebrow">Ready to tighten the release setup?</p>
              <h2>
                Start with the free audit. Move into premium Ghost ops when the release is ready.
              </h2>
              <p className="section-copy">
                Bring intake, metadata, rights, and monetization into one premium
                workflow that feels worthy of the artist brand it supports.
              </p>
            </div>

            <div className="final-cta-points">
              {finalCtaPoints.map((point, index) => (
                <div key={point} className="proof-chip">
                  <span className="icon-badge icon-badge-muted" aria-hidden="true">
                    {index === 0 ? <ShieldCheckIcon /> : <SparkChartIcon />}
                  </span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-actions final-cta-actions">
            <ButtonLink href="/intake" icon={<ArrowUpRightIcon />}>
              Book Free Audit
            </ButtonLink>
            <ButtonLink href="/intake" tone="secondary" icon={<ArrowUpRightIcon />}>
              Open Client Intake
            </ButtonLink>
          </div>
        </Surface>
      </div>
    </section>
  );
}
