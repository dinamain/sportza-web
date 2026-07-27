import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockGroups } from "../data/mockData";
import { Check } from "lucide-react";

const AGE_CATEGORIES = [
  { name: "Adults Only", description: "Members manage their own accounts" },
  { name: "Children/Youth", description: "Guardians manage accounts on behalf of children" },
  { name: "Mixed", description: "Both adults and children, with guardian management for kids" },
];

export default function EditGroupAgeCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const group = mockGroups.find((g) => g.id === Number(id));

  const [ageCategory, setAgeCategory] = useState(group?.ageCategory || "Mixed");

  if (!group) return <div className="text-white p-4">Group not found</div>;

  function handleSave() {
    // TODO: replace with real PUT /groups/:id call once the Groups
    // Swagger doc is available.
    group.ageCategory = ageCategory;
    navigate(`/groups/${id}/edit`);
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto pb-24">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">Age Category</h1>
        </div>

        <div className="flex flex-col gap-2">
          {AGE_CATEGORIES.map((c) => (
            <button
              key={c.name}
              onClick={() => setAgeCategory(c.name)}
              className={`w-full flex items-start justify-between gap-3 rounded-xl px-4 py-3 border text-left ${
                ageCategory === c.name
                  ? "bg-yellow-400/10 border-yellow-400"
                  : "bg-neutral-900 border-neutral-800"
              }`}
            >
              <div>
                <div
                  className={`font-medium ${
                    ageCategory === c.name ? "text-yellow-400" : "text-white"
                  }`}
                >
                  {c.name}
                </div>
                <div className="text-neutral-500 text-sm mt-0.5">{c.description}</div>
              </div>
              {ageCategory === c.name && (
                <Check size={18} className="text-yellow-400 shrink-0 mt-1" />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="w-full rounded-xl py-3 font-semibold mt-6 fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-yellow-400 text-black"
        >
          Save
        </button>
      </div>
    </div>
  );
}