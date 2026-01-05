import { useQuery } from "@tanstack/react-query";
import { WhatsAppUserMessagesApi } from "../API/admin.routes";

export default function WhatsAppMessagesHook(thread_id: string, page: number = 1, page_size: number = 10) {
    return useQuery({
        queryKey: ['whatsapp-messages', thread_id, page, page_size],
        queryFn: () => WhatsAppUserMessagesApi(thread_id, { page, page_size }),
        enabled: !!thread_id,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}