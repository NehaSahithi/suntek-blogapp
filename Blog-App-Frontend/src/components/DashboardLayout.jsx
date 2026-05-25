import { Link, NavLink, Outlet } from "react-router-dom";

import { useAuth } from "../store/authStore";

const navClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive ? "bg-white text-slate-950 shadow-lg" : "text-slate-300 hover:bg-white/10 hover:text-white"
  }`;

export default function DashboardLayout() {
  const currentUser = useAuth((state) => state.currentUser);
  const role = currentUser?.role || currentUser?.userRole || currentUser?.type || "USER";
  const rootPath = role === "AUTHOR" ? "/dashboard/author" : "/dashboard/user";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.2),_transparent_28%),linear-gradient(135deg,#0f172a_0%,#111827_100%)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-200">
              Dashboard
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Welcome back, {currentUser?.firstName || "friend"}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Switch between reading, authoring, and publishing tasks from one unified layout.
            </p>
          </div>

          <nav className="flex flex-wrap gap-2">
            <NavLink to={rootPath} end className={navClass}>
              Overview
            </NavLink>
            {role === "AUTHOR" ? (
              <>
                <NavLink to="/dashboard/author/articles" className={navClass}>
                  Articles
                </NavLink>
                <NavLink to="/dashboard/write" className={navClass}>
                  Write
                </NavLink>
              </>
            ) : null}
            {role === "ADMIN" ? (
              <NavLink to="/dashboard/admin" className={navClass}>
                Admin
              </NavLink>
            ) : null}
            <Link to="/" className={navClass({ isActive: false })}>
              Public site
            </Link>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-8">
          <Outlet />
        </div>
      </section>
    </main>
  );
}