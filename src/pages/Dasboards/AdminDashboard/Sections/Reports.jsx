import { useEffect, useState } from "react";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import { APPWRITE_VEGETABLES_TABLE_ID } from "@/src/Utils/Appwrite/constants";
import Spinner from "@/components/ui/spinner";

const statusColors = {
  active: "bg-green-100 text-green-700",
  sold: "bg-blue-100 text-blue-700",
  disabled: "bg-red-100 text-red-700",
};

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await AppwriteTablesDB.listDocuments(
        APPWRITE_VEGETABLES_TABLE_ID
      );
      setReports(res?.documents || []);
    } catch (error) {
      console.error("Failed to fetch admin reports", error);
    } finally {
      setLoading(false);
    }
  };

  /* Summary values */
  const totalListings = reports.length;
  const activeListings = reports.filter(r => r.status === "active").length;
  const soldListings = reports.filter(r => r.status === "sold").length;

  if (loading) {
    return (
          <div className="max-w-7xl mx-auto p-6 space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow border p-5 space-y-3"
          >
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-8 w-16 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b">
          <div className="h-5 w-56 bg-gray-200 rounded"></div>
        </div>
        <div className="divide-y">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="grid grid-cols-7 gap-4 px-6 py-4"
            >
              {[...Array(7)].map((__, colIdx) => (
                <div
                  key={colIdx}
                  className="h-4 bg-gray-200 rounded"
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Admin Reports
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          title="Total Listings"
          value={totalListings}
        />
        <SummaryCard
          title="Active Listings"
          value={activeListings}
          color="green"
        />
        <SummaryCard
          title="Sold Listings"
          value={soldListings}
          color="blue"
        />
      </div>

      <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold">
            Sales / Listings Report
          </h3>
          <span className="text-sm text-gray-500">
            Records: {reports.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Seller</th>
                <th className="px-6 py-3 text-left">Vegetable</th>
                <th className="px-6 py-3 text-left">Quantity</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Location</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {reports.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No reports available
                  </td>
                </tr>
              ) : (
                reports.map(item => (
                  <tr
                    key={item.$id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium">
                      {item.sellerName || "—"}
                    </td>

                    <td className="px-6 py-4">
                      {item.vegetableName}
                    </td>

                    <td className="px-6 py-4">
                      {item.quantity} {item.unit}
                    </td>

                    <td className="px-6 py-4">
                      ₹{item.pricePerUnit}
                    </td>

                    <td className="px-6 py-4">
                      {item.location}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${statusColors[item.status] || "bg-gray-100 text-gray-600"}
                        `}
                      >
                        {item.status || "active"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* Summary Card */
function SummaryCard({ title, value, color = "gray" }) {
  const colors = {
    gray: "bg-gray-100 text-gray-700",
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="bg-white rounded-xl shadow border p-5">
      <p className="text-sm text-gray-500 mb-1">
        {title}
      </p>
      <p
        className={`text-3xl font-bold inline-block px-3 py-1 rounded
          ${colors[color]}
        `}
      >
        {value}
      </p>
    </div>
  );
}
