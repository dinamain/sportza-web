import { mockGroups } from "../data/mockData";
import { Link } from "react-router-dom";

function GroupCard({ group }) {
  return (
    <div className="bg-neutral-900 rounded-xl p-4 mb-3 text-white">
      <h3 className="text-lg font-bold">{group.name}</h3>
      <div className="flex gap-2 mt-2 mb-2">
        <span className="bg-yellow-900 text-yellow-300 px-2 py-1 rounded-full text-xs">
          {group.sport}
        </span>
        <span className="bg-neutral-700 px-2 py-1 rounded-full text-xs">
          {group.groupType}
        </span>
        <span className="bg-teal-900 text-teal-300 px-2 py-1 rounded-full text-xs">
          {group.clubType}
        </span>
      </div>
      <div className="text-gray-400 text-sm">📍 {group.location}</div>

      <div className="flex justify-around mt-3">
        <div className="text-center">
          <div className="font-bold">{group.members}</div>
          <div className="text-xs text-gray-400">Members</div>
        </div>
        <div className="text-center">
          <div className="font-bold">{group.subGroups}</div>
          <div className="text-xs text-gray-400">Sub Groups</div>
        </div>
        <div className="text-center">
          <div className="font-bold">{group.teams}</div>
          <div className="text-xs text-gray-400">Teams</div>
        </div>
      </div>

      <div className="mt-3 text-sm text-yellow-400">
        Group Code: {group.groupCode}
      </div>
    </div>
  );
}

export default function Groups() {
  return (
    <div className="min-h-screen bg-black p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-bold">Groups</h2>
        <div className="flex gap-2">
          <Link to="/groups/create" className="bg-yellow-400 text-black text-sm font-bold px-3 py-1.5 rounded-full">
                + Create
        </Link>
          <Link to="/groups/join" className="border border-yellow-400 text-yellow-400 text-sm font-bold px-3 py-1.5 rounded-full">
  🔑 Join Group
</Link>
        </div>
      </div>

      {mockGroups.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No groups yet — create or join one to get started.
        </p>
      ) : (
        mockGroups.map((group) => <GroupCard key={group.id} group={group} />)
      )}
    </div>
  );
}