import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockGroups } from "../data/mockData";
import { Check } from "lucide-react";

// Hardcoded for now — flag to Deepak whether this list should come
// from the Groups API instead once that Swagger doc is available.
const SPORTS = [
  { name: "Football", emoji: "⚽" },
  { name: "Cricket", emoji: "🏏" },
  { name: "Hockey", emoji: "🏑" },
  { name: "Badminton", emoji: "🏸" },
  { name: "Basketball", emoji: "🏀" },
  { name: "Volleyball", emoji: "🏐" },
  { name: "Tennis", emoji: "🎾" },
  { name: "Table Tennis", emoji: "🏓" },
  { name: "Kabaddi", emoji: "🤼" },
  { name: "Athletics", emoji: "🏃" },
];

export default function EditGroupSport() {
  const navigate = useNavigate();
  const { id } = useParams();
  const group = mockGroups.find((g) => g.id === Number(id));

  const [sport, setSport] = useState(group?.sport || "");

  if (!group) return <div className="text-white p-4">Group not found</div>;

  function handleSelect(name) {
    setSport(name);
  }

  function handleSave() {
    // TODO: replace with real PUT /groups/:id call once the Groups
    // Swagger doc is available.
    group.sport = sport;
    navigate(`/groups/${id}/edit`);
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto pb-24">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">Sport</h1>
        </div>

        <div className="flex flex-col gap-2">
          {SPORTS.map((s) => (
            <button
              key={s.name}
              onClick={() => handleSelect(s.name)}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 border text-left ${
                sport === s.name
                  ? "bg-yellow-400/10 border-yellow-400"
                  : "bg-neutral-900 border-neutral-800"
              }`}
            >
              <span className="text-xl">{s.emoji}</span>
              <span
                className={`flex-1 font-medium ${
                  sport === s.name ? "text-yellow-400" : "text-white"
                }`}
              >
                {s.name}
              </span>
              {sport === s.name && <Check size={18} className="text-yellow-400" />}
            </button>
          ))}
        </div>

        <button
          onClick={handleSave}
          disabled={!sport}
          className={`w-full rounded-xl py-3 font-semibold mt-6 fixed bottom-4 left-4 right-4 max-w-md mx-auto ${
            sport ? "bg-yellow-400 text-black" : "bg-neutral-800 text-neutral-500"
          }`}
        >
          Save
        </button>
      </div>
    </div>
  );
}