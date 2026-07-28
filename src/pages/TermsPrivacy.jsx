import { useNavigate } from "react-router-dom";
import { ChevronRight, FileText, ShieldCheck } from "lucide-react";

export default function TermsPrivacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">Terms &amp; Privacy</h1>
        </div>

        <div className="rounded-2xl overflow-hidden border border-neutral-800">
          <button
            onClick={() => navigate("/profile/terms/service")}
            className="w-full flex items-center gap-3 bg-neutral-900 px-4 py-4 border-b border-neutral-800 text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-950 flex items-center justify-center shrink-0">
              <FileText size={18} className="text-blue-400" />
            </div>
            <span className="flex-1 font-medium text-white">Terms of Service</span>
            <ChevronRight size={18} className="text-neutral-600" />
          </button>
          <button
            onClick={() => navigate("/profile/terms/privacy-policy")}
            className="w-full flex items-center gap-3 bg-neutral-900 px-4 py-4 text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-green-950 flex items-center justify-center shrink-0">
              <ShieldCheck size={18} className="text-green-400" />
            </div>
            <span className="flex-1 font-medium text-white">Privacy Policy</span>
            <ChevronRight size={18} className="text-neutral-600" />
          </button>
        </div>

        <p className="text-neutral-500 text-xs text-center mt-6">
          Sportza Club · Version 1.0.0
        </p>
      </div>
    </div>
  );
}