const VegetableCard = ({ vegetable, onBuyNow, onAddToCart }) => {
  if (!vegetable) return null;

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition flex flex-col h-full">
      {/* ✅ Top Content */}
      <div>
        <h3 className="text-lg font-semibold text-green-700">
          {vegetable.vegetableName}
        </h3>

        <p className="text-sm text-gray-700 mt-1">
          Quantity: {vegetable.quantity} {vegetable.unit}
        </p>

        <p className="text-sm font-semibold text-gray-900">
          Price: ₹{vegetable.pricePerUnit}
        </p>

        <p className="text-sm text-gray-700">Location: {vegetable.location}</p>

        {vegetable.description && (
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {vegetable.description}
          </p>
        )}

        <p className="mt-2 text-xs text-emerald-600 font-medium">
          Status: {vegetable.status}
        </p>
      </div>

      {/* ✅ Buttons always at bottom */}
      <div className="mt-auto pt-4 flex gap-3">
        <button
          onClick={() => onAddToCart?.(vegetable)}
          className="w-1/2 bg-green-100 text-green-700 font-semibold py-2 rounded-lg hover:bg-green-200 transition"
        >
          Add to Cart 🛒
        </button>

        <button
          onClick={() => onBuyNow?.(vegetable)}
          className="w-1/2 bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
        >
          Buy Now 
        </button>
      </div>
    </div>
  );
};

export default VegetableCard;
