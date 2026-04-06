import Image from "next/image";
import Link from "next/link";

import { navigationLinks } from "@/lib/site-content";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-stack">
        <div className="nav-shell">
          <Link
            href="/"
            className="brand-mark"
            aria-label="Ghost Creators Software Group home"
          >
            <span className="brand-glyph brand-logo-wrap" aria-hidden="true">
              <Image
                src="/logo.png"
                alt=""
                width={42}
                height={42}
                className="brand-logo"
              />
            </span>
            <span>
              Ghost Creators
              <strong>Software Group</strong>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigationLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/portal">Portal</Link>
          </nav>

          <div className="nav-actions">
            <ButtonLink href="/intake" tone="secondary" size="small">
              Free Audit
            </ButtonLink>
            <ButtonLink href="/intake" size="small" icon={<ArrowUpRightIcon />}>
              Get Started
            </ButtonLink>
          </div>
        </div>

        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href} className="mobile-nav-pill">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
