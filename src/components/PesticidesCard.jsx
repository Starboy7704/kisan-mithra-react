const PesticidesCard = ({ pesticide }) => {
  if (!pesticide) return null; // 🛡️ prevents crash

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-emerald-700">
        {pesticide.pesticideName}
      </h3>

      <p className="text-sm text-gray-600">
        Category: {pesticide.category}
      </p>

      <p>
        Quantity: {pesticide.quantity} {pesticide.unit}
      </p>

      <p className="font-medium">
        Price: ₹{pesticide.pricePerUnit}
      </p>

      {pesticide.brand && (
        <p className="text-sm">Brand: {pesticide.brand}</p>
      )}

      {pesticide.manufacturer && (
        <p className="text-sm text-gray-500">
          Manufacturer: {pesticide.manufacturer}
        </p>
      )}
    </div>
  );
};

export default PesticidesCard;
