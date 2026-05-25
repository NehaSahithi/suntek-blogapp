import { Link } from "react-router-dom";

function formatDate(value) {
  if (!value) return "Recently published";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently published";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function ArticleCard({
  title,
  authorName,
  category,
  excerpt,
  date,
  href,
}) {
  return (
    <article className="group h-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(15,23,42,0.12)]">
      <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400" />
      <div className="flex h-full flex-col gap-4 p-6">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">
            {category || "Insight"}
          </span>
          <span>{formatDate(date)}</span>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold leading-tight text-slate-950 transition-colors duration-200 group-hover:text-indigo-700">
            {title}
          </h3>
          <p className="text-sm leading-6 text-zinc-600">
            {excerpt || "Read the full article to explore the story, code, and takeaways."}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-100 pt-4 text-sm text-slate-500">
          <span>By {authorName || "Unknown author"}</span>
          <Link
            to={href}
            className="inline-flex items-center gap-2 font-medium text-indigo-600 transition-colors duration-150 hover:text-indigo-800"
          >
            Read article
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}