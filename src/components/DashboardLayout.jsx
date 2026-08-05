import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Rss,
  Users,
  Calendar,
  ListChecks,
  CreditCard,
  MessageSquare,
  ChevronDown,
  Bell,
  LogOut,
} from "lucide-react";
import logo from "../assets/sportza-logo.png";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/", icon: LayoutGrid },
  { label: "Feed", to: "/posts", icon: Rss },
  { label: "Groups", to: "/groups", icon: Users },
  { label: "Events", to: "/events", icon: Calendar },
  { label: "Polls", to: "/polls", icon: ListChecks },
  { label: "Payments", to: "/payments", icon: CreditCard },
  { label: "Messages", to: null, icon: MessageSquare },
];

export default function DashboardLayout({
  title,
  titleBadge,
  subtitle,
  headerActions,
  hideHeader = false,
  fullBleed = false,
  user,
  children,
}) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-[#F5F5F5] font-[Inter]">
      <aside className="flex h-screen w-[220px] shrink-0 flex-col justify-between bg-[#111111] p-4">
        <div className="flex flex-col gap-6">
          <img src={logo} alt="Sportza" className="h-auto w-[110px]" />

          <div className="flex items-center gap-2 rounded-lg border border-[#262626] bg-[#1A1A1A] p-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#F16536]/10 text-xs font-bold text-[#F16536]">
              FC
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-white">Metro FC</div>
              <div className="truncate text-xs text-[#9CA3AF]">Active Member</div>
            </div>
            <ChevronDown size={16} className="shrink-0 text-[#9CA3AF]" />
          </div>

          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ label, to, icon: Icon }) => {
              const active = to && location.pathname === to;
              const content = (
                <span
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-medium transition-colors ${
                    active
                      ? "bg-[#F16536]/10 font-semibold text-[#F16536]"
                      : to
                        ? "text-[#9CA3AF] hover:bg-white/5 hover:text-white"
                        : "cursor-not-allowed text-[#4B5563]"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </span>
              );
              return to ? (
                <Link key={label} to={to}>
                  {content}
                </Link>
              ) : (
                <span key={label}>{content}</span>
              );
            })}
          </nav>
        </div>

        <Link
          to="/profile"
          className="flex items-center gap-2 border-t border-white/10 pt-4 hover:opacity-80"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F16536] text-sm font-semibold text-white">
            {(user?.displayName || "?").charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-white">
              {user?.displayName || "..."}
            </div>
            <div className="truncate text-xs text-[#9CA3AF]">Active Member</div>
          </div>
          <LogOut size={16} className="shrink-0 text-[#9CA3AF]" />
        </Link>
      </aside>

      <main className={`flex-1 overflow-y-auto ${fullBleed ? "" : "p-6"}`}>
        {!hideHeader && (
          <div className="mb-4 flex h-14 items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[22px] font-bold text-[#111827]">{title}</h1>
                {titleBadge}
              </div>
              {subtitle && <p className="text-[13px] text-[#6B7280]">{subtitle}</p>}
            </div>
            {headerActions || <Bell size={20} className="text-[#6B7280]" />}
          </div>
        )}

        {fullBleed ? children : <div className="flex flex-col gap-4">{children}</div>}
      </main>
    </div>
  );
}
