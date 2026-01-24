import { ID } from "appwrite";
import appwriteClient from ".";


class AppwriteStorage {
  constructor() {
    this.storage = new Storage(appwriteClient);
  }
  async uploadFile(bucketId, file) {
    try {
      return await this.storage.createFile(bucketId, ID.unique(), file);
    } catch (error) {
      console.error("File upload failed:", error);
      throw error;
    }
  }
}

export default AppwriteStorage;