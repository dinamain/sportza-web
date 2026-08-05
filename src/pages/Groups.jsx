import { Link } from "react-router-dom";
import { Users, MapPin, ChevronRight, Key, Plus } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";

const ROLE_COLORS = {
  ADMIN: "#F16536",
};
const DEFAULT_ROLE_COLOR = "#666666";

const GROUPS = [
  {
    id: 1,
    name: "FC Kochi",
    sport: "Football",
    location: "Kochi, Kerala",
    members: 142,
    role: "ADMIN",
    alert: "Match RSVP open",
    avatarColor: "#F16536",
  },
  {
    id: 2,
    name: "Downtown Runners",
    sport: "Athletics",
    location: "Kochi Marine Drive",
    members: 310,
    role: "MEMBER",
    alert: null,
    avatarColor: "#3B82F6",
  },
  {
    id: 3,
    name: "Vanguard Tennis Club",
    sport: "Tennis",
    location: "Kochi Club, Thevara",
    members: 48,
    role: "MODERATOR",
    alert: "Court booking pending",
    avatarColor: "#10B981",
  },
  {
    id: 4,
    name: "Smash Badminton Circle",
    sport: "Badminton",
    location: "YMCA Indoor Court",
    members: 69,
    role: "MEMBER",
    alert: null,
    avatarColor: "#8B5CF6",
  },
  {
    id: 5,
    name: "Kochi Cycling Collective",
    sport: "Cycling",
    location: "Panampilly Nagar",
    members: 120,
    role: "MEMBER",
    alert: null,
    avatarColor: "#F59E0B",
  },
];

function RoleBadge({ role }) {
  const color = ROLE_COLORS[role] || DEFAULT_ROLE_COLOR;
  const bg = ROLE_COLORS[role] ? `${color}1A` : "#F5F5F5";
  return (
    <span
      className="rounded px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide"
      style={{ backgroundColor: bg, color }}
    >
      {role}
    </span>
  );
}

function GroupRow({ group }) {
  return (
    <Link
      to={`/groups/${group.id}`}
      className="flex items-center gap-6 border-b border-[#E5E5E5] p-5 last:border-b-0 hover:bg-[#FAFAFA]"
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ backgroundColor: group.avatarColor }}
      >
        {group.name.charAt(0)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate text-base font-bold text-[#1A1A1A]">{group.name}</div>
        <div className="flex items-center gap-1 text-[13px] text-[#666666]">
          <span>{group.sport}</span>
          <span>•</span>
          <MapPin size={12} />
          <span className="truncate">{group.location}</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-6">
        <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#666666]">
          <Users size={14} />
          {group.members} members
        </div>
        <RoleBadge role={group.role} />
        {group.alert && (
          <span className="rounded bg-red-500/10 px-2 py-1 text-[11px] font-semibold text-red-500">
            {group.alert}
          </span>
        )}
        <ChevronRight size={18} className="text-[#9CA3AF]" />
      </div>
    </Link>
  );
}

export default function Groups() {
  return (
    <DashboardLayout
      title="My Groups"
      titleBadge={
        <span className="rounded bg-[#F16536]/10 px-2 py-0.5 text-[13px] font-bold text-[#F16536]">
          {GROUPS.length} Active
        </span>
      }
      headerActions={
        <div className="flex items-center gap-3">
          <Link
            to="/groups/join"
            className="flex items-center gap-1.5 rounded-full border border-[#F16536] px-5 py-2.5 text-sm font-semibold text-[#F16536] transition-colors hover:bg-[#F16536]/5"
          >
            <Key size={14} />
            Join with Code
          </Link>
          <Link
            to="/groups/create"
            className="flex items-center gap-1.5 rounded-full bg-[#F16536] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e0572a]"
          >
            <Plus size={14} />
            Create Group
          </Link>
        </div>
      }
    >
      <div className="rounded-2xl border border-[#E5E5E5] bg-white">
        {GROUPS.map((group) => (
          <GroupRow key={group.id} group={group} />
        ))}
      </div>

      <div
        className="flex items-center justify-between rounded-2xl p-7"
        style={{
          background: "linear-gradient(135deg, #F16536 0%, #D9531F 100%)",
        }}
      >
        <div className="flex flex-col gap-1.5 text-white">
          <span className="font-bold">Explore local sport communities in Kochi</span>
          <span className="max-w-[500px] text-[13px] text-white/80">
            From weekly pick-up basketball games to competitive tennis matches. Find, join, and
            thrive with sport groups around your neighborhood.
          </span>
        </div>
        <Link
          to="/groups"
          className="shrink-0 whitespace-nowrap rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#F16536] transition-colors hover:bg-white/90"
        >
          Browse Discover Directory
        </Link>
      </div>
    </DashboardLayout>
  );
}
