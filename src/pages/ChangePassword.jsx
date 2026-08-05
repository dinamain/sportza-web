import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../api/auth";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!currentPassword || !newPassword) {
      setError("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setSaving(true);
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("authToken");
      await changePassword({ userId, token, currentPassword, newPassword });
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">Change Password</h1>
        </div>

        {success ? (
          <div className="text-center">
            <div className="mb-4 p-4 bg-green-900/40 border border-green-500/50 rounded-xl text-green-400 text-sm">
              Your password has been changed successfully.
            </div>
            <button
              onClick={() => navigate("/profile/privacy")}
              className="w-full bg-yellow-400 text-black rounded-xl py-3 font-semibold"
            >
              Back to Privacy &amp; Security
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="text-neutral-400 text-sm mb-2 block">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white mb-5"
              autoFocus
            />

            <label className="text-neutral-400 text-sm mb-2 block">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white mb-5"
            />

            <label className="text-neutral-400 text-sm mb-2 block">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white mb-8"
            />

            {error && (
              <div className="mb-4 p-3 bg-red-900/40 border border-red-500/50 rounded text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-yellow-400 text-black rounded-xl py-3 font-semibold disabled:opacity-50"
            >
              {saving ? "Changing..." : "Change Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
