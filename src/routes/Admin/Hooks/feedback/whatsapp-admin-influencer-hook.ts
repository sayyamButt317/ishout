import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  WhatsAppAdminInfluencerMessagesApi,
  WhatsAppAdminSendHumanMessageApi,
} from "../../API/admin.routes";

export default function useAdminInfluencerMessagesHook(
  thread_id: string,
  page: number = 1,
  page_size: number = 20
) {
  const queryClient = useQueryClient();

  // Fetch messages
  const messagesQuery = useQuery({
    queryKey: ["admin-influencer-messages", thread_id],
    queryFn: () =>
      WhatsAppAdminInfluencerMessagesApi(thread_id, { page, page_size }),
    enabled: !!thread_id,
    refetchOnWindowFocus: false,
  });

  // Send message and refresh messages for this thread
  const sendMessage = async (message: string) => {
    if (!thread_id || !message) return;

    await WhatsAppAdminSendHumanMessageApi(thread_id, message);

    // Invalidate only by thread_id to refetch messages
    queryClient.invalidateQueries({
      queryKey: ["admin-influencer-messages", thread_id],
    });
  };

  return {
    ...messagesQuery,
    sendMessage,
  };
}