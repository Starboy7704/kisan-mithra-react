import { useEffect, useState } from "react";
import AppwriteTablesDB from "../../../../Appwrite/TableDB.services.js";
import { APPWRITE_VEGETABLES_TABLE_ID } from "../../../../Utils/Appwrite/constants.js";
import Spinner from "@/components/ui/spinner";
import PleaseWait from "@/src/pleasewait.jsx";
import VegetableCard from "@/src/components/VegetableCard";

const Browseproducts = () => {
  const [vegetables, setVegetables] = useState([]);
  const [loading, setLoading] = useState(true);

  const appwriteTablesDb = new AppwriteTablesDB();

  useEffect(() => {
    const fetchVegetables = async () => {
      try {
        const result = await appwriteTablesDb.listRows(
          APPWRITE_VEGETABLES_TABLE_ID
        );

        // IMPORTANT: Appwrite returns rows
        setVegetables(result.rows);
      } catch (error) {
        console.error("Failed to fetch vegetables", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVegetables();
  }, []);

  if (loading) {
    return (
     <div className="flex items-center justify-center min-h-screen bg-green-100">
   <div className="flex items-center gap-3 scale-100 border border-green-400 rounded-lg px-4 py-2 bg-white/70 shadow-sm">
  <Spinner />
  <PleaseWait/>

</div>

  </div>
    );
  }

  if (vegetables.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No vegetables available right now.
      </p>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {vegetables.map((veg) => (
        <VegetableCard key={veg.$id} vegetable={veg} />
      ))}
    </section>
  );
};

export default Browseproducts;
