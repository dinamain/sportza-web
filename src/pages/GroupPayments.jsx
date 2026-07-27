import { Link } from "react-router-dom";
import { mockGroupPayments } from "../data/mockData";

function PaymentCard({ payment }) {
  const percent = Math.round((payment.collected / payment.amount) * 100);
  return (
    <div className="bg-neutral-900 rounded-xl p-4 mb-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-bold">{payment.title}</div>
          <div className="text-xs text-gray-400">{payment.category} · {payment.frequency}</div>
        </div>
        <div className="text-right">
          <div className="text-yellow-400 font-bold">₹{payment.amount}</div>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            payment.status === "Paid" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
          }`}>
            {payment.status === "Paid" ? "✅ Paid" : "⚠️ Overdue"}
          </span>
        </div>
      </div>
      <div className="text-xs text-gray-400 mt-2">Due: {payment.dueDate}</div>
      <div className="h-1.5 bg-neutral-800 rounded mt-2">
        <div className="h-1.5 bg-green-500 rounded" style={{ width: `${percent}%` }} />
      </div>
      <div className="text-xs text-gray-500 mt-1">₹{payment.collected} collected of ₹{payment.amount}</div>
    </div>
  );
}

export default function GroupPayments() {
  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Payments</h2>
          <Link
            to="/payments/create"
            className="bg-yellow-400 text-black w-8 h-8 rounded-full font-bold flex items-center justify-center"
          >
            +
          </Link>
        </div>

        {mockGroupPayments.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">No overdue payments</div>
        ) : (
          mockGroupPayments.map((p) => (
            <Link to={`/payments/${p.id}`} key={p.id}>
              <PaymentCard payment={p} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}