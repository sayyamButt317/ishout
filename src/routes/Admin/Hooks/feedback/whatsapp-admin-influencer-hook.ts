import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  WhatsAppAdminInfluencerMessagesApi,
} from "../../API/admin.routes";

export default function useAdminInfluencerMessagesHook(
  thread_id: string,
  page: number = 1,
  page_size: number = 20,
  enabled: boolean = true,
) {
  const queryClient = useQueryClient();

  const messagesQuery = useQuery({
    queryKey: ["admin-influencer-messages", thread_id, page, page_size],
    queryFn: () =>
      WhatsAppAdminInfluencerMessagesApi(thread_id, { page, page_size }),
    enabled: enabled && !!thread_id,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev, // ✅ for pagination (v5)
  });

  const refetchMessages = () => {
    queryClient.invalidateQueries({
      queryKey: ["admin-influencer-messages", thread_id],
    });
  };

  return {
    ...messagesQuery,
    refetchMessages,
  };
}