import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import {
  APPWRITE_PURCHASES_TABLE_ID,
} from "@/src/Utils/Appwrite/constants";

// Razorpay Loader
const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Payments = ({ amount = 0, items = [], orderId = "" }) => {
  const [finalAmount, setFinalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const tablesDB = new AppwriteTablesDB();

  useEffect(() => {
    setFinalAmount(Number(amount));
  }, [amount]);

  if (!finalAmount || finalAmount <= 0) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md text-center space-y-4">
        <div className="text-5xl">🥦</div>
        <h2 className="text-xl font-semibold text-gray-700">
          No payable orders
        </h2>
        <p className="text-sm text-gray-500">
          Add items and place order before payment.
        </p>
      </div>
    );
  }

  const handlePayment = async () => {
    if (loading) return;

    setLoading(true);

    const loaded = await loadRazorpay();
    if (!loaded) {
      toast.error("Payment SDK failed to load");
      setLoading(false);
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: finalAmount * 100, // same as Orders.jsx
      currency: "INR",
      name: "Kisan Mitra",
      description: `Order ${orderId}`,
      theme: { color: "#059669" },

      handler: async function (response) {
        try {
          // Update all items directly (same logic as Orders)
          for (const item of items) {
            await tablesDB.updateRow(APPWRITE_PURCHASES_TABLE_ID, item.$id, {
              paymentStatus: "paid",
              paymentId: response.razorpay_payment_id,
              status: "completed",
            });
          }

          toast.success("Payment Successful 🎉");
        } catch (error) {
          console.error(error);
          toast.error("Payment update failed");
        }
      },

      modal: {
        ondismiss: function () {
          toast("Payment cancelled");
        },
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", function (response) {
      console.error(response.error);
      toast.error("Payment Failed ❌");
    });

    razorpay.open();

    setLoading(false);
  };

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

      <button
        onClick={handlePayment}
        disabled={loading}
        className={`w-full py-3 rounded-lg text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-700"
        }`}
      >
        {loading ? "Processing..." : "Pay Now 💳"}
      </button>

      <p className="text-xs text-center text-gray-500">
        Secure payments by Kisan-Mitra
      </p>
    </div>
  );
};

export default Payments;
