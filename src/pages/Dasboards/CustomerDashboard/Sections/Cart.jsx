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
  const [selectedItems, setSelectedItems] = useState([]);

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

  /* ==========================
     QUANTITY UPDATE
  ========================== */
  const updateQuantity = async (item, type) => {
    try {
      let newQuantity =
        type === "increase"
          ? item.quantity + 1
          : item.quantity - 1;

      if (newQuantity < 1) return;

      const newTotal = newQuantity * item.pricePerUnit;

      await tablesDB.updateRow(
        APPWRITE_PURCHASES_TABLE_ID,
        item.$id,
        {
          quantity: newQuantity,
          totalPrice: newTotal,
        }
      );

      setItems((prev) =>
        prev.map((i) =>
          i.$id === item.$id
            ? { ...i, quantity: newQuantity, totalPrice: newTotal }
            : i
        )
      );
    } catch (error) {
      console.error("Quantity update error:", error);
      toast.error("Failed to update quantity");
    }
  };

  /* ==========================
     ✅ TOGGLE SELECT
  ========================== */
  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  /* ==========================
     ❌ DELETE SELECTED (FIXED)
  ========================== */
const deleteSelected = async () => {
  if (selectedItems.length === 0) return;
  if (!window.confirm("Delete selected cart items?")) return;

  try {
    for (const id of selectedItems) {
      await tablesDB.updateRow(
        APPWRITE_PURCHASES_TABLE_ID,
        id,
        { status: "cancelled" }
      );
    }

    // remove from UI
    setItems((prev) =>
      prev.filter((item) => !selectedItems.includes(item.$id))
    );

    setSelectedItems([]);
    toast.success("Selected items deleted");
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete items");
  }
};

  /* ==========================
     CHECKOUT
  ========================== */
  const checkout = async () => {
    try {
      await Promise.all(
        items.map((item) =>
          tablesDB.updateRow(APPWRITE_PURCHASES_TABLE_ID, item.$id, {
            status: "ordered",
          })
        )
      );

      toast.success("Order placed successfully 🌱");
      setItems([]);
      setSelectedItems([]);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Checkout failed");
    }
  };

  /* ==========================
     GRAND TOTAL
  ========================== */
  const grandTotal = items.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  /* ==========================
     LOADING
  ========================== */
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

  /* ==========================
     EMPTY CART
  ========================== */
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-white shadow-sm border rounded-2xl p-8 space-y-3">
          <div className="text-5xl">🥕</div>
          <h2 className="text-xl font-semibold text-gray-700">
            Your vegetable cart is empty
          </h2>
          <p className="text-gray-500 text-sm">
            Add fresh vegetables to start shopping.
          </p>
        </div>
      </div>
    );
  }

  /* ==========================
     MAIN UI
  ========================== */
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
        My Vegetable Cart 🛒
      </h2>

      <div className="space-y-4">
        {items.map((item) => {
          const imageId =
            typeof item.imageId === "string" &&
            item.imageId.trim() !== ""
              ? item.imageId
              : null;

          return (
            <div
              key={item.$id}
              className="border rounded-xl p-4 bg-white shadow-sm flex gap-4 items-center"
            >
              {/* CHECKBOX */}
              <input
                type="checkbox"
                checked={selectedItems.includes(item.$id)}
                onChange={() => toggleSelect(item.$id)}
                className="h-5 w-5 accent-emerald-600"
              />

              {/* IMAGE */}
              {imageId && (
                <img
                  src={AppwriteStorage.getFileView(
                    APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID,
                    imageId
                  )}
                  alt={item.productName}
                  className="h-24 w-24 object-cover rounded-lg border"
                />
              )}

              {/* DETAILS */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-emerald-700">
                  {item.productName}
                </h3>

                <p className="text-sm text-gray-600">
                  Fresh Farm Vegetable
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() =>
                      updateQuantity(item, "decrease")
                    }
                    disabled={item.quantity <= 1}
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-40"
                  >
                    -
                  </button>

                  <span className="font-semibold text-lg">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(item, "increase")
                    }
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    +
                  </button>

                  <span className="text-sm text-gray-600 ml-2">
                    {item.unit || "Kg"}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  ₹{item.pricePerUnit} per {item.unit || "Kg"}
                </p>

                <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                  {item.status}
                </span>
              </div>

              {/* PRICE */}
              <div className="text-right">
                <p className="font-bold text-xl text-emerald-700">
                  ₹{item.totalPrice}
                </p>
                <p className="text-sm text-gray-500">
                  {item.quantity} × ₹{item.pricePerUnit}
                </p>
              </div>
            </div>
          );
        })}

        {/* ✅ DELETE BUTTON */}
        {selectedItems.length > 0 && (
          <div className="flex justify-end">
            <button
              onClick={deleteSelected}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete Selected ({selectedItems.length})
            </button>
          </div>
        )}

        {/* TOTAL + CHECKOUT */}
        <div className="mt-6 border-t pt-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-emerald-700">
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
