"use client";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import WhatsAppMessagesHook from "@/src/routes/Admin/Hooks/whatsappmessages-hook";
import { MessageBubble } from "@/src/app/component/custom-component/messgaeBubble";
import { AdminTakeoverToggle } from "@/src/app/component/custom-component/admintoggle";
import { ChatInput } from "@/src/app/component/custom-component/inputbar";
import Spinner from "@/src/app/component/custom-component/spinner";
import SendWhatsappMessageHook from "@/src/routes/Admin/Hooks/sendwhatsappmessage-hook";
import HumanTakeoverHook from "@/src/routes/Admin/Hooks/humantakeover-hook";
import ToogleStatusHook from "@/src/routes/Admin/Hooks/tooglestatus-hook";
import {
  ChatMessage,
  useWhatsAppChatStore,
} from "@/src/store/Campaign/chat.store";

export default function WhatsAppChatById() {
  const { Id } = useParams<{ Id: string }>();
  const { data, isPending } = WhatsAppMessagesHook(Id ?? "", 1, 50);
  const [message, setMessage] = useState<string>("");

  const [adminTakeover, setAdminTakeover] = useState<boolean | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const messages = useWhatsAppChatStore((s) => s.chats[Id ?? ""] || []);
  const addMessage = useWhatsAppChatStore((s) => s.addMessage);
  const setMessages = useWhatsAppChatStore((s) => s.setMessages);

  const sendMessage = SendWhatsappMessageHook(Id ?? "");
  const humantakeover = HumanTakeoverHook(Id ?? "");
  const toogleStatus = ToogleStatusHook(Id ?? "");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  useEffect(() => {
    if (data?.messages && Id) {
      setMessages(Id, data.messages);
    }
  }, [data?.messages, Id, setMessages]);

  useEffect(() => {
    if (!toogleStatus.data) return;
    setAdminTakeover(toogleStatus.data.mode === "HUMAN_TAKEOVER");
  }, [toogleStatus.data]);

  const handleAdminToggle = (enabled: boolean) => {
    setAdminTakeover(enabled);
    humantakeover.mutate(enabled, {
      onError: () => {
        setAdminTakeover((prev) => !prev);
      },
      onSuccess: () => {
        toogleStatus.refetch();
      },
    });
  };

  const handleSend = (msg: string) => {
    if (!msg.trim() || !adminTakeover) return;

    const newMessage: ChatMessage = {
      _id: crypto.randomUUID(),
      thread_id: Id ?? "",
      sender: "ADMIN",
      message: msg,
      timestamp: new Date().toISOString(),
    };

    addMessage(Id!, newMessage);
    sendMessage.mutate(msg);
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
        {adminTakeover === null ? (
          <Spinner />
        ) : (
          <AdminTakeoverToggle
            enabled={adminTakeover}
            onChange={handleAdminToggle}
            disabled={humantakeover.isPending || toogleStatus.isFetching}
          />
        )}
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {isPending ? (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
            {messages.map((msg) => (
              <MessageBubble
                key={msg._id || `${msg.timestamp}-${msg.sender}`}
                message={msg.message}
                sender={msg.sender}
                timestamp={msg.timestamp}
              />
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <ChatInput
        enabled={!!adminTakeover && !humantakeover.isPending}
        value={message}
        onChange={setMessage}
        onSend={() => handleSend(message)}
      />
    </div>
  );
}
