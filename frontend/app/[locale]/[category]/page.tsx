import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { getArticles } from "@/lib/strapi";
import { categorySlugs, categoryTitle, isCategorySlug, isLocale, locales } from "@/lib/site";
import type { Locale } from "@/lib/content";

export const revalidate = 30;

export function generateStaticParams() {
  return locales.flatMap((locale) => categorySlugs.map((category) => ({ locale, category })));
}

export default async function CategoryPage({ params }: { params: { locale: string; category: string } }) {
  if (!isLocale(params.locale) || !isCategorySlug(params.category)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const category = params.category;
  const articles = await getArticles(locale, { category });
  const title = categoryTitle(category, locale);

  return (
    <main>
      <SiteHeader locale={locale} />

      <section className="archive-section">
        <div className="archive-heading">
          <h1>{title}</h1>
        </div>
        {articles.length > 0 ? (
          <div className="archive-grid">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="empty-state">No articles found in this section yet.</p>
        )}
      </section>

      <Footer locale={locale} />
    </main>
  );
}
