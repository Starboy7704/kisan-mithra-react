import { useEffect, useState } from "react";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import {
  APPWRITE_PURCHASES_TABLE_ID,
  APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID,
} from "@/src/Utils/Appwrite/constants";
import { Account, Query } from "appwrite";
import appwriteClient from "@/src/Appwrite";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import AppwriteStorage from "@/src/Appwrite/Storage.Services";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const tablesDB = new AppwriteTablesDB();
  const account = new Account(appwriteClient);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user = await account.get();

        const result = await tablesDB.listRows(
          APPWRITE_PURCHASES_TABLE_ID,
          [
            Query.equal("userId", user.$id),
            Query.equal("status", "cart"),
          ]
        );

        setItems(result.rows || []);
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-40 mx-auto mb-6" />

        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border shadow-sm p-6 space-y-4"
          >
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-gray-500 text-lg">🛒 Cart is empty</p>
      </div>
    );
  }

  const checkout = async () => {
    try {
      await Promise.all(
        items.map((item) =>
          tablesDB.updateRow(APPWRITE_PURCHASES_TABLE_ID, item.$id, {
            status: "ordered",
          })
        )
      );
      toast.success("Order placed successfully");
      setItems([]);
    } catch {
      toast.error("Checkout failed");
    }
  };

  const grandTotal = items.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
        My Cart
      </h2>

      <div className="space-y-4">
        {items.map((item) => {
          // ✅ SAFE imageId guard
          const imageId =
            typeof item.imageId === "string" && item.imageId.trim() !== ""
              ? item.imageId
              : null;

          return (
            <div
              key={item.$id}
              className="border rounded-xl p-4 bg-white shadow-sm flex gap-4 items-center"
            > 
              {/* IMAGE FROM PURCHASE TABLE */}
              {imageId && (
                <img
                  src={AppwriteStorage.getFileView(
                    APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID,
                    imageId
                  )}
                  alt={item.productName}
                  className="h-20 w-20 object-cover rounded-lg border"
                />
              )}

              {/* PRODUCT DETAILS */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  {item.productName}
                </h3>

                <p className="text-sm text-gray-600">
                  Type: {item.productType}
                </p>

                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity} {item.unit}
                </p>

                <span className="inline-block mt-1 text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                  {item.status}
                </span>
              </div>

              {/* PRICE */}
              <div className="text-right">
                <p className="font-bold text-lg">
                  ₹{item.totalPrice}
                </p>
                <p className="text-sm text-gray-500">
                  ₹{item.pricePerUnit} / unit
                </p>
              </div>
            </div>
          );
        })}

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

export default Cart;
