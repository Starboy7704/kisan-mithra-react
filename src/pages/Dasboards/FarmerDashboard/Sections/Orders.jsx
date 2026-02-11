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

//  Razorpay Loader
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

const Orders = () => {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState([]);

  const tablesDB = new AppwriteTablesDB();
  const account = new Account(appwriteClient);

  //  FETCH ORDERS
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = await account.get();

        const res = await tablesDB.listRows(APPWRITE_PURCHASES_TABLE_ID, [
          Query.equal("userId", user.$id),
          Query.equal("status", "ordered"),
          Query.orderDesc("$createdAt"),
        ]);

        const grouped = {};
        (res.rows || []).forEach((item) => {
          const id = item.orderId || item.$createdAt;
          if (!grouped[id]) grouped[id] = [];
          grouped[id].push(item);
        });

        setOrders(grouped);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  //  UPDATE QUANTITY
  const updateQuantity = async (orderId, item, newQty) => {
    if (newQty < 1) return;

    const newTotal = newQty * item.pricePerUnit;

    try {
      await tablesDB.updateRow(APPWRITE_PURCHASES_TABLE_ID, item.$id, {
        quantity: newQty,
        totalPrice: newTotal,
      });

      setOrders((prev) => {
        const copy = { ...prev };
        copy[orderId] = copy[orderId].map((i) =>
          i.$id === item.$id
            ? { ...i, quantity: newQty, totalPrice: newTotal }
            : i
        );
        return copy;
      });
    } catch {
      toast.error("Quantity update failed");
    }
  };

  //  REMOVE ITEM
  const removeItem = async (orderId, itemId) => {
    if (!window.confirm("Remove this item from order?")) return;

    try {
      await tablesDB.updateRow(APPWRITE_PURCHASES_TABLE_ID, itemId, {
        status: "cancelled",
      });

      setOrders((prev) => {
        const copy = { ...prev };
        copy[orderId] = copy[orderId].filter((i) => i.$id !== itemId);
        if (copy[orderId].length === 0) delete copy[orderId];
        return copy;
      });

      toast.success("Item removed");
    } catch {
      toast.error("Remove failed");
    }
  };

  //  SELECT ORDERS
  const toggleOrderSelection = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const deleteSelectedOrders = async () => {
    if (!selectedOrders.length) return;
    if (!window.confirm("Delete selected orders?")) return;

    try {
      for (const orderId of selectedOrders) {
        for (const item of orders[orderId] || []) {
          await tablesDB.updateRow(APPWRITE_PURCHASES_TABLE_ID, item.$id, {
            status: "cancelled",
          });
        }
      }

      setOrders((prev) => {
        const copy = { ...prev };
        selectedOrders.forEach((id) => delete copy[id]);
        return copy;
      });

      setSelectedOrders([]);
      toast.success("Selected orders deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handlePayNow = async (orderId, items, totalAmount) => {
    if (!totalAmount || totalAmount <= 0) {
      toast.error("Invalid order amount");
      return;
    }

    const loaded = await loadRazorpay();

    if (!loaded) {
      toast.error("Payment SDK failed to load");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: totalAmount * 100, // convert to paisa
      currency: "INR",
      name: "Kisan Mitra",
      description: `Order ${orderId}`,
      prefill: {
        name: "Farmer",
      },
      theme: {
        color: "#059669",
      },

      handler: async function (response) {
        try {
          // ✅ Update all items in that order
          for (const item of items) {
            await tablesDB.updateRow(APPWRITE_PURCHASES_TABLE_ID, item.$id, {
              paymentStatus: "paid",
              paymentId: response.razorpay_payment_id,
              status: "completed",
            });
          }

          // ✅ Update UI immediately
          setOrders((prev) => {
            const copy = { ...prev };
            copy[orderId] = copy[orderId].map((i) => ({
              ...i,
              paymentStatus: "paid",
              status: "completed",
            }));
            return copy;
          });

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
  };

  const grandTotal = Object.values(orders).reduce((sum, items) => {
    return sum + items.reduce((s, i) => s + i.totalPrice, 0);
  }, 0);

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

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
        My Orders
      </h2>

      {/* DELETE SELECTED */}
      {selectedOrders.length > 0 && (
        <div className="mb-6 flex justify-end">
          <button
            onClick={deleteSelectedOrders}
            className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
          >
            Delete Selected ({selectedOrders.length})
          </button>
        </div>
      )}

      {Object.keys(orders).map((orderId) => {
        const items = orders[orderId];
        const total = items.reduce((s, i) => s + i.totalPrice, 0);
        const isPaid = items.every((i) => i.paymentStatus === "paid");

        return (
          <div
            key={orderId}
            className="bg-white border rounded-2xl p-5 mb-6 shadow"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedOrders.includes(orderId)}
                  onChange={() => toggleOrderSelection(orderId)}
                  className="h-4 w-4 accent-emerald-600"
                />
                <div>
                  <p className="font-semibold">Order ID</p>
                  <p className="text-sm text-gray-500">{orderId}</p>
                </div>
              </div>
            </div>

            {/* ITEMS */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.$id} className="border rounded-xl p-4">
                  <div className="flex justify-between gap-4">
                    <div className="flex gap-4">
                      {item.imageId && (
                        <img
                          src={AppwriteStorage.getFileView(
                            APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID,
                            item.imageId
                          )}
                          className="h-20 w-20 rounded-lg object-cover border"
                        />
                      )}

                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-500">
                          ₹{item.pricePerUnit} each
                        </p>

                        <p className="text-xs mt-1">
                          Payment:
                          <span
                            className={`ml-1 font-medium ${
                              item.paymentStatus === "paid"
                                ? "text-green-600"
                                : "text-orange-600"
                            }`}
                          >
                            {item.paymentStatus || "pending"}
                          </span>
                        </p>

                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(orderId, item, item.quantity - 1)
                            }
                            className="h-8 w-8 rounded-full border"
                          >
                            −
                          </button>

                          <span className="font-semibold">{item.quantity}</span>

                          <button
                            onClick={() =>
                              updateQuantity(orderId, item, item.quantity + 1)
                            }
                            className="h-8 w-8 rounded-full border"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold">₹{item.totalPrice}</p>
                      <button
                        onClick={() => removeItem(orderId, item.$id)}
                        className="text-red-500 text-sm hover:underline mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL + PAY */}
            <div className="mt-5 flex justify-between items-center">
              <p className="text-lg font-bold">Total: ₹{total}</p>

              <button
                onClick={() => handlePayNow(orderId, items, total)}
                disabled={isPaid}
                className={`px-8 py-3 rounded-2xl font-semibold text-white
    ${
      isPaid
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-emerald-600 hover:bg-emerald-700"
    }`}
              >
                {isPaid ? "Paid ✅" : "Pay Now 💳"}
              </button>
            </div>
          </div>
        );
      })}

      {/* GRAND TOTAL */}
      {Object.keys(orders).length > 0 && (
        <div className="mt-12 bg-emerald-50 border border-emerald-200 rounded-2xl px-6 py-5 flex justify-between items-center">
          <div>
            <p className="text-sm text-emerald-700 font-medium">
              Total Orders Amount
            </p>
            <p className="text-3xl font-bold text-emerald-800 mt-1">
              ₹{grandTotal}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
