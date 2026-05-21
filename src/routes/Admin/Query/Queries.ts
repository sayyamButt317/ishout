import { useQuery } from "@tanstack/react-query";
import { ExtractInsightsApi, PostingDetailsApi } from "../API/admin.routes";


export function PostingDetailsHook() {
    return useQuery({
        queryKey: ['posting-details'],
        queryFn: () => PostingDetailsApi(),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}

export function ExtractInsightsHook(
    campaign_id: string,
    influencer_id: string,
    enabled = true,
) {
    return useQuery({
        queryKey: ['extract-insights', campaign_id, influencer_id],
        queryFn: () => ExtractInsightsApi(campaign_id, influencer_id),
        enabled: enabled && !!campaign_id && !!influencer_id,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}