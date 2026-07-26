import { useState } from "react";

export default function Children() {
  const [children, setChildren] = useState([]); // empty, matches "No children yet"

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Children</h2>
          <button className="bg-yellow-400 text-black font-bold w-8 h-8 rounded-full">+</button>
        </div>

        {children.length === 0 ? (
          <div className="bg-neutral-900 rounded-xl p-8 text-center border border-dashed border-neutral-700">
            <div className="text-gray-500 text-3xl mb-2">👤+</div>
            <div className="font-bold mb-1">No children yet</div>
            <div className="text-gray-500 text-sm">Tap here or the + button to add a child</div>
          </div>
        ) : (
          children.map((c) => <div key={c.id}>{c.name}</div>)
        )}
      </div>
    </div>
  );
}