import { useQuery } from "@tanstack/react-query";
import { CampaignApprovedInfluencers } from "../company.routes";

export default function ApprovedCampaignHook(user_id: string) {
    return useQuery({
        queryKey: ['approved-campaign', user_id],
        queryFn: () => CampaignApprovedInfluencers(),
        enabled: !!user_id,
        refetchOnWindowFocus: false, // Don't refetch on window focus
        refetchOnReconnect: false,
        refetchOnMount: (query) => !query.getObserversCount(),
    });
}