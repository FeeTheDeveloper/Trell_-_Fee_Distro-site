import Link from "next/link";

import {
  DiamondIcon,
  ShieldCheckIcon,
  SparkChartIcon,
} from "@/components/ui/icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <p className="eyebrow">Ghost Creators Software Group</p>
          <h2>Futuristic release operations for artists who want their money handled right.</h2>
          <p className="section-copy">
            Music-business operations, distribution support, and publishing admin in
            one premium platform experience.
          </p>

          <div className="footer-trust">
            <div className="footer-trust-item">
              <span className="icon-badge icon-badge-muted" aria-hidden="true">
                <ShieldCheckIcon />
              </span>
              <span>Verified setup</span>
            </div>
            <div className="footer-trust-item">
              <span className="icon-badge icon-badge-muted" aria-hidden="true">
                <SparkChartIcon />
              </span>
              <span>Monetization visibility</span>
            </div>
            <div className="footer-trust-item">
              <span className="icon-badge icon-badge-muted" aria-hidden="true">
                <DiamondIcon />
              </span>
              <span>Premium client experience</span>
            </div>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <p>Platform</p>
            <Link href="/">Home</Link>
            <Link href="/intake">Intake</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/portal">Portal</Link>
          </div>
          <div>
            <p>Contact</p>
            <a href="mailto:support@ghostcreatorsgroup.com">
              support@ghostcreatorsgroup.com
            </a>
            <a href="tel:+13125550109">(312) 555-0109</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
