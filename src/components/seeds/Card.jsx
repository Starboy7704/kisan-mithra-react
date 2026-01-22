
//seedscard
const Card = ({ seed }) => {
  return (
    <div className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-lg">
      
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          {seed.seedName}
        </h2>
        <p className="text-sm text-gray-500">
          {seed.species} • {seed.cropType}
        </p>
      </div>

      {/* Tags */}
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

      {/* Metrics */}
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

      {/* CTA */}
      <button className="mt-5 w-full rounded-xl bg-green-600 py-2 text-sm font-semibold text-white transition hover:bg-green-700">
        Buy Seeds
      </button>
    </div>
  );
};

export default Card;
