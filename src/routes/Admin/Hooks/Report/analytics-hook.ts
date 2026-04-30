import { useQuery } from "@tanstack/react-query";
import { CampaignAnalytics } from "../../API/admin.routes";

export default function useCampaignAnalytics(campaign_id?: string) {
    return useQuery({
        queryKey: ["campaign-analytics", campaign_id],
        queryFn: () => CampaignAnalytics(campaign_id as string),
        enabled: !!campaign_id,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}