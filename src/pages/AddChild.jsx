import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createChild } from "../api/users";

// Same hardcoded sport list used in EditGroupSport — keep these in
// sync, or better, move to a shared constants file once you have one.
// Not sent to the backend: the real CreateChildDto only has
// name/dateOfBirth, confirmed against the live API.
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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const canSave = name.trim() && dob;

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("authToken");
      await createChild({ userId, token, name, dateOfBirth: dob });
      navigate("/profile/children");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
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

        {error && (
          <div className="mb-4 p-3 bg-red-900/40 border border-red-500/50 rounded text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={!canSave || saving}
          className={`w-full rounded-xl py-3 font-semibold ${
            canSave && !saving ? "bg-yellow-400 text-black" : "bg-neutral-800 text-neutral-500"
          }`}
        >
          {saving ? "Adding..." : "Add Child"}
        </button>

        <p className="text-neutral-500 text-xs text-center mt-4">
          Children don't get their own login — you'll manage their events and
          payments from your account.
        </p>
      </div>
    </div>
  );
}