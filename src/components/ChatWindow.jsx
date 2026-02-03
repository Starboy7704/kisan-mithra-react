import MessageBubble from "./MessageBubble";

const ChatWindow = ({ messages, currentUserId }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((msg) => (
        <MessageBubble
          key={msg.$id}
          message={msg}
          isOwn={msg.senderId === currentUserId}
        />
      ))}
    </div>
  );
};

export default ChatWindow;
