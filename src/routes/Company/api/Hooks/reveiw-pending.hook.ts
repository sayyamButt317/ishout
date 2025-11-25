import { useQuery } from "@tanstack/react-query";
import { ReviewPendingInfluencers } from "../company.routes";

export default function ApprovedCampaignHook(page: number = 1, campaign_id: string) {
    return useQuery({
        queryKey: ['approved-campaign', page, campaign_id],
        queryFn: () => ReviewPendingInfluencers(campaign_id, page),
        enabled: !!campaign_id,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,

    });
}