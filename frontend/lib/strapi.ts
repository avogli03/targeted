import { articleMatchesCategory, categoryAliases, categorySlugs, demoArticlesForLocale, locales, slugifyCategory, type CategorySlug } from "@/lib/site";
import type { Locale } from "@/lib/content";

export type DisplayArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  featured?: boolean;
  category: string;
  categorySlug: string;
  contentBlocks?: any[];
};

type FetchOptions = {
  category?: CategorySlug;
  pageSize?: number;
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80";
const DEFAULT_STRAPI_URL = "https://harmonious-prize-e83f608dba.strapiapp.com";
const STRAPI_TIMEOUT_MS = 8000;

function apiBase() {
  return (process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL ?? DEFAULT_STRAPI_URL).replace(/\/$/, "");
}

function valueOf<T>(entry: any, key: string): T | undefined {
  return entry?.[key] ?? entry?.attributes?.[key];
}

function relationValue(entry: any, key: string) {
  const value = valueOf<any>(entry, key);
  return value?.data ?? value;
}

function mediaUrl(entry: any, mediaField = "cover") {
  const base = apiBase();
  const cover = relationValue(entry, mediaField);
  const media = Array.isArray(cover) ? cover[0] : cover;
  const rawUrl = valueOf<string>(media, "url");

  if (!rawUrl) return FALLBACK_IMAGE;
  if (rawUrl.startsWith("http")) return rawUrl;
  return `${base}${rawUrl}`;
}

function textExcerpt(entry: any) {
  const excerpt = valueOf<string>(entry, "excerpt") ?? valueOf<string>(entry, "Excerpt");
  if (excerpt) return excerpt;

  const body = valueOf<any>(entry, "body") ?? valueOf<any>(entry, "Description");
  if (!body) return "";
  if (typeof body === "string") return body.replace(/<[^>]+>/g, "").slice(0, 220);
  if (Array.isArray(body)) return blocksToText(body).slice(0, 220);
  return "";
}

function blocksToText(blocks: any[]): string {
  return blocks
    .flatMap((block) => block?.children ?? [])
    .map((child) => child?.text)
    .filter(Boolean)
    .join(" ");
}

function toBlocks(body: any): any[] | undefined {
  if (Array.isArray(body)) return body;
  if (typeof body === "string" && body.trim()) {
    return body
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((paragraph) => ({ type: "paragraph", children: [{ text: paragraph }] }));
  }
  return undefined;
}

function blockText(block: any): string {
  return (block?.children ?? [])
    .map((child: any) => child?.text)
    .filter(Boolean)
    .join(" ")
    .trim();
}

function firstBlockText(blocks: any[], type?: string): string | undefined {
  const block = blocks.find((item) => !type || item?.type === type);
  const text = blockText(block);
  return text || undefined;
}

function excerptFromBlocks(blocks: any[]) {
  return blocks
    .filter((block) => block?.type !== "heading")
    .map(blockText)
    .filter(Boolean)
    .join(" ")
    .slice(0, 220);
}

function canonicalCategorySlug(categoryName: string, fallback: string): CategorySlug | string {
  const normalizedCategory = slugifyCategory(categoryName);
  const match = categorySlugs.find((slug) => categoryAliases[slug].map(slugifyCategory).includes(normalizedCategory));

  return match ?? fallback;
}

function fallbackSlug(entry: any, title: string) {
  return valueOf<string>(entry, "slug") ?? (slugifyCategory(title) || String(entry.documentId ?? entry.id ?? "article"));
}

function normalizeArticle(entry: any): DisplayArticle | null {
  const category = relationValue(entry, "category");
  const categoryName = valueOf<string>(category, "name") ?? "General";
  const categorySlug = valueOf<string>(category, "slug") ?? slugifyCategory(categoryName);
  const title = valueOf<string>(entry, "title");
  const slug = valueOf<string>(entry, "slug");

  if (!title || !slug) return null;

  return {
    id: String(entry.documentId ?? entry.id ?? slug),
    slug,
    title,
    excerpt: textExcerpt(entry),
    image: mediaUrl(entry),
    date: valueOf<string>(entry, "publishedDate") ?? valueOf<string>(entry, "publishedAt") ?? "",
    featured: Boolean(valueOf<boolean>(entry, "featured")),
    category: categoryName,
    categorySlug,
    contentBlocks: toBlocks(valueOf<any>(entry, "body"))
  };
}

function normalizeTargeted(entry: any, category?: CategorySlug): DisplayArticle | null {
  const description = valueOf<any>(entry, "Description");
  const descriptionBlocks = Array.isArray(description) ? description : [];
  const title = valueOf<string>(entry, "title") ?? firstBlockText(descriptionBlocks, "heading") ?? firstBlockText(descriptionBlocks);

  if (!title) return null;

  const rawCategory = relationValue(entry, "category") ?? relationValue(entry, "Category");
  const categoryName = valueOf<string>(rawCategory, "name") ?? valueOf<string>(rawCategory, "Name") ?? valueOf<string>(entry, "Name") ?? "Lifestyle";
  const rawCategorySlug = valueOf<string>(rawCategory, "slug") ?? slugifyCategory(categoryName);

  if (category && !articleMatchesCategory({ category: categoryName, categorySlug: rawCategorySlug }, category)) return null;

  const categorySlug = category ?? canonicalCategorySlug(categoryName, rawCategorySlug);

  const slug = fallbackSlug(entry, title);

  return {
    id: String(entry.documentId ?? entry.id ?? slug),
    slug,
    title,
    excerpt: excerptFromBlocks(descriptionBlocks) || textExcerpt(entry),
    image: mediaUrl(entry, "Photo"),
    date: valueOf<string>(entry, "publishedDate") ?? valueOf<string>(entry, "publishedAt") ?? "",
    featured: false,
    category: categoryName,
    categorySlug,
    contentBlocks: descriptionBlocks
  };
}

async function fetchCollection<T>(
  collection: "articles" | "targeteds",
  locale: Locale,
  params: URLSearchParams,
  normalize: (entry: any) => T | null
) {
  const response = await fetch(`${apiBase()}/api/${collection}?${params.toString()}`, {
    headers: process.env.STRAPI_API_TOKEN
      ? {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
        }
      : undefined,
    signal: AbortSignal.timeout(STRAPI_TIMEOUT_MS),
    next: { revalidate: 30 }
  });

  if (!response.ok) {
    throw new Error(`Strapi ${collection} request failed with ${response.status}`);
  }

  const payload = await response.json();
  return (payload.data ?? []).map(normalize).filter(Boolean) as T[];
}

async function fetchArticleCollection(locale: Locale) {
  const params = new URLSearchParams({
    locale,
    "populate[cover]": "true",
    "populate[category]": "true",
    "sort[0]": "publishedDate:desc",
    "sort[1]": "publishedAt:desc",
    "pagination[pageSize]": "100"
  });

  return fetchCollection("articles", locale, params, normalizeArticle);
}

async function fetchTargetedCollection(locale: Locale, options: FetchOptions = {}) {
  const params = new URLSearchParams({
    locale,
    "populate[Photo]": "true",
    "sort[0]": "publishedAt:desc",
    "pagination[pageSize]": String(options.pageSize ?? 100)
  });

  return fetchCollection("targeteds", locale, params, (entry) => normalizeTargeted(entry, options.category));
}

async function fetchStrapiArticles(locale: Locale, options: FetchOptions = {}) {
  const targetedArticles = await fetchTargetedCollection(locale, options);
  if (targetedArticles.length) return targetedArticles;

  const articles = await fetchArticleCollection(locale);
  if (!options.category) return articles;
  return articles.filter((article) => articleMatchesCategory(article, options.category!));
}

export async function getArticles(locale: Locale, options: FetchOptions = {}) {
  try {
    const liveArticles = await fetchStrapiArticles(locale, options);
    return liveArticles.length || options.category ? liveArticles : demoArticlesForLocale(locale);
  } catch {
    // Keep the frontend usable while Strapi is offline or API permissions are not public.
  }

  if (options.category) return [];

  const demoArticles = demoArticlesForLocale(locale);
  return demoArticles;
}

export async function getArticle(locale: Locale, category: CategorySlug, slug: string) {
  const articles = await getArticles(locale, { category, pageSize: 100 });
  return articles.find((article) => article.slug === slug) ?? null;
}

export async function getArticleWithAlternates(locale: Locale, category: CategorySlug, slug: string) {
  const articles = await getArticles(locale, { category, pageSize: 100 });
  const articleIndex = articles.findIndex((article) => article.slug === slug);
  const article = articleIndex >= 0 ? articles[articleIndex] : null;

  if (!article) {
    return { article: null, languageHrefOverrides: {} };
  }

  const languageHrefOverrides: Partial<Record<Locale, string>> = {
    [locale]: `/${locale}/${category}/${article.slug}`
  };

  await Promise.all(
    locales
      .filter((targetLocale) => targetLocale !== locale)
      .map(async (targetLocale) => {
        const targetArticles = await getArticles(targetLocale, { category, pageSize: 100 });
        const matchedArticle = targetArticles.find((targetArticle) => targetArticle.image === article.image) ?? targetArticles[articleIndex];

        languageHrefOverrides[targetLocale] = matchedArticle
          ? `/${targetLocale}/${category}/${matchedArticle.slug}`
          : `/${targetLocale}/${category}`;
      })
  );

  return { article, languageHrefOverrides };
}
