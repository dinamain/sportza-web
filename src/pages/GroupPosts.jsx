import { Link } from "react-router-dom";
import { mockGroupPosts } from "../data/mockData";

function PostCard({ post }) {
  return (
    <div className="bg-neutral-900 rounded-xl p-4 mb-3">
      {post.pinned && <div className="text-yellow-400 text-xs mb-1">📌 Pinned</div>}
      {post.title && <div className="font-bold mb-1">{post.title}</div>}
      <div className="text-gray-300">{post.content}</div>
      <div className="text-gray-500 text-xs mt-2">{post.date}</div>
    </div>
  );
}

export default function GroupPosts() {
  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Posts</h2>
          <Link
            to="/posts/create"
            className="bg-yellow-400 text-black w-8 h-8 rounded-full font-bold flex items-center justify-center"
          >
            +
          </Link>
        </div>

        {mockGroupPosts.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">No posts in the last 3 days</div>
        ) : (
          mockGroupPosts.map((p) => <PostCard key={p.id} post={p} />)
        )}
      </div>
    </div>
  );
}