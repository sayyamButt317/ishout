import { useQueryClient } from "@tanstack/react-query";
import { WhatsAppAdminSendHumanMessageApi } from "../../API/admin.routes";


export default function useSendAdminMessage(thread_id: string) {
  const queryClient = useQueryClient();

  const sendMessage = async (message: string) => {
    if (!thread_id || !message) return;

    await WhatsAppAdminSendHumanMessageApi(thread_id, message);
    queryClient.invalidateQueries({
      queryKey: ["admin-influencer-messages", thread_id],
    });
  };

  return {
    sendMessage,
  };
}