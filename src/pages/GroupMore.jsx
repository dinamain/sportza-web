import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Store,
  Users,
  BarChart3,
  Trophy,
  Wallet,
  Mail,
  LogOut,
  ChevronRight,
} from "lucide-react";

function MenuRow({ icon, iconBg, title, subtitle, badge, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 bg-neutral-900 rounded-2xl p-4 border border-neutral-800 text-left"
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`font-semibold ${danger ? "text-red-400" : "text-white"}`}>
            {title}
          </span>
          {badge && (
            <span className="text-xs bg-yellow-900/60 text-yellow-400 px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
        {subtitle && <div className="text-neutral-400 text-sm">{subtitle}</div>}
      </div>
      {!danger && <ChevronRight className="text-neutral-600 shrink-0" size={18} />}
    </button>
  );
}

function LeaveGroupModal({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50">
      <div className="bg-neutral-700 rounded-2xl p-5 max-w-xs w-full">
        <h3 className="text-white text-lg font-semibold mb-2">Leave Group</h3>
        <p className="text-neutral-300 text-sm mb-6">
          Are you sure you want to leave this group?
        </p>
        <div className="flex justify-end gap-6">
          <button
            onClick={onCancel}
            className="text-teal-300 font-semibold text-sm tracking-wide"
          >
            CANCEL
          </button>
          <button
            onClick={onConfirm}
            className="text-teal-300 font-semibold text-sm tracking-wide"
          >
            LEAVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GroupMore() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  function handleConfirmLeave() {
    // TODO: call real leave-group API, then navigate away
    setShowLeaveModal(false);
    navigate("/groups");
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">More</h1>
        </div>

        <div className="flex flex-col gap-3">
          <MenuRow
            icon={<Store size={20} className="text-teal-400" />}
            iconBg="bg-teal-950"
            title="Store"
            subtitle="Browse and order group merchandise"
            onClick={() => navigate(`/groups/${id}/store`)}
          />
          <MenuRow
            icon={<Users size={20} className="text-purple-400" />}
            iconBg="bg-purple-950"
            title="Members"
            subtitle="View members, roles, and join requests"
            onClick={() => navigate(`/groups/${id}/members`)}
          />
          <MenuRow
            icon={<BarChart3 size={20} className="text-orange-400" />}
            iconBg="bg-orange-950"
            title="Attendance Stats"
            subtitle="Track who shows up — match by match"
            onClick={() => navigate(`/groups/${id}/attendance`)}
          />
          <MenuRow
            icon={<Trophy size={20} className="text-yellow-400" />}
            iconBg="bg-neutral-800"
            title="Match Results"
            subtitle="Win/loss record and recent scores"
            badge="Soon"
            onClick={() => navigate(`/groups/${id}/match-results`)}
          />
          <MenuRow
            icon={<Wallet size={20} className="text-green-400" />}
            iconBg="bg-green-950"
            title="Payment Statistics"
            subtitle="Fee collection overview and outstanding dues"
            onClick={() => navigate(`/groups/${id}/payment-stats`)}
          />
          <MenuRow
            icon={<Mail size={20} className="text-orange-400" />}
            iconBg="bg-neutral-800"
            title="Match Invitations"
            subtitle="Invites from other clubs waiting on your response"
            onClick={() => navigate(`/groups/${id}/match-invitations`)}
          />
        </div>

        <div className="mt-8">
          <div className="text-neutral-500 text-xs font-semibold tracking-wide mb-3">
            DANGER ZONE
          </div>
          <MenuRow
            icon={<LogOut size={20} className="text-red-400" />}
            iconBg="bg-red-950"
            title="Leave Group"
            danger
            onClick={() => setShowLeaveModal(true)}
          />
        </div>
      </div>

      {showLeaveModal && (
        <LeaveGroupModal
          onCancel={() => setShowLeaveModal(false)}
          onConfirm={handleConfirmLeave}
        />
      )}
    </div>
  );
}