import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// Self-contained mock — you're the only member so far, matching your
// screenshot ("MEMBERS (1)"). Swap for a real fetch once a Members
// endpoint exists.
const initialMembers = [
  { id: 1, name: "Dina Usman", role: "Admin", isSelf: true },
];

const initialJoinRequests = [];

const roleDotColor = {
  Owner: "bg-orange-400",
  Admin: "bg-orange-400",
  Trainer: "bg-blue-400",
  Member: "bg-neutral-400",
  Guardian: "bg-purple-400",
};

const roleTextColor = {
  Owner: "text-orange-400",
  Admin: "text-orange-400",
  Trainer: "text-blue-400",
  Member: "text-neutral-400",
  Guardian: "text-purple-400",
};

export default function GroupMembers() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [members] = useState(initialMembers);
  const [joinRequests, setJoinRequests] = useState(initialJoinRequests);

  function handleApprove(requestId) {
    // TODO: replace with real approve-join-request API call once the
    // Groups Swagger doc is available.
    setJoinRequests((prev) => prev.filter((r) => r.id !== requestId));
  }

  function handleReject(requestId) {
    setJoinRequests((prev) => prev.filter((r) => r.id !== requestId));
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">Members</h1>
        </div>

        {joinRequests.length > 0 && (
          <>
            <div className="text-yellow-400 text-sm font-semibold mb-2">
              JOIN REQUESTS ({joinRequests.length})
            </div>
            <div className="flex flex-col gap-2 mb-6">
              {joinRequests.map((r) => (
                <div
                  key={r.id}
                  className="bg-neutral-900 rounded-2xl p-4 flex items-center justify-between"
                >
                  <span className="text-white font-medium">{r.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(r.id)}
                      className="text-green-400 text-sm font-semibold"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(r.id)}
                      className="text-red-400 text-sm font-semibold"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="text-yellow-400 text-sm font-semibold mb-2">
          MEMBERS ({members.length})
        </div>

        <div className="flex flex-col gap-2">
          {members.map((m) => (
            <button
              key={m.id}
              onClick={() => navigate(`/groups/${id}/members/${m.id}`)}
              className="w-full bg-neutral-900 rounded-2xl p-4 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-purple-950 flex items-center justify-center text-sm font-bold text-purple-300">
                  {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">{m.name.toUpperCase()}</span>
                  {m.isSelf && (
                    <span className="bg-teal-950 text-teal-300 text-xs px-2 py-0.5 rounded-md">
                      You
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${roleDotColor[m.role]}`} />
                <span className={`text-sm font-medium ${roleTextColor[m.role]}`}>{m.role}</span>
                <ChevronRight size={18} className="text-neutral-600" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}