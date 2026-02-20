import { useQuery } from "@tanstack/react-query";
import { NegotiationStatsApi } from "../../API/admin.routes";

export default function NegotiationStatsHook(page: number = 1, page_size: number = 10) {
    return useQuery({
        queryKey: ['negotiation-stats'],
        queryFn: () => NegotiationStatsApi(page, page_size),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}