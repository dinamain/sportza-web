import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockGroups } from "../data/mockData";

export default function GroupCode() {
  const navigate = useNavigate();
  const { id } = useParams();
  const group = mockGroups.find((g) => g.id === Number(id));

  const [code, setCode] = useState(group?.groupCode || "");

  if (!group) return <div className="text-white p-4">Group not found</div>;

  function handleSave() {
    // TODO: replace with real PUT /groups/:id call once the Groups
    // Swagger doc is available. Worth confirming with Deepak whether
    // changing the code invalidates the old one immediately or after
    // a grace period, since existing members may have shared it.
    group.groupCode = code.trim();
    navigate(`/groups/${id}/edit`);
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">Group Code</h1>
        </div>

        <p className="text-neutral-400 text-sm mb-3">
          Enter the new group code for your group.
        </p>

        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter group code"
          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white mb-6"
          autoFocus
        />

        <button
          onClick={handleSave}
          disabled={!code.trim()}
          className={`w-full rounded-xl py-3 font-semibold ${
            code.trim() ? "bg-yellow-400 text-black" : "bg-neutral-800 text-neutral-500"
          }`}
        >
          Save
        </button>
      </div>
    </div>
  );
}