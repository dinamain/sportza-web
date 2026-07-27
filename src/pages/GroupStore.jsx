import { useNavigate, useParams } from "react-router-dom";
import { Store as StoreIcon, ShoppingBag, ChevronRight } from "lucide-react";

// Self-contained mock — matches your confirmed Store fields (Item Name,
// Description, Price, optional sizes/variants). Empty on purpose since
// the real app itself lists Store under "Coming Soon".
const mockStoreItems = [];

export default function GroupStore() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl">
            &larr;
          </button>
          <h1 className="text-xl font-semibold">Store</h1>
        </div>

        <div className="flex items-center justify-between mb-6">
          <span className="text-neutral-400">{mockStoreItems.length} items</span>
          <button
            onClick={() => navigate(`/groups/${id}/store/orders`)}
            className="flex items-center gap-1 text-yellow-400 font-medium"
          >
            <ShoppingBag size={16} /> My Orders <ChevronRight size={16} />
          </button>
        </div>

        {mockStoreItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-24 text-neutral-500">
            <StoreIcon size={48} className="mb-4" />
            <p>No items in store yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {mockStoreItems.map((item) => (
              <div key={item.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4">
                <div className="text-white font-medium">{item.name}</div>
                <div className="text-yellow-400 text-sm mt-1">₹{item.price}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}