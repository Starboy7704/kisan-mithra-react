const MessageBubble = ({ message, isOwn }) => {
  return (
    <div
      className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
        isOwn
          ? "ml-auto bg-emerald-600 text-white"
          : "mr-auto bg-gray-200"
      }`}
    >
      {message.message}
    </div>
  );
};

export default MessageBubble;
