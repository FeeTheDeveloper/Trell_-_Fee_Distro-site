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
          title="Answers for artists, managers, and release teams."
          description="Keep the buying decision simple with direct, trust-building detail."
        />

        <div className="faq-layout">
          <Surface className="faq-side-card">
            <span className="icon-badge icon-badge-large" aria-hidden="true">
              <HeadphonesIcon />
            </span>
            <h3>Prefer a guided first step?</h3>
            <p className="section-copy">
              Start with a free audit and let us identify the gaps before you commit
              to a full setup package.
            </p>
            <ButtonLink href="/intake" tone="secondary" icon={<ArrowUpRightIcon />}>
              Start Free Audit
            </ButtonLink>
          </Surface>

          <div className="faq-list">
            {faqItems.map((item) => (
              <details key={item.question} className="faq-item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
