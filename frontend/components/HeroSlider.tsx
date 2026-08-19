"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { type DisplayArticle } from "@/lib/strapi";
import { type Locale } from "@/lib/content";

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

  return (
    <div className="hero-slide">
      <ArticleCard key={active.id} article={active} locale={locale} feature />
      {count > 1 && (
        <div className="slider-controls">
          <button type="button" className="slider-arrow" aria-label="Previous story" onClick={() => go(-1)}>
            <ChevronLeft size={18} />
          </button>
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
          <button type="button" className="slider-arrow" aria-label="Next story" onClick={() => go(1)}>
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
