import { Storage, ID } from "appwrite";
import appwriteClient from ".";

class AppwriteStorage {
  constructor() {
    this.storage = new Storage(appwriteClient);
  }

  async uploadFile(bucketId, file) {
    try {
      const response = await this.storage.createFile({
        bucketId: bucketId,
        fileId: ID.unique(),
        file: file,
      });

      return response; // ✅ MUST return
    } catch (error) {
      console.error("File upload failed:", error);
      throw error;
    }
  }
  getFileView(bucketId, fileId) {
    return this.storage.getFileView(bucketId, fileId);
  }
}

export default new AppwriteStorage(); // ✅ singleton