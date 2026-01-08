"use client";

import { useEffect, useMemo, useRef } from "react";
import { InstaMessageBubble } from "./InstaMessageBubble";
import { InstagramMessage } from "@/src/types/meta.type";
import Spinner from "./spinner";

type Props = {
  messages?: { data?: InstagramMessage[] };
  businessUsername: string;
  isLoading: boolean;
};

export function InstagramMessageThread({
  messages,
  businessUsername,
  isLoading,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  const normalizedMessages = useMemo(() => {
    return messages?.data
      ?.filter((m) => m.message?.trim())
      ?.slice()
      ?.reverse();
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [normalizedMessages]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <Spinner size={20} className="text-gray-400" />
      </div>
    );
  }

  if (!normalizedMessages?.length) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        No messages yet
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
      {normalizedMessages.map((msg) => (
        <InstaMessageBubble
          key={msg.id}
          message={msg.message ?? ""}
          time={msg.created_time}
          isMe={msg.from?.username === businessUsername}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
