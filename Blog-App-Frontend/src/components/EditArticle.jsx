import { useParams } from "react-router-dom";

export default function EditArticle() {
  const { id } = useParams();

  return (
    <div className="rounded-3xl bg-white/95 p-6 text-slate-900 shadow-lg">
      <h2 className="text-2xl font-semibold">Edit article</h2>
      <p className="mt-2 text-sm leading-7 text-slate-600">
        Article ID: {id}. Hook this screen up to your edit endpoint when you are ready.
      </p>
    </div>
  );
}