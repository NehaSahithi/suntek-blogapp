import { Link } from "react-router-dom";

export default function AuthorDashboard() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <section className="rounded-3xl bg-white/95 p-6 text-slate-900 shadow-lg lg:col-span-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Author</p>
        <h2 className="mt-3 text-2xl font-semibold">Your publishing dashboard</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Draft, edit, and organize articles from one dedicated workspace.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/dashboard/write" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Write an article
          </Link>
          <Link to="/dashboard/author/articles" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Manage articles
          </Link>
        </div>
      </section>
      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-900">
        <h3 className="text-lg font-semibold">Publishing checklist</h3>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li>Draft the article title and content.</li>
          <li>Choose the correct category and status.</li>
          <li>Save and verify it appears in the feed.</li>
        </ul>
      </section>
    </div>
  );
}