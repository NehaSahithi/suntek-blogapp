import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError();

  let title = "Something went wrong";
  let description = "Please try again or return to the homepage.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    description = error.data?.message || description;
  } else if (error instanceof Error) {
    description = error.message;
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full rounded-[2rem] border border-slate-200 bg-white/85 p-10 text-center shadow-[0_24px_80px_rgba(15,23,42,0.1)]">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Error</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">{title}</h1>
        <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
      </div>
    </main>
  );
}