export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Built with React, Vite, Zustand, and Tailwind CSS.</p>
        <p>Modern blog platform UI.</p>
      </div>
    </footer>
  );
}