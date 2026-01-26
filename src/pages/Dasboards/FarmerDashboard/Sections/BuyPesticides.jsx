import { useEffect, useState } from "react";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import { APPWRITE_PESTICIDES_TABLE_ID } from "@/src/Utils/Appwrite/constants.js";
import Spinner from "@/components/ui/spinner";
import PleaseWait from "@/src/pleasewait";
import PesticidesCard from "@/src/components/PesticidesCard";

const BuyPesticides = () => {
  const [pesticides, setPesticides] = useState([]);
  const [loading, setLoading] = useState(true);

  const TablesDB = new AppwriteTablesDB();

  useEffect(() => {
    const fetchPesticides = async () => {
      try {
        const result = await TablesDB.listRows(APPWRITE_PESTICIDES_TABLE_ID);
        setPesticides(result.rows || []); // ✅ safety fallback
      } catch (error) {
        console.error("Failed to fetch pesticides", error);
        setPesticides([]); // ✅ ensure empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchPesticides();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-100">
        <div className="flex items-center gap-3 scale-100 border border-green-400 rounded-lg px-4 py-2 bg-white/70 shadow-sm">
          <Spinner />
          <PleaseWait />
        </div>
      </div>
    );
  }

  // ✅ NO DATA MESSAGE
  if (!pesticides || pesticides.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50">
        <div className="text-center p-6 border border-green-300 rounded-xl bg-white shadow-sm">
          <h2 className="text-lg font-semibold text-green-700">No Pesticides Found 🌱</h2>
          <p className="text-sm text-gray-600 mt-2">
            Currently no pesticides are available. Please check again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pesticides.map((pesticide) => (
        <PesticidesCard key={pesticide.$id} pesticide={pesticide} />
      ))}
    </section>
  );
};

export default BuyPesticides;
