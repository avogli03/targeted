import Image from "next/image";
import Link from "next/link";
import { type DisplayArticle } from "@/lib/strapi";
import { type Locale, ui } from "@/lib/content";

export function ArticleCard({
  article,
  locale,
  compact = false,
  feature = false
}: {
  article: DisplayArticle;
  locale: Locale;
  compact?: boolean;
  feature?: boolean;
}) {
  const articleHref = `/${locale}/${article.categorySlug}/${article.slug}`;

  return (
    <article className={`${feature ? "story-card feature-card" : "story-card"}${compact ? " compact" : ""}`}>
      <Link className="thumb" href={articleHref} aria-label={article.title}>
        <Image src={article.image} alt="" fill unoptimized sizes="(max-width: 760px) 100vw, 33vw" />
      </Link>
      <div className="story-body">
        <div className="tag-row">
          <span>{article.category}</span>
        </div>
        <h3>{article.title}</h3>
        {!compact && <p>{article.excerpt}</p>}
        <Link className="read-more" href={articleHref}>
          {ui[locale].readMore}
        </Link>
      </div>
    </article>
  );
}
