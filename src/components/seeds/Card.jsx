const Card = ({ seed, addToCart = () => {}, onBuyNow }) => {
  return (
    <div className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-lg">

      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          {seed.seedName}
        </h2>
        <p className="text-sm text-gray-500">
          {seed.species} • {seed.cropType}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          🌤 {seed.plantingSeason}
        </span>
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
          🌱 {seed.soilType}
        </span>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
          💧 {seed.waterRequirement}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <p className="text-gray-500">Growth</p>
          <p className="font-semibold text-gray-800">
            {seed.growthDurationDays ?? "--"} days
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <p className="text-gray-500">Yield</p>
          <p className="font-semibold text-gray-800">
            {seed.yieldPerAcre ?? "--"} / acre
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-4">
        <button
          onClick={() =>
            addToCart({
              id: seed.$id,
              name: seed.seedName,
              price: seed.price,
              type: "Seed",
            })
          }
          className="flex-1 border border-green-600 text-green-700 font-medium px-6 py-3 rounded-xl hover:bg-green-50 transition"
        >
          Add to Cart
        </button>

        <button
          onClick={() => onBuyNow?.(seed)}
          className="flex-1 bg-green-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-700 transition shadow-md"
        >
          Buy Now
        </button>
      </div>

    </div>
  );
};

export default Card;
