import { Link, NavLink } from "react-router-dom";

import { useAuth } from "../store/authStore";

const navClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive ? "bg-slate-950 text-white shadow-lg shadow-slate-950/15 font-semibold" : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"
  }`;

export default function Header() {
  const { currentUser, logout, loading } = useAuth();

  const role = currentUser?.role || currentUser?.userRole || currentUser?.type;
  const dashboardPath =
    role === "ADMIN" ? "/dashboard/admin" : role === "AUTHOR" ? "/dashboard/author" : "/dashboard/user";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white shadow-lg shadow-slate-950/15">
            B
          </span>
          <div>
            <p className="text-sm font-semibold tracking-wide text-slate-950">Blog App</p>
            <p className="text-xs text-slate-500">Enterprise content experience</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={navClass} end>
            Home
          </NavLink>
          <NavLink to="/register" className={navClass}>
            Register
          </NavLink>
          <NavLink to="/login" className={navClass}>
            Login
          </NavLink>
          {currentUser ? (
            <NavLink to={dashboardPath} className={navClass}>
              Dashboard
            </NavLink>
          ) : null}
        </nav>

        <div className="flex items-center gap-3">
          {currentUser ? (
            <>
              <div className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 sm:block">
                {currentUser.firstName || currentUser.email || "Signed in"}
              </div>
              <button
                type="button"
                onClick={logout}
                disabled={loading}
                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              aria-label="Get started"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-50"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}