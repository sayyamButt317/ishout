import { useQuery } from "@tanstack/react-query";
import { ApprovedCampaignById } from "../company.routes";

export default function ApprovedCampaignHook(user_id: string) {
    return useQuery({
        queryKey: ['approved-campaign', user_id],
        queryFn: () => ApprovedCampaignById(user_id),
        enabled: !!user_id,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,

    });
}