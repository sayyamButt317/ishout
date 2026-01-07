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
import { useNotificationSound } from "@/src/helper/notificationSound";

export default function WhatsAppChatById() {
  const { Id } = useParams<{ Id: string }>();
  const { data, isPending, isRefetching, refetch } = useWhatsAppMessagesHook(
    Id ?? "",
    1,
    100
  );

  const messages = useWhatsAppChatStore((s) => s.chats[Id ?? ""] || []);
  const addMessage = useWhatsAppChatStore((s) => s.addMessage);
  const setMessages = useWhatsAppChatStore((s) => s.setMessages);
  const { playMessageSentSound } = useNotificationSound();

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
      playMessageSentSound();
      sendMessage.mutate(msg);
    },
    [adminTakeover, playMessageSentSound, Id, addMessage, sendMessage]
  );

  const name =
    messages.filter((msg) => msg.sender === "USER")[0]?.username ?? "";
  return (
    <div className="flex flex-col h-[90vh] rounded-xl overflow-hidden bg-[#0b141a] border border-white/10">
      <div className="flex items-center justify-between px-4 py-3 bg-[#202c33]">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white font-semibold">
              {name
                ?.split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>

            <div className="flex flex-col">
              <p className="text-white font-semibold leading-none">
                {name || "Whatsapp User"}
              </p>
              <p className="text-xs text-gray-400">
                {adminTakeover ? "Human takeover active" : "AI agent active"}
              </p>
            </div>

            {/* Refresh */}
            <RefreshCcw
              className={`ml-2 w-4 h-4 text-primary-text cursor-pointer ${
                isRefetching ? "animate-spin" : ""
              }`}
              onClick={() =>
                refetch().then(() => {
                  const newMessages = data?.messages ?? [];
                  setMessages(Id!, newMessages);
                })
              }
            />
          </div>
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
