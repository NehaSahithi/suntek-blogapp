import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import FormInput from "./ui/FormInput";

const BASE_URL = import.meta.env.VITE_API_URL || "https://blog-app-fwx1.onrender.com";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "USER",
    },
  });

  const onSubmit = async (values) => {
    try {
      await axios.post(`${BASE_URL}/user-api/users`, values, {
        withCredentials: true,
      });
      toast.success("Account created");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full rounded-[2rem] border border-slate-200 bg-white/85 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.1)] sm:p-10">
        <div className="max-w-xl">
          <p className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-700">
            Create your account
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950">
            Join the blog platform
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Register once and move into a role-aware dashboard built for authors and readers.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-5 md:grid-cols-2">
            <FormInput
              id="firstName"
              label="First name"
              autoComplete="given-name"
              error={errors.firstName?.message}
              {...register("firstName", { required: "First name is required" })}
            />
            <FormInput
              id="lastName"
              label="Last name"
              autoComplete="family-name"
              error={errors.lastName?.message}
              {...register("lastName", { required: "Last name is required" })}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FormInput
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email", { required: "Email is required" })}
            />

            <FormInput
              id="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Use at least 8 characters" },
              })}
            />
          </div>

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
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-800">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}