import { useEffect, useState } from "react";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import { APPWRITE_SEEDS_TABLE_ID } from "@/src/Utils/Appwrite/constants";
import SeedCard from "@/src/components/seeds/Card";
import Spinner from "@/components/ui/spinner";

const BuySeeds = () => {
  const [seeds, setSeeds] = useState([]); // 👈 state
  const [loading, setLoading] = useState(true);

  const appwriteTablesDb = new AppwriteTablesDB();

  useEffect(() => {
    const fetchSeeds = async () => {
      try {
        const result = await appwriteTablesDb.listRows(APPWRITE_SEEDS_TABLE_ID);
        setSeeds(result.rows); // 👈 store rows
      } catch (error) {
        console.error("listRows error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeeds();
  }, []);
<<<<<<< HEAD
=======



>>>>>>> 67959f07fc19a3f55bff813a644c79673a733ca9
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-green-100">
          <div className="flex items-center gap-3 border border-green-400 rounded-lg px-4 py-2 bg-white/70 shadow-sm">
            <Spinner />
            <PleaseWait />
          </div>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {seeds.map((seed) => (
            <SeedCard key={seed.$id} seed={seed} />
          ))}
        </section>
      )}
    </>
  );
};

export default BuySeeds;
