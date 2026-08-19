import { notFound } from "next/navigation";
import { CircleUser, Mail, PhoneCall, SendHorizontal } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { isLocale, locales } from "@/lib/site";
import type { Locale } from "@/lib/content";

export const revalidate = 30;

const contactCopy = {
  en: {
    title: "Contact",
    intro: "Send us your message and our team will get back to you.",
    firstName: "Name",
    firstNamePlaceholder: "First name",
    lastName: "Surname",
    lastNamePlaceholder: "Last name",
    email: "Email",
    emailPlaceholder: "Email address",
    mobile: "Mobile",
    mobilePlaceholder: "Phone number",
    message: "Message",
    messagePlaceholder: "Write your message",
    submit: "Send message"
  },
  sq: {
    title: "Kontakt",
    intro: "Na dërgoni mesazhin tuaj dhe ekipi ynë do t'ju përgjigjet.",
    firstName: "Emri",
    firstNamePlaceholder: "Emri",
    lastName: "Mbiemri",
    lastNamePlaceholder: "Mbiemri",
    email: "Email",
    emailPlaceholder: "Adresa e emailit",
    mobile: "Telefoni",
    mobilePlaceholder: "Numri i telefonit",
    message: "Mesazhi",
    messagePlaceholder: "Shkruani mesazhin tuaj",
    submit: "Dërgo mesazhin"
  }
} satisfies Record<Locale, Record<string, string>>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const copy = contactCopy[locale];

  return (
    <main>
      <SiteHeader locale={locale} />

      <section className="contact-section">
        <div className="contact-heading">
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
        </div>

        <form className="contact-form">
          <div className="form-row">
            <label>
              <span>{copy.firstName}</span>
              <div className="field-shell">
                <CircleUser size={18} />
                <input name="firstName" type="text" placeholder={copy.firstNamePlaceholder} autoComplete="given-name" />
              </div>
            </label>
            <label>
              <span>{copy.lastName}</span>
              <div className="field-shell">
                <CircleUser size={18} />
                <input name="lastName" type="text" placeholder={copy.lastNamePlaceholder} autoComplete="family-name" />
              </div>
            </label>
          </div>

          <label>
            <span>{copy.email} *</span>
            <div className="field-shell">
              <Mail size={18} />
              <input name="email" type="email" placeholder={copy.emailPlaceholder} autoComplete="email" required />
            </div>
          </label>

          <label>
            <span>{copy.mobile} *</span>
            <div className="field-shell">
              <PhoneCall size={18} />
              <input name="mobile" type="tel" placeholder={copy.mobilePlaceholder} autoComplete="tel" required />
            </div>
          </label>

          <label>
            <span>{copy.message} *</span>
            <textarea name="message" placeholder={copy.messagePlaceholder} rows={7} required />
          </label>

          <button type="submit">
            <SendHorizontal size={18} />
            {copy.submit}
          </button>
        </form>
      </section>

      <Footer locale={locale} />
    </main>
  );
}
