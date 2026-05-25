import { Link } from "react-router-dom";

const demoArticles = [
  { id: 1, title: "Shipping a polished Vite app", status: "Published" },
  { id: 2, title: "How we structured the dashboard", status: "Draft" },
];

export default function AuthorArticles() {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">
            Content
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Your articles</h2>
        </div>
        <Link to="/dashboard/write" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-slate-100">
          New article
        </Link>
      </div>

      <div className="mt-6 grid gap-4">
        {demoArticles.map((article) => (
          <article key={article.id} className="rounded-3xl border border-white/10 bg-white/95 p-5 text-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                {article.status}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This section is ready to connect to your backend article list and edit flow.
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}