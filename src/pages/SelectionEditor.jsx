import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

export default function SelectionEditor({ title, options, value, onSelect, onSave }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto pb-24">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>

        <div className="flex flex-col gap-2">
          {options.map((opt) => (
            <button
              key={opt.name}
              onClick={() => onSelect(opt.name)}
              className={`w-full flex items-start gap-3 rounded-xl px-4 py-3 border text-left ${
                value === opt.name
                  ? "bg-yellow-400/10 border-yellow-400"
                  : "bg-neutral-900 border-neutral-800"
              }`}
            >
              {opt.emoji && <span className="text-xl">{opt.emoji}</span>}
              <div className="flex-1">
                <div
                  className={`font-medium ${
                    value === opt.name ? "text-yellow-400" : "text-white"
                  }`}
                >
                  {opt.name}
                </div>
                {opt.description && (
                  <div className="text-neutral-500 text-sm">{opt.description}</div>
                )}
              </div>
              {value === opt.name && <Check size={18} className="text-yellow-400 mt-1" />}
            </button>
          ))}
        </div>

        <button
          onClick={onSave}
          disabled={!value}
          className={`w-full rounded-xl py-3 font-semibold mt-6 fixed bottom-4 left-4 right-4 max-w-md mx-auto ${
            value ? "bg-yellow-400 text-black" : "bg-neutral-800 text-neutral-500"
          }`}
        >
          Save
        </button>
      </div>
    </div>
  );
}