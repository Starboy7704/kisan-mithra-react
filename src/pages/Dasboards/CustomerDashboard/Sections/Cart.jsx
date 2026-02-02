import { useEffect, useState } from "react";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import { APPWRITE_PURCHASES_TABLE_ID } from "@/src/Utils/Appwrite/constants";
import { Account, Query } from "appwrite";
import appwriteClient from "@/src/Appwrite";
import Spinner from "@/components/ui/spinner";
import PleaseWait from "@/src/pleasewait";
import toast from "react-hot-toast";

const CustomerCart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const tablesDB = new AppwriteTablesDB();
  const account = new Account(appwriteClient);

  // 🛒 FETCH CUSTOMER CART ITEMS
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user = await account.get();
        const result = await tablesDB.listRows(
          APPWRITE_PURCHASES_TABLE_ID,
          [
            Query.equal("userId", user.$id),
            Query.equal("status", "cart"), // ✅ CART ITEMS ONLY
          ]
        );

        setItems(result.rows || []);
      } catch (error) {
        console.error("Failed to load customer cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // 🧮 GRAND TOTAL
  const grandTotal = items.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  // ✅ CHECKOUT (cart → ordered)
  const checkout = async () => {
    console.log("checkout clicked")
    try {
      await Promise.all(
        items.map((item) =>
          tablesDB.updateRow(
            APPWRITE_PURCHASES_TABLE_ID,
            item.$id,
            { status: "ordered" }
          )
        )
      );

      toast.success("Order placed successfully");
      setItems([]);
    } catch (err) {
      toast.error("Checkout failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-100">
        <Spinner />
        <PleaseWait />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">
          🛒 Your cart is empty
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
        Customer Cart
      </h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.$id}
            className="border rounded-xl p-4 bg-white shadow-sm flex justify-between items-center"
          >
            {/* Product Info */}
            <div>
              <h3 className="font-semibold text-lg">
                {item.productName}
              </h3>

              <p className="text-sm text-gray-600">
                Category: {item.productType}
              </p>

              <p className="text-sm text-gray-600">
                Quantity: {item.quantity} {item.unit}
              </p>

              <span className="inline-block mt-1 text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                {item.status}
              </span>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="font-bold text-lg">
                ₹{item.totalPrice}
              </p>
              <p className="text-sm text-gray-500">
                ₹{item.pricePerUnit} / unit
              </p>
            </div>
          </div>
        ))}

        {/* FOOTER */}
        <div className="mt-6 border-t pt-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">
            Total: ₹{grandTotal}
          </h3>

          <button
            onClick={checkout}
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerCart;
