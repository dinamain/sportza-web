import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNotificationPreferences, setNotificationPreference } from "../api/users";

// Labels for the real notification type keys returned by
// GET /users/{userId}/notification-preferences.
const TYPE_INFO = {
  event: { label: "Events", description: "New events created in your groups" },
  event_reminder: { label: "Event Reminders", description: "Upcoming events you've RSVP'd to" },
  event_cancelled: { label: "Event Cancellations", description: "When an event you're going to is cancelled" },
  post: { label: "New Posts", description: "Announcements posted in your groups" },
  poll: { label: "Polls", description: "New polls and results in your groups" },
  payment: { label: "Payments Due", description: "Reminders for upcoming or overdue payments" },
  payment_completed: { label: "Payment Confirmations", description: "When a payment you made is confirmed" },
  group_join_request: { label: "Group Join Requests", description: "New members asking to join your group" },
  ground_booking_requested: { label: "Ground Booking Requests", description: "New requests waiting on your approval" },
  ground_booking_responded: { label: "Ground Booking Responses", description: "Approvals or rejections on your requests" },
  event_attendance_fee_created: { label: "Event Fees", description: "When a fee is added to an event you're attending" },
  event_attendance_response: { label: "Attendance Responses", description: "When someone responds to your event" },
  message: { label: "Messages", description: "New messages from your groups" },
};

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`w-12 h-7 rounded-full flex items-center px-1 transition shrink-0 disabled:opacity-50 ${
        checked ? "bg-yellow-400 justify-end" : "bg-neutral-700 justify-start"
      }`}
    >
      <span className="w-5 h-5 bg-white rounded-full" />
    </button>
  );
}

export default function NotificationPreferences() {
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingType, setPendingType] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("authToken");

    if (!userId || !token) {
      navigate("/login");
      return;
    }

    getNotificationPreferences({ userId, token })
      .then(setPrefs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [navigate]);

  async function togglePref(type, currentlyEnabled) {
    setPendingType(type);
    setError(null);
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("authToken");
      await setNotificationPreference({ userId, token, type, isEnabled: !currentlyEnabled });
      setPrefs((prev) =>
        prev.map((p) => (p.type === type ? { ...p, isEnabled: !currentlyEnabled } : p))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setPendingType(null);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-neutral-500">
        Loading...
      </div>
    );
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

        {error && (
          <div className="mb-4 p-3 bg-red-900/40 border border-red-500/50 rounded text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <div className="rounded-2xl overflow-hidden border border-neutral-800">
          {prefs.map((p) => {
            const info = TYPE_INFO[p.type] || { label: p.type, description: "" };
            return (
              <div
                key={p.type}
                className="flex items-center justify-between gap-3 bg-neutral-900 px-4 py-4 border-b border-neutral-800 last:border-b-0"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium">{info.label}</div>
                  {info.description && (
                    <div className="text-neutral-500 text-sm">{info.description}</div>
                  )}
                </div>
                <Toggle
                  checked={p.isEnabled}
                  disabled={pendingType === p.type}
                  onChange={() => togglePref(p.type, p.isEnabled)}
                />
              </div>
            );
          })}
        </div>

        <p className="text-neutral-500 text-xs text-center mt-4">
          Push notifications work even when the app is closed, if enabled.
        </p>
      </div>
    </div>
  );
}
