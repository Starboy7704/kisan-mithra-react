import { useEffect, useState } from "react";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import { APPWRITE_PESTICIDES_TABLE_ID } from "@/src/Utils/Appwrite/constants.js";
import Spinner from "@/components/ui/spinner";
import PesticidesCard from "@/src/components/PesticidesCard";

const BuyPesticides = () => {
  const [pesticides, setPesticides] = useState([]);
  const [loading, setLoading] = useState(true);

  const TablesDB = new AppwriteTablesDB();

  useEffect(() => {
    const fetchPesticides = async () => {
      try {
        const result = await TablesDB.listRows(
          APPWRITE_PESTICIDES_TABLE_ID
        );

        // IMPORTANT: rows come from Appwrite
        setPesticides(result.rows);
      } catch (error) {
        console.error("Failed to fetch pesticides", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPesticides();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="size-10 text-emerald-600 animate-spin" />
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pesticides.map((pesticide) => (
        <PesticidesCard
            key={pesticide.$id}
          pesticide={pesticide}/>
      ))}
    </section>
  );
};

export default BuyPesticides;
