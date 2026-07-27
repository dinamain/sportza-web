import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockGroupPayments } from "../data/mockData";

export default function GroupPaymentStats() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { collected, outstanding } = useMemo(() => {
    return mockGroupPayments.reduce(
      (acc, p) => {
        acc.collected += p.collected || 0;
        acc.outstanding += (p.amount || 0) - (p.collected || 0);
        return acc;
      },
      { collected: 0, outstanding: 0 }
    );
  }, []);

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">Payment Statistics</h1>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-center">
            <div className="text-green-400 text-2xl font-bold">₹{collected}</div>
            <div className="text-neutral-500 text-sm mt-1">Collected</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-center">
            <div className="text-red-400 text-2xl font-bold">₹{outstanding}</div>
            <div className="text-neutral-500 text-sm mt-1">Outstanding</div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {mockGroupPayments.map((p) => {
            const pct = p.amount === 0 ? 0 : Math.round((p.collected / p.amount) * 100);
            return (
              <div
                key={p.id}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{p.title}</span>
                  <span className="text-xs bg-yellow-900/60 text-yellow-400 px-2 py-1 rounded-full">
                    {p.frequency === "One Time" ? "One Time" : "Subscription"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-neutral-300">
                    {p.collected} / {p.amount === 0 ? p.collected : Math.ceil(p.amount)} paid
                  </span>
                  <span className="text-green-400 font-semibold">{pct}%</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-2 mb-2">
                  <div
                    className="bg-green-400 h-2 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex gap-4 text-xs text-neutral-400">
                  <span>✅ ₹{p.collected} collected</span>
                  <span>🕒 ₹{(p.amount || 0) - (p.collected || 0)} pending</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}