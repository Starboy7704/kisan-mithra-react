import { useEffect, useState } from "react";
import { Account, Query } from "appwrite";
import appwriteClient from "@/src/Appwrite";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import {
  APPWRITE_VEGETABLES_TABLE_ID,
  APPWRITE_PURCHASES_TABLE_ID,
} from "@/src/Utils/Appwrite/constants";
import { Skeleton } from "@/components/ui/skeleton";

const MyActivity = () => {
  const [vegetables, setVegetables] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const account = new Account(appwriteClient);
  const tablesDB = new AppwriteTablesDB();

useEffect(() => {
  fetchData();
}, []);


  const fetchData = async () => {
    try {
      const user = await account.get();
      setCurrentUserId(user.$id);

      if (!user || !user.$id) {
        console.error("User not found");
        return;
      }

      console.log("User ID:", user.$id);

      const vegRes = await tablesDB.listRows(APPWRITE_VEGETABLES_TABLE_ID, [
        Query.equal("farmerId", user.$id),
      ]);

      const purchaseRes = await tablesDB.listRows(APPWRITE_PURCHASES_TABLE_ID, [
        Query.equal("userId", user.$id),
        Query.notEqual("status", "cart"),
      ]);

      console.log("Purchases fetched:", purchaseRes.rows);

      setVegetables(vegRes.rows || []);
      setPurchases(purchaseRes.rows || []);
    } catch (err) {
      console.error("Failed to load activity", err);
    } finally {
      setLoading(false);
    }
  };

  const activeVegetables = vegetables.filter(
    (item) => item.status === "active"
  );

  const soldVegetables = vegetables.filter((item) => item.status === "sold");

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-40 mx-auto" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h2 className="text-2xl font-bold text-emerald-700 text-center">
        My Activity
      </h2>

      {/* ACTIVE VEGETABLES */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-green-700">
          🟢 Active Listings ({activeVegetables.length})
        </h3>
        <VegTable data={activeVegetables} emptyText="No active vegetables" />
      </div>

      {/* SOLD VEGETABLES */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-blue-700">
          🔵 Sold Listings ({soldVegetables.length})
        </h3>
        <VegTable data={soldVegetables} emptyText="No sold vegetables yet" />
      </div>

      {/* PURCHASED ITEMS */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-purple-700">
          🛒 Purchased Items ({purchases.length})
        </h3>
        <PurchaseTable data={purchases} emptyText="No purchases yet" />
      </div>
    </div>
  );
};

/* VEGETABLE TABLE */
function VegTable({ data, emptyText }) {
  return (
    <div className="bg-white rounded-2xl shadow border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Vegetable</th>
              <th className="px-6 py-3 text-left">Quantity</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.$id}>
                  <td className="px-6 py-4">{item.vegetableName}</td>
                  <td className="px-6 py-4">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="px-6 py-4">₹{item.pricePerUnit}</td>
                  <td className="px-6 py-4">
                    {new Date(item.$createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">{item.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* PURCHASE TABLE */
function PurchaseTable({ data, emptyText }) {
  return (
    <div className="bg-white rounded-2xl shadow border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Product</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Quantity</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-center">Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.$id}>
                  <td className="px-6 py-4">{item.productName}</td>
                  <td className="px-6 py-4">{item.productType}</td>
                  <td className="px-6 py-4">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="px-6 py-4">₹{item.totalPrice}</td>
                  <td className="px-6 py-4 text-center">
                    {item.paymentStatus}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyActivity;
