"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type MouseEvent } from "react";
import { type Locale } from "@/lib/content";
import { locales } from "@/lib/site";

type LanguageHrefs = Partial<Record<Locale, string>>;

function hrefForLocale(pathname: string, targetLocale: Locale, hrefs?: LanguageHrefs) {
  if (hrefs?.[targetLocale]) return hrefs[targetLocale];

  const parts = pathname.split("/");
  const currentLocale = parts[1];

  if (locales.includes(currentLocale as Locale)) {
    parts[1] = targetLocale;
    return parts.join("/") || `/${targetLocale}`;
  }

  return `/${targetLocale}`;
}

export function LanguageSwitch({ locale, label, hrefs }: { locale: Locale; label: string; hrefs?: LanguageHrefs }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchLanguage(event: MouseEvent<HTMLAnchorElement>, targetLocale: Locale) {
    event.preventDefault();
    router.push(`${hrefForLocale(pathname, targetLocale, hrefs)}${window.location.hash}`);
  }

  return (
    <div className="language-switch" aria-label={label}>
      <Link className={locale === "en" ? "active" : ""} href={hrefForLocale(pathname, "en", hrefs)} onClick={(event) => switchLanguage(event, "en")}>
        EN
      </Link>
      <Link className={locale === "sq" ? "active" : ""} href={hrefForLocale(pathname, "sq", hrefs)} onClick={(event) => switchLanguage(event, "sq")}>
        SQ
      </Link>
    </div>
  );
}
