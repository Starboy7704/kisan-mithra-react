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

  // 🔄 FETCH CUSTOMER ORDERS
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
        console.error(err);
        toast.error("Failed to load orders");
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
    } catch {
      toast.error("Quantity update failed");
    }
  };

  // ❌ CANCEL ITEM
  const removeItem = async (orderId, itemId) => {
    if (!window.confirm("Cancel this item?")) return;

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
    } catch {
      toast.error("Cancel failed");
    }
  };

  // 🧾 DOWNLOAD INVOICE
  const downloadInvoice = (orderId, items) => {
    const doc = new jsPDF();
    doc.text("Kisan-Mitra Invoice", 14, 15);
    doc.text(`Order ID: ${orderId}`, 14, 25);
    doc.text(`Date: ${new Date().toLocaleString()}`, 14, 32);

    const rows = items.map((i) => [
      i.productName,
      i.quantity,
      i.pricePerUnit,
      i.quantity * i.pricePerUnit,
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
    <div className="max-w-6xl mx-auto p-6">
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          My Orders
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          View and manage your purchases
        </p>
      </div>

      {Object.keys(orders).length === 0 && (
        <div className="text-center py-20 text-gray-500">
          You haven’t placed any orders yet
        </div>
      )}

      <div className="space-y-8">
        {Object.keys(orders).map((orderId) => {
          const items = orders[orderId];
          const total = items.reduce(
            (s, i) => s + i.quantity * i.pricePerUnit,
            0
          );

          return (
            <div
              key={orderId}
              className="rounded-3xl border bg-white shadow-sm"
            >
              {/* HEADER */}
              <div className="flex flex-wrap justify-between items-center gap-4 px-6 py-4 bg-gray-50 border-b rounded-t-3xl">
                <div>
                  <p className="text-xs text-gray-500">ORDER ID</p>
                  <p className="font-semibold text-gray-900">
                    {orderId}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                    Ordered
                  </span>

                  <button
                    onClick={() => downloadInvoice(orderId, items)}
                    className="text-sm font-medium text-emerald-600 hover:underline"
                  >
                    Download Invoice
                  </button>
                </div>
              </div>

              {/* ITEMS */}
              <div className="divide-y">
                {items.map((item) => (
                  <div
                    key={item.$id}
                    className="flex flex-col md:flex-row justify-between gap-6 px-6 py-5"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {item.productName}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        ₹{item.pricePerUnit} per unit
                      </p>

                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() =>
                            updateQuantity(
                              orderId,
                              item,
                              item.quantity - 1
                            )
                          }
                          className="h-8 w-8 rounded-full border hover:bg-gray-100"
                        >
                          −
                        </button>

                        <span className="font-semibold min-w-[32px] text-center">
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
                          className="h-8 w-8 rounded-full border hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold">
                        ₹{item.quantity * item.pricePerUnit}
                      </p>

                      <button
                        onClick={() =>
                          removeItem(orderId, item.$id)
                        }
                        className="mt-2 text-sm text-red-500 hover:underline"
                      >
                        Cancel item
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="flex flex-wrap justify-between items-center gap-4 px-6 py-5 bg-gray-50 border-t rounded-b-3xl">
                <p className="text-lg font-bold">
                  Total: ₹{total}
                </p>

                <button
                  onClick={() => toast("Payment gateway hook")}
                  className="px-8 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700"
                >
                  Pay Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerOrders;
