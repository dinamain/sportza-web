import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockGroups } from "../data/mockData";
import { Check } from "lucide-react";

const GROUP_TYPES = [
  { name: "Normal Group", description: "Simple group with teams only, no sub-groups" },
  { name: "Professional Club", description: "Supports sub-groups (e.g. age-based batches) under the club" },
  { name: "Amateur Club", description: "Casual club setup, teams only" },
  { name: "Corporate Club", description: "Company or workplace club, teams only" },
];

export default function EditGroupType() {
  const navigate = useNavigate();
  const { id } = useParams();
  const group = mockGroups.find((g) => g.id === Number(id));

  const [groupType, setGroupType] = useState(group?.groupType || "");

  if (!group) return <div className="text-white p-4">Group not found</div>;

  function handleSave() {
    // TODO: replace with real PUT /groups/:id call once the Groups
    // Swagger doc is available.
    group.groupType = groupType;
    navigate(`/groups/${id}/edit`);
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto pb-24">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">Group Type</h1>
        </div>

        <div className="flex flex-col gap-2">
          {GROUP_TYPES.map((t) => (
            <button
              key={t.name}
              onClick={() => setGroupType(t.name)}
              className={`w-full flex items-start justify-between gap-3 rounded-xl px-4 py-3 border text-left ${
                groupType === t.name
                  ? "bg-yellow-400/10 border-yellow-400"
                  : "bg-neutral-900 border-neutral-800"
              }`}
            >
              <div>
                <div
                  className={`font-medium ${
                    groupType === t.name ? "text-yellow-400" : "text-white"
                  }`}
                >
                  {t.name}
                </div>
                <div className="text-neutral-500 text-sm mt-0.5">{t.description}</div>
              </div>
              {groupType === t.name && (
                <Check size={18} className="text-yellow-400 shrink-0 mt-1" />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={handleSave}
          disabled={!groupType}
          className={`w-full rounded-xl py-3 font-semibold mt-6 fixed bottom-4 left-4 right-4 max-w-md mx-auto ${
            groupType ? "bg-yellow-400 text-black" : "bg-neutral-800 text-neutral-500"
          }`}
        >
          Save
        </button>
      </div>
    </div>
  );
}