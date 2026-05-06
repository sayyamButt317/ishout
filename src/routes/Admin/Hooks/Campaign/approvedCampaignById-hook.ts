import { useQuery } from "@tanstack/react-query";
import { ApprovedCampaignByIdApi } from "../API/admin.routes";


export default function ApprovedCampaignByIdHook(campaign_id: string) {
    return useQuery({
        queryKey: ['approved-campaign-by-id', campaign_id],
        queryFn: () => ApprovedCampaignByIdApi(campaign_id),
        enabled: !!campaign_id,
        // refetchOnMount: (query) => !query.getObserversCount(),
    })
}