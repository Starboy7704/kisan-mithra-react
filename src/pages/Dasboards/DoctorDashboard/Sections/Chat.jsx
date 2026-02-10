import { useEffect, useState } from "react";
import useAuthStore from "../../../../../store/authStore";
import AppwriteTablesDB from "@/src/Appwrite/TableDB.services";
import ChatService from "@/src/Appwrite/Chat.Services";
import appwriteClient from "@/src/Appwrite";

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

  /* ----------------------------------
     1️⃣ INIT CHAT (create / load)
  ---------------------------------- */
  useEffect(() => {
    if (!currentUser || !otherUserId) return;

    async function initChat() {
      try {
        console.log("Initializing chat...");
        console.log("currentUser:", currentUser.$id);
        console.log("otherUserId:", otherUserId);

        // Get or create conversation
        const conv = await chatService.getOrCreateConversation(
          APPWRITE_CONVERSATIONS_TABLE_ID,
          currentUser.$id,
          otherUserId
        );

        if (!conv) {
          throw new Error("Conversation not found / created");
        }

        setConversation(conv);

        // Fetch existing messages
        const res = await chatService.getMessages(
          APPWRITE_MESSAGES_TABLE_ID,
          conv.$id
        );

        setMessages(res.rows);
      } catch (error) {
        console.error("Chat init failed:", error);
      } finally {
        setLoading(false);
      }
    }

    initChat();
  }, [currentUser, otherUserId]);


    //  2️⃣ REALTIME SUBSCRIPTION

  useEffect(() => {
    if (!conversation) return;

    console.log("Subscribing to realtime messages...");

    const unsubscribe = appwriteClient.subscribe(
      `databases.${import.meta.env.VITE_APPWRITE_DATABASE_ID}.tables.${APPWRITE_MESSAGES_TABLE_ID}.rows`,
      (event) => {
        if (
          event.events.includes("databases.*.tables.*.rows.create") &&
          event.payload.conversationId === conversation.$id
        ) {
          setMessages((prev) => {
            // 🚫 prevent duplicates
            const exists = prev.some(
              (msg) => msg.$id === event.payload.$id
            );
            return exists ? prev : [...prev, event.payload];
          });
        }
      }
    );

    return () => {
      console.log("Unsubscribing from realtime");
      unsubscribe();
    };
  }, [conversation]);

  /* ----------------------------------
     3️⃣ SEND MESSAGE
  ---------------------------------- */
  const handleSend = async (text) => {
    if (!text.trim()) return;

    try {
      const msg = await chatService.sendMessage(
        APPWRITE_MESSAGES_TABLE_ID,
        {
          conversationId: conversation.$id,
          senderId: currentUser.$id,
          receiverId: otherUserId,
          message: text,
        }
      );

      // Optimistic update
      setMessages((prev) => [...prev, msg]);
    } catch (error) {
      console.error("Send message failed:", error);
    }
  };

  /* ----------------------------------
     4️⃣ UI GUARDS
  ---------------------------------- */
  if (!currentUser) {
    return <p className="p-4">Loading user...</p>;
  }

  if (loading) {
    return <p className="p-4">Loading chat...</p>;
  }

  if (!conversation) {
    return (
      <p className="p-4 text-red-500">
        Failed to load chat. Please try again.
      </p>
    );
  }

  /* ----------------------------------
     5️⃣ UI
  ---------------------------------- */
  return (
    <div className="flex flex-col h-125 border rounded-lg bg-white">
      <ChatWindow
        messages={messages}
        currentUserId={currentUser.$id}
      />
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default Chat;
