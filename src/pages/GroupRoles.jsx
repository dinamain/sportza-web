import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockGroups } from "../data/mockData";
import { Lock } from "lucide-react";

const PERMISSIONS = [
  { key: "createEvents", label: "Create Events", emoji: "📅" },
  { key: "createPosts", label: "Create Posts", emoji: "📝" },
  { key: "createPolls", label: "Create Polls", emoji: "📊" },
  { key: "bookGrounds", label: "Book Grounds", emoji: "🏟️" },
  { key: "manageMembers", label: "Manage Members", emoji: "👥" },
  { key: "managePayments", label: "Manage Payments", emoji: "💰" },
  { key: "viewPaymentStats", label: "View Payment Statistics", emoji: "📈" },
  { key: "editGroup", label: "Edit Group", emoji: "✏️" },
  { key: "deleteGroup", label: "Delete Group", emoji: "🗑️" },
];

const LOCKED_ROLES = [
  { name: "Owner", emoji: "👑" },
  { name: "Admin", emoji: "🛡️" },
];

const emptyPerms = PERMISSIONS.reduce((acc, p) => ({ ...acc, [p.key]: false }), {});

// Editable roles with their real default permission sets, matching
// the current mobile app exactly.
const EDITABLE_ROLES = {
  Guardian: { emoji: "🧑", perms: { ...emptyPerms } },
  Member: { emoji: "👤", perms: { ...emptyPerms } },
  Trainer: {
    emoji: "🏋️",
    perms: {
      ...emptyPerms,
      createEvents: true,
      createPosts: true,
      createPolls: true,
      bookGrounds: true,
    },
  },
  Helper: {
    emoji: "🤝",
    perms: { ...emptyPerms, createEvents: true, createPosts: true },
  },
};

function Checkbox({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 ${
        checked ? "bg-yellow-400 border-yellow-400" : "border-neutral-600"
      }`}
    >
      {checked && <span className="text-black text-sm font-bold">✓</span>}
    </button>
  );
}

export default function GroupRoles() {
  const navigate = useNavigate();
  const { id } = useParams();
  const group = mockGroups.find((g) => g.id === Number(id));

  const [roles, setRoles] = useState(EDITABLE_ROLES);

  if (!group) return <div className="text-white p-4">Group not found</div>;

  function togglePermission(roleName, permKey) {
    setRoles((prev) => ({
      ...prev,
      [roleName]: {
        ...prev[roleName],
        perms: { ...prev[roleName].perms, [permKey]: !prev[roleName].perms[permKey] },
      },
    }));
  }

  function handleSave() {
    // TODO: replace with real API call once role/permission endpoints
    // are confirmed via the Groups Swagger doc.
    navigate(`/groups/${id}/edit`);
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto pb-24">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">Roles &amp; Permissions</h1>
        </div>
        <p className="text-neutral-400 text-sm mb-6">
          Choose what each role can do in this group. Owner and Admin always have full access.
        </p>

        <div className="flex flex-col gap-3">
          {LOCKED_ROLES.map((role) => (
            <div
              key={role.name}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-4 flex items-center justify-between"
            >
              <span className="font-semibold text-white flex items-center gap-2">
                <span>{role.emoji}</span> {role.name}
              </span>
              <span className="flex items-center gap-1 text-neutral-500 text-sm bg-neutral-800 px-3 py-1 rounded-full">
                <Lock size={12} /> Full access
              </span>
            </div>
          ))}

          {Object.entries(roles).map(([roleName, role]) => (
            <div
              key={roleName}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-4"
            >
              <div className="font-semibold text-white flex items-center gap-2 mb-3">
                <span>{role.emoji}</span> {roleName}
              </div>
              <div className="flex flex-col gap-3">
                {PERMISSIONS.map((p) => (
                  <div key={p.key} className="flex items-center justify-between">
                    <span className="text-neutral-300 text-sm flex items-center gap-2">
                      <span>{p.emoji}</span> {p.label}
                    </span>
                    <Checkbox
                      checked={role.perms[p.key]}
                      onChange={() => togglePermission(roleName, p.key)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="w-full rounded-xl py-3 font-semibold mt-6 fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-yellow-400 text-black"
        >
          Save
        </button>
      </div>
    </div>
  );
}