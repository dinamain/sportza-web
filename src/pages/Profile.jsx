import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Lock,
  Moon,
  Languages,
  HelpCircle,
  MessageCircle,
  FileText,
  LogOut,
  Trash2,
} from "lucide-react";

const BASE_URL = "https://user.sportza.club";

function DeleteAccountModal({ onCancel, onConfirm }) {
  const [confirmText, setConfirmText] = useState("");
  const canDelete = confirmText.trim().toUpperCase() === "DELETE";

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 max-w-sm w-full">
        <h3 className="text-white text-lg font-semibold mb-2">Delete Account</h3>
        <p className="text-neutral-400 text-sm mb-4">
          This permanently deletes your account, removes you from every group, and
          cannot be undone. Groups you own will need a new owner assigned first —
          confirm with any co-admins before continuing.
        </p>
        <input
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder='Type "DELETE" to confirm'
          className="w-full bg-black border border-neutral-700 rounded-xl px-4 py-2.5 text-white mb-4"
        />
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-neutral-700 text-neutral-300 rounded-xl py-2.5 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!canDelete}
            className={`flex-1 rounded-xl py-2.5 font-medium ${
              canDelete ? "bg-red-500 text-white" : "bg-neutral-800 text-neutral-600"
            }`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function SignOutModal({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50">
      <div className="bg-neutral-700 rounded-2xl p-5 max-w-xs w-full">
        <h3 className="text-white text-lg font-semibold mb-2">Sign Out</h3>
        <p className="text-neutral-300 text-sm mb-6">Are you sure you want to sign out?</p>
        <div className="flex justify-end gap-6">
          <button onClick={onCancel} className="text-teal-300 font-semibold text-sm tracking-wide">
            CANCEL
          </button>
          <button onClick={onConfirm} className="text-teal-300 font-semibold text-sm tracking-wide">
            SIGN OUT
          </button>
        </div>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`w-12 h-7 rounded-full flex items-center px-1 transition ${
        checked ? "bg-yellow-400 justify-end" : "bg-neutral-700 justify-start"
      }`}
    >
      <span className="w-5 h-5 bg-white rounded-full" />
    </button>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  function handleConfirmSignOut() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    setShowSignOutModal(false);
    navigate("/login");
  }

  function handleConfirmDelete() {
    // TODO: replace with real DELETE /users/{id} call — endpoint is
    // confirmed to exist per Scalar docs, just needs to be wired here.
    setShowDeleteModal(false);
    navigate("/login");
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
      <div className="max-w-md mx-auto pb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center text-yellow-400 font-bold text-xl">
            {profile.displayName?.split(" ").map((n) => n[0]).join("") || "?"}
          </div>
          <div>
            <div className="font-bold text-lg">{profile.displayName}</div>
            <div className="text-gray-400 text-sm">{profile.email}</div>
            <div className="text-gray-400 text-sm">{profile.phone}</div>
          </div>
        </div>

        <div className="flex justify-around bg-neutral-900 rounded-xl p-4 mb-6">
          <div className="text-center">
            <div className="font-bold text-yellow-400">{profile.groups ?? 0}</div>
            <div className="text-xs text-gray-400">Groups</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-yellow-400">{profile.children ?? 0}</div>
            <div className="text-xs text-gray-400">Children</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-yellow-400">{profile.events ?? 0}</div>
            <div className="text-xs text-gray-400">Events</div>
          </div>
        </div>

        <div className="text-gray-400 text-xs font-bold mb-2">ACCOUNT</div>
        <div className="bg-neutral-900 rounded-xl mb-6 overflow-hidden">
          <Link to="/profile/edit" className="flex justify-between items-center p-4 border-b border-neutral-800">
            <span>Edit Profile</span>
            <span className="text-gray-500">›</span>
          </Link>
          <Link to="/profile/children" className="flex justify-between items-center p-4 border-b border-neutral-800">
            <span>Children / Guardianship</span>
            <span className="text-gray-500">›</span>
          </Link>
          <Link to="/profile/notifications" className="flex justify-between items-center p-4 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-yellow-950 flex items-center justify-center">
                <Bell size={18} className="text-yellow-400" />
              </div>
              <span>Notification Preferences</span>
            </div>
            <span className="text-gray-500">›</span>
          </Link>
          <Link to="/profile/privacy" className="flex justify-between items-center p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-yellow-950 flex items-center justify-center">
                <Lock size={18} className="text-yellow-400" />
              </div>
              <span>Privacy &amp; Security</span>
            </div>
            <span className="text-gray-500">›</span>
          </Link>
        </div>

        <div className="text-gray-400 text-xs font-bold mb-2">APPEARANCE</div>
        <div className="bg-neutral-900 rounded-xl mb-6 overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-yellow-950 flex items-center justify-center">
                <Moon size={18} className="text-yellow-400" />
              </div>
              <span>Dark Mode</span>
            </div>
            <Toggle checked={darkMode} onChange={() => setDarkMode((v) => !v)} />
          </div>
          <button
            onClick={() => navigate("/profile/language")}
            className="w-full flex justify-between items-center p-4 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-yellow-950 flex items-center justify-center">
                <Languages size={18} className="text-yellow-400" />
              </div>
              <span>Language</span>
            </div>
            <span className="flex items-center gap-1 text-gray-500">
              English <span className="text-gray-500">›</span>
            </span>
          </button>
        </div>

        <div className="text-gray-400 text-xs font-bold mb-2">SUPPORT</div>
        <div className="bg-neutral-900 rounded-xl mb-6 overflow-hidden">
          <button
            onClick={() => navigate("/profile/help")}
            className="w-full flex justify-between items-center p-4 border-b border-neutral-800 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-yellow-950 flex items-center justify-center">
                <HelpCircle size={18} className="text-yellow-400" />
              </div>
              <span>Help &amp; FAQ</span>
            </div>
            <span className="text-gray-500">›</span>
          </button>
          <button
            onClick={() => navigate("/profile/support")}
            className="w-full flex justify-between items-center p-4 border-b border-neutral-800 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-yellow-950 flex items-center justify-center">
                <MessageCircle size={18} className="text-yellow-400" />
              </div>
              <span>Contact Support</span>
            </div>
            <span className="text-gray-500">›</span>
          </button>
          <button
            onClick={() => navigate("/profile/terms")}
            className="w-full flex justify-between items-center p-4 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-yellow-950 flex items-center justify-center">
                <FileText size={18} className="text-yellow-400" />
              </div>
              <span>Terms &amp; Privacy</span>
            </div>
            <span className="text-gray-500">›</span>
          </button>
        </div>

        <div className="bg-neutral-900 rounded-xl overflow-hidden">
          <button
            onClick={() => setShowSignOutModal(true)}
            className="w-full flex items-center gap-3 p-4 border-b border-neutral-800 text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-red-950 flex items-center justify-center">
              <LogOut size={18} className="text-red-400" />
            </div>
            <span className="text-red-400 font-medium">Sign Out</span>
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full flex items-center gap-3 p-4 text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-red-950 flex items-center justify-center">
              <Trash2 size={18} className="text-red-400" />
            </div>
            <span className="text-red-400 font-medium">Delete Account</span>
          </button>
        </div>
      </div>

      {showSignOutModal && (
        <SignOutModal
          onCancel={() => setShowSignOutModal(false)}
          onConfirm={handleConfirmSignOut}
        />
      )}
      {showDeleteModal && (
        <DeleteAccountModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}