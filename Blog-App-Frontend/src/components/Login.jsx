import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import FormInput from "./ui/FormInput";
import { useAuth } from "../store/authStore";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuth((state) => state.login);
  const loading = useAuth((state) => state.loading);
  const error = useAuth((state) => state.error);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "USER",
    },
  });

  const onSubmit = async (values) => {
    await login(values);
    const currentUser = useAuth.getState().currentUser;

    if (!currentUser) {
      toast.error(useAuth.getState().error || "Login failed");
      return;
    }

    toast.success("Welcome back");

    const role = currentUser.role || currentUser.userRole || currentUser.type;
    if (role === "AUTHOR") {
      navigate("/dashboard/author");
      return;
    }

    if (role === "ADMIN") {
      navigate("/dashboard/admin");
      return;
    }

    navigate("/dashboard/user");
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white/85 shadow-[0_24px_80px_rgba(15,23,42,0.12)] lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative isolate overflow-hidden bg-slate-950 px-8 py-12 text-white sm:px-10 lg:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.35),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.35),_transparent_30%)]" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent)]" />
          <div className="relative max-w-xl">
            <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-medium text-sky-100">
              Secure access
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
              Sign in to continue reading and publishing.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
              Modern workflows, role-based access, and a clean article experience in one place.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                ["Fast", "Optimized load paths and cached article state."],
                ["Flexible", "Role-aware routing for readers, authors, and admins."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex items-center px-6 py-10 sm:px-10 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                Welcome back
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Log in with your account to access your dashboard.
              </p>
            </div>

            {error ? (
              <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            ) : null}

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email", {
                  required: "Email is required",
                })}
              />

              <FormInput
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                error={errors.password?.message}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 transition hover:text-slate-800"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                }
                {...register("password", {
                  required: "Password is required",
                })}
              />

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <label className="text-sm font-medium text-slate-700">Role</label>
                <select
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-indigo-500"
                  {...register("role")}
                >
                  <option value="USER">User</option>
                  <option value="AUTHOR">Author</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}