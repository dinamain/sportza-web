import { Link } from "react-router-dom";
import { mockGroupEvents } from "../data/mockData";

function EventCard({ event }) {
  return (
    <div className="bg-neutral-900 rounded-xl p-4 mb-3 flex gap-4">
      <div className="text-center bg-yellow-900 rounded-lg px-3 py-2 h-fit">
        <div className="text-xs text-yellow-300">{event.date.split(" ")[0]}</div>
        <div className="text-xl font-bold text-yellow-300">{event.date.split(" ")[1]}</div>
        <div className="text-xs text-yellow-300">{event.date.split(" ")[2]}</div>
      </div>
      <div className="flex-1">
        <div className="text-xs text-yellow-400">🏆 {event.groupName}</div>
        <div className="font-bold">{event.title}</div>
        <div className="text-sm text-gray-400">🕒 {event.time}</div>
        <div className="flex gap-3 mt-2 text-sm">
          <span className="text-green-400">✅ {event.rsvp.going}</span>
          <span className="text-red-400">❌ {event.rsvp.notGoing}</span>
          <span className="text-yellow-400">❓ {event.rsvp.maybe}</span>
        </div>
      </div>
    </div>
  );
}

export default function GroupEvents() {
  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Events</h2>
          <Link
  to="/events/create"
  className="bg-yellow-400 text-black w-8 h-8 rounded-full font-bold flex items-center justify-center"
>
  +
</Link>
        </div>

        {mockGroupEvents.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">No upcoming events</div>
        ) : (
          mockGroupEvents.map((e) => <EventCard key={e.id} event={e} />)
        )}
      </div>
    </div>
  );
}