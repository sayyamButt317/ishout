import { useQueryClient } from "@tanstack/react-query";
import { WhatsAppCompanyAdminSendHumanMessageApi } from "../../API/admin.routes";


export default function useSendCompanyAdminMessage(User_id: string) {
  const queryClient = useQueryClient();

  const sendMessage = async (message: string) => {
    if (!User_id || !message) return;

    await WhatsAppCompanyAdminSendHumanMessageApi(User_id, message);
    queryClient.invalidateQueries({
      queryKey: ["admin-influencer-messages", User_id],
    });
  };

  return {
    sendMessage,
  };
}