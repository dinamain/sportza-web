import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../api/users";

const BASE_URL = "https://user.sportza.club";

export default function EditProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ displayName: "", phone: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

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
      .then((data) => {
        setProfile(data);
        setForm({ displayName: data.displayName || "", phone: data.phone || "" });
      })
      .catch(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("authToken");
      await updateUser({ userId, token, displayName: form.displayName, phone: form.phone || null });
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-neutral-500">
        Loading profile...
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-yellow-400 text-black font-bold px-4 py-1.5 rounded-full text-sm disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-neutral-800 flex items-center justify-center text-yellow-400 font-bold text-2xl">
            {(form.displayName || "?").split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="text-gray-500 text-xs mt-2">Photo upload coming soon</div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/40 border border-red-500/50 rounded text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <label className="text-xs text-gray-400 uppercase">Full Name</label>
        <input
          value={form.displayName}
          onChange={(e) => setForm({ ...form, displayName: e.target.value })}
          className="w-full mb-4 mt-1 p-2 rounded bg-neutral-800 outline-none"
        />

        <label className="text-xs text-gray-400 uppercase">Email Address</label>
        <input
          value={profile.email}
          disabled
          className="w-full mb-4 mt-1 p-2 rounded bg-neutral-900 text-gray-500 outline-none"
        />

        <label className="text-xs text-gray-400 uppercase">Phone Number</label>
        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full mb-4 mt-1 p-2 rounded bg-neutral-800 outline-none"
        />
      </div>
    </div>
  );
}
