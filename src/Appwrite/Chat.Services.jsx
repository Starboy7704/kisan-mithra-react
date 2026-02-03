import { Query } from "appwrite";

class ChatService {
  constructor(tablesDB) {
    this.tablesDB = tablesDB;
  }

  async getOrCreateConversation(tableId, userA, userB) {
    const res = await this.tablesDB.listRows(
      tableId,
      [
        Query.contains("participants", userA),
        Query.contains("participants", userB),
      ]
    );

    if (res.rows.length > 0) return res.rows[0];

    return await this.tablesDB.createRow(tableId, {
      participants: [userA, userB],
    });
  }

  async sendMessage(tableId, payload) {
    return await this.tablesDB.createRow(tableId, payload);
  }

  async getMessages(tableId, conversationId) {
    return await this.tablesDB.listRows(
      tableId,
      [Query.equal("conversationId", conversationId)]
    );
  }
}

export default ChatService;
