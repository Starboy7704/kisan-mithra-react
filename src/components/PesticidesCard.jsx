import { APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID } from "../Utils/Appwrite/constants";
import AppwriteStorage from "../Appwrite/Storage.Services"

const PesticidesCard = ({ pesticide, onAddToCart, onBuyNow }) => {
  if (!pesticide) return null;

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition flex flex-col">
        {pesticide.imageId && (
        <div className="mb-3">
          <img
            src={AppwriteStorage.getFileView(
              APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID,
              pesticide.imageId
            )}
            alt={pesticide.pesticideName}
            className="h-40 w-full object-cover rounded-lg border"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold text-emerald-700">
        {pesticide.pesticideName}
      </h3>

      <p className="text-sm text-gray-600">Category: {pesticide.category}</p>
      <p>Quantity: {pesticide.quantity} {pesticide.unit}</p>
      <p className="font-medium">Price: ₹{pesticide.pricePerUnit}</p>

      {pesticide.brand && <p className="text-sm">Brand: {pesticide.brand}</p>}
      {pesticide.manufacturer && (
        <p className="text-sm text-gray-500">
          Manufacturer: {pesticide.manufacturer}
        </p>
      )}

      <div className="mt-auto pt-4 flex gap-3">
        <button
          onClick={() => onAddToCart(pesticide)}
          className="w-1/2 bg-green-100 text-green-700 font-semibold py-2 rounded-lg hover:bg-green-200 transition"
        >
          Add to Cart 🛒
        </button>

        <button
          onClick={() => onBuyNow(pesticide)}
          className="w-1/2 bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default PesticidesCard;
