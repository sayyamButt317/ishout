import { useQuery } from "@tanstack/react-query";
import { WhatsAppUserMessagesApi } from "../API/admin.routes";

export default function useWhatsAppMessagesHook(
    thread_id: string,
    page: number = 1,
    page_size: number = 50
) {
    return useQuery({
        queryKey: ["whatsapp-messages", thread_id, page, page_size],
        queryFn: () => WhatsAppUserMessagesApi(thread_id, { page, page_size }),
        enabled: !!thread_id,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}
