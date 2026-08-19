import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { Footer } from "@/components/Footer";
import { HeroSlider } from "@/components/HeroSlider";
import { SiteHeader } from "@/components/SiteHeader";
import { type Locale, ui } from "@/lib/content";
import { getArticles } from "@/lib/strapi";
import { categorySlugs, categoryTitle, isLocale, locales } from "@/lib/site";

export const revalidate = 30;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleHome({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const copy = ui[locale];
  const articles = await getArticles(locale);
  const featured = articles.filter((article) => article.featured);
  const leadArticles = featured.length ? featured : articles.slice(0, 5);
  const latest = articles.filter((article) => !leadArticles.some((lead) => lead.id === article.id)).slice(0, 8);

  return (
    <main>
      <SiteHeader locale={locale} />

      {leadArticles.length > 0 && (
        <section aria-label={copy.leadLabel}>
          <HeroSlider articles={leadArticles} locale={locale} />
        </section>
      )}

      <section className="content-band">
        <div className="section-heading">
          <h2>{copy.latest}</h2>
        </div>
        <div className="latest-grid">
          {(latest.length ? latest : articles).slice(0, 8).map((article) => (
            <ArticleCard key={article.id} article={article} locale={locale} />
          ))}
        </div>
      </section>

      {categorySlugs.map((category) => {
        const categoryArticles = articles.filter((article) => article.categorySlug === category);
        if (!categoryArticles.length) return null;

        return (
          <section className="category-section" key={category}>
            <div className="section-heading">
              <h2>{categoryTitle(category, locale)}</h2>
            </div>
            <div className="category-list">
              {categoryArticles.slice(0, 4).map((article) => (
                <ArticleCard key={article.id} article={article} locale={locale} />
              ))}
            </div>
          </section>
        );
      })}

      <Footer locale={locale} />
    </main>
  );
}
