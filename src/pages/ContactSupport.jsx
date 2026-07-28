import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Send } from "lucide-react";

const CATEGORIES = [
  "Account issue",
  "Payment issue",
  "Bug report",
  "Feature request",
  "Other",
];

export default function ContactSupport() {
  const navigate = useNavigate();
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSend() {
    // TODO: replace with a real support-ticket endpoint once one
    // exists. For now this just simulates a sent state.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-black p-4 text-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="text-4xl mb-4">✅</div>
          <h2 className="text-xl font-semibold mb-2">Message sent</h2>
          <p className="text-neutral-400 text-sm mb-6">
            We'll get back to you as soon as we can.
          </p>
          <button
            onClick={() => navigate("/profile")}
            className="bg-yellow-400 text-black rounded-xl py-3 px-6 font-semibold"
          >
            Back to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">Contact Support</h1>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-yellow-950 flex items-center justify-center shrink-0">
            <Mail size={18} className="text-yellow-400" />
          </div>
          <div>
            <div className="text-neutral-400 text-sm">Or email us directly at</div>
            <div className="text-yellow-400 font-medium">support@sportza.club</div>
          </div>
        </div>

        <label className="text-neutral-400 text-sm mb-2 block">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white mb-5"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label className="text-neutral-400 text-sm mb-2 block">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your issue..."
          rows={6}
          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white mb-6 resize-none"
        />

        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 font-semibold ${
            message.trim() ? "bg-yellow-400 text-black" : "bg-neutral-800 text-neutral-500"
          }`}
        >
          <Send size={16} /> Send Message
        </button>
      </div>
    </div>
  );
}