import { mockProfile } from "../data/mockData";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center text-yellow-400 font-bold text-xl">
            {mockProfile.displayName.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div className="font-bold text-lg">{mockProfile.displayName}</div>
            <div className="text-gray-400 text-sm">{mockProfile.email}</div>
            <div className="text-gray-400 text-sm">{mockProfile.phone}</div>
          </div>
        </div>

        <div className="flex justify-around bg-neutral-900 rounded-xl p-4 mb-6">
          <div className="text-center">
            <div className="font-bold text-yellow-400">{mockProfile.groups}</div>
            <div className="text-xs text-gray-400">Groups</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-yellow-400">{mockProfile.children}</div>
            <div className="text-xs text-gray-400">Children</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-yellow-400">{mockProfile.events}</div>
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
          <div className="flex justify-between items-center p-4 border-b border-neutral-800 text-gray-500">
            <span>Notification Preferences</span>
            <span>›</span>
          </div>
          <div className="flex justify-between items-center p-4 text-gray-500">
            <span>Privacy & Security</span>
            <span>›</span>
          </div>
        </div>
      </div>
    </div>
  );
}