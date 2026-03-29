import { useQueryClient } from "@tanstack/react-query";
import { WhatsAppAdminCompanySendHumanMessageApi } from "../../API/admin.routes";

/**
 * Hook to send a human message to COMPANY chat thread
 * @param thread_id - The thread to send the message to
 */
export default function useSendAdminCompanyMessage(thread_id: string) {
  const queryClient = useQueryClient();

  const sendMessage = async (message: string) => {
    if (!thread_id || !message) return;

    await WhatsAppAdminCompanySendHumanMessageApi(thread_id, message);

    queryClient.invalidateQueries({
      queryKey: ["admin-company-messages", thread_id],
    });
  };

  return {
    sendMessage,
  };
}