import { Link } from "react-router-dom";
import { Plus, MoreHorizontal } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";

const STATUS_COLORS = {
  Attending: "#16A34A",
  Maybe: "#D97706",
  Declined: "#6B7280",
  Pending: "#2563EB",
};

const EVENTS = [
  {
    id: 1,
    day: "SAT",
    date: 15,
    title: "FC Kochi Weekly Practice",
    group: "FC Kochi",
    members: 55,
    time: "07:00 AM - 09:00 AM",
    location: "Panampilly Ground",
    status: "Attending",
  },
  {
    id: 2,
    day: "TUE",
    date: 18,
    title: "Midweek Friendly vs Yorkers CC",
    group: "FC Kochi",
    members: 55,
    time: "06:30 PM - 08:30 PM",
    location: "Deccatline Arena",
    status: "Maybe",
  },
  {
    id: 3,
    day: "SUN",
    date: 23,
    title: "Rapterz CC Summer Tournament Round 1",
    group: "Rapterz CC",
    members: 12,
    time: "09:00 AM - 01:00 PM",
    location: "Kaloor Stadium Pitches",
    status: "Declined",
  },
  {
    id: 4,
    day: "THU",
    date: 27,
    title: "Strategy & Kit Fitting Session",
    group: "FC Kochi",
    members: 55,
    time: "05:00 PM - 07:00 PM",
    location: "Clubhouse Boardroom",
    status: "Pending",
  },
];

function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || "#6B7280";
  return (
    <span
      className="rounded px-2.5 py-1 text-[13px] font-semibold"
      style={{ backgroundColor: `${color}1A`, color }}
    >
      {status}
    </span>
  );
}

function EventRow({ event }) {
  return (
    <div className="flex items-center gap-4 border-b border-[#F3F4F6] p-4 last:border-b-0">
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg bg-[#F16536]/10">
        <span className="text-[11px] font-bold uppercase text-[#F16536]">{event.day}</span>
        <span className="text-lg font-bold text-[#1A1A1A]">{event.date}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-semibold text-[#1A1A1A]">{event.title}</div>
        <div className="truncate text-[13px] text-[#666666]">
          {event.group} • {event.members} Members • {event.time} • {event.location}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <StatusBadge status={event.status} />
        <button className="text-[#9CA3AF] hover:text-[#666666]">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}

export default function GroupEvents() {
  return (
    <DashboardLayout
      title="Events Schedule"
      headerActions={
        <Link
          to="/events/create"
          className="flex items-center gap-1.5 rounded-full bg-[#F16536] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e0572a]"
        >
          <Plus size={14} />
          Create event
        </Link>
      }
    >
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8">
        <h2 className="mb-4 text-sm font-semibold text-[#666666]">
          Upcoming Matches &amp; Practice Sessions
        </h2>
        {EVENTS.length === 0 ? (
          <div className="py-10 text-center text-[#9CA3AF]">No upcoming events</div>
        ) : (
          <div className="flex flex-col">
            {EVENTS.map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
