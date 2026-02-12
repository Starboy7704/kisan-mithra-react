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
import jsPDF from "jspdf";
import "jspdf-autotable";
import AppwriteStorage from "@/src/Appwrite/Storage.Services";

const Orders = ({ setPaymentAmount, setActiveTab }) => {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(true);

  // ✅ NEW: selected orders
  const [selectedOrders, setSelectedOrders] = useState([]);

  const tablesDB = new AppwriteTablesDB();
  const account = new Account(appwriteClient);

  // 🔄 FETCH ORDERS
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

  // ✅ TOGGLE ORDER SELECTION
  const toggleOrderSelection = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  // ❌ BULK DELETE (CANCEL) SELECTED ORDERS
  const deleteSelectedOrders = async () => {
    if (selectedOrders.length === 0) return;
    if (!window.confirm("Delete selected orders?")) return;

    try {
      for (const orderId of selectedOrders) {
        const items = orders[orderId] || [];
        for (const item of items) {
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
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete orders");
    }
  };

  // 🧾 DOWNLOAD INVOICE
  const downloadInvoice = (orderId, items) => {
    const doc = new jsPDF();
    doc.text("Kisan-Mitra Invoice", 14, 15);
    doc.text(`Order ID: ${orderId}`, 14, 25);

    const rows = items.map((i) => [
      i.productName,
      i.quantity,
      i.pricePerUnit,
      i.quantity * i.pricePerUnit,
    ]);

    doc.autoTable({
      head: [["Item", "Qty", "Price", "Total"]],
      body: rows,
      startY: 35,
    });

    const total = items.reduce((s, i) => s + i.quantity * i.pricePerUnit, 0);

    doc.text(`Grand Total: ₹${total}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save(`Invoice-${orderId}.pdf`);
  };

  // ✅ GRAND TOTAL (ALL ORDERS)
  const allOrdersTotal = Object.values(orders).reduce((sum, items) => {
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

      {/* ✅ DELETE SELECTED BUTTON */}
      {selectedOrders.length > 0 && (
        <div className="mb-6 flex justify-end">
          <button
            onClick={deleteSelectedOrders}
            className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
          >
            Delete Selected ({selectedOrders.length})
          </button>
        </div>
      )}

      {Object.keys(orders).length === 0 && (
        <p className="text-gray-500 text-center">No orders found</p>
      )}

      {Object.keys(orders).map((orderId) => {
        const items = orders[orderId];
        const total = items.reduce((s, i) => s + i.totalPrice, 0);

        return (
          <div
            key={orderId}
            className="border rounded-2xl p-5 mb-6 bg-white shadow"
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

              <button
                onClick={() => downloadInvoice(orderId, items)}
                className="text-emerald-600 text-sm hover:underline"
              >
                Download Invoice
              </button>
            </div>

            {/* ITEMS */}
            <div className="space-y-4">
              {items.map((item) => {
                const imageIds = Array.isArray(item.imageIds)
                  ? item.imageIds
                  : item.imageId
                  ? [item.imageId]
                  : [];

                return (
                  <div
                    key={item.$id}
                    className="border rounded-xl p-4 space-y-3"
                  >
                    {imageIds.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto">
                        {imageIds.map((fileId) => (
                          <img
                            key={fileId}
                            src={AppwriteStorage.getFileView(
                              APPWRITE_KISAN_MITRA_IMAGES_BUCKET_ID,
                              fileId
                            )}
                            alt={item.productName}
                            className="h-20 w-20 object-cover rounded-lg border"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-500">
                          ₹{item.pricePerUnit} × {item.quantity}
                        </p>
                      </div>

                      <p className="font-bold">₹{item.totalPrice}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* FOOTER */}
            <div className="mt-5 flex justify-between items-center">
              <p className="text-lg font-bold">Total: ₹{total}</p>
            </div>
          </div>
        );
      })}
      {Object.keys(orders).length > 0 && (
        <div
          className="
    mt-16 
  bottom-6 
    flex justify-center
    z-14
  "
        >
          <div
            className="
        w-full max-w-6xl
        bg-white
        border border-emerald-100
        shadow-xl
        rounded-3xl
        px-6 py-5
        flex flex-col md:flex-row
        md:items-center md:justify-between
        gap-6
      "
          >
            {/* TOTAL SUMMARY */}
            <div className="flex items-center gap-4">
              <div
                className="
          h-12 w-12 
          rounded-full 
          bg-emerald-100 
          flex items-center justify-center
          text-emerald-700 font-bold
        "
              >
                ₹
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Total Amount (All Orders)
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  ₹{allOrdersTotal}
                </p>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => {
                setPaymentAmount(allOrdersTotal);
                setActiveTab("Payments");
                toast.success("Proceeding to payment");
              }}
              className="
          w-full md:w-auto
          px-10 py-3
          bg-emerald-600
          text-white
          text-lg
          font-semibold
          rounded-2xl
          hover:bg-emerald-700
          active:scale-95
          transition
          shadow-lg
        "
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
