import { useState } from "react";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [endDate, setEndDate] = useState("");
  const [allowMultiple, setAllowMultiple] = useState(false);

  function updateOption(index, value) {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  }

  function addOption() {
    if (options.length < 6) setOptions([...options, ""]);
  }

  function handleCreate() {
    console.log("Poll to create:", { question, options, endDate, allowMultiple });
    alert("Poll created (mock)! Check console.");
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Create Poll</h2>

        <label className="text-xs text-gray-400">Question *</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your group a question..."
          className="w-full mb-4 mt-1 p-2 rounded bg-neutral-800 placeholder-gray-500 outline-none"
        />

        <div className="flex justify-between items-center mb-2">
          <label className="text-xs text-gray-400">Options *</label>
          <span className="text-xs text-gray-500">{options.length}/6</span>
        </div>
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <div className="bg-yellow-900 text-yellow-300 w-7 h-7 rounded flex items-center justify-center text-sm font-bold">
              {i + 1}
            </div>
            <input
              value={opt}
              onChange={(e) => updateOption(i, e.target.value)}
              placeholder={`Option ${i + 1}`}
              className="flex-1 p-2 rounded bg-neutral-800 placeholder-gray-500 outline-none"
            />
          </div>
        ))}
        {options.length < 6 && (
          <button
            onClick={addOption}
            className="w-full border border-dashed border-yellow-400 text-yellow-400 py-2 rounded mb-4"
          >
            + Add Option
          </button>
        )}

        <label className="text-xs text-gray-400">Poll Ends (optional)</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full mb-4 mt-1 p-2 rounded bg-neutral-800 outline-none"
        />

        <div className="flex justify-between items-center bg-neutral-900 p-3 rounded-xl mb-4">
          <div>
            <div className="font-bold text-sm">Allow multiple selections</div>
            <div className="text-xs text-gray-400">Members can vote for more than one option</div>
          </div>
          <button
            onClick={() => setAllowMultiple(!allowMultiple)}
            className={`w-12 h-6 rounded-full flex items-center px-1 transition ${
              allowMultiple ? "bg-yellow-400 justify-end" : "bg-neutral-700 justify-start"
            }`}
          >
            <div className="w-4 h-4 bg-white rounded-full" />
          </button>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 border border-neutral-700 py-2 rounded">Cancel</button>
          <button
            onClick={handleCreate}
            className="flex-1 bg-yellow-400 text-black font-bold py-2 rounded"
          >
            Create Poll
          </button>
        </div>
      </div>
    </div>
  );
}