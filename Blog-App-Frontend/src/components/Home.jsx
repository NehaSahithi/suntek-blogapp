import { useEffect } from "react";

import ArticleCard from "./ui/ArticleCard";
import useArticleStore from "../store/articleStore";

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
      <div className="h-1.5 w-24 rounded-full bg-slate-200 animate-pulse" />
      <div className="mt-5 space-y-3">
        <div className="h-5 w-full rounded-lg bg-slate-200 animate-pulse" />
        <div className="h-5 w-3/4 rounded-lg bg-slate-200 animate-pulse" />
      </div>
      <div className="mt-6 space-y-2">
        <div className="h-3 w-full rounded bg-slate-100 animate-pulse" />
        <div className="h-3 w-2/3 rounded bg-slate-100 animate-pulse" />
      </div>
      <div className="mt-8 h-4 w-32 rounded bg-slate-100 animate-pulse" />
    </div>
  );
}

export default function Home() {
  const { articles, isLoading, error, fetchActiveArticles, clearError } =
    useArticleStore();

  useEffect(() => {
    fetchActiveArticles();
  }, [fetchActiveArticles]);

  return (
    <main className="min-h-screen bg-transparent">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 md:py-16">
        <header className="mb-10 max-w-2xl md:mb-14">
          <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-700">
            Engineering notes, product thinking, and release updates
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
            What&apos;s new on the blog
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
            Explore the latest articles, tutorials, and engineering insights from the team.
          </p>
        </header>

        <section aria-label="Articles" aria-busy={isLoading}>
          {error ? (
            <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              <span>{error}</span>
              <button
                type="button"
                onClick={clearError}
                className="rounded-full bg-white px-3 py-1 font-medium text-rose-700 shadow-sm transition hover:bg-rose-100"
              >
                Dismiss
              </button>
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {isLoading && articles.length === 0
              ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
              : null}

            {!isLoading && !error && articles.length === 0 ? (
              <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white/75 p-10 text-center text-slate-500">
                No articles found.
              </div>
            ) : null}

            {!error &&
              articles.map((article, index) => (
                <div
                  key={article._id || article.id || `${article.title}-${index}`}
                  className="opacity-0 animate-fade-up"
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <ArticleCard
                    title={article.title}
                    authorName={
                      (article.author && article.author.firstName) || article.authorName || "Unknown"
                    }
                    category={article.category}
                    excerpt={(article.content || "").substring(0, 120) + (article.content?.length > 120 ? "..." : "")}
                    date={article.createdAt || article.date}
                    href={`/article/${article._id || article.id}`}
                  />
                </div>
              ))}
          </div>
        </section>
      </section>
    </main>
  );
}