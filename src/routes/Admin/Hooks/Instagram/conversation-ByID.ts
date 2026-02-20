import { useQuery } from "@tanstack/react-query";
import { AdminInstaConversationByIdApi } from "../../API/admin.routes";

export default function InstagramConversationByIdHook(conversationId: string) {
  return useQuery({
    queryKey: ["instagram-conversation-by-id", conversationId],
    queryFn: () => AdminInstaConversationByIdApi(conversationId),
    refetchOnWindowFocus: false,
    enabled: !!conversationId,
  });
}
