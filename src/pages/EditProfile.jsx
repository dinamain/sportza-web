import { useState } from "react";
import { mockProfile } from "../data/mockData";

export default function EditProfile() {
  const [form, setForm] = useState({
    displayName: mockProfile.displayName,
    phone: mockProfile.phone,
    isPlayer: mockProfile.isPlayer,
  });

  function handleSave() {
    console.log("Saving profile:", form);
    alert("Profile saved (mock)! Check console.");
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button
            onClick={handleSave}
            className="bg-yellow-400 text-black font-bold px-4 py-1.5 rounded-full text-sm"
          >
            Save
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-neutral-800 flex items-center justify-center text-yellow-400 font-bold text-2xl">
            {form.displayName.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="text-gray-500 text-xs mt-2">Photo upload coming soon</div>
        </div>

        <label className="text-xs text-gray-400 uppercase">Full Name</label>
        <input
          value={form.displayName}
          onChange={(e) => setForm({ ...form, displayName: e.target.value })}
          className="w-full mb-4 mt-1 p-2 rounded bg-neutral-800 outline-none"
        />

        <label className="text-xs text-gray-400 uppercase">Email Address</label>
        <input
          value={mockProfile.email}
          disabled
          className="w-full mb-4 mt-1 p-2 rounded bg-neutral-900 text-gray-500 outline-none"
        />

        <label className="text-xs text-gray-400 uppercase">Phone Number</label>
        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full mb-4 mt-1 p-2 rounded bg-neutral-800 outline-none"
        />

        <div className="flex justify-between items-center bg-neutral-900 p-4 rounded-xl">
          <div>
            <div className="font-bold">I am a player</div>
            <div className="text-xs text-gray-400">You participate in matches and training</div>
          </div>
          <button
            onClick={() => setForm({ ...form, isPlayer: !form.isPlayer })}
            className={`w-12 h-6 rounded-full flex items-center px-1 transition ${
              form.isPlayer ? "bg-yellow-400 justify-end" : "bg-neutral-700 justify-start"
            }`}
          >
            <div className="w-4 h-4 bg-white rounded-full" />
          </button>
        </div>
      </div>
    </div>
  );
}