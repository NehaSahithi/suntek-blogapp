import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full rounded-[2rem] border border-slate-200 bg-white/85 p-10 text-center shadow-[0_24px_80px_rgba(15,23,42,0.1)]">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-600">403</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          You do not have access to this page.
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Switch to the correct account role or return to the public homepage.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/"
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}