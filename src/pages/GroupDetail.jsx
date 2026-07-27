import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Pencil, Menu } from "lucide-react";
import { mockGroups, mockGroupEvents, mockGroupPosts, mockGroupPolls, mockGroupPayments } from "../data/mockData";

export default function GroupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const group = mockGroups.find((g) => g.id === Number(id));
  const [tab, setTab] = useState("events");

  if (!group) return <div className="text-white p-4">Group not found</div>;

  const tabs = [
    { key: "events", label: "Events" },
    { key: "posts", label: "Posts" },
    { key: "polls", label: "Polls" },
    { key: "payments", label: "Payments" },
  ];

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/groups" className="text-white text-xl">←</Link>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/groups/${id}/edit`)}
              className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center"
            >
              <Pencil size={16} className="text-white" />
            </button>
            <button
              onClick={() => navigate(`/groups/${id}/more`)}
              className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center"
            >
              <Menu size={16} className="text-white" />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center mt-4 mb-4">
          <div className="w-20 h-20 bg-neutral-800 rounded-2xl flex items-center justify-center text-3xl mb-2">
            🏐
          </div>
          <h2 className="text-xl font-bold">{group.name}</h2>
          <div className="flex gap-2 mt-2">
            <span className="bg-yellow-900 text-yellow-300 px-2 py-1 rounded-full text-xs">{group.sport}</span>
            <span className="bg-neutral-700 px-2 py-1 rounded-full text-xs">{group.groupType}</span>
            <span className="bg-teal-900 text-teal-300 px-2 py-1 rounded-full text-xs">{group.clubType}</span>
          </div>
          <div className="text-gray-400 text-sm mt-1">📍 {group.location}</div>
        </div>

        <div className="flex justify-around bg-neutral-900 rounded-xl p-4 mb-3">
          <div className="text-center">
            <div className="font-bold text-yellow-400">{group.members}</div>
            <div className="text-xs text-gray-400">Members</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-yellow-400">{group.subGroups}</div>
            <div className="text-xs text-gray-400">Sub Groups</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-yellow-400">{group.teams}</div>
            <div className="text-xs text-gray-400">Teams</div>
          </div>
        </div>

        <div className="flex justify-between items-center bg-neutral-900 rounded-xl p-3 mb-4">
          <span className="text-gray-400 text-sm">🔑 Group Code: <span className="text-yellow-400">{group.groupCode}</span></span>
        </div>

        <div className="flex border-b border-neutral-800 mb-4">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 pb-2 text-sm font-bold ${
                tab === t.key ? "text-yellow-400 border-b-2 border-yellow-400" : "text-gray-500"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "events" && (
          mockGroupEvents.length === 0
            ? <div className="text-center text-gray-500 mt-10">No upcoming events</div>
            : mockGroupEvents.map((e) => <div key={e.id} className="text-white mb-2">{e.title}</div>)
        )}
        {tab === "posts" && (
          mockGroupPosts.length === 0
            ? <div className="text-center text-gray-500 mt-10">No posts in the last 3 days</div>
            : mockGroupPosts.map((p) => <div key={p.id} className="text-white mb-2">{p.content}</div>)
        )}
        {tab === "polls" && (
          mockGroupPolls.length === 0
            ? <div className="text-center text-gray-500 mt-10">No open polls</div>
            : mockGroupPolls.map((p) => <div key={p.id}>{p.question}</div>)
        )}
        {tab === "payments" && (
          mockGroupPayments.length === 0
            ? <div className="text-center text-gray-500 mt-10">No overdue payments</div>
            : mockGroupPayments.map((p) => <div key={p.id} className="text-white mb-2">{p.title} — ₹{p.amount}</div>)
        )}
      </div>
    </div>
  );
}