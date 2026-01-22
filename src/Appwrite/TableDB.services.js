import { TablesDB, ID } from "appwrite";
import appwriteClient from ".";
import { APPWRITE_DATABASE_ID } from "../Utils/Appwrite/constants.js";
// import SellVegetables from "../pages/Dasboards/FarmerDashboard/Sections/SellVegetables.js";

class AppwriteTablesDB {
  constructor() {
    this.tablesDB = new TablesDB(appwriteClient);
  }

  async createRow(tablesId, data) {
    try {
      const result = await this.tablesDB.createRow({
        databaseId: APPWRITE_DATABASE_ID,
        tableId: tablesId,
        rowId: ID.unique(),
        data: data,
      });
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async listRows(tableId) {
    try {
      const result = await this.tablesDB.listRows({
        databaseId: APPWRITE_DATABASE_ID,
        tableId: tableId,
      });
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }


  // 1️⃣ Create / sell vegetable
  async SellVegetables(data) {
    try {
      return await this.createRow(SELL_VEGETABLES_TABLE_ID, data);
    } catch (error) {
      console.error("Sell vegetable error:", error);
      throw error;
    }
  }

  // 2️⃣ List all vegetables
  async listAllVegetables() {
    try {
      return await this.tablesDB.listRows({
        databaseId: APPWRITE_DATABASE_ID,
        tableId: SELL_VEGETABLES_TABLE_ID,
      });
    } catch (error) {
      console.error("List vegetables error:", error);
      throw error;
    }
  }

  // 3️⃣ List vegetables by farmer (for “My Vegetables” later)
  async listVegetablesByFarmer(farmerId) {
    try {
      return await this.tablesDB.listRows({
        databaseId: APPWRITE_DATABASE_ID,
        tableId: SELL_VEGETABLES_TABLE_ID,
        queries: [Query.equal("farmerId", farmerId)],
      });
    } catch (error) {
      console.error("List farmer vegetables error:", error);
      throw error;
    }
  }

  // 4️⃣ Delete vegetable
  async deleteVegetable(rowId) {
    try {
      return await this.tablesDB.deleteRow({
        databaseId: APPWRITE_DATABASE_ID,
        tableId: SELL_VEGETABLES_TABLE_ID,
        rowId,
      });
    } catch (error) {
      console.error("Delete vegetable error:", error);
      throw error;
    }
  }
}



export default AppwriteTablesDB;
