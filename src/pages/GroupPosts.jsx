import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Calendar, MapPin, MessageCircle } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";

const FILTERS = ["All Posts", "Matches", "Socials", "My Groups", "Polls", "Announcements"];

const POSTS = [
  {
    id: 1,
    type: "match",
    author: "Rohan Joseph",
    group: "FC Kochi",
    time: "2 hours ago",
    badge: "UPCOMING MATCH",
    title: "Kochi Midweek Sparring #4",
    body: "Weekly friendly training session. Clean turf, 7v7, bibs and match balls provided. RSVP as soon as possible so we can divide squads!",
    date: "Wed, Oct 24 • 7:00 PM",
    location: "Deccatline Arena, Kochi",
    attending: 16,
  },
  {
    id: 2,
    type: "poll",
    author: "Anjali Menon",
    group: "Downtown Runners",
    time: "5 hours ago",
    question: "Which weekday works best for our weekly shuttle session?",
    options: [
      { label: "Tuesday Evening (6-10 PM)", pct: 64 },
      { label: "Thursday Evening (6-10 PM)", pct: 36 },
    ],
    votes: 42,
  },
  {
    id: 3,
    type: "social",
    author: "Marcus Garcia",
    group: "Downtown Runners",
    time: "1 day ago",
    body: "Crushed a personal best of 5K in downtown Kochi today! Special shoutout to everyone who paced me, couldn't have hit 21:04 without the group support.",
  },
];

const MY_GROUPS = [
  { name: "FC Kochi", color: "#F16536" },
  { name: "Downtown Runners", color: "#3B82F6" },
  { name: "Vanguard Tennis Club", color: "#10B981" },
  { name: "Smash Badminton Circle", color: "#8B5CF6" },
];

const TRENDING = [
  { title: "Kochi Midweek Sprint", replies: 24 },
  { title: "Sunset Interval Run", replies: 26 },
  { title: "Weekend Club League", replies: 27 },
];

function PostHeader({ author, group, time }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5F5F5] text-xs font-semibold text-[#666666]">
        {author.charAt(0)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-[#1A1A1A]">{author}</div>
        <div className="text-xs text-[#9CA3AF]">
          {group} • {time}
        </div>
      </div>
    </div>
  );
}

function MatchPost({ post }) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
      <div className="flex items-start justify-between">
        <PostHeader author={post.author} group={post.group} time={post.time} />
        <span className="shrink-0 rounded bg-[#F16536]/10 px-2 py-0.5 text-[11px] font-bold uppercase text-[#F16536]">
          {post.badge}
        </span>
      </div>
      <h3 className="mb-1 font-bold text-[#1A1A1A]">{post.title}</h3>
      <p className="mb-3 text-[13px] text-[#666666]">{post.body}</p>
      <div className="mb-3 flex items-center gap-4 text-[13px] text-[#666666]">
        <div className="flex items-center gap-1.5">
          <Calendar size={14} />
          {post.date}
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin size={14} />
          {post.location}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-[#9CA3AF]">{post.attending} attending</span>
        <div className="flex gap-2">
          <button className="rounded-full border border-[#E5E5E5] px-4 py-1.5 text-sm font-medium text-[#666666] hover:bg-[#FAFAFA]">
            Decline
          </button>
          <button className="rounded-full bg-[#F16536] px-4 py-1.5 text-sm font-semibold text-white hover:bg-[#e0572a]">
            Going
          </button>
        </div>
      </div>
    </div>
  );
}

function PollPost({ post }) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
      <PostHeader author={post.author} group={post.group} time={post.time} />
      <h3 className="mb-3 font-semibold text-[#1A1A1A]">{post.question}</h3>
      <div className="flex flex-col gap-2">
        {post.options.map((opt, i) => (
          <div key={opt.label} className="relative overflow-hidden rounded-lg border border-[#E5E5E5] p-3">
            <div
              className="absolute inset-y-0 left-0 bg-[#F16536]/10"
              style={{ width: `${opt.pct}%` }}
            />
            <div className="relative flex items-center justify-between text-sm">
              <span className={i === 0 ? "font-medium text-[#1A1A1A]" : "text-[#666666]"}>
                {opt.label}
              </span>
              <span className="font-semibold text-[#1A1A1A]">{opt.pct}%</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-xs text-[#9CA3AF]">{post.votes} votes • Poll active</div>
    </div>
  );
}

function SocialPost({ post }) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
      <PostHeader author={post.author} group={post.group} time={post.time} />
      <p className="mb-3 text-sm text-[#1A1A1A]">{post.body}</p>
      <div
        className="h-48 rounded-lg"
        style={{ background: "linear-gradient(135deg, #F16536 0%, #7C3AED 50%, #111827 100%)" }}
      />
    </div>
  );
}

export default function GroupPosts() {
  const [filter, setFilter] = useState("All Posts");

  return (
    <DashboardLayout
      title="Your Feed"
      headerActions={
        <Link
          to="/posts/create"
          className="flex items-center gap-1.5 rounded-full bg-[#F16536] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e0572a]"
        >
          <Plus size={14} />
          New Post
        </Link>
      }
    >
      <div className="grid grid-cols-[1fr_260px] gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-[#F16536] text-white"
                    : "border border-[#E5E5E5] bg-white text-[#666666] hover:bg-[#FAFAFA]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {POSTS.map((post) => {
            if (post.type === "match") return <MatchPost key={post.id} post={post} />;
            if (post.type === "poll") return <PollPost key={post.id} post={post} />;
            return <SocialPost key={post.id} post={post} />;
          })}
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1A1A1A]">My Groups</h3>
              <Link to="/groups" className="text-xs font-medium text-[#F16536] hover:underline">
                See all
              </Link>
            </div>
            <div className="flex flex-col gap-2.5">
              {MY_GROUPS.map((g) => (
                <div key={g.name} className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: g.color }}
                  />
                  <span className="truncate text-sm text-[#1A1A1A]">{g.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
            <h3 className="mb-3 text-sm font-bold text-[#1A1A1A]">Trending</h3>
            <div className="flex flex-col gap-3">
              {TRENDING.map((t) => (
                <div key={t.title} className="flex items-center justify-between">
                  <span className="truncate text-sm text-[#1A1A1A]">{t.title}</span>
                  <div className="flex shrink-0 items-center gap-1 text-xs text-[#9CA3AF]">
                    <MessageCircle size={12} />
                    {t.replies}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
