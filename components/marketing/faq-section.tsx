import { ButtonLink } from "@/components/ui/button";
import { ArrowUpRightIcon, HeadphonesIcon } from "@/components/ui/icons";
import { faqItems } from "@/lib/site-content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";

export function FaqSection() {
  return (
    <section id="faq" className="section-block faq-section">
      <div className="shell">
        <SectionHeading
          eyebrow="FAQ"
          title="Answers that make the buying decision easier."
          description="Use direct, high-trust copy to remove friction for artists, managers, and release teams who need confidence before they hand over admin work."
        />

        <div className="faq-layout">
          <Surface className="faq-side-card">
            <span className="icon-badge icon-badge-large" aria-hidden="true">
              <HeadphonesIcon />
            </span>
            <h3>Prefer a guided first step instead of guessing the right package?</h3>
            <p className="section-copy">
              Start with a free release audit and let Ghost Creators identify the
              setup gaps before you commit to a full scope.
            </p>
            <div className="faq-support-list">
              <div className="proof-chip">
                <span className="icon-badge icon-badge-muted" aria-hidden="true">
                  <HeadphonesIcon />
                </span>
                <span>Scope clarity before payment</span>
              </div>
              <div className="proof-chip">
                <span className="icon-badge icon-badge-muted" aria-hidden="true">
                  <HeadphonesIcon />
                </span>
                <span>Operator notes on the current release</span>
              </div>
            </div>
            <ButtonLink href="/intake" tone="secondary" icon={<ArrowUpRightIcon />}>
              Start Free Audit
            </ButtonLink>
          </Surface>

          <div className="faq-list">
            {faqItems.map((item, index) => (
              <details key={item.question} className="faq-item" open={index === 0}>
                <summary>
                  <span className="faq-index">0{index + 1}</span>
                  <span>{item.question}</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
