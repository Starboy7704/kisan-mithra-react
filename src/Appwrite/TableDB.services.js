import { TablesDB, ID } from "appwrite"
import appwriteClient from "."
import { APPWRITE_DB_ID } from "../Utils/Appwrite/constants.js";

class AppwriteTablesDB {
    constructor() {
        this.tablesDb = new TablesDB(appwriteClient)
    }

    async createRow(tableId, data) {
        try {
            const result = await this.tablesDb.createRow({
                databaseId: APPWRITE_DB_ID,
                tableId: tableId,
                rowId: ID.unique(),
                data: data
            });

            return result
        } catch (error) {
            console.error(error)
            throw new Error(error.message)
        }
    }

    async listRows(tableId) {
        try {
            const result = await this.tablesDb.listRows({
                databaseId: APPWRITE_DB_ID,
                tableId: tableId
            });

            return result.rows;
        } catch (error) {
            console.error(error)
            throw new Error(error.message)
        }
    }

    async getRow(tableId, rowId){
        try {
            const result = await this.tablesDb.getRow({
                databaseId: APPWRITE_DB_ID,
                tableId: tableId,
                rowId: rowId
            });

            return result;
        } catch (error) {
            console.error(error)
            throw new Error(error.message)
        }
    }
}

export default AppwriteTablesDB;