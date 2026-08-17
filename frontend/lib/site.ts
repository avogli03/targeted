import { articles, navItems, type Locale, ui } from "@/lib/content";

export const locales: Locale[] = ["en", "sq"];

export const categorySlugs = ["lifestyle", "wellbeing", "business", "technology", "entertainment", "people", "marketing", "top-5"] as const;

export type CategorySlug = (typeof categorySlugs)[number];

export const categoryNames: Record<CategorySlug, string> = {
  lifestyle: "Lifestyle",
  wellbeing: "Wellbeing",
  business: "Business",
  technology: "Technology",
  entertainment: "Entertainment",
  people: "People",
  marketing: "Marketing",
  "top-5": "Top 5"
};

export const categoryAliases: Record<CategorySlug, string[]> = {
  lifestyle: ["lifestyle", "stil-jete"],
  wellbeing: ["wellbeing", "mireqenie", "mirëqenie"],
  business: ["business", "biznes"],
  technology: ["technology", "teknologji"],
  entertainment: ["entertainment", "argetim", "argëtim"],
  people: ["people", "njerez", "njerëz"],
  marketing: ["marketing"],
  "top-5": ["top-5"]
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function isCategorySlug(value: string): value is CategorySlug {
  return categorySlugs.includes(value as CategorySlug);
}

export function slugifyCategory(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function categoryTitle(slug: CategorySlug, locale: Locale) {
  const key = slug.replace("-", "") as keyof (typeof ui)[Locale];
  const englishName = categoryNames[slug];
  return ui[locale][key] ?? englishName;
}

export function articleMatchesCategory(article: { category: string; categorySlug: string }, category: CategorySlug) {
  const aliases = categoryAliases[category].map(slugifyCategory);
  return aliases.includes(slugifyCategory(article.categorySlug)) || aliases.includes(slugifyCategory(article.category));
}

export function navLinks(locale: Locale) {
  const [home, ...items] = navItems[locale];
  const categoryItems = categorySlugs.map((slug, index) => ({
    href: `/${locale}/${slug}`,
    label: items[index] ?? categoryTitle(slug, locale)
  }));
  const contactLabel = items[categorySlugs.length] ?? "Contact";

  return [{ href: `/${locale}`, label: home }, ...categoryItems, { href: `/${locale}/contact`, label: contactLabel }];
}

export function demoArticlesForLocale(locale: Locale) {
  return articles.map((article) => ({
    id: String(article.id),
    slug: article.slug,
    title: article.title[locale],
    excerpt: article.excerpt[locale],
    image: article.image,
    date: article.date,
    featured: article.featured,
    category: article.category,
    categorySlug: slugifyCategory(article.category),
    contentBlocks: [{ type: "paragraph", children: [{ text: article.excerpt[locale] }] }]
  }));
}
