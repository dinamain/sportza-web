import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

// Placeholder FAQ content pulled from what's already confirmed
// elsewhere in the app (roles, payments, children/guardianship).
// Swap in real copy once Deepak provides it.
const FAQS = [
  {
    question: "How do I join a group?",
    answer: "Go to Groups, tap Join Group, and enter the group code shared by an admin.",
  },
  {
    question: "What's the difference between Trainer, Member, and Guardian?",
    answer: "Owner and Admin have full control. Trainer has the same permissions as Admin. Member can RSVP, pay, and comment but can't create content. Guardian is the same as Member, but acting on behalf of a child.",
  },
  {
    question: "How do payments work?",
    answer: "Payments are currently manual/cash-based — you mark your payment as paid, and an admin confirms it. Online payment isn't available yet.",
  },
  {
    question: "Can I add my child to a group?",
    answer: "Yes — go to Profile > Children/Guardianship and add your child's name and date of birth. They won't need their own login.",
  },
  {
    question: "Why can't I create events or posts in a group?",
    answer: "Only Owner, Admin, and Trainer roles (or roles you've been given specific permissions for) can create events, posts, and polls.",
  },
];

export default function HelpFAQ() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">Help &amp; FAQ</h1>
        </div>

        <div className="flex flex-col gap-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-4 text-left"
              >
                <span className="font-medium text-white pr-3">{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`text-neutral-500 shrink-0 transition ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-4 pb-4 text-neutral-400 text-sm border-t border-neutral-800 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}