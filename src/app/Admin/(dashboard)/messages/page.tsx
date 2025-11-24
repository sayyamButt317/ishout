"use client";
import { useNotificationStore } from "@/src/store/Campaign/notification.store";
import React, { useMemo, useCallback } from "react";
import { MessageCircle, Paperclip } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import Image from "next/image";
// import { toast } from "sonner";
// import axios from "axios";

type Attachment = {
  type: "image" | "video" | "audio" | "file";
  payload: {
    url: string;
  };
};

type Notification = {
  type: string;
  from_psid: string;
  from_username: string;
  text?: string;
  attachments?: Attachment[];
  timestamp: number;
  mid?: string;
};

// Memoized Message Component to prevent unnecessary re-renders
const MessageItem = React.memo(
  ({
    msg,
    // messageId,
    // replyingTo,
    // replyText,
    // sending,
    // onToggleReply,
    // onSendReply,
    // onKeyPress,
    onMessageClick,
  }: // onReplyTextChange,
  {
    msg: Notification;
    messageId: string;
    replyingTo: string | null;
    replyText: { [key: string]: string };
    sending: { [key: string]: boolean };
    onToggleReply: (id: string) => void;
    onSendReply: (id: string, psid: string) => void;
    onKeyPress: (
      e: React.KeyboardEvent<HTMLTextAreaElement>,
      id: string,
      psid: string
    ) => void;
    onMessageClick: (username: string) => void;
    onReplyTextChange: (id: string, value: string) => void;
  }) => {
    return (
      <div className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 hover:border-gray-600/50 hover:bg-gray-800/60 transition-all duration-300 shadow-xl hover:shadow-2xl">
        <div className="flex gap-4">
          {/* Left side - Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg ring-2 ring-purple-500/30">
                {(msg.from_username || "U").charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 min-w-0">
            {/* Username and Actions Row */}
            <div className="flex items-start justify-between mb-3 gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-lg sm:text-xl mb-1">
                  {msg.from_username || "Unknown User"}
                </h3>
                <p className="text-xs text-gray-400 font-mono">
                  ID: {msg.from_psid}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* <button
                  onClick={() => onToggleReply(messageId)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    replyingTo === messageId
                      ? "bg-purple-500/30 border border-purple-500/50"
                      : "bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50"
                  }`}
                  title={replyingTo === messageId ? "Cancel Reply" : "Reply"}
                >
                  {replyingTo === messageId ? (
                    <>
                      <X className="h-4 w-4 text-purple-300" />
                      <span className="text-xs text-purple-300 hidden sm:inline">
                        Cancel
                      </span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-4 w-4 text-gray-300" />
                      <span className="text-xs text-gray-300 hidden sm:inline">
                        Reply
                      </span>
                    </>
                  )}
                </button> */}
                <button
                  onClick={() => onMessageClick(msg.from_username)}
                  className="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg transition-colors"
                  title="Open on Instagram"
                >
                  <SiInstagram className="h-4 w-4 text-blue-400" />
                </button>
              </div>
            </div>

            {/* Message Content */}
            {msg.text && (
              <div className="bg-gradient-to-br from-gray-700/40 to-gray-800/40 rounded-xl p-4 mb-3 border border-gray-600/30 shadow-inner">
                <p className="text-gray-100 text-sm sm:text-base leading-relaxed break-words">
                  {msg.text}
                </p>
              </div>
            )}

            {/* Attachments */}
            {/* {msg.attachments && msg.attachments.length > 0 && (
              <div className="space-y-3 mb-3">
                {msg.attachments.map((attachment: Attachment, idx: number) => (
                  <div
                    key={idx}
                    className="rounded-xl overflow-hidden border border-gray-600/30"
                  >
                    {attachment.type === "image" && (
                      <div className="bg-gray-700/20 p-2">
                        <Image
                          src={attachment.payload.url}
                          alt="Instagram Image"
                          width={500}
                          height={400}
                          className="w-full h-auto rounded-lg object-cover"
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                    )}

                    {attachment.type === "video" && (
                      <div className="bg-gray-700/20 p-2">
                        <video
                          src={attachment.payload.url}
                          className="w-full h-auto rounded-lg"
                          controls
                          preload="metadata"
                        />
                      </div>
                    )}

                    {attachment.type === "audio" && (
                      <div className="bg-gray-700/20 p-4 rounded-lg">
                        <audio
                          src={attachment.payload.url}
                          controls
                          className="w-full"
                          preload="metadata"
                        />
                      </div>
                    )}

                    {attachment.type === "file" && (
                      <div className="bg-gray-700/20 p-4 rounded-lg">
                        <a
                          href={attachment.payload.url}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-2 transition-colors"
                        >
                          <Paperclip className="h-4 w-4" />
                          Download File
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )} */}

            {/* Reply Input Section */}
            {/* {replyingTo === messageId && (
              <div className="mt-4 p-4 bg-gray-700/30 rounded-xl border border-purple-500/30 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <textarea
                      value={replyText[messageId] || ""}
                      onChange={(e) =>
                        onReplyTextChange(messageId, e.target.value)
                      }
                      onKeyDown={(e) => onKeyPress(e, messageId, msg.from_psid)}
                      placeholder="Type your reply..."
                      className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 resize-none"
                      rows={3}
                      disabled={sending[messageId]}
                    />
                  </div>
                  <button
                    onClick={() => onSendReply(messageId, msg.from_psid)}
                    disabled={
                      sending[messageId] || !replyText[messageId]?.trim()
                    }
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50 flex-shrink-0"
                  >
                    {sending[messageId] ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span className="hidden sm:inline text-sm font-medium">
                          Send
                        </span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2 ml-1">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            )} */}
          </div>
        </div>
      </div>
    );
  }
);

MessageItem.displayName = "MessageItem";

export default function InstagramNotifications() {
  // Use selector to prevent unnecessary re-renders
  const notifications = useNotificationStore((state) => state.notifications);
  // const [replyingTo, setReplyingTo] = useState<string | null>(null);
  // const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  // const [sending, setSending] = useState<{ [key: string]: boolean }>({});

  // Memoize message count to prevent recalculation
  const messageCount = useMemo(
    () => notifications.length,
    [notifications.length]
  );

  const handleMessageClick = useCallback((username: string) => {
    if (username) {
      window.open(`https://ig.me/m/${username}`, "_blank");
    }
  }, []);

  // const toggleReply = useCallback(
  //   (messageId: string) => {
  //     if (replyingTo === messageId) {
  //       setReplyingTo(null);
  //       setReplyText((prev) => {
  //         const newState = { ...prev };
  //         delete newState[messageId];
  //         return newState;
  //       });
  //     } else {
  //       setReplyingTo(messageId);
  //       if (!replyText[messageId]) {
  //         setReplyText((prev) => ({ ...prev, [messageId]: "" }));
  //       }
  //     }
  //   },
  //   [replyingTo, replyText]
  // );

  // const handleSendReply = useCallback(
  //   async (messageId: string, psid: string) => {
  //     const message = replyText[messageId]?.trim();
  //     if (!message) {
  //       toast.error("Please enter a message");
  //       return;
  //     }

  //     setSending((prev) => ({ ...prev, [messageId]: true }));

  //     try {
  //       const PAGE_ACCESS_TOKEN =
  //         process.env.NEXT_PUBLIC_PAGE_ACCESS_TOKEN ||
  //         "EAAVTqVZBPnhYBQPpws4RTBzBGtxZARiAecMVFFvkftKgzRjjTCRkYMYqZBMuIg9pfCLy8ty9cp4JLnw4LKkKZAeqINE2tfz0glk4IgtTxt32dVDFQIAiHGm4JZAzKr4InGMoalsd5T0xFflZAgsYO5N4MOnz0g6vN7UvoZANHdyOEgNkoOXZC4FZAOXsH4WYK2is4VIDT";
  //       const backendUrl = "https://graph.facebook.com/v23.0/me/messages";
  //       const headers = {
  //         Authorization: `Bearer ${PAGE_ACCESS_TOKEN}`,
  //         "Content-Type": "application/json",
  //       };

  //       await axios.post(
  //         `${backendUrl}`,
  //         {
  //           recipient: { id: psid },
  //           message: { text: message },
  //         },
  //         { headers }
  //       );

  //       // Clear the textarea and close reply field
  //       setReplyText((prev) => {
  //         const newState = { ...prev };
  //         delete newState[messageId];
  //         return newState;
  //       });
  //       setReplyingTo(null);
  //       toast.success("Reply sent successfully!");
  //     } catch (error) {
  //       console.error("Error sending reply:", error);
  //       const errorMessage =
  //         axios.isAxiosError(error) && error.response?.data?.message
  //           ? error.response.data.message
  //           : "Failed to send reply. Please try again.";
  //       toast.error(errorMessage);
  //     } finally {
  //       setSending((prev) => ({ ...prev, [messageId]: false }));
  //     }
  //   },
  //   [replyText]
  // );

  // const handleKeyPress = useCallback(
  //   (
  //     e: React.KeyboardEvent<HTMLTextAreaElement>,
  //     messageId: string,
  //     psid: string
  //   ) => {
  //     if (e.key === "Enter" && !e.shiftKey) {
  //       e.preventDefault();
  //       handleSendReply(messageId, psid);
  //     }
  //   },
  //   [handleSendReply]
  // );

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-gray-900/98 backdrop-blur-md border-b border-gray-700/50 shadow-lg sm:px-6 py-5">
        <div className="max-w-5xl">
          <div className="flex items-center justify-between flex-wrap ">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                <SiInstagram className="text-2xl text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl sm:text-2xl text-white">
                  Instagram Messages
                </h2>
                <p className="text-xs text-gray-400">
                  Direct messages from Instagram
                </p>
              </div>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full backdrop-blur-sm">
              <span className="text-sm text-purple-300 font-semibold">
                {messageCount} {messageCount === 1 ? "Message" : "Messages"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="max-w-5xl  sm:px-6 py-6">
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800/50 mb-6">
                  <MessageCircle className="h-10 w-10 opacity-50" />
                </div>
                <p className="text-lg font-medium mb-2">No messages yet</p>
                <p className="text-sm text-gray-500">
                  New Instagram messages will appear here
                </p>
              </div>
            ) : (
              notifications.map((msg) => {
                // Use unique message ID instead of index for React keys
                const messageId =
                  msg.mid || `${msg.from_psid}-${msg.timestamp}`;
                return (
                  <div
                    key={messageId}
                    className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 hover:border-gray-600/50 hover:bg-gray-800/60 transition-all duration-300 shadow-xl hover:shadow-2xl"
                  >
                    <div className="flex gap-4">
                      {/* Left side - Profile Image */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg ring-2 ring-purple-500/30">
                            {(msg.from_username || "U").charAt(0).toUpperCase()}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900"></div>
                        </div>
                      </div>

                      {/* Right side - Content */}
                      <div className="flex-1 min-w-0">
                        {/* Username and Actions Row */}
                        <div className="flex items-start justify-between mb-3 gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white text-lg sm:text-xl mb-1">
                              {msg.from_username || "Unknown User"}
                            </h3>
                            <p className="text-xs text-gray-400 font-mono">
                              ID: {msg.from_psid}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {/* <button
                              onClick={() => toggleReply(messageId)}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                                replyingTo === messageId
                                  ? "bg-purple-500/30 border border-purple-500/50"
                                  : "bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50"
                              }`}
                              title={
                                replyingTo === messageId
                                  ? "Cancel Reply"
                                  : "Reply"
                              }
                            >
                              {replyingTo === messageId ? (
                                <>
                                  <X className="h-4 w-4 text-purple-300" />
                                  <span className="text-xs text-purple-300 hidden sm:inline">
                                    Cancel
                                  </span>
                                </>
                              ) : (
                                <>
                                  <MessageCircle className="h-4 w-4 text-gray-300" />
                                  <span className="text-xs text-gray-300 hidden sm:inline">
                                    Reply
                                  </span>
                                </>
                              )}
                            </button> */}
                            <button
                              onClick={() =>
                                handleMessageClick(msg.from_username)
                              }
                              className="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg transition-colors"
                              title="Open on Instagram"
                            >
                              <SiInstagram className="h-4 w-4 text-blue-400" />
                            </button>
                          </div>
                        </div>

                        {/* Message Content */}
                        {/* Text Message */}
                        {msg.text && (
                          <div className="bg-gradient-to-br from-gray-700/40 to-gray-800/40 rounded-xl p-4 mb-3 border border-gray-600/30 shadow-inner">
                            <p className="text-gray-100 text-sm sm:text-base leading-relaxed break-words">
                              {msg.text}
                            </p>
                          </div>
                        )}

                        {/* Attachments (Images, Videos, etc.) */}
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="space-y-3 mb-3">
                            {msg.attachments.map(
                              (attachment: Attachment, idx: number) => (
                                <div
                                  key={idx}
                                  className="rounded-xl overflow-hidden border border-gray-600/30"
                                >
                                  {attachment.type === "image" && (
                                    <div className="bg-gray-700/20 p-2">
                                      <Image
                                        src={attachment.payload.url}
                                        alt="Instagram Image"
                                        width={500}
                                        height={400}
                                        className="w-full h-auto rounded-lg object-cover"
                                        unoptimized
                                      />
                                    </div>
                                  )}

                                  {attachment.type === "video" && (
                                    <div className="bg-gray-700/20 p-2">
                                      <video
                                        src={attachment.payload.url}
                                        className="w-full h-auto rounded-lg"
                                        controls
                                      />
                                    </div>
                                  )}

                                  {attachment.type === "audio" && (
                                    <div className="bg-gray-700/20 p-4 rounded-lg">
                                      <audio
                                        src={attachment.payload.url}
                                        controls
                                        className="w-full"
                                      />
                                    </div>
                                  )}

                                  {attachment.type === "file" && (
                                    <div className="bg-gray-700/20 p-4 rounded-lg">
                                      <a
                                        href={attachment.payload.url}
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-2 transition-colors"
                                      >
                                        <Paperclip className="h-4 w-4" />
                                        Download File
                                      </a>
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        )}

                        {/* Reply Input Section */}
                        {/* {replyingTo === messageId && (
                          <div className="mt-4 p-4 bg-gray-700/30 rounded-xl border border-purple-500/30 backdrop-blur-sm">
                            <div className="flex items-start gap-3">
                              <div className="flex-1">
                                <textarea
                                  value={replyText[messageId] || ""}
                                  onChange={(e) =>
                                    setReplyText((prev) => ({
                                      ...prev,
                                      [messageId]: e.target.value,
                                    }))
                                  }
                                  onKeyDown={(e) =>
                                    handleKeyPress(e, messageId, msg.from_psid)
                                  }
                                  placeholder="Type your reply..."
                                  className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 resize-none"
                                  rows={3}
                                  disabled={sending[messageId]}
                                />
                              </div>
                              <button
                                onClick={() =>
                                  handleSendReply(messageId, msg.from_psid)
                                }
                                disabled={
                                  sending[messageId] ||
                                  !replyText[messageId]?.trim()
                                }
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50 flex-shrink-0"
                              >
                                {sending[messageId] ? (
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <>
                                    <Send className="h-4 w-4" />
                                    <span className="hidden sm:inline text-sm font-medium">
                                      Send
                                    </span>
                                  </>
                                )}
                              </button>
                            </div>
                            <p className="text-xs text-gray-400 mt-2 ml-1">
                              Press Enter to send, Shift+Enter for new line
                            </p>
                          </div>
                        )} */}

                        {/* Date and Time */}
                        {/* <div className="flex items-center gap-2 text-xs text-gray-500 mt-3 pt-3 border-t border-gray-700/50">
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>
                          {new Date(msg.timestamp * 1000).toLocaleString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div> */}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
