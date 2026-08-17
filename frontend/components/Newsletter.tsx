import { Mail } from "lucide-react";
import { type Locale, ui } from "@/lib/content";

export function Newsletter({ locale }: { locale: Locale }) {
  const copy = ui[locale];

  return (
    <section className="newsletter">
      <div>
        <h2>{copy.newsletterTitle}</h2>
        <p>{copy.newsletterCopy}</p>
      </div>
      <form>
        <Mail size={20} />
        <input type="email" placeholder={copy.emailPlaceholder} aria-label={copy.emailPlaceholder} />
        <button type="button">{copy.subscribe}</button>
      </form>
    </section>
  );
}
