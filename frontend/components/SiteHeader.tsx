import Link from "next/link";
import { Search } from "lucide-react";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { navLinks } from "@/lib/site";
import { type Locale, ui } from "@/lib/content";

export function SiteHeader({
  locale,
  languageHrefOverrides
}: {
  locale: Locale;
  languageHrefOverrides?: Partial<Record<Locale, string>>;
}) {
  const copy = ui[locale];

  return (
    <header className="site-header">
      <div className="brand-row">
        <Link className="logo" href={`/${locale}`} aria-label="Targeted home">
          <span className="logo-mark" aria-hidden="true">
            <span />
          </span>
          <span>Targeted</span>
        </Link>
        <div className="header-actions">
          <a className="subscribe-button" href="#newsletter">
            {copy.subscribe}
          </a>
          <LanguageSwitch locale={locale} label={copy.language} hrefs={languageHrefOverrides} />
          <button className="icon-button" aria-label="Search">
            <Search size={18} />
          </button>
        </div>
      </div>
      <nav className="nav-bar" aria-label="Primary navigation">
        {navLinks(locale).map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
