"use client";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import useWhatsAppMessagesHook from "@/src/routes/Admin/Hooks/whatsappmessages-hook";
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
import { RefreshCcw } from "lucide-react";

export default function WhatsAppChatById() {
  const { Id } = useParams<{ Id: string }>();
  const { data, isPending, isRefetching, refetch } = useWhatsAppMessagesHook(
    Id ?? "",
    1,
    100
  );
  console.log("data", data);

  const messages = useWhatsAppChatStore((s) => s.chats[Id ?? ""] || []);
  const addMessage = useWhatsAppChatStore((s) => s.addMessage);
  const setMessages = useWhatsAppChatStore((s) => s.setMessages);

  const sendMessage = SendWhatsappMessageHook(Id ?? "");
  const humantakeover = HumanTakeoverHook(Id ?? "");
  const toogleStatus = ToogleStatusHook(Id ?? "");

  const [adminTakeover, setAdminTakeover] = useState<boolean | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  useEffect(() => {
    if (!toogleStatus.data) return;
    const isHuman = toogleStatus.data.mode === "HUMAN_TAKEOVER";
    setAdminTakeover(isHuman);
  }, [toogleStatus.data]);

  useEffect(() => {
    if (!Id) return;
    setMessages(Id, data?.messages ?? []);
  }, [Id, data, setMessages]);

  console.log("messages", messages);
  const handleAdminToggle = useCallback(
    (enabled: boolean) => {
      setAdminTakeover(enabled);
      humantakeover.mutate(enabled, {
        onError: () => setAdminTakeover((prev) => !prev),
        onSuccess: () => toogleStatus.refetch(),
      });
    },
    [humantakeover, toogleStatus]
  );
  const handleSend = useCallback(
    (msg: string) => {
      if (!msg.trim() || !adminTakeover) return;
      const newMessage: ChatMessage = {
        _id: crypto.randomUUID(),
        thread_id: Id!,
        sender: "ADMIN",
        message: msg,
        timestamp: new Date().toISOString(),
      };

      addMessage(Id!, newMessage);
      sendMessage.mutate(msg);
    },
    [Id, addMessage, adminTakeover, sendMessage]
  );
  return (
    <div className="flex flex-col h-[90vh] rounded-xl overflow-hidden bg-[#0b141a] border border-white/10">
      <div className="flex items-center justify-between px-4 py-3 bg-[#202c33]">
        <div>
          <p className="text-white font-semibold flex flex-row items-center gap-2">
            {messages?.[0]?.username ?? "WhatsApp Chat"}{" "}
            <RefreshCcw
              className={`mt-5 w-4 h-4 text-primary-text cursor-pointer ${
                isRefetching ? "animate-spin" : ""
              }`}
              onClick={() => {
                refetch();
              }}
            />
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
        {isPending && messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg._id || `${msg.timestamp}-${msg.sender}`}
              message={msg.message}
              sender={msg.sender}
              timestamp={msg.timestamp}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>
      <ChatInput
        enabled={!!adminTakeover && !humantakeover.isPending}
        onSend={handleSend}
      />
    </div>
  );
}
