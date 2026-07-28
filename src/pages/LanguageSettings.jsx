import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

// Only English is confirmed as actually supported right now — the
// rest are placeholders. Confirm with Deepak which languages the
// backend/content actually needs to support before wiring real i18n.
const LANGUAGES = [
  "English",
  "Malayalam",
  "Hindi",
  "Tamil",
];

export default function LanguageSettings() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("English");

  function handleSelect(lang) {
    // TODO: hook into a real i18n setup once one exists. For now just
    // stores the selection locally.
    setLanguage(lang);
    navigate(-1);
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">Language</h1>
        </div>

        <div className="rounded-2xl overflow-hidden border border-neutral-800">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => handleSelect(lang)}
              className="w-full flex items-center justify-between bg-neutral-900 px-4 py-4 border-b border-neutral-800 last:border-b-0 text-left"
            >
              <span className={language === lang ? "text-yellow-400 font-medium" : "text-white"}>
                {lang}
              </span>
              {language === lang && <Check size={18} className="text-yellow-400" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}