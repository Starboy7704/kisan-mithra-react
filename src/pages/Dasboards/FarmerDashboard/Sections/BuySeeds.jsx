import { useEffect, useState } from "react";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import { APPWRITE_SEEDS_TABLE_ID } from "@/src/Utils/Appwrite/constants";
import SeedCard from "@/src/components/seeds/SeedCard";

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

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div>BuySeeds</div>

      {/* <section>
        {seeds.length === 0 ? (
          <p>No seeds available</p>
        ) : (
          seeds.map((seed) => (
            <h1
              className="underline font-semibold"
              key={seed.$id}
            >
              {seed.seedName}
            </h1>
          ))
        )}
      </section> */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {seeds.map((seed) => (
          <SeedCard key={seed.$id} seed={seed} />
        ))}
      </section>
    </>
  );
};

export default BuySeeds;
