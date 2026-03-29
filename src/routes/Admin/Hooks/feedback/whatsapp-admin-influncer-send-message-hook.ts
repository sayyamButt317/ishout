import { useQueryClient } from "@tanstack/react-query";
import { WhatsAppAdminInfuencerSendHumanMessageApi } from "../../API/admin.routes";

/**
 * Hook to send a human message to a specific thread and refresh messages
 * @param thread_id - The thread to send the message to
 */
export default function useSendAdminMessage(thread_id: string) {
  const queryClient = useQueryClient();

  const sendMessage = async (message: string) => {
    if (!thread_id || !message) return;

    await WhatsAppAdminInfuencerSendHumanMessageApi(thread_id, message);

    queryClient.invalidateQueries({
      queryKey: ["admin-influencer-messages", thread_id],
    });
  };

  return {
    sendMessage,
  };
}