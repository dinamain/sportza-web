import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

// Self-contained mock — empty on purpose, matching your screenshot.
// This feature still needs clarification from Deepak on how inter-club
// invites actually work before building the accept/decline flow.
const mockInvitations = [];

export default function GroupMatchInvitations() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">Match Invitations</h1>
        </div>

        {mockInvitations.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-24 text-neutral-500">
            <Mail size={48} className="mb-4" />
            <p>No pending match invites</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {mockInvitations.map((inv) => (
              <div key={inv.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4">
                <div className="text-white font-medium">{inv.fromClub}</div>
                <div className="text-neutral-500 text-sm mt-1">{inv.date}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}