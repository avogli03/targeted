"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type DisplayArticle } from "@/lib/strapi";
import { type Locale, ui } from "@/lib/content";

export function HeroSlider({ articles, locale }: { articles: DisplayArticle[]; locale: Locale }) {
  const [index, setIndex] = useState(0);
  const count = articles.length;

  const go = useCallback(
    (delta: number) => {
      setIndex((current) => (current + delta + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (count < 2) return;
    const timer = setInterval(() => go(1), 6000);
    return () => clearInterval(timer);
  }, [count, go]);

  if (!count) return null;

  const active = articles[index];
  const articleHref = `/${locale}/${active.categorySlug}/${active.slug}`;

  return (
    <div className="hero-band">
      {count > 1 && (
        <button type="button" className="hero-edge-arrow left" aria-label="Previous story" onClick={() => go(-1)}>
          <ChevronLeft size={22} />
        </button>
      )}

      <div className="hero-text-panel">
        <div className="tag-row">
          <span>{active.category}</span>
        </div>
        <h1>
          <Link href={articleHref}>{active.title}</Link>
        </h1>
        <p>{active.excerpt}</p>
        <Link className="read-more" href={articleHref}>
          {ui[locale].readMore}
        </Link>
        {count > 1 && (
          <div className="slider-dots">
            {articles.map((article, i) => (
              <button
                key={article.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                className={i === index ? "active" : ""}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        )}
      </div>

      <Link className="hero-image-panel" href={articleHref} aria-label={active.title}>
        <Image key={active.id} src={active.image} alt="" fill unoptimized sizes="(max-width: 900px) 100vw, 55vw" priority />
      </Link>

      {count > 1 && (
        <button type="button" className="hero-edge-arrow right" aria-label="Next story" onClick={() => go(1)}>
          <ChevronRight size={22} />
        </button>
      )}
    </div>
  );
}
