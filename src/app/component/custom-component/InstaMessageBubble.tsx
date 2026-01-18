type MessageBubbleProps = {
  message: string;
  time: string;
  isMe: boolean;
};

export function InstaMessageBubble({
  message,
  time,
  isMe,
}: MessageBubbleProps) {
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm break-words
            ${isMe
            ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-br-sm"
            : "bg-gray-800 text-gray-100 rounded-bl-sm"
          }
          `}
      >
        <p>{message}</p>
        <p className="text-[10px] text-gray-300 mt-1 text-right">
          {new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

    </div>
  );
}
