import Link from "next/link";
import { Mail } from "lucide-react";
import { type Locale, ui } from "@/lib/content";
import { navLinks } from "@/lib/site";

export function Footer({ locale }: { locale: Locale }) {
  const copy = ui[locale];

  return (
    <footer className="site-footer" id="newsletter">
      <div className="footer-newsletter">
        <div>
          <h2>{copy.newsletterTitle}</h2>
          <p>{copy.newsletterCopy}</p>
        </div>
        <form>
          <Mail size={20} />
          <input type="email" placeholder={copy.emailPlaceholder} aria-label={copy.emailPlaceholder} />
          <button type="button">{copy.subscribe}</button>
        </form>
      </div>

      <div className="footer-links">
        <span className="footer-brand">Targeted</span>
        <nav aria-label="Footer navigation">
          {navLinks(locale).map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="footer-copyright">
        <span>Targeted</span>
        <span>Business, lifestyle, wellbeing and marketing stories.</span>
      </div>
    </footer>
  );
}
