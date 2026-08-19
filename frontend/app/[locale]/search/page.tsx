import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { getArticles } from "@/lib/strapi";
import { isLocale } from "@/lib/site";
import { type Locale, ui } from "@/lib/content";

export const revalidate = 30;

export default async function SearchPage({
  params,
  searchParams
}: {
  params: { locale: string };
  searchParams: { q?: string };
}) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const copy = ui[locale];
  const query = (searchParams.q ?? "").trim();

  const articles = query.length ? await getArticles(locale) : [];
  const needle = query.toLowerCase();
  const results = query.length
    ? articles.filter((article) => article.title.toLowerCase().includes(needle) || article.excerpt.toLowerCase().includes(needle))
    : [];

  return (
    <main>
      <SiteHeader locale={locale} />

      <section className="archive-section">
        <div className="archive-heading">
          <h1>{query ? `${copy.searchResultsFor} "${query}"` : copy.searchPlaceholder}</h1>
        </div>

        {results.length > 0 ? (
          <div className="archive-grid">
            {results.map((article) => (
              <ArticleCard key={article.id} article={article} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="empty-state">{copy.noResults}</p>
        )}
      </section>

      <Footer locale={locale} />
    </main>
  );
}
