import { useParams, Link } from "react-router-dom";
import { mockGroupPayments } from "../data/mockData";

export default function PaymentDetail() {
  const { id } = useParams();
  const payment = mockGroupPayments.find((p) => p.id === Number(id));

  if (!payment) return <div className="text-white p-4">Payment not found</div>;

  const percent = Math.round((payment.collected / payment.amount) * 100);

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Link to="/payments" className="text-white">←</Link>
          <button className="border border-neutral-700 px-3 py-1 rounded-full text-sm">✏️ Edit</button>
        </div>

        <div className="text-center mb-6">
          <div className="text-4xl mb-2">💰</div>
          <div className="text-yellow-400 text-3xl font-bold">₹{payment.amount}</div>
          <div className="font-bold text-lg">{payment.title}</div>
          <div className="flex justify-center gap-2 mt-2">
            <span className="bg-yellow-900 text-yellow-300 px-2 py-1 rounded-full text-xs">{payment.category}</span>
            <span className="bg-neutral-700 px-2 py-1 rounded-full text-xs">{payment.frequency}</span>
          </div>
          <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${
            payment.status === "Paid" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
          }`}>
            {payment.status === "Paid" ? "✅ Paid" : "⚠️ Overdue"}
          </span>
        </div>

        <div className="bg-neutral-900 rounded-xl p-4 mb-3">
          <div className="text-xs text-gray-400 font-bold mb-3">PAYMENT DETAILS</div>
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-400">📅 Due Date</span>
            <span className="font-bold">{payment.dueDate}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-400">📊 Members</span>
            <span className="font-bold">1 members</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">🔁 Frequency</span>
            <span className="font-bold">{payment.frequency}</span>
          </div>
        </div>

        <div className="bg-neutral-900 rounded-xl p-4 mb-3">
          <div className="text-xs text-gray-400 font-bold mb-3">COLLECTION PROGRESS</div>
          <div className="flex justify-around mb-3">
            <div className="text-center">
              <div className="text-green-400 font-bold">₹{payment.collected}</div>
              <div className="text-xs text-gray-400">Collected</div>
            </div>
            <div className="text-center">
              <div className="text-red-400 font-bold">₹{payment.amount - payment.collected}</div>
              <div className="text-xs text-gray-400">Pending</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{percent}%</div>
              <div className="text-xs text-gray-400">Done</div>
            </div>
          </div>
          <div className="h-1.5 bg-neutral-800 rounded">
            <div className="h-1.5 bg-green-500 rounded" style={{ width: `${percent}%` }} />
          </div>
        </div>

        <div className="bg-neutral-900 rounded-xl p-4 mb-3">
          <div className="text-xs text-gray-400 font-bold mb-2">MY PAYMENT</div>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-2xl font-bold">₹{payment.amount}</div>
              <span className="inline-block mt-1 bg-green-900 text-green-300 px-2 py-1 rounded-full text-xs">✅ Paid</span>
            </div>
            <div className="text-right text-xs text-gray-400">
              <div>Paid on 23 Jul 2026</div>
              <div>TXN: CASH4811100615</div>
            </div>
          </div>
        </div>

        <Link to="#" className="flex justify-between items-center bg-neutral-900 rounded-xl p-4 mb-3">
          <span className="text-yellow-400 font-bold">👥 See all members (1/1 paid)</span>
          <span className="text-yellow-400">›</span>
        </Link>

        <div className="bg-neutral-900 rounded-xl p-4">
          <div className="font-bold mb-2">💬 Comments (0)</div>
          <div className="text-center text-gray-500 py-4">No comments yet. Be the first!</div>
          <input
            placeholder="Add a comment..."
            className="w-full p-2 rounded bg-neutral-800 placeholder-gray-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
}