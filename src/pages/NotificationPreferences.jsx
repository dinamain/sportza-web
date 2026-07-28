import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Notification types inferred from your User Manual notes (event
// reminders, cancellations, new posts, polls, payments due, ground
// booking requests/responses, match invites). Confirm the exact type
// keys against GET /users/{userId}/notification-preferences once you
// can hit it past CORS.
const NOTIFICATION_TYPES = [
  { key: "eventReminders", label: "Event Reminders", description: "Upcoming events you've RSVP'd to" },
  { key: "eventCancellations", label: "Event Cancellations", description: "When an event you're going to is cancelled" },
  { key: "newPosts", label: "New Posts", description: "Announcements posted in your groups" },
  { key: "polls", label: "Polls", description: "New polls and results in your groups" },
  { key: "paymentsDue", label: "Payments Due", description: "Reminders for upcoming or overdue payments" },
  { key: "groundBookingRequests", label: "Ground Booking Requests", description: "New requests waiting on your approval" },
  { key: "groundBookingResponses", label: "Ground Booking Responses", description: "Approvals or rejections on your requests" },
  { key: "matchInvitations", label: "Match Invitations", description: "Invites from other clubs" },
];

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`w-12 h-7 rounded-full flex items-center px-1 transition shrink-0 ${
        checked ? "bg-yellow-400 justify-end" : "bg-neutral-700 justify-start"
      }`}
    >
      <span className="w-5 h-5 bg-white rounded-full" />
    </button>
  );
}

export default function NotificationPreferences() {
  const navigate = useNavigate();

  const [prefs, setPrefs] = useState(
    NOTIFICATION_TYPES.reduce((acc, t) => ({ ...acc, [t.key]: true }), {})
  );

  function togglePref(key) {
    // TODO: replace with real PUT
    // /users/{userId}/notification-preferences/{type}/enabled call.
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">Notification Preferences</h1>
        </div>

        <div className="rounded-2xl overflow-hidden border border-neutral-800">
          {NOTIFICATION_TYPES.map((t) => (
            <div
              key={t.key}
              className="flex items-center justify-between gap-3 bg-neutral-900 px-4 py-4 border-b border-neutral-800 last:border-b-0"
            >
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium">{t.label}</div>
                <div className="text-neutral-500 text-sm">{t.description}</div>
              </div>
              <Toggle checked={prefs[t.key]} onChange={() => togglePref(t.key)} />
            </div>
          ))}
        </div>

        <p className="text-neutral-500 text-xs text-center mt-4">
          Push notifications work even when the app is closed, if enabled.
        </p>
      </div>
    </div>
  );
}