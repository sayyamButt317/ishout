import { useQuery } from "@tanstack/react-query";
import { InfluencersListApi } from "../API/admin.routes";

export default function InfluencersListHook(campaign_id: string) {
    return useQuery({
        queryKey: ['influencers-list', campaign_id],
        queryFn: () => (campaign_id ? InfluencersListApi(campaign_id) : Promise.reject(new Error('Campaign ID is required'))),
        enabled: !!campaign_id,
    })
}