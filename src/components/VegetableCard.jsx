const VegetableCard = ({ vegetable }) => {
  if (!vegetable) return null;

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm">
      <h3 className="text-lg font-semibold text-green-700">
        {vegetable.vegetableName}
      </h3>

      <p>
        Quantity: {vegetable.quantity} {vegetable.unit}
      </p>

      <p>Price: ₹{vegetable.pricePerUnit}</p>
      <p>Location: {vegetable.location}</p>

      {vegetable.description && (
        <p className="text-sm text-gray-500 mt-2">
          {vegetable.description}
        </p>
      )}

      <p className="mt-2 text-xs text-emerald-600 font-medium">
        Status: {vegetable.status}
      </p>
    </div>
  );
};

export default VegetableCard;
