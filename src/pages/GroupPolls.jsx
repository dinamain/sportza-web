import { Link } from "react-router-dom";
import { mockGroupPolls } from "../data/mockData";

export default function GroupPolls() {
  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Polls</h2>
          <Link
            to="/polls/create"
            className="bg-yellow-400 text-black w-8 h-8 rounded-full font-bold flex items-center justify-center"
          >
            +
          </Link>
        </div>

        {mockGroupPolls.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">No open polls</div>
        ) : (
          mockGroupPolls.map((p) => <div key={p.id}>{p.question}</div>)
        )}
      </div>
    </div>
  );
}