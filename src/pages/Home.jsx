import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users, Calendar, ListChecks, CreditCard } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";

const BASE_URL = "https://user.sportza.club";

const STATS = [
  {
    label: "Groups joined",
    value: "5 groups",
    subtext: "Active in 3 roles",
    subtextColor: "#10B981",
    icon: Users,
    color: "#F16536",
  },
  {
    label: "Events this week",
    value: "2 attending",
    subtext: "Next: Thursday at 6PM",
    subtextColor: "#6B7280",
    icon: Calendar,
    color: "#3B82F6",
  },
  {
    label: "Polls to vote",
    value: "1 pending",
    subtext: "All squads ends in 2d",
    subtextColor: "#6B7280",
    icon: ListChecks,
    color: "#F59E0B",
  },
  {
    label: "Payments due",
    value: "$25.00",
    subtext: "Due by end of month",
    subtextColor: "#EF4444",
    icon: CreditCard,
    color: "#EF4444",
  },
];

const ROLE_COLORS = {
  Captain: "#F16536",
  Member: "#3B82F6",
  Treasurer: "#10B981",
  Lead: "#10B981",
};

const GROUPS = [
  { name: "Senior Men's League", role: "Captain", activity: "14 played", attendance: "95%" },
  { name: "Thursday Social Kickabout", role: "Member", activity: "8 played", attendance: "88%" },
  { name: "Club Committee Team", role: "Treasurer", activity: "3 meetings", attendance: "100%" },
  { name: "Metro FC Fan Club", role: "Member", activity: "-", attendance: "-" },
  { name: "Active Volunteers Panel", role: "Lead", activity: "4 sessions", attendance: "75%" },
];

const SCHEDULE = [
  {
    day: "THU",
    dayColor: "#3B82F6",
    title: "Thursday Social Kickabout",
    time: "6:00 PM • Training Pitch C",
  },
  {
    day: "SAT",
    dayColor: "#EF4444",
    title: "Metro FC vs City United",
    time: "3:00 PM • Warmups start at 2:00 PM",
  },
];

function StatCard({ label, value, subtext, subtextColor, icon: Icon, color }) {
  return (
    <div className="flex flex-1 flex-col gap-3 rounded-xl border border-[#E5E7EB] bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-[#4B5563]">{label}</span>
        <div
          className="flex h-7 w-7 items-center justify-center rounded-md"
          style={{ backgroundColor: `${color}1A` }}
        >
          <Icon size={16} style={{ color }} />
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[22px] font-bold text-[#111827]">{value}</span>
        <span className="text-[11px]" style={{ color: subtextColor }}>
          {subtext}
        </span>
      </div>
    </div>
  );
}

function RoleBadge({ role }) {
  const color = ROLE_COLORS[role] || "#6B7280";
  return (
    <span
      className="rounded px-2 py-0.5 text-[12px] font-semibold"
      style={{ backgroundColor: `${color}1A`, color }}
    >
      {role}
    </span>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("authToken");

    if (!userId || !token) {
      navigate("/login");
      return;
    }

    fetch(`${BASE_URL}/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load profile");
        return res.json();
      })
      .then((data) => setProfile(data))
      .catch(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        navigate("/login");
      });
  }, [navigate]);

  const firstName = profile?.displayName?.split(" ")[0];

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle={firstName ? `Welcome back, ${firstName}! Here's your personal overview.` : ""}
      user={profile}
    >
      <div className="flex gap-4">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="flex gap-4">
        <div className="flex-1 rounded-xl border border-[#E5E7EB] bg-white p-4">
          <h2 className="text-[18px] font-bold text-[#111827]">My Active Groups</h2>
          <p className="mb-3 text-[13px] text-[#6B7280]">
            Manage your team rosters, statistics, and individual attendance.
          </p>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-[#9CA3AF]">
                <th className="pb-2 font-medium">Group name</th>
                <th className="pb-2 font-medium">My role</th>
                <th className="pb-2 font-medium">Activity</th>
                <th className="pb-2 font-medium">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {GROUPS.map((group) => (
                <tr key={group.name} className="border-t border-[#F3F4F6]">
                  <td className="py-2.5 font-medium text-[#111827]">{group.name}</td>
                  <td className="py-2.5">
                    <RoleBadge role={group.role} />
                  </td>
                  <td className="py-2.5 text-[#6B7280]">{group.activity}</td>
                  <td className="py-2.5 text-[#6B7280]">{group.attendance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex w-[340px] shrink-0 flex-col gap-4">
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-[#111827]">Your Upcoming Schedule</h2>
              <span className="rounded bg-[#F16536]/10 px-2 py-0.5 text-[11px] font-semibold text-[#F16536]">
                2 RSVP
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {SCHEDULE.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[11px] font-bold"
                    style={{ backgroundColor: `${item.dayColor}1A`, color: item.dayColor }}
                  >
                    {item.day}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-[#111827]">
                      {item.title}
                    </div>
                    <div className="truncate text-xs text-[#6B7280]">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] p-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wide text-[#DC2626]">
                Payment outstanding
              </span>
              <CreditCard size={16} className="text-[#DC2626]" />
            </div>
            <div className="mb-3 text-sm font-semibold text-[#111827]">Club Membership Fees</div>
            <div className="mb-3 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-[#111827]">$25.00</span>
              <span className="text-xs text-[#6B7280]">Due by October 31st</span>
            </div>
            <Link
              to="/payments"
              className="block w-full rounded-lg bg-[#F16536] py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#e0572a]"
            >
              Pay Now
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
