"use client";
import { useNotificationStore } from "@/src/store/Campaign/notification.store";
import React from "react";
import { MessageCircle } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import Image from "next/image";

type Attachment = {
  type: "image" | "video" | "audio" | "file";
  payload: {
    url: string;
  };
};

export default function InstagramNotifications() {
  const { notifications } = useNotificationStore();

  const handleMessageClick = (username: string) => {
    if (username) {
      window.open(`https://ig.me/m/${username}`, "_blank");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
              <SiInstagram className="text-2xl" />
              <span className="italic">Instagram Notifications</span>{" "}
            </h2>
            <div className="px-3 py-1.5 bg-blue-500/20 border border-blue-500 rounded-full">
              <span className="text-xs sm:text-sm text-blue-400 font-medium">
                {notifications.length} Message
                {notifications.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <ul className="space-y-3 sm:space-y-4">
            {notifications.length === 0 ? (
              <li className="text-center py-16 sm:py-24 text-gray-400">
                <MessageCircle className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 opacity-50" />
                <p className="text-sm sm:text-base">No notifications yet</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  New messages will appear here
                </p>
              </li>
            ) : (
              notifications.map((msg, i) => (
                <li
                  key={i}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-3 sm:p-4 hover:border-gray-600 transition-all shadow-lg"
                >
                  <div className="flex gap-3 sm:gap-4">
                    {/* Left side - Profile Image */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                        {(msg.from_username || "U").charAt(0).toUpperCase()}
                      </div>
                    </div>

                    {/* Right side - Content */}
                    <div className="flex-1 min-w-0">
                      {/* Username and Reply Button Row */}
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white text-base sm:text-lg truncate">
                            {msg.from_username || "Unknown User"}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-400 truncate">
                            ID: {msg.from_psid}
                          </p>
                        </div>

                        {/* Message Icon Button */}
                        <button
                          onClick={() => handleMessageClick(msg.from_username)}
                          className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500 rounded-lg transition-colors flex-shrink-0"
                          title="Reply on Instagram"
                        >
                          <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
                          <span className="text-xs sm:text-sm text-blue-400 hidden xs:inline">
                            Reply
                          </span>
                        </button>
                      </div>

                      {/* Message Content */}
                      {/* Text Message */}
                      {msg.text && (
                        <div className="bg-gray-700/30 rounded-lg p-2.5 sm:p-3 mb-2 sm:mb-3 border border-gray-600/50">
                          <p className="text-gray-200 text-xs sm:text-sm leading-relaxed break-words">
                            {msg.text}
                          </p>
                        </div>
                      )}

                      {/* Attachments (Images, Videos, etc.) */}
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="space-y-2">
                          {msg.attachments.map(
                            (attachment: Attachment, idx: number) => (
                              <div key={idx}>
                                {attachment.type === "image" && (
                                  <div className="bg-gray-700/30 rounded-lg p-2.5 sm:p-3 mb-2 sm:mb-3 border border-gray-600/50">
                                    <Image
                                      src={attachment.payload.url}
                                      alt="Instagram Image"
                                      width={400}
                                      height={300}
                                      className="w-full h-auto rounded"
                                      unoptimized
                                    />
                                  </div>
                                )}

                                {attachment.type === "video" && (
                                  <div className="bg-gray-700/30 rounded-lg p-2.5 sm:p-3 mb-2 sm:mb-3 border border-gray-600/50">
                                    <video
                                      src={attachment.payload.url}
                                      className="w-full h-auto rounded"
                                      controls
                                    />
                                  </div>
                                )}

                                {attachment.type === "audio" && (
                                  <div className="bg-gray-700/30 rounded-lg p-2.5 sm:p-3 mb-2 sm:mb-3 border border-gray-600/50">
                                    <audio
                                      src={attachment.payload.url}
                                      controls
                                      className="w-full"
                                    />
                                  </div>
                                )}

                                {attachment.type === "file" && (
                                  <div className="bg-gray-700/30 rounded-lg p-2.5 sm:p-3 mb-2 sm:mb-3 border border-gray-600/50">
                                    <a
                                      href={attachment.payload.url}
                                      download
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm underline flex items-center gap-2"
                                    >
                                      <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                      </svg>
                                      Download File
                                    </a>
                                  </div>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      )}

                      {/* Date and Time */}
                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-gray-500">
                        <svg
                          className="h-3 w-3"
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
                        <span className="truncate">
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
                      </div>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
