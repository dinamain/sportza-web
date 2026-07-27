import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockGroups } from "../data/mockData";

export default function EditGroupDescription() {
  const navigate = useNavigate();
  const { id } = useParams();
  const group = mockGroups.find((g) => g.id === Number(id));

  const [description, setDescription] = useState(group?.description || "");

  if (!group) return <div className="text-white p-4">Group not found</div>;

  function handleSave() {
    // TODO: replace with real PUT /groups/:id call once the Groups
    // Swagger doc is available.
    group.description = description.trim();
    navigate(`/groups/${id}/edit`);
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">Description</h1>
        </div>

        <label className="text-neutral-400 text-sm mb-2 block">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell people what this group is about"
          rows={6}
          maxLength={300}
          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white mb-2 resize-none"
          autoFocus
        />
        <div className="text-neutral-500 text-xs text-right mb-6">
          {description.length}/300
        </div>

        <button
          onClick={handleSave}
          className="w-full rounded-xl py-3 font-semibold bg-yellow-400 text-black"
        >
          Save
        </button>
      </div>
    </div>
  );
}