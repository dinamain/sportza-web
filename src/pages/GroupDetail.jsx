import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Settings,
  AlertTriangle,
  Users,
  Trophy,
  TrendingUp,
  Clock,
  ChevronRight,
  Search,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "events", label: "Events (3)" },
  { key: "subgroups", label: "Subgroups (4)" },
  { key: "members", label: "Members (142)" },
  { key: "chat", label: "Chat" },
];

const STATS = [
  { label: "Total Members", value: "142", icon: Users, color: "#F16536" },
  { label: "Matches Played", value: "28", icon: Trophy, color: "#F59E0B" },
  { label: "Win Rate", value: "72%", icon: TrendingUp, color: "#10B981" },
  { label: "Pending RSVPs", value: "14", icon: Clock, color: "#EF4444" },
];

const SUBGROUPS = [
  { name: "Kochi 7v7 Squad", players: 24 },
  { name: "Kochi Vet Rookies", players: 18 },
  { name: "Sunday Pick-Up Squad", players: 42 },
];

const NOTICES = [
  {
    title: "Jersey size orders close tomorrow",
    body: "Make sure to input your size preferences in the admin Google form link posted on chat before Wednesday noon! No late entries.",
    author: "John Mathew",
    time: "4 hours ago",
  },
];

const MEMBERS = [
  { name: "John Mathew", role: "Admin", status: "PAID" },
  { name: "Sarah Jenkins", role: "Moderator", status: "PAID" },
  { name: "Anoop Dev", role: "Member", status: "UNPAID" },
  { name: "Nisha Rao", role: "Member", status: "PAID" },
  { name: "Kevin Paul", role: "Member", status: "PAID" },
];

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="flex flex-1 items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-4">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${color}1A` }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      <div>
        <div className="text-lg font-bold text-[#1A1A1A]">{value}</div>
        <div className="text-xs text-[#666666]">{label}</div>
      </div>
    </div>
  );
}

export default function GroupDetail() {
  const [tab, setTab] = useState("overview");

  return (
    <DashboardLayout hideHeader fullBleed>
      <div className="flex items-center justify-between border-b border-[#E5E5E5] bg-white px-8 py-4">
        <div className="flex items-center gap-3">
          <Link to="/groups" className="text-[#666666] hover:text-[#1A1A1A]">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F16536] text-sm font-bold text-white">
            FC
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-[#1A1A1A]">FC Kochi</span>
              <CheckCircle2 size={16} className="text-[#3B82F6]" />
            </div>
            <div className="text-[13px] text-[#666666]">
              Football • Kochi, Kerala • Est. June 2024
            </div>
          </div>
        </div>
        <button className="flex items-center gap-1.5 rounded-full border border-[#E5E5E5] px-4 py-2 text-sm font-medium text-[#1A1A1A] transition-colors hover:bg-[#FAFAFA]">
          <Settings size={14} />
          Admin Panel
        </button>
      </div>

      <div className="flex items-center justify-between bg-[#F16536] px-8 py-2.5 text-sm text-white">
        <div className="flex items-center gap-2">
          <AlertTriangle size={14} />
          <span>ADMIN ACTION REQUIRED: 3 court bookings for Sunday require payment verification.</span>
        </div>
        <Link to="/payments" className="font-semibold underline">
          Review Payments
        </Link>
      </div>

      <div className="flex gap-8 border-b border-[#E5E5E5] bg-white px-8">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`border-b-2 py-4 text-sm font-medium transition-colors ${
              tab === t.key
                ? "border-[#F16536] text-[#F16536]"
                : "border-transparent text-[#666666] hover:text-[#1A1A1A]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-8">
        {tab === "overview" ? (
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              {STATS.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>

            <div className="grid grid-cols-[1fr_340px] gap-4">
              <div className="flex flex-col gap-4">
                <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-bold text-[#1A1A1A]">Active Subgroups</h3>
                    <button className="text-sm font-medium text-[#F16536] hover:underline">
                      Create subgroup
                    </button>
                  </div>
                  <div className="flex gap-3">
                    {SUBGROUPS.map((sg) => (
                      <div
                        key={sg.name}
                        className="flex flex-1 items-center justify-between rounded-lg border border-[#E5E5E5] p-3"
                      >
                        <div>
                          <div className="text-sm font-semibold text-[#1A1A1A]">{sg.name}</div>
                          <div className="text-xs text-[#666666]">{sg.players} players</div>
                        </div>
                        <ChevronRight size={16} className="text-[#9CA3AF]" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
                  <h3 className="mb-3 font-bold text-[#1A1A1A]">Recent Notices</h3>
                  <div className="flex flex-col gap-3">
                    {NOTICES.map((n) => (
                      <div key={n.title} className="rounded-lg border border-[#E5E5E5] p-3">
                        <div className="text-sm font-semibold text-[#1A1A1A]">{n.title}</div>
                        <p className="mt-1 text-[13px] text-[#666666]">{n.body}</p>
                        <div className="mt-2 text-xs text-[#9CA3AF]">
                          Posted by {n.author} • {n.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-bold text-[#1A1A1A]">Members Roster</h3>
                  <span className="text-xs text-[#666666]">142 Total</span>
                </div>
                <div className="mb-3 flex items-center gap-2 rounded-lg border border-[#E5E5E5] px-3 py-2">
                  <Search size={14} className="text-[#9CA3AF]" />
                  <input
                    placeholder="Search by name..."
                    className="w-full text-sm text-[#1A1A1A] outline-none placeholder-[#9CA3AF]"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  {MEMBERS.map((m) => (
                    <div key={m.name} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F5F5F5] text-xs font-semibold text-[#666666]">
                        {m.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-[#1A1A1A]">
                          {m.name}
                        </div>
                        <div className="text-xs text-[#666666]">{m.role}</div>
                      </div>
                      <span
                        className="rounded px-2 py-0.5 text-[11px] font-semibold"
                        style={{
                          backgroundColor: m.status === "PAID" ? "#D1FAE5" : "#FEE2E2",
                          color: m.status === "PAID" ? "#059669" : "#DC2626",
                        }}
                      >
                        {m.status}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="mt-3 w-full text-center text-sm font-medium text-[#F16536] hover:underline">
                  View complete roster directory
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-12 text-center text-[#666666]">
            {TABS.find((t) => t.key === tab)?.label} content coming soon.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
