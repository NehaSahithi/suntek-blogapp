import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://suntek-blogapp-4iwp.onrender.com";

export default function WriteArticle() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      category: "Engineering",
      content: "",
    },
  });
  const navigate = useNavigate();

  const onSaveDraft = async (values) => {
    toast.success(`Draft saved: ${values.title || "Untitled article"}`);
    reset();
  };

  const onPublish = async (values) => {
    const payload = {
      title: values.title || "Untitled article",
      category: values.category || "Engineering",
      content: values.content || "",
    };

    // Post to backend API (requires running backend + Mongo cluster).
    try {
      await axios.post(`${BASE_URL}/author-api/articles`, payload, { withCredentials: true });
      toast.success(`Published: ${payload.title}`);
      reset();
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Publish failed";
      toast.error(`Publish failed: ${msg}`);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-3xl bg-white/95 p-6 text-slate-900 shadow-lg">
        <h2 className="text-2xl font-semibold">Write article</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          This editor is a polished frontend shell you can wire to your publish API next.
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Title</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("title", { required: true })}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Category</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("category")}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Content</label>
            <textarea
              rows={10}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("content", { required: true })}
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSubmit(onSaveDraft)}
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Save draft
            </button>
            <button
              type="button"
              onClick={handleSubmit(onPublish)}
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Publish
            </button>
          </div>
        </form>
      </section>

      <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
        <h3 className="text-xl font-semibold">Publishing tips</h3>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
          <li>Keep the opening paragraph short and direct.</li>
          <li>Use categories consistently across articles.</li>
          <li>Publish once the draft renders well in the feed.</li>
        </ul>
      </aside>
    </div>
  );
}