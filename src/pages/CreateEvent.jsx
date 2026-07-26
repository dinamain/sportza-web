import { useState } from "react";

const EVENT_TYPES = [
  { key: "match", label: "Match", emoji: "⚽" },
  { key: "training", label: "Training", emoji: "🏃" },
  { key: "tournament", label: "Tournament", emoji: "🏆" },
  { key: "friendly", label: "Friendly", emoji: "🤝" },
];

export default function CreateEvent() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    seriesType: "",
    eventType: "",
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    fee: "",
    responseDeadline: "",
    maxParticipants: "",
    allowComments: true,
    opponent: "",
  });

  function update(field, value) {
    setForm({ ...form, [field]: value });
  }

  function handleCreate() {
    console.log("Event to create:", form);
    alert("Event created (mock)! Check console for data.");
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="text-yellow-400 text-xs mb-1">Step {step} of 3</div>
        <div className="h-1 bg-neutral-800 rounded mb-6">
          <div
            className="h-1 bg-yellow-400 rounded transition-all"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4">Event Series Type</h2>
            <button
              onClick={() => update("seriesType", "one-time")}
              className={`w-full text-left p-4 rounded-xl mb-3 border ${
                form.seriesType === "one-time" ? "border-yellow-400 bg-neutral-800" : "border-transparent bg-neutral-900"
              }`}
            >
              <div className="font-bold">📅 One-Time Event</div>
              <div className="text-sm text-gray-400">A single occurrence — like a match, tournament, or social gathering.</div>
            </button>
            <button
              onClick={() => update("seriesType", "recurring")}
              className={`w-full text-left p-4 rounded-xl mb-3 border ${
                form.seriesType === "recurring" ? "border-yellow-400 bg-neutral-800" : "border-transparent bg-neutral-900"
              }`}
            >
              <div className="font-bold">🔁 Recurring Event</div>
              <div className="text-sm text-gray-400">Repeating events — like weekly training sessions, monthly meetings.</div>
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-4">Event Type</h2>
            {EVENT_TYPES.map((t) => (
              <button
                key={t.key}
                onClick={() => update("eventType", t.key)}
                className={`w-full text-left p-4 rounded-xl mb-3 border ${
                  form.eventType === t.key ? "border-yellow-400 bg-neutral-800" : "border-transparent bg-neutral-900"
                }`}
              >
                {t.emoji} {t.label}
              </button>
            ))}
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-xl font-bold mb-4">Event Details</h2>
            <input
              placeholder="e.g. Match vs City FC"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="w-full mb-3 p-2 rounded bg-neutral-800 placeholder-gray-500 outline-none"
            />
            <textarea
              placeholder="Add details..."
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full mb-3 p-2 rounded bg-neutral-800 placeholder-gray-500 outline-none"
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => update("date", e.target.value)}
              className="w-full mb-3 p-2 rounded bg-neutral-800 outline-none"
            />
            <div className="flex gap-2 mb-3">
              <input
                type="time"
                value={form.startTime}
                onChange={(e) => update("startTime", e.target.value)}
                className="flex-1 p-2 rounded bg-neutral-800 outline-none"
              />
              <input
                type="time"
                value={form.endTime}
                onChange={(e) => update("endTime", e.target.value)}
                className="flex-1 p-2 rounded bg-neutral-800 outline-none"
              />
            </div>
            <input
              placeholder="Venue or address"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              className="w-full mb-3 p-2 rounded bg-neutral-800 placeholder-gray-500 outline-none"
            />
            <label className="text-xs text-gray-400">Participation Fee (₹)</label>
            <input
              type="number"
              value={form.fee}
              onChange={(e) => update("fee", e.target.value)}
              className="w-full mb-3 mt-1 p-2 rounded bg-neutral-800 outline-none"
            />
            <label className="text-xs text-gray-400">Max Participants (Optional)</label>
            <input
              type="number"
              placeholder="e.g. 22"
              value={form.maxParticipants}
              onChange={(e) => update("maxParticipants", e.target.value)}
              className="w-full mb-3 mt-1 p-2 rounded bg-neutral-800 placeholder-gray-500 outline-none"
            />
            <input
              placeholder="Opponent (Optional) — e.g. Liverpool"
              value={form.opponent}
              onChange={(e) => update("opponent", e.target.value)}
              className="w-full mb-3 p-2 rounded bg-neutral-800 placeholder-gray-500 outline-none"
            />
          </>
        )}

        <div className="flex gap-2 mt-4">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="flex-1 border border-neutral-700 py-2 rounded">
              ← Back
            </button>
          )}
          {step < 3 ? (
            <button onClick={() => setStep(step + 1)} className="flex-1 bg-yellow-400 text-black font-bold py-2 rounded">
              Next
            </button>
          ) : (
            <button onClick={handleCreate} className="flex-1 bg-yellow-400 text-black font-bold py-2 rounded">
              Create Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
}