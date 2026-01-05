"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import WhatsAppMessagesHook from "@/src/routes/Admin/Hooks/whatsappmessages-hook";
import { MessageBubble } from "@/src/app/component/custom-component/messgaeBubble";
import { AdminTakeoverToggle } from "@/src/app/component/custom-component/admintoggle";
import { ChatInput } from "@/src/app/component/custom-component/inputbar";
import Spinner from "@/src/app/component/custom-component/spinner";
import SendWhatsappMessageHook from "@/src/routes/Admin/Hooks/sendwhatsappmessage-hook";
import HumanTakeoverHook from "@/src/routes/Admin/Hooks/humantakeover-hook";

interface MessageProps {
  _id: string;
  username?: string;
  sender: "AI" | "USER" | "ADMIN";
  message: string;
  timestamp: string;
}

export default function WhatsAppChatById() {
  const { Id } = useParams<{ Id: string }>();
  const { data, isPending, refetch } = WhatsAppMessagesHook(Id ?? "", 1, 50);

  const [adminTakeover, setAdminTakeover] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const sendMessage = SendWhatsappMessageHook(Id ?? "");
  const humantakeover = HumanTakeoverHook(Id ?? "");

  useEffect(() => {
    if (data?.messages) {
      setMessages(data.messages);
    }
  }, [data]);

  const handleAdminToggle = (enabled: boolean) => {
    setAdminTakeover(enabled);
    humantakeover.mutate(enabled);
  };

  const handleSend = (message: string) => {
    if (!message.trim() || !adminTakeover) return;

    const newMessage: MessageProps = {
      _id: Date.now().toString(),
      sender: "ADMIN",
      message,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
    sendMessage.mutate(message);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-[90vh] rounded-xl overflow-hidden bg-[#0b141a] border border-white/10">
      <div className="flex items-center justify-between px-4 py-3 bg-[#202c33]">
        <div>
          <p className="text-white font-semibold">
            {messages?.[0]?.username ?? "WhatsApp Chat"}
          </p>
          <p className="text-xs text-gray-400">
            {adminTakeover ? "Human takeover active" : "AI agent active"}
          </p>
        </div>
        <AdminTakeoverToggle
          enabled={adminTakeover}
          onChange={handleAdminToggle}
        />
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {isPending ? (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              message={msg.message}
              sender={msg.sender}
              timestamp={msg.timestamp}
            />
          ))
        )}
      </div>

      <ChatInput
        enabled={adminTakeover}
        value={message}
        onChange={setMessage}
        onSend={() => handleSend(message)}
      />
    </div>
  );
}
