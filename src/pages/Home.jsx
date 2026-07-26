import { mockStats, mockEvents, mockPosts, mockPolls, mockPayments } from "../data/mockData";

function StatCard({ label, value }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-yellow-400">{value}</div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  );
}

function SectionCard({ title, subtitle, isEmpty, emptyMessage, children }) {
  return (
    <div className="bg-neutral-900 rounded-xl p-4 mb-3">
      <div>
        <h3 className="text-white font-bold">{title}</h3>
        <div className="text-xs text-gray-400">{subtitle}</div>
      </div>
      <div className="text-center py-6">
        {isEmpty ? (
          <span className="text-gray-500">{emptyMessage}</span>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black p-4">
      <div className="flex justify-around mb-6">
        <StatCard label="Groups" value={mockStats.groups} />
        <StatCard label="Events" value={mockStats.events} />
        <StatCard label="Posts" value={mockStats.posts} />
        <StatCard label="Polls" value={mockStats.polls} />
        <StatCard label="Payments" value={mockStats.payments} />
      </div>

      <SectionCard
        title="Events"
        subtitle="19 Jul – 26 Jul"
        isEmpty={mockEvents.length === 0}
        emptyMessage="No events in the next 7 days"
      />
      <SectionCard
        title="Posts"
        subtitle="Last 3 days"
        isEmpty={mockPosts.length === 0}
        emptyMessage="No posts in the last 3 days"
      />
      <SectionCard
        title="Polls"
        subtitle="Open polls"
        isEmpty={mockPolls.length === 0}
        emptyMessage="No open polls"
      />
      <SectionCard
        title="Payments"
        subtitle="Overdue payments"
        isEmpty={mockPayments.length === 0}
        emptyMessage="No overdue payments"
      >
        {mockPayments.map((p) => (
          <div key={p.id} className="text-left text-white">
            <div className="flex justify-between">
              <span>{p.title} — {p.groupName}</span>
              <span className="text-yellow-400">₹{p.amount}</span>
            </div>
          </div>
        ))}
      </SectionCard>
    </div>
  );
}