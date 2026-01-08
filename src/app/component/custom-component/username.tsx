import { InstagramMessage } from "@/src/types/meta.type";

export function getOtherUsername(
  messages: InstagramMessage[] | undefined,
  businessUsername: string
): string {
  if (!messages || messages.length === 0) return "Unknown user";

  for (const msg of messages) {
    if (msg.from?.username === businessUsername) {
      return msg.to?.data?.[0]?.username ?? "Unknown user";
    }
    if (msg.to?.data?.[0]?.username === businessUsername) {
      return msg.from?.username ?? "Unknown user";
    }
  }

  return "Unknown user";
}

export function getOtherPSID(
  messages: InstagramMessage[] | undefined,
  businessUsername: string
): string {
  if (!messages || messages.length === 0) return "";

  for (const msg of messages) {
    if (msg.from?.username === businessUsername) {
      return msg.to?.data?.[0]?.id ?? "Unknown user";
    }
    if (msg.to?.data?.[0]?.username === businessUsername) {
      return msg.from?.id ?? "";
    }
  }
  return "";
}
