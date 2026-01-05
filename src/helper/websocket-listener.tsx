"use client";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { AdminENDPOINT } from "@/src/routes/Admin/API/endpoint";
import { getAuthTokenProvider } from "@/src/provider/auth-provide";
import { useWhatsAppSessionStore } from "../store/Campaign/whatsappSession.store";
import {
  ChatMessage,
  useWhatsAppChatStore,
} from "../store/Campaign/chat.store";
import { useParams, usePathname, useRouter } from "next/navigation";
import { WhatsAppSession } from "../types/whatsapp-type";

export default function WebSocketListener() {
  const router = useRouter();
  const pathname = usePathname();
  const toastQueueRef = useRef<Record<string, boolean>>({});
  const { Id: currentThreadId } = useParams<{ Id: string }>();
  const addMessage = useWhatsAppChatStore((s) => s.addMessage);
  const updateSession = useWhatsAppSessionStore((s) => s.updateSession);

  const socketRef = useRef<WebSocket | null>(null);
  const hasConnectedOnce = useRef(false);

  useEffect(() => {
    const token = getAuthTokenProvider();
    if (!token) {
      console.warn("❌ WS: No auth token found");
      return;
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    const wsUrl = backendUrl
      .replace("https://", "wss://")
      .replace("http://", "ws://");

    const fullWsUrl = `${wsUrl}${AdminENDPOINT.ADMIN_NOTIFICATION}?token=${token}`;
    console.log("🔌 WS connecting →", fullWsUrl);
    const socket = new WebSocket(fullWsUrl);

    socketRef.current = socket;
    socket.onopen = () => {
      console.log("✅ WS connected");

      if (!hasConnectedOnce.current) {
        toast.success("Live updates connected");
        hasConnectedOnce.current = true;
      }
    };

    socket.onmessage = (event) => {
      console.group("📩 WS message received");
      console.log("Raw event:", event.data);

      try {
        const { type, payload } = JSON.parse(event.data);
        switch (type) {
          case "whatsapp.message": {
            const message: ChatMessage = {
              _id: payload._id,
              thread_id: payload.thread_id,
              sender: payload.sender,
              username: payload.username,
              message: payload.message,
              timestamp: payload.timestamp,
            };

            addMessage(payload.thread_id, message);
            const isInChatPage = pathname?.includes(
              `/Admin/whatsapp-chat/${payload.thread_id}`
            );
            if (!isInChatPage && !toastQueueRef.current[message._id ?? ""]) {
              toastQueueRef.current[message._id ?? ""] = true;
              toast.success(`${message.username}`, {
                description: message.message.slice(0, 80),
                duration: 5000,
                action: {
                  label: "View",
                  onClick: () => {
                    router.push(`/Admin/whatsapp-chat/${payload.thread_id}`);
                  },
                },
              });
              setTimeout(
                () => delete toastQueueRef.current[message._id ?? ""],
                6000
              );
            }
            break;
          }
          case "CONTROL_UPDATE": {
            const session: WhatsAppSession = {
              thread_id: payload.thread_id,
              last_message: payload.last_message,
              last_active: payload.last_active,
            };
            updateSession(payload.thread_id, session);
            toast.info(
              payload.human_takeover
                ? "Human takeover enabled"
                : "AI agent resumed"
            );
            break;
          }
          case "notification": {
            toast(payload.title || "Notification", {
              description: payload.message,
            });
            break;
          }
          default: {
            console.warn("⚠️ Unhandled WS event:", type);
            break;
          }
        }
      } catch (err) {
        console.error("❌ WS parse error", err);
        toast.error("WebSocket message error");
      }
      console.groupEnd();
    };

    socket.onerror = (err) => {
      console.error("❌ WS error", err);
      toast.error("Live updates connection error");
    };
    return () => {
      console.log("🧹 WS cleanup: closing connection");
      socket.close();
    };
  }, [currentThreadId, addMessage, updateSession]);

  return null;
}
