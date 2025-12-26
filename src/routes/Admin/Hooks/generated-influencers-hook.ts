import { useQuery } from "@tanstack/react-query";
import { AdminGeneratedInfluencersByIdApi } from "../API/admin.routes";


export default function GeneratedInfluencersByIdHook(campaign_id: string) {
    return useQuery({
        queryKey: ['generated-influencers', campaign_id],
        queryFn: () => AdminGeneratedInfluencersByIdApi(campaign_id),
        enabled: !!campaign_id,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}