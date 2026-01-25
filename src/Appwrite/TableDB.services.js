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


}



export default AppwriteTablesDB;