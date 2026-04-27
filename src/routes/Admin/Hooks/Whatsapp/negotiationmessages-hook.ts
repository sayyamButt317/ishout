import { useQuery } from "@tanstack/react-query";
import { NegotiationChatDetailApi } from "../../API/admin.routes";

export default function useNegotiationMessagesHook(_id: string) {
    return useQuery({
        queryKey: ["negotiation-chat-detail", _id],
        queryFn: () => NegotiationChatDetailApi(_id),
        enabled: !!_id,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}

