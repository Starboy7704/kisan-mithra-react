import { useEffect, useState } from "react";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import {
  APPWRITE_SEEDS_TABLE_ID,
  APPWRITE_PURCHASES_TABLE_ID,
} from "@/src/Utils/Appwrite/constants";
import Card from "@/src/components/seeds/Card";
import PleaseWait from "@/src/pleasewait";
import Spinner from "@/components/ui/spinner";
import { Account } from "appwrite";
import appwriteClient from "@/src/Appwrite";
import toast from "react-hot-toast";

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
        pricePerUnit: price,
        totalPrice: price,
        status: "cart",
      });
      toast.success("Added Seeds to Cart")
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
      <div className="flex items-center justify-center min-h-screen bg-green-100">
        <div className="flex items-center gap-3 border border-green-400 rounded-lg px-4 py-2 bg-white/70 shadow-sm">
          <Spinner />
          <PleaseWait />
        </div>
      </div>
    );
  }

  return (
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
  );
};

export default BuySeeds;
