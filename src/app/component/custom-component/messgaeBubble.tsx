interface MessageBubbleProps {
  message: string;
  sender: "AI" | "USER" | "ADMIN" | "SYSTEM";
  timestamp: string;
}

export function MessageBubble({
  message,
  sender,
  timestamp,
}: MessageBubbleProps) {
  const isRight = sender === "AI" || sender === "SYSTEM" || sender === "ADMIN";

  return (
    <div
      className={`flex w-full mb-3 ${
        isRight ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-md
          ${
            sender === "AI"
              ? "bg-white text-gray-900 rounded-bl-none"
              : sender === "ADMIN"
              ? "bg-[#e73347] text-white rounded-br-none"
              : sender === "USER"
              ? "bg-secondaryButton text-white rounded-bl-none"
              : "bg-slate-500 text-white rounded-br-none"
          }`}
      >
        <p className="whitespace-pre-line">{message}</p>
        <div className="mt-1 text-[10px] opacity-70 text-right">
          {sender === "ADMIN" && "Admin · "}
          {new Date(timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
