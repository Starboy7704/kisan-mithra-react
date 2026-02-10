import { useEffect, useState } from "react";

const Payments = ({ amount = 0 }) => {
  const [finalAmount, setFinalAmount] = useState(0);

  // ✅ Sync prop → local state (fixes timing issue)
  useEffect(() => {
    if (amount > 0) {
      setFinalAmount(amount);
    }
  }, [amount]);

  // ⏳ Prevent showing ₹0
  if (!finalAmount) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md text-center">
        <p className="text-gray-500 text-sm">
          Preparing payment details…
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-center">
        Complete Payment – Kisan Mitra 🌱
      </h2>

      <div className="flex justify-between text-sm">
        <span>Order Amount</span>
        <span className="font-semibold text-emerald-600">
          ₹{finalAmount}
        </span>
      </div>

      <button className="w-full bg-emerald-600 text-white py-2 rounded-lg">
        Pay with UPI
      </button>

      <button className="w-full border py-2 rounded-lg">
        Pay with Card
      </button>

      <button className="w-full border py-2 rounded-lg">
        Net Banking
      </button>

      <p className="text-xs text-center text-gray-500">
        Secure payments by Kisan-Mitra
      </p>
    </div>
  );
};

export default Payments;
