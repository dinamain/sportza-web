import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Children() {
  const [children, setChildren] = useState([]); // empty, matches "No children yet"
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Children</h2>
          <button
            onClick={() => navigate("/profile/children/add")}
            className="bg-yellow-400 text-black font-bold w-8 h-8 rounded-full"
          >
            +
          </button>
        </div>

        {children.length === 0 ? (
          <button
            onClick={() => navigate("/profile/children/add")}
            className="w-full bg-neutral-900 rounded-xl p-8 text-center border border-dashed border-neutral-700"
          >
            <div className="text-gray-500 text-3xl mb-2">👤+</div>
            <div className="font-bold mb-1">No children yet</div>
            <div className="text-gray-500 text-sm">Tap here or the + button to add a child</div>
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            {children.map((c) => (
              <button
                key={c.id}
                onClick={() => navigate(`/profile/children/${c.id}`)}
                className="w-full bg-neutral-900 rounded-xl p-4 flex items-center gap-3 text-left border border-neutral-800"
              >
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center font-semibold text-yellow-400">
                  {c.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{c.name}</div>
                  {c.sport && <div className="text-gray-500 text-sm">{c.sport}</div>}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}