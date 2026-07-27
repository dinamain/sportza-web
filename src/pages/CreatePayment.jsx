import { useState } from "react";

const PAYMENT_TYPES = [
  { key: "club_fee", label: "Club Fee", desc: "Regular membership or subscription fee for the club", emoji: "🏟️" },
  { key: "event_fee", label: "Event Fee", desc: "Fee for a specific event, match or tournament", emoji: "🎫" },
  { key: "kit", label: "Kit/Uniform", desc: "Cost of kit, jersey, uniform or sportswear", emoji: "👕" },
  { key: "equipment", label: "Equipment", desc: "Shared equipment, gear or accessories", emoji: "⚽" },
  { key: "other", label: "Other", desc: "Any other payment collection", emoji: "💳" },
];

const FREQUENCIES = [
  { key: "one_time", label: "One Time", desc: "Collected once — for a specific purpose" },
  { key: "monthly", label: "Monthly", desc: "Collected every month (12× per year)" },
  { key: "quarterly", label: "Quarterly", desc: "Collected every 3 months (4× per year)" },
  { key: "half_yearly", label: "Half Yearly", desc: "Collected twice per year" },
  { key: "yearly", label: "Yearly", desc: "Collected once per year" },
];

export default function CreatePayment() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    paymentType: "",
    frequency: "",
    title: "",
    amount: "",
    dueDate: "",
    splitEqually: false,
    description: "",
  });

  function update(field, value) {
    setForm({ ...form, [field]: value });
  }

  function handleCreate() {
    console.log("Payment to create:", form);
    alert("Payment created (mock)! Check console.");
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="text-yellow-400 text-xs mb-1">Create Payment · Step {step} of 4</div>
        <div className="h-1 bg-neutral-800 rounded mb-6">
          <div
            className="h-1 bg-yellow-400 rounded transition-all"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4">Payment Type</h2>
            {PAYMENT_TYPES.map((t) => (
              <button
                key={t.key}
                onClick={() => update("paymentType", t.key)}
                className={`w-full text-left p-4 rounded-xl mb-3 border ${
                  form.paymentType === t.key ? "border-yellow-400 bg-neutral-800" : "border-transparent bg-neutral-900"
                }`}
              >
                <div className="font-bold">{t.emoji} {t.label}</div>
                <div className="text-sm text-gray-400">{t.desc}</div>
              </button>
            ))}
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-4">Frequency</h2>
            {FREQUENCIES.map((f) => (
              <button
                key={f.key}
                onClick={() => update("frequency", f.key)}
                className={`w-full text-left p-4 rounded-xl mb-3 border ${
                  form.frequency === f.key ? "border-yellow-400 bg-neutral-800" : "border-transparent bg-neutral-900"
                }`}
              >
                <div className="font-bold">{f.label}</div>
                <div className="text-sm text-gray-400">{f.desc}</div>
              </button>
            ))}
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            <input
              placeholder="e.g. Kit Purchase 2026"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="w-full mb-3 p-2 rounded bg-neutral-800 placeholder-gray-500 outline-none"
            />
            <label className="text-xs text-gray-400">Amount (₹) *</label>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => update("amount", e.target.value)}
              className="w-full mb-3 mt-1 p-2 rounded bg-neutral-800 outline-none"
            />
            <label className="text-xs text-gray-400">Due Date</label>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => update("dueDate", e.target.value)}
              className="w-full mb-3 mt-1 p-2 rounded bg-neutral-800 outline-none"
            />
            <div className="flex justify-between items-center bg-neutral-900 p-3 rounded-xl mb-3">
              <div>
                <div className="font-bold text-sm">Split Equally</div>
                <div className="text-xs text-gray-400">Default distribution will be applied in the next step</div>
              </div>
              <button
                onClick={() => update("splitEqually", !form.splitEqually)}
                className={`w-12 h-6 rounded-full flex items-center px-1 transition ${
                  form.splitEqually ? "bg-yellow-400 justify-end" : "bg-neutral-700 justify-start"
                }`}
              >
                <div className="w-4 h-4 bg-white rounded-full" />
              </button>
            </div>
            <textarea
              placeholder="Add details about this payment..."
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full p-2 rounded bg-neutral-800 placeholder-gray-500 outline-none"
            />
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-xl font-bold mb-4">Members & Allocation</h2>
            <div className="bg-neutral-900 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold">Dina Usman</div>
                  <div className="text-xs text-gray-400">Admin</div>
                </div>
                <input
                  type="number"
                  defaultValue={form.amount || 0}
                  className="w-20 p-1 rounded bg-neutral-800 text-right outline-none"
                />
              </div>
            </div>
            <p className="text-gray-500 text-xs mt-3">
              Select who should pay and adjust member amounts when needed.
            </p>
          </>
        )}

        <div className="flex gap-2 mt-4">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="flex-1 border border-neutral-700 py-2 rounded">
              ← Back
            </button>
          )}
          {step < 4 ? (
            <button onClick={() => setStep(step + 1)} className="flex-1 bg-yellow-400 text-black font-bold py-2 rounded">
              Next
            </button>
          ) : (
            <button onClick={handleCreate} className="flex-1 bg-yellow-400 text-black font-bold py-2 rounded">
              Create Payment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}