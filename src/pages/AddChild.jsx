import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Same hardcoded sport list used in EditGroupSport — keep these in
// sync, or better, move to a shared constants file once you have one.
const SPORTS = [
  "Football",
  "Cricket",
  "Hockey",
  "Badminton",
  "Basketball",
  "Volleyball",
  "Tennis",
  "Table Tennis",
  "Kabaddi",
  "Athletics",
];

export default function AddChild() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [sport, setSport] = useState("");

  const canSave = name.trim() && dob;

  function handleSave() {
    // TODO: replace with real POST /users/{userId}/children call.
    // Body per Swagger is just { name, dateOfBirth } — sport isn't
    // confirmed as a real field yet, so send it only if the backend
    // accepts it; otherwise drop it from the payload.
    navigate("/profile/children");
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">Add Child</h1>
        </div>

        <label className="text-neutral-400 text-sm mb-2 block">Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Child's full name"
          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white mb-5"
          autoFocus
        />

        <label className="text-neutral-400 text-sm mb-2 block">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white mb-5"
        />

        <label className="text-neutral-400 text-sm mb-2 block">Sport (optional)</label>
        <select
          value={sport}
          onChange={(e) => setSport(e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white mb-8"
        >
          <option value="">Select a sport</option>
          {SPORTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <button
          onClick={handleSave}
          disabled={!canSave}
          className={`w-full rounded-xl py-3 font-semibold ${
            canSave ? "bg-yellow-400 text-black" : "bg-neutral-800 text-neutral-500"
          }`}
        >
          Add Child
        </button>

        <p className="text-neutral-500 text-xs text-center mt-4">
          Children don't get their own login — you'll manage their events and
          payments from your account.
        </p>
      </div>
    </div>
  );
}