import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { getArticleWithAlternates } from "@/lib/strapi";
import { categoryTitle, isCategorySlug, isLocale } from "@/lib/site";
import type { Locale } from "@/lib/content";

export const revalidate = 30;

function blockText(block: any) {
  return (block?.children ?? [])
    .map((child: any) => child?.text)
    .filter(Boolean)
    .join("")
    .trim();
}

function renderBlock(block: any, index: number) {
  const text = blockText(block);
  if (!text) return null;

  if (block?.type === "heading") {
    const Heading = block.level === 1 ? "h2" : "h3";
    return <Heading key={index}>{text}</Heading>;
  }

  return <p key={index}>{text}</p>;
}

export default async function ArticlePage({
  params
}: {
  params: { locale: string; category: string; slug: string };
}) {
  if (!isLocale(params.locale) || !isCategorySlug(params.category)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const category = params.category;
  const { article, languageHrefOverrides } = await getArticleWithAlternates(locale, category, params.slug);

  if (!article) {
    notFound();
  }

  const bodyBlocks = article.contentBlocks?.length ? article.contentBlocks : [{ type: "paragraph", children: [{ text: article.excerpt }] }];

  return (
    <main>
      <SiteHeader locale={locale} languageHrefOverrides={languageHrefOverrides} />

      <article className="article-section">
        <Link className="article-kicker" href={`/${locale}/${category}`}>
          {categoryTitle(category, locale)}
        </Link>
        <h1>{article.title}</h1>
        <div className="article-hero">
          <Image src={article.image} alt="" fill unoptimized sizes="(max-width: 760px) 100vw, 960px" priority />
        </div>
        <div className="article-content">{bodyBlocks.map(renderBlock)}</div>
      </article>

      <Footer locale={locale} />
    </main>
  );
}
