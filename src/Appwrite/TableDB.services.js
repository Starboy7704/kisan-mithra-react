import { TablesDB, ID } from "appwrite";
import appwriteClient from ".";
import { APPWRITE_DATABASE_ID } from "../Utils/Appwrite/constants.js";

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
        data: data 
      });
      return result;
    } catch (error) {
        console.error(error);
        throw new Error(error.message)
    }
  }
}
export default AppwriteTablesDB;
