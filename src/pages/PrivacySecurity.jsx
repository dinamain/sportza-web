import { useNavigate } from "react-router-dom";
import {
  Lock,
  ShieldCheck,
  Smartphone,
  UserX,
  Download,
  ChevronRight,
} from "lucide-react";

function Row({ icon, iconBg, title, subtitle, badge, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 bg-neutral-900 px-4 py-3 border-b border-neutral-800 last:border-b-0 text-left"
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-white">{title}</span>
          {badge && (
            <span className="text-xs bg-yellow-900/60 text-yellow-400 px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
        {subtitle && <div className="text-neutral-500 text-sm">{subtitle}</div>}
      </div>
      <ChevronRight className="text-neutral-600 shrink-0" size={18} />
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

export default function PrivacySecurity() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto pb-10">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">Privacy &amp; Security</h1>
        </div>

        <SectionLabel>SECURITY</SectionLabel>
        <div className="rounded-2xl overflow-hidden border border-neutral-800">
          <Row
            icon={<Lock size={18} className="text-blue-400" />}
            iconBg="bg-blue-950"
            title="Change Password"
            onClick={() => navigate("/profile/security/password")}
          />
          <Row
            icon={<ShieldCheck size={18} className="text-green-400" />}
            iconBg="bg-green-950"
            title="Two-Factor Authentication"
            badge="Soon"
            onClick={() => {}}
          />
          <Row
            icon={<Smartphone size={18} className="text-purple-400" />}
            iconBg="bg-purple-950"
            title="Active Sessions"
            subtitle="Devices currently signed in"
            onClick={() => navigate("/profile/security/sessions")}
          />
        </div>

        <SectionLabel>PRIVACY</SectionLabel>
        <div className="rounded-2xl overflow-hidden border border-neutral-800">
          <Row
            icon={<UserX size={18} className="text-orange-400" />}
            iconBg="bg-orange-950"
            title="Blocked Users"
            onClick={() => navigate("/profile/security/blocked")}
          />
          <Row
            icon={<Download size={18} className="text-teal-400" />}
            iconBg="bg-teal-950"
            title="Download My Data"
            onClick={() => navigate("/profile/security/download-data")}
          />
        </div>
      </div>
    </div>
  );
}