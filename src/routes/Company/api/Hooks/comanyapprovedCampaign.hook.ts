import { useQuery } from "@tanstack/react-query";
import { CompanyApprovedCampaign } from "../company.routes";

export default function CompanyApprovedCampaignHook(user_id: string, page: number = 1) {
    return useQuery({
        queryKey: ['company-approved-campaign', user_id, page],
        queryFn: () => CompanyApprovedCampaign(user_id, page),
        enabled: !!user_id,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}