import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockGroups } from "../data/mockData";
import {
  Camera,
  Type,
  FileText,
  Trophy,
  Award,
  Users,
  MapPin,
  Building2,
  User,
  Mail,
  Phone,
  Wallet,
  Key,
  Lock,
  ChevronRight,
  Trash2,
} from "lucide-react";

function Row({ icon, iconBg, title, value, onClick, right }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 bg-neutral-900 px-4 py-3 border-b border-neutral-800 last:border-b-0 text-left"
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white font-medium">{title}</div>
        <div className="text-neutral-500 text-sm truncate">{value || "Not set"}</div>
      </div>
      {right || <ChevronRight className="text-neutral-600 shrink-0" size={18} />}
    </button>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="text-neutral-500 text-xs font-semibold tracking-wide mt-6 mb-2 px-1">
      {children}
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

function DeleteGroupModal({ onCancel, onConfirm }) {
  const [items, setItems] = useState({
    events: true,
    posts: true,
    polls: true,
    payments: true,
  });

  function toggle(key) {
    setItems((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 max-w-sm w-full">
        <h3 className="text-white text-lg font-semibold mb-2">Delete Group</h3>
        <p className="text-neutral-400 text-sm mb-4">
          The group will be removed from everyone's list. Choose what to permanently
          delete — anything left unchecked will be kept. If this group has other admins,
          the delete is scheduled with a 48-hour window so any admin can cancel it;
          otherwise it happens right away.
        </p>

        <div className="flex flex-col gap-3 mb-5">
          {[
            { key: "events", label: "Events" },
            { key: "posts", label: "Posts" },
            { key: "polls", label: "Polls" },
            { key: "payments", label: "Payments" },
          ].map((item) => (
            <div key={item.key} className="flex items-center gap-3">
              <Checkbox checked={items[item.key]} onChange={() => toggle(item.key)} />
              <span className="text-white font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-neutral-700 text-neutral-300 rounded-xl py-2.5 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(items)}
            className="flex-1 bg-red-500 text-white rounded-xl py-2.5 font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EditGroup() {
  const navigate = useNavigate();
  const { id } = useParams();
  const group = mockGroups.find((g) => g.id === Number(id));

  const [description] = useState(group?.description || "");
  const [ageCategory] = useState(group?.ageCategory || "Mixed");
  const [location] = useState(group?.location || "");
  const [city] = useState(group?.city || "Mumbai");
  const [contactName] = useState(group?.contactName || "");
  const [contactEmail] = useState(group?.contactEmail || "");
  const [contactPhone] = useState(group?.contactPhone || "");
  const [upiId] = useState(group?.upiId || "club@upi");
  const [isPrivate, setIsPrivate] = useState(group?.isPrivate ?? false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!group) return <div className="text-white p-4">Group not found</div>;

  function handleConfirmDelete(items) {
    // TODO: replace with real DELETE /groups/:id call once the Groups
    // Swagger doc is available, passing `items` so the backend knows
    // which related data to purge vs. keep. Also needs the multi-admin
    // check to decide immediate vs. 48-hour scheduled delete.
    setShowDeleteModal(false);
    navigate("/groups");
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto pb-10">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">Edit Group</h1>
        </div>

        <button className="w-full flex items-center gap-3 bg-neutral-900 rounded-2xl p-4 border border-neutral-800 mb-2 text-left">
          <div className="relative w-16 h-16 rounded-2xl bg-neutral-800 flex items-center justify-center shrink-0">
            <Camera size={22} className="text-neutral-500" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-neutral-600 rounded-full flex items-center justify-center">
              <Camera size={12} className="text-white" />
            </div>
          </div>
          <div>
            <div className="text-neutral-400 font-medium">Group Photo</div>
            <div className="text-neutral-500 text-sm">Coming soon</div>
          </div>
        </button>

        <SectionLabel>BASIC INFO</SectionLabel>
        <div className="rounded-2xl overflow-hidden border border-neutral-800">
          <Row
            icon={<Type size={18} className="text-blue-400" />}
            iconBg="bg-blue-950"
            title="Group Name"
            value={group.name}
            onClick={() => navigate(`/groups/${id}/edit/name`)}
          />
          <Row
            icon={<FileText size={18} className="text-purple-400" />}
            iconBg="bg-purple-950"
            title="Description"
            value={description}
            onClick={() => navigate(`/groups/${id}/edit/description`)}
          />
        </div>

        <SectionLabel>SPORT &amp; CATEGORY</SectionLabel>
        <div className="rounded-2xl overflow-hidden border border-neutral-800">
          <Row
            icon={<Trophy size={18} className="text-red-400" />}
            iconBg="bg-red-950"
            title="Sport"
            value={group.sport}
            onClick={() => navigate(`/groups/${id}/edit/sport`)}
          />
          <Row
            icon={<Award size={18} className="text-yellow-400" />}
            iconBg="bg-yellow-950"
            title="Group Type"
            value={group.groupType}
            onClick={() => navigate(`/groups/${id}/edit/group-type`)}
          />
          <Row
            icon={<Users size={18} className="text-green-400" />}
            iconBg="bg-green-950"
            title="Age Category"
            value={ageCategory}
            onClick={() => navigate(`/groups/${id}/edit/age-category`)}
          />
        </div>

        <SectionLabel>LOCATION &amp; CONTACT</SectionLabel>
        <div className="rounded-2xl overflow-hidden border border-neutral-800">
          <Row
            icon={<MapPin size={18} className="text-red-400" />}
            iconBg="bg-red-950"
            title="Location"
            value={location}
            onClick={() => navigate(`/groups/${id}/edit/location`)}
          />
          <Row
            icon={<Building2 size={18} className="text-teal-400" />}
            iconBg="bg-teal-950"
            title="City"
            value={city}
            onClick={() => navigate(`/groups/${id}/edit/city`)}
          />
          <Row
            icon={<User size={18} className="text-blue-400" />}
            iconBg="bg-blue-950"
            title="Contact Name"
            value={contactName}
            onClick={() => navigate(`/groups/${id}/edit/contact-name`)}
          />
          <Row
            icon={<Mail size={18} className="text-purple-400" />}
            iconBg="bg-purple-950"
            title="Contact Email"
            value={contactEmail}
            onClick={() => navigate(`/groups/${id}/edit/contact-email`)}
          />
          <Row
            icon={<Phone size={18} className="text-green-400" />}
            iconBg="bg-green-950"
            title="Contact Phone"
            value={contactPhone}
            onClick={() => navigate(`/groups/${id}/edit/contact-phone`)}
          />
        </div>

        <SectionLabel>SETTINGS</SectionLabel>
        <div className="rounded-2xl overflow-hidden border border-neutral-800">
          <Row
            icon={<Wallet size={18} className="text-green-400" />}
            iconBg="bg-green-950"
            title="UPI ID"
            value={upiId}
            onClick={() => navigate(`/groups/${id}/edit/upi`)}
          />
          <Row
            icon={<Key size={18} className="text-yellow-400" />}
            iconBg="bg-yellow-950"
            title="Group Code"
            value={group.groupCode}
            onClick={() => navigate(`/groups/${id}/edit/group-code`)}
          />
          <Row
            icon={<Lock size={18} className="text-red-400" />}
            iconBg="bg-red-950"
            title="Private Group"
            value="Anyone can discover and join"
            right={<Toggle checked={isPrivate} onChange={() => setIsPrivate((v) => !v)} />}
          />
        </div>

        <SectionLabel>MEMBER ACCESS</SectionLabel>
        <div className="rounded-2xl overflow-hidden border border-neutral-800">
          <Row
            icon={<Key size={18} className="text-yellow-400" />}
            iconBg="bg-yellow-950"
            title="Roles & Permissions"
            value="Control what each role can create, manage and see"
            onClick={() => navigate(`/groups/${id}/edit/roles`)}
          />
        </div>

        <SectionLabel>DANGER ZONE</SectionLabel>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="w-full flex items-center gap-3 bg-neutral-900 rounded-2xl p-4 border border-red-950 text-left"
        >
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-red-950 shrink-0">
            <Trash2 size={18} className="text-red-400" />
          </div>
          <span className="text-red-400 font-medium">Delete Group</span>
        </button>
      </div>

      {showDeleteModal && (
        <DeleteGroupModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}  