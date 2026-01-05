import { useQuery } from "@tanstack/react-query";
import { WhatsAppuserSessionApi } from "../API/admin.routes";


export default function WhatsappUserSessionHook(page: number = 1, page_size: number = 10) {
    return useQuery({
        queryKey: ['whatsapp-user-session', page, page_size],
        queryFn: () => WhatsAppuserSessionApi({ page, page_size }),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}