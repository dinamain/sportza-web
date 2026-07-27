import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockGroups } from "../data/mockData";

export default function EditGroupName() {
  const navigate = useNavigate();
  const { id } = useParams();
  const group = mockGroups.find((g) => g.id === Number(id));

  const [name, setName] = useState(group?.name || "");

  if (!group) return <div className="text-white p-4">Group not found</div>;

  function handleSave() {
    // TODO: replace with real PUT /groups/:id call once the Groups
    // Swagger doc is available. For now, mutate the mock object so
    // the change reflects immediately across the app.
    group.name = name.trim();
    navigate(`/groups/${id}/edit`);
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">Group Name</h1>
        </div>

        <label className="text-neutral-400 text-sm mb-2 block">Group Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter group name"
          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white mb-6"
          autoFocus
        />

        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className={`w-full rounded-xl py-3 font-semibold ${
            name.trim() ? "bg-yellow-400 text-black" : "bg-neutral-800 text-neutral-500"
          }`}
        >
          Save
        </button>
      </div>
    </div>
  );
}