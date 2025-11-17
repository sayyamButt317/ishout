import { useQuery } from "@tanstack/react-query";
import { InfluencersCampaignByIdApi } from "../API/admin.routes";


export default function CampaignByIdHook(campaign_id: string) {
    return useQuery({
        queryKey: ['campaign-by-id', campaign_id],
        queryFn: () => (campaign_id ? InfluencersCampaignByIdApi(campaign_id) : Promise.reject(new Error('Campaign ID is required'))),
        enabled: !!campaign_id,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}