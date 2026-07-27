import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, BarChart3, Users } from "lucide-react";

// Self-contained mock — matches your confirmed Event Types
// (Match, Training, Tournament, Friendly). Swap for real attendance
// data once the Events Swagger doc + a real attendance endpoint exist.
const mockAttendanceEvents = [
  { id: 1, type: "Match" },
];

const mockMemberAttendance = [
  { id: 1, name: "Dina Usman", attended: 0, declined: 0, noResponse: 1 },
];

const FILTERS = ["All", "Match", "Training", "Tournament", "Friendly"];

function getAttendancePct(m) {
  const total = m.attended + m.declined + m.noResponse;
  return total === 0 ? 0 : Math.round((m.attended / total) * 100);
}

function attendanceColor(pct) {
  if (pct >= 80) return "text-green-400";
  if (pct >= 60) return "text-yellow-400";
  return "text-red-400";
}

export default function GroupAttendance() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [filter, setFilter] = useState("All");

  const filteredEvents = useMemo(
    () => (filter === "All" ? mockAttendanceEvents : mockAttendanceEvents.filter((e) => e.type === filter)),
    [filter]
  );

  const members = useMemo(
    () => [...mockMemberAttendance].sort((a, b) => getAttendancePct(a) - getAttendancePct(b)),
    []
  );

  const avgAttendance = useMemo(() => {
    if (members.length === 0) return 0;
    const total = members.reduce((sum, m) => sum + getAttendancePct(m), 0);
    return Math.round(total / members.length);
  }, [members]);

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">Attendance Stats</h1>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === f ? "bg-yellow-400 text-black" : "bg-neutral-800 text-neutral-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-center">
            <Calendar size={18} className="text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold">{filteredEvents.length}</div>
            <div className="text-neutral-500 text-xs">Events</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-center">
            <BarChart3 size={18} className="text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold">{avgAttendance}%</div>
            <div className="text-neutral-500 text-xs">Avg Attendance</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-center">
            <Users size={18} className="text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold">{members.length}</div>
            <div className="text-neutral-500 text-xs">Members</div>
          </div>
        </div>

        {/* Average bar */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 mb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">{filter === "All" ? "Group Average" : `${filter} Average`}</span>
            <span className={`font-bold ${attendanceColor(avgAttendance)}`}>{avgAttendance}%</span>
          </div>
          <div className="w-full bg-neutral-800 rounded-full h-2 mb-2">
            <div
              className="bg-yellow-400 h-2 rounded-full"
              style={{ width: `${avgAttendance}%` }}
            />
          </div>
          <p className="text-neutral-500 text-xs">
            {avgAttendance >= 80 ? "Good" : avgAttendance >= 60 ? "Fair" : "Low"} — based on
            confirmed attendance (RSVP "Going") for past events
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-neutral-400 mb-6 mt-2">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400" /> ≥ 80% Good
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-yellow-400" /> 60–79% Fair
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-400" /> &lt; 60% Low
          </span>
        </div>

        <div className="text-neutral-500 text-xs font-semibold tracking-wide mb-2">
          MEMBERS — LOWEST ATTENDANCE FIRST
        </div>

        <div className="flex flex-col gap-2">
          {members.map((m) => {
            const pct = getAttendancePct(m);
            return (
              <div key={m.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-semibold text-yellow-400 shrink-0">
                    {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <span className="flex-1 font-medium">{m.name}</span>
                  <span className={`text-sm font-bold px-2 py-0.5 rounded-full bg-neutral-800 ${attendanceColor(pct)}`}>
                    {pct}%
                  </span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-1.5 mb-2">
                  <div className="bg-neutral-600 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <div className="flex gap-4 text-xs text-neutral-400">
                  <span>✅ {m.attended} attended</span>
                  <span>❌ {m.declined} declined</span>
                  <span>❓ {m.noResponse} no response</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}