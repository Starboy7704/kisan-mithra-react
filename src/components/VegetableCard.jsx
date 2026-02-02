const VegetableCard = ({ vegetable, onAddToCart, onBuyNow }) => {
  if (!vegetable) return null;

  return (
    <div className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-lg flex flex-col">

      {/* Header */}
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          {vegetable.vegetableName}
        </h2>
        <p className="text-sm text-gray-500">
          {vegetable.category} • {vegetable.location}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          🥬 {vegetable.unit}
        </span>

        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
          📦 {vegetable.quantity}
        </span>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
          💰 ₹{vegetable.pricePerUnit}
        </span>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <p className="text-gray-500">Quantity</p>
          <p className="font-semibold text-gray-800">
            {vegetable.quantity} {vegetable.unit}
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <p className="text-gray-500">Price</p>
          <p className="font-semibold text-gray-800">
            ₹{vegetable.pricePerUnit}
          </p>
        </div>
      </div>

      {/* Description */}
      {vegetable.description && (
        <p className="text-sm text-gray-500 mt-4 line-clamp-2">
          {vegetable.description}
        </p>
      )}

      {/* Actions */}
      <div className="mt-auto pt-4 flex gap-3">
        <button
          onClick={() => onAddToCart(vegetable)}
          className="w-1/2 bg-green-100 text-green-700 font-semibold py-2 rounded-lg hover:bg-green-200 transition"
        >
          Add to Cart🛒
        </button>

        <button
          onClick={() =>  onBuyNow(vegetable)}
          className="w-1/2 bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
        >
          Buy Now
        </button>
      </div>

    </div>
  );
};

export default VegetableCard;
