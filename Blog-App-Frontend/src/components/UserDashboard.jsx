export default function UserDashboard() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <section className="rounded-3xl bg-white/95 p-6 text-slate-900 shadow-lg lg:col-span-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Reader</p>
        <h2 className="mt-3 text-2xl font-semibold">Your reading dashboard</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Catch up on the latest articles, keep track of updates, and open full posts from the homepage.
        </p>
      </section>
      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-900">
        <h3 className="text-lg font-semibold">Quick actions</h3>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li>Browse the public blog feed.</li>
          <li>Open an article from the homepage.</li>
          <li>Use the logout button to end your session.</li>
        </ul>
      </section>
    </div>
  );
}