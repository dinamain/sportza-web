import { useState } from "react";

const GROUP_TYPES = [
  { key: "normal", label: "Normal Group", desc: "Casual group for friends or recreational players", emoji: "🙌" },
  { key: "professional", label: "Professional Club", desc: "Organised club with structured coaching and competitions", emoji: "⭐" },
  { key: "amateur", label: "Amateur Club", desc: "Semi-organised club for enthusiasts stepping up from casual play", emoji: "🥇" },
  { key: "corporate", label: "Corporate Club", desc: "Club organised around a workplace or company", emoji: "🏢" },
];

const AGE_GROUPS = [
  { key: "adults", label: "Adults Only", desc: "All members are 18+" },
  { key: "youth", label: "Children / Youth", desc: "Players are under 18 (guardians manage accounts)" },
  { key: "mixed", label: "Mixed Ages", desc: "Both adults and children are members" },
];

const SPORTS = ["Football", "Cricket", "Hockey", "Badminton", "Basketball", "Volleyball"];

export default function CreateGroup() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    groupType: "",
    ageGroup: "",
    sport: "",
    name: "",
    description: "",
    location: "",
    city: "",
    upiId: "",
  });

  function update(field, value) {
    setForm({ ...form, [field]: value });
  }

  function handleCreate() {
    console.log("Group to create:", form);
    alert("Group created (mock)! Check console for data.");
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="text-yellow-400 text-xs mb-1">Create Group · Step {step} of 4</div>
        <div className="h-1 bg-neutral-800 rounded mb-6">
          <div
            className="h-1 bg-yellow-400 rounded transition-all"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4">Type</h2>
            {GROUP_TYPES.map((t) => (
              <button
                key={t.key}
                onClick={() => update("groupType", t.key)}
                className={`w-full text-left p-4 rounded-xl mb-3 border ${
                  form.groupType === t.key
                    ? "border-yellow-400 bg-neutral-800"
                    : "border-transparent bg-neutral-900"
                }`}
              >
                <div className="font-bold">{t.emoji} {t.label}</div>
                <div className="text-sm text-gray-400">{t.desc}</div>
              </button>
            ))}
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-4">Age Group</h2>
            {AGE_GROUPS.map((a) => (
              <button
                key={a.key}
                onClick={() => update("ageGroup", a.key)}
                className={`w-full text-left p-4 rounded-xl mb-3 border ${
                  form.ageGroup === a.key
                    ? "border-yellow-400 bg-neutral-800"
                    : "border-transparent bg-neutral-900"
                }`}
              >
                <div className="font-bold">{a.label}</div>
                <div className="text-sm text-gray-400">{a.desc}</div>
              </button>
            ))}
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-xl font-bold mb-4">Sport</h2>
            {SPORTS.map((s) => (
              <button
                key={s}
                onClick={() => update("sport", s)}
                className={`w-full text-left p-4 rounded-xl mb-3 border ${
                  form.sport === s
                    ? "border-yellow-400 bg-neutral-800"
                    : "border-transparent bg-neutral-900"
                }`}
              >
                {s}
              </button>
            ))}
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-xl font-bold mb-4">Details</h2>
            <input
              placeholder="e.g. Mumbai Cricket Club"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full mb-3 p-2 rounded bg-neutral-800 placeholder-gray-500 outline-none"
            />
            <textarea
              placeholder="Tell people about this group..."
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full mb-3 p-2 rounded bg-neutral-800 placeholder-gray-500 outline-none"
            />
            <input
              placeholder="Venue or address"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              className="w-full mb-3 p-2 rounded bg-neutral-800 placeholder-gray-500 outline-none"
            />
            <input
              placeholder="e.g. Mumbai"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              className="w-full mb-3 p-2 rounded bg-neutral-800 placeholder-gray-500 outline-none"
            />
            <input
              placeholder="e.g. club@upi"
              value={form.upiId}
              onChange={(e) => update("upiId", e.target.value)}
              className="w-full mb-3 p-2 rounded bg-neutral-800 placeholder-gray-500 outline-none"
            />
          </>
        )}

        <div className="flex gap-2 mt-4">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 border border-neutral-700 py-2 rounded"
            >
              ← Back
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex-1 bg-yellow-400 text-black font-bold py-2 rounded"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleCreate}
              className="flex-1 bg-yellow-400 text-black font-bold py-2 rounded"
            >
              Create Group
            </button>
          )}
        </div>
      </div>
    </div>
  );
}