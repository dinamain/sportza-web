import { useState } from "react";

export default function CreatePost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    pinned: false,
    allowComments: true,
    expiryDate: "",
  });

  function update(field, value) {
    setForm({ ...form, [field]: value });
  }

  function handlePost() {
    console.log("Post to create:", form);
    alert("Post created (mock)! Check console.");
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Create Post</h2>

        <label className="text-xs text-gray-400">Title (optional)</label>
        <input
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          className="w-full mb-3 mt-1 p-2 rounded bg-neutral-800 outline-none"
        />

        <label className="text-xs text-gray-400">Content *</label>
        <textarea
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
          rows={5}
          className="w-full mb-3 mt-1 p-2 rounded bg-neutral-800 outline-none"
        />

        <div className="flex justify-between items-center bg-neutral-900 p-3 rounded-xl mb-3">
          <div>
            <div className="font-bold text-sm">Pin this post</div>
            <div className="text-xs text-gray-400">Keep at top for all members</div>
          </div>
          <button
            onClick={() => update("pinned", !form.pinned)}
            className={`w-12 h-6 rounded-full flex items-center px-1 transition ${
              form.pinned ? "bg-yellow-400 justify-end" : "bg-neutral-700 justify-start"
            }`}
          >
            <div className="w-4 h-4 bg-white rounded-full" />
          </button>
        </div>

        <div className="flex justify-between items-center bg-neutral-900 p-3 rounded-xl mb-3">
          <div>
            <div className="font-bold text-sm">Allow Comments</div>
            <div className="text-xs text-gray-400">Let members comment on this post</div>
          </div>
          <button
            onClick={() => update("allowComments", !form.allowComments)}
            className={`w-12 h-6 rounded-full flex items-center px-1 transition ${
              form.allowComments ? "bg-yellow-400 justify-end" : "bg-neutral-700 justify-start"
            }`}
          >
            <div className="w-4 h-4 bg-white rounded-full" />
          </button>
        </div>

        <label className="text-xs text-gray-400">Expiry Date (optional)</label>
        <input
          type="date"
          value={form.expiryDate}
          onChange={(e) => update("expiryDate", e.target.value)}
          className="w-full mb-4 mt-1 p-2 rounded bg-neutral-800 outline-none"
        />

        <div className="flex gap-2">
          <button className="flex-1 border border-neutral-700 py-2 rounded">Cancel</button>
          <button
            onClick={handlePost}
            className="flex-1 bg-yellow-400 text-black font-bold py-2 rounded"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}