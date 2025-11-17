"use client";
import { useEffect } from "react";
import { toast } from "sonner";
import { AdminENDPOINT } from "@/src/routes/Admin/API/endpoint";
import { getAuthTokenProvider } from "@/src/provider/auth-provide";
import { useNotificationStore } from "@/src/store/Campaign/notification.store";
import {
  Attachment,
  InstagramWebhookData,
  InstagramWebhookEntry,
  InstagramWebhookMessage,
} from "../types/Admin-Type/websocket.type";

type LegacyData = {
  from_psid: string;
  from_username: string;
  text: string;
  timestamp: number;
  attachments: Attachment[];
};
type Notification = {
  type: string;
  from_psid: string;
  from_username: string;
  text: string;
  timestamp: number;
  attachments: Attachment[];
};

export default function WebSocketListener() {
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    const token = getAuthTokenProvider();
    if (!token) return;

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    const wsUrl = backendUrl
      .replace("https://", "wss://")
      .replace("http://", "ws://");

    const fullWsUrl = `${wsUrl}${AdminENDPOINT.ADMIN_INSTAGRAM_NOTIFICATION}?token=${token}`;
    console.log("🔌 Connecting to WebSocket:", fullWsUrl);

    const socket = new WebSocket(fullWsUrl);
    socket.onopen = () => {
      console.log("WebSocket connected successfully");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as InstagramWebhookData;
        if (data.object === "instagram" && data.entry) {
          data.entry.forEach((entry: InstagramWebhookEntry) => {
            entry.messaging?.forEach(
              (messagingEvent: InstagramWebhookMessage) => {
                const message = messagingEvent.message;
                const sender = messagingEvent.sender;
                const timestamp = messagingEvent.timestamp;

                if (message) {
                  const notification = {
                    type: "ig_reply",
                    from_psid: sender.id,
                    from_username:
                      sender.username || `User_${sender.id.slice(-6)}`,
                    text: message.text || "",
                    attachments: (message.attachments || []).map((att) => ({
                      type: att.type as "image" | "video" | "audio" | "file",
                      payload: att.payload,
                    })),
                    timestamp: timestamp,
                    mid: message.mid,
                  };

                  addNotification(notification);

                  let description = "";
                  if (message.text) {
                    description =
                      message.text.substring(0, 50) +
                      (message.text.length > 50 ? "..." : "");
                  } else if (
                    message.attachments &&
                    message.attachments.length > 0
                  ) {
                    const attachmentType = message.attachments[0].type;
                    description = `Sent a ${attachmentType}`;
                  }

                  toast.success(
                    `New message from ${notification.from_username}`,

                    {
                      description: description,
                    }
                  );
                }
              }
            );
          });
        }
        // Legacy format support (if backend sends processed data)
        else if (data.type === "ig_reply" && data.from_username) {
          // Convert legacy attachments format to new format
          const legacyData = data as LegacyData;
          const notification: Notification = {
            type: "ig_reply",
            from_psid: legacyData.from_psid,
            from_username: legacyData.from_username,
            text: legacyData.text || "",
            timestamp: legacyData.timestamp,
            attachments: (legacyData.attachments || []).map(
              (att: Attachment) => ({
                type: att.type as "image" | "video" | "audio" | "file",
                payload: {
                  url: att.url || att.payload?.url || "",
                },
              })
            ),
          };

          addNotification(notification);

          let description = "";
          if (notification.text) {
            description =
              notification.text.substring(0, 50) +
              (notification.text.length > 50 ? "..." : "");
          } else if (
            notification.attachments &&
            notification.attachments.length > 0
          ) {
            const attachmentType = notification.attachments[0].type;
            description = `Sent a ${attachmentType}`;
          }

          toast.success(`New message from ${data.from_username}`, {
            description: description,
          });
        }
      } catch {
        toast.error("Error parsing WebSocket message");
      }
    };

    return () => {
      socket.close();
    };
  }, [addNotification]);

  return null;
}
