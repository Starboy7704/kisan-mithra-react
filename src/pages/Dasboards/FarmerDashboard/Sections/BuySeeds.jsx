import { useEffect, useState } from "react";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import {
  APPWRITE_SEEDS_TABLE_ID,
  APPWRITE_PURCHASES_TABLE_ID,
} from "@/src/Utils/Appwrite/constants";
import Card from "@/src/components/seeds/Card";
import { Account } from "appwrite";
import appwriteClient from "@/src/Appwrite";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

const BuySeeds = () => {
  const [seeds, setSeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ create instances ONCE
  const tablesDB = new AppwriteTablesDB();
  const account = new Account(appwriteClient);

  useEffect(() => {
    const fetchSeeds = async () => {
      try {
        const result = await tablesDB.listRows(APPWRITE_SEEDS_TABLE_ID);
        setSeeds(result.rows || []);
      } catch (error) {
        console.error("listRows error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeeds();
  }, []);

  // 🛒 ADD TO CART
  const handleAddToCart = async (seed) => {
    try {
      const user = await account.get();
      const price = Number(seed.pricePerUnit);
      await tablesDB.createRow(APPWRITE_PURCHASES_TABLE_ID, {
        userId: user.$id,
        productId: seed.$id,
        productType: "seed",
        productName: seed.seedName,
        quantity: 1,
        unit: "packet",
        imageId:seed.imageId,
        pricePerUnit: price,
        totalPrice: price,
        status: "cart",
      });
      toast.success("Added Seeds to Cart");
    } catch (error) {
      console.error("Add seed to cart failed:", error);
      toast.error("❌ Failed to Add Seed to Cart");
    }
  };

  // 📦 BUY NOW
  const handleBuyNow = async (seed) => {
    try {
      const user = await account.get();
      const price = Number(seed.pricePerUnit);

      if (Number.isNaN(price)) {
        alert("❌ Invalid seed price");
        return;
      }
      await tablesDB.createRow(APPWRITE_PURCHASES_TABLE_ID, {
        userId: user.$id,
        productId: seed.$id,
        productType: "seed",
        productName: seed.seedName,
        quantity: 1,
        unit: "packet",
        pricePerUnit: price,
        totalPrice: price,
        imageId:seed.imageId,
        status: "ordered",
      });
      toast.success("📦 Seed order placed successfully");
    } catch (error) {
      console.error("Buy seed failed:", error);
      toast.error("❌ Failed to place seed order");
    }
  };

  if (loading) {
    return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border bg-white p-4 shadow-sm space-y-4"
        >
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />

          <div className="flex gap-3 pt-2">
            <Skeleton className="h-9 w-full rounded-md" />
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        </div>
      ))}
    </section>
    );
  }

  return (
    <section className="flex flex-col justifygrid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {seeds.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg font-medium">No seeds available 🌱</p>
          <p className="text-sm mt-2">Please check back later.</p>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {seeds.map((seed) => (
            <Card
              key={seed.$id}
              seed={seed}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          ))}
        </section>
      )}
    </section>
  );
};

export default BuySeeds;
