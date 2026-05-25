import { useParams } from "react-router-dom";

export default function ArticleById() {
  const { id } = useParams();

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.1)]">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
          Article
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          Article details
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          This route is ready to fetch and display article <span className="font-semibold text-slate-900">{id}</span>.
        </p>
      </article>
    </main>
  );
}