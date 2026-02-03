import { useEffect, useState } from "react";
import useAuthStore from "../../../../../store/authStore";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import ChatService from "@/src/Appwrite/Chat.services";
import {
  APPWRITE_CONVERSATIONS_TABLE_ID,
  APPWRITE_MESSAGES_TABLE_ID,
} from "@/src/Utils/Appwrite/constants";

import ChatWindow from "../../../../components/ChatWindow";
import MessageInput from "../../../../components/MessageInput";

const Chat = ({ otherUserId }) => {
  const currentUser = useAuthStore((s) => s.currentUser);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const tablesDB = new AppwriteTablesDB();
  const chatService = new ChatService(tablesDB);

  // 🔒 GUARD 1: wait for user
  useEffect(() => {
    if (!currentUser || !otherUserId) return;

    async function initChat() {
      try {
        console.log("Starting chat init");
        console.log("currentUser:", currentUser.$id);
        console.log("otherUserId:", otherUserId);

        const conv = await chatService.getOrCreateConversation(
          APPWRITE_CONVERSATIONS_TABLE_ID,
          currentUser.$id,
          otherUserId,
        );

        console.log("Conversation result:", conv);

        if (!conv) {
          throw new Error("Conversation is null");
        }

        setConversation(conv);

        const res = await chatService.getMessages(
          APPWRITE_MESSAGES_TABLE_ID,
          conv.$id,
        );

        console.log("Messages:", res.rows);

        setMessages(res.rows);
      } catch (err) {
        console.error("Chat init failed:", err);
      } finally {
        setLoading(false);
      }
    }

    initChat();
  }, [currentUser, otherUserId]);

  // 🔒 GUARD 2: loading states
  if (!currentUser) {
    return <p className="p-4">Loading user...</p>;
  }

  if (loading || !conversation) {
    return <p className="p-4">Loading chat...</p>;
  }

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const msg = await chatService.sendMessage(APPWRITE_MESSAGES_TABLE_ID, {
      conversationId: conversation.$id,
      senderId: currentUser.$id,
      receiverId: otherUserId,
      message: text,
    });

    setMessages((prev) => [...prev, msg]);
  };

  return (
    <div className="flex flex-col h-125 border rounded-lg">
      <ChatWindow messages={messages} currentUserId={currentUser.$id} />
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default Chat;
