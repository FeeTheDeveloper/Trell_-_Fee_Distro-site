import Image from "next/image";
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
          <div className="footer-brand-lockup">
            <span className="brand-glyph brand-logo-wrap footer-logo" aria-hidden="true">
              <Image src="/logo.png" alt="" width={48} height={48} className="brand-logo" />
            </span>
            <div>
              <p className="eyebrow">Ghost Creators Software Group</p>
              <h2>Premium release operations for artists who want the back end handled right.</h2>
            </div>
          </div>
          <p className="section-copy">
            Music-business operations, distribution support, and publishing admin in
            one premium platform experience designed to feel serious, custom, and
            trustworthy from the first click.
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
            <span className="footer-note">White-glove support for artists, managers, and labels.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
