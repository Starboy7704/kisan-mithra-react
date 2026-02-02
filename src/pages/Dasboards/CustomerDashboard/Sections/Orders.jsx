import { useEffect, useState } from "react";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import { APPWRITE_PURCHASES_TABLE_ID } from "@/src/Utils/Appwrite/constants";
import { Account, Query } from "appwrite";
import appwriteClient from "@/src/Appwrite";
import Spinner from "@/components/ui/spinner";
import PleaseWait from "@/src/pleasewait";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CustomerOrders = () => {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(true);

  const tablesDB = new AppwriteTablesDB();
  const account = new Account(appwriteClient);

  // 🔄 Fetch CUSTOMER ordered items
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = await account.get();

        const res = await tablesDB.listRows(
          APPWRITE_PURCHASES_TABLE_ID,
          [
            Query.equal("userId", user.$id),
            Query.equal("status", "ordered"),
            Query.orderDesc("$createdAt"),
          ]
        );

        const grouped = {};
        (res.rows || []).forEach((item) => {
          const orderId = item.orderId || item.$createdAt;
          if (!grouped[orderId]) grouped[orderId] = [];
          grouped[orderId].push(item);
        });

        setOrders(grouped);
      } catch (err) {
        console.error("Fetch customer orders failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ➕➖ UPDATE QUANTITY
  const updateQuantity = async (orderId, item, newQty) => {
    if (newQty < 1) return;

    const newTotal = newQty * item.pricePerUnit;

    try {
      await tablesDB.updateRow(
        APPWRITE_PURCHASES_TABLE_ID,
        item.$id,
        {
          quantity: newQty,
          totalPrice: newTotal,
        }
      );

      setOrders((prev) => {
        const copy = { ...prev };
        copy[orderId] = copy[orderId].map((i) =>
          i.$id === item.$id
            ? { ...i, quantity: newQty, totalPrice: newTotal }
            : i
        );
        return copy;
      });
    } catch (err) {
      console.error(err);
      toast.error("Quantity update failed");
    }
  };

  // 🗑 REMOVE ITEM (customer-side)
  const removeItem = async (orderId, itemId) => {
    if (!window.confirm("Remove this item from your order?")) return;

    try {
      await tablesDB.updateRow(
        APPWRITE_PURCHASES_TABLE_ID,
        itemId,
        { status: "cancelled" }
      );

      setOrders((prev) => {
        const copy = { ...prev };
        copy[orderId] = copy[orderId].filter(
          (i) => i.$id !== itemId
        );
        if (copy[orderId].length === 0) delete copy[orderId];
        return copy;
      });

      toast.success("Item cancelled");
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel item");
    }
  };

  // 🧾 PDF INVOICE
  const downloadInvoice = (orderId, items) => {
    const doc = new jsPDF();
    doc.text("Kisan-Mitra Invoice", 14, 15);
    doc.text(`Order ID: ${orderId}`, 14, 25);
    doc.text(
      `Date: ${new Date().toLocaleString()}`,
      14,
      31
    );

    const rows = items.map((i) => [
      i.productName,
      i.quantity,
      `₹${i.pricePerUnit}`,
      `₹${i.quantity * i.pricePerUnit}`,
    ]);

    doc.autoTable({
      head: [["Item", "Qty", "Price", "Total"]],
      body: rows,
      startY: 40,
    });

    const total = items.reduce(
      (s, i) => s + i.quantity * i.pricePerUnit,
      0
    );

    doc.text(
      `Grand Total: ₹${total}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    doc.save(`Invoice-${orderId}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-100">
        <Spinner />
        <PleaseWait />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-emerald-700 mb-6">
        My Orders
      </h2>

      {Object.keys(orders).length === 0 && (
        <p className="text-gray-500 text-center">
          No orders found
        </p>
      )}

      {Object.keys(orders).map((orderId) => {
        const items = orders[orderId];
        const total = items.reduce(
          (s, i) => s + i.quantity * i.pricePerUnit,
          0
        );

        return (
          <div
            key={orderId}
            className="border rounded-2xl p-5 mb-6 bg-white shadow"
          >
            {/* HEADER */}
            <div className="flex justify-between mb-4">
              <div>
                <p className="font-semibold">Order ID</p>
                <p className="text-sm text-gray-500">
                  {orderId}
                </p>
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
              {items.map((item) => (
                <div
                  key={item.$id}
                  className="flex justify-between items-center border rounded-xl p-4"
                >
                  <div>
                    <p className="font-medium">
                      {item.productName}
                    </p>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            orderId,
                            item,
                            item.quantity - 1
                          )
                        }
                        className="px-3 py-1 rounded bg-gray-200"
                      >
                        −
                      </button>

                      <span className="font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            orderId,
                            item,
                            item.quantity + 1
                          )
                        }
                        className="px-3 py-1 rounded bg-gray-200"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      ₹{item.pricePerUnit} each
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">
                      ₹{item.quantity * item.pricePerUnit}
                    </p>

                    <button
                      onClick={() =>
                        removeItem(orderId, item.$id)
                      }
                      className="text-red-600 text-sm hover:underline mt-1"
                    >
                      Cancel Item
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="mt-5 flex justify-between items-center">
              <p className="text-lg font-bold">
                Total: ₹{total}
              </p>

              <button
                onClick={() =>
                  toast("Payment gateway hook")
                }
                className="px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700"
              >
                Pay Now
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CustomerOrders;
