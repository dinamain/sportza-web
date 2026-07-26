import { useState } from "react";

export default function JoinGroup() {
  const [code, setCode] = useState("");

  function handleSearch() {
    console.log("Searching for group code:", code);
    alert(`Searching for group with code: ${code} (mock)`);
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto flex flex-col items-center pt-10">
        <div className="text-5xl mb-4">🔑</div>
        <h2 className="text-xl font-bold mb-2">Join a Group</h2>
        <p className="text-gray-400 text-center mb-6">
          Enter the group code shared by your club admin to join.
        </p>
        <input
          placeholder="Enter Group Code (e.g. MUFC2024)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-neutral-800 placeholder-gray-500 outline-none"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-yellow-400 text-black font-bold py-2 rounded"
        >
          Search
        </button>
      </div>
    </div>
  );
}