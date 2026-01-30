import { useEffect, useState } from "react";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import {
  APPWRITE_PESTICIDES_TABLE_ID,
  APPWRITE_PURCHASES_TABLE_ID,
} from "@/src/Utils/Appwrite/constants";
import Spinner from "@/components/ui/spinner";
import PleaseWait from "@/src/pleasewait";
import PesticidesCard from "@/src/components/PesticidesCard";
import { Account } from "appwrite";
import appwriteClient from "@/src/Appwrite";

const BuyPesticides = () => {
  const [pesticides, setPesticides] = useState([]);
  const [loading, setLoading] = useState(true);

  const tablesDB = new AppwriteTablesDB();
  const account = new Account(appwriteClient);

  useEffect(() => {
    const fetchPesticides = async () => {
      try {
        const result = await tablesDB.listRows(APPWRITE_PESTICIDES_TABLE_ID);
        setPesticides(result.rows || []);
      } catch (error) {
        console.error("Failed to fetch pesticides", error);
        setPesticides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPesticides();
  }, []);

const handleAddToCart = async (pesticide) => {
  try {
    const user = await account.get();

    const price = Number(pesticide.p_requi); // 👈 FIX

    await tablesDB.createRow(APPWRITE_PURCHASES_TABLE_ID, {
      userId: user.$id,
      productId: pesticide.$id,
      productType: "pesticide",
      productName: pesticide.pesticideName, // ✅ correct
      quantity: 1,
      unit: pesticide.unit,                 // ✅ exists
      pricePerUnit: price,                  // ✅ float
      totalPrice: price,
      status: "cart",
    });

    alert("✅ Added to cart");
  } catch (err) {
    console.error("Add to cart failed:", err);
  }
};

  // 📦 BUY NOW
  const handleBuyNow = async (pesticide) => {
    try {
      const user = await account.get();

      await tablesDB.createRow(APPWRITE_PURCHASES_TABLE_ID, {
        userId: user.$id,
        productId: pesticide.$id,
        productType: "pesticide",
        productName: pesticide.pesticideName,
        quantity: 1,
        unit: pesticide.unit,
        pricePerUnit: Number(pesticide.pricePerUnit),
        totalPrice: Number(pesticide.pricePerUnit),

        status: "ordered",
      });

      alert("📦 Order placed successfully");
    } catch (error) {
      console.error("Buy now failed", error);
      alert("❌ Failed to place order");
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

  if (pesticides.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50">
        <div className="text-center p-6 border border-green-300 rounded-xl bg-white shadow-sm">
          <h2 className="text-lg font-semibold text-green-700">
            No Pesticides Found 🌱
          </h2>
        </div>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pesticides.map((pesticide) => (
        <PesticidesCard
          key={pesticide.$id}
          pesticide={pesticide}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      ))}
    </section>
  );
};

export default BuyPesticides;
