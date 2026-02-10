import { useEffect, useState } from "react";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import {
  APPWRITE_PURCHASES_TABLE_ID,
  APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID,
} from "@/src/Utils/Appwrite/constants";
import { Query } from "appwrite";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import AppwriteStorage from "@/src/Appwrite/Storage.Services";

const STATUS_FLOW = [
  "ordered",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
];

const AdminOrders = () => {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(true);

  const tablesDB = new AppwriteTablesDB();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await tablesDB.listRows(
          APPWRITE_PURCHASES_TABLE_ID,
          [
            Query.notEqual("status", "cart"),
            Query.orderDesc("$createdAt"),
          ]
        );

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

  // 🔄 UPDATE STATUS (ADMIN)
  const updateStatus = async (orderId, itemId, newStatus) => {
    try {
      await tablesDB.updateRow(
        APPWRITE_PURCHASES_TABLE_ID,
        itemId,
        { status: newStatus }
      );

      setOrders((prev) => {
        const copy = { ...prev };
        copy[orderId] = copy[orderId].map((i) =>
          i.$id === itemId ? { ...i, status: newStatus } : i
        );
        return copy;
      });

      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      console.error(err);
      toast.error("Status update failed");
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-72 mb-4" />

        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border shadow-sm p-6 space-y-6"
          >
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-10 w-40 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-emerald-700 mb-6 text-center">
        Admin Order Management
      </h1>

      {Object.entries(orders).map(([orderId, items]) => (
        <div
          key={orderId}
          className="rounded-3xl border bg-white shadow-md mb-8"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center p-6 border-b bg-gray-50 rounded-t-3xl">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-semibold">{orderId}</p>
            </div>

            <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
              {items[0].status.toUpperCase()}
            </span>
          </div>

          {/* ITEMS */}
          <div className="p-6 space-y-4">
            {items.map((item) => {
              const imageId =
                typeof item.imageId === "string" &&
                item.imageId.trim() !== ""
                  ? item.imageId
                  : null;

              return (
                <div
                  key={item.$id}
                  className="flex flex-col md:flex-row justify-between items-center gap-4 border rounded-2xl p-4"
                >
                  {/* LEFT: IMAGE + INFO */}
                  <div className="flex gap-4 w-full md:w-2/3">
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

                    <div>
                      <p className="font-semibold">
                        {item.productName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} {item.unit}
                      </p>
                      <p className="text-xs text-gray-400">
                        Customer: {item.userId}
                      </p>
                      <p className="text-xs text-gray-400">
                        Farmer: {item.sellerId || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* STATUS CONTROL */}
                  <div className="w-full md:w-1/3">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        updateStatus(
                          orderId,
                          item.$id,
                          e.target.value
                        )
                      }
                      className="w-full border rounded-xl px-4 py-2"
                    >
                      {STATUS_FLOW.map((s) => (
                        <option key={s} value={s}>
                          {s.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-center p-6 border-t bg-gray-50 rounded-b-3xl">
            <p className="text-lg font-bold">
              Total: ₹
              {items.reduce((s, i) => s + i.totalPrice, 0)}
            </p>
            <p className="text-sm text-gray-500">
              {items.length} item(s)
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
