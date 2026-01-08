"use client";
import { useState } from "react";
import { SiInstagram } from "react-icons/si";
import InstagramConversationListHook from "@/src/routes/Admin/Hooks/Instagram/conversation-list";
import InstagramConversationByIdHook from "@/src/routes/Admin/Hooks/Instagram/conversation-ByID";
import { InstagramMessageThread } from "@/src/app/component/custom-component/InstaMessageThred";
import { InstagramConversation } from "@/src/types/meta.type";
import { toast } from "sonner";
import {
  getOtherPSID,
  getOtherUsername,
} from "@/src/app/component/custom-component/username";
import axios from "axios";
import { RefreshCcw, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import CustomButton from "@/src/app/component/button";

export default function InstagramInbox() {
  const [activeConversationId, setActiveConversationId] = useState<string>();
  const {
    data: messages,
    isLoading,
    isRefetching,
    refetch,
  } = InstagramConversationByIdHook(activeConversationId ?? "");
  const {
    data: conversations,
    isRefetching: isRefetchingConversations,
    refetch: refetchConversations,
  } = InstagramConversationListHook();

  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [sending, setSending] = useState<Record<string, boolean>>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const BUSINESS_USERNAME = "ishout_influencers";
  const otherUsername = getOtherUsername(messages?.data, BUSINESS_USERNAME);
  const otherPSID = getOtherPSID(messages?.data, BUSINESS_USERNAME);

  const handleSendReply = async (messageId: string, psid: string) => {
    const message = replyText[messageId]?.trim();
    if (!message) {
      toast.error("Please enter a message");
      return;
    }
    setSending((prev) => ({ ...prev, [messageId]: true }));
    try {
      const PAGE_ACCESS_TOKEN =
        process.env.NEXT_PUBLIC_PAGE_ACCESS_TOKEN ||
        "EAAVTqVZBPnhYBQPpws4RTBzBGtxZARiAecMVFFvkftKgzRjjTCRkYMYqZBMuIg9pfCLy8ty9cp4JLnw4LKkKZAeqINE2tfz0glk4IgtTxt32dVDFQIAiHGm4JZAzKr4InGMoalsd5T0xFflZAgsYO5N4MOnz0g6vN7UvoZANHdyOEgNkoOXZC4FZAOXsH4WYK2is4VIDT";
      const backendUrl = "https://graph.facebook.com/v23.0/me/messages";
      const headers = {
        Authorization: `Bearer ${PAGE_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      };
      await axios.post(
        `${backendUrl}`,
        {
          recipient: { id: psid },
          message: { text: message },
        },
        { headers }
      );
      if (messages?.data) {
        messages.data.push({
          id: Date.now().toString(),
          from: { username: BUSINESS_USERNAME, id: psid },
          to: { data: [{ username: otherUsername, id: psid }] },
          message,
          created_time: new Date().toISOString(),
        });
      }

      setReplyText((prev) => {
        const newState = { ...prev };
        delete newState[messageId];
        return newState;
      });
      setReplyingTo(null);
      toast.success("Reply sent successfully!");
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Failed to send reply. Please try again.";
      toast.error(errorMessage);
    } finally {
      setSending((prev) => ({ ...prev, [messageId]: false }));
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* LEFT SIDEBAR */}
      <aside className="w-1/3 border-r border-gray-700">
        <header className="p-4 flex items-center gap-3 border-b border-gray-700">
          <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
            <SiInstagram className="text-2xl" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Instagram Messages</h2>
            <div className="flex flex-row items-center gap-2">
              <p className="text-xs text-gray-400">Direct messages</p>
              <RefreshCcw
                className={`w-4 h-4 text-primary-text cursor-pointer ${
                  isRefetching ? "animate-spin" : ""
                }`}
                onClick={() => refetch()}
              />
            </div>
          </div>
        </header>
        <div className="overflow-y-auto">
          {conversations?.data?.map((conv: InstagramConversation) => (
            <div
              key={conv.id}
              onClick={() => setActiveConversationId(conv.id)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-800 transition cursor-pointer border-b border-gray-700
                ${activeConversationId === conv.id ? "bg-gray-800" : ""}
              `}
            >
              <h1 className=" font-bold text-lg truncate flex items-center gap-2 justify-between">
                {otherUsername}
                <span className="text-xs text-gray-400">
                  {new Date(conv.updated_time).toLocaleString()}
                </span>
              </h1>
            </div>
          ))}
        </div>
      </aside>

      {/* RIGHT PANEL */}
      <main className="flex-1 flex flex-col">
        {!activeConversationId ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation
          </div>
        ) : (
          <>
            <header className="p-4 flex items-center gap-3 border-b border-gray-700">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                <SiInstagram className="text-2xl" />
              </div>
              <div className="flex flex-row items-center gap-2 justify-between w-full">
                <h2 className="font-bold text-lg">{otherUsername}</h2>

                <RefreshCcw
                  className={`w-4 h-4 text-primary-text cursor-pointer ${
                    isRefetchingConversations ? "animate-spin" : ""
                  }`}
                  onClick={() => refetchConversations()}
                />
              </div>
            </header>
            <InstagramMessageThread
              messages={messages}
              isLoading={isLoading}
              businessUsername={BUSINESS_USERNAME}
            />

            {/* Input (future send message) */}
            <div className="border-t border-gray-700 p-3 flex flex-row gap-2">
              <Input
                disabled={!otherPSID}
                placeholder="Reply coming next…"
                className="w-full bg-gray-800 rounded px-3 py-2 text-sm"
                value={replyText[otherPSID ?? ""] ?? ""}
                onChange={(e) =>
                  setReplyText((prev) => ({
                    ...prev,
                    [otherPSID ?? ""]: e.target.value,
                  }))
                }
              />
              <CustomButton
                onClick={() =>
                  handleSendReply(otherPSID ?? "", otherPSID ?? "")
                }
                disabled={sending[otherPSID ?? ""]}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                <Send className="h-4 w-4" />
              </CustomButton>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
