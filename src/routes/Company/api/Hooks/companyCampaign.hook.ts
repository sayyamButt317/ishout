import { useQuery } from "@tanstack/react-query";
import { CompanyCampaign } from "../company.routes";

export default function CompanyCampaignHook(page: number = 1) {
    return useQuery({
        queryKey: ['company-campaign', page],
        queryFn: () => CompanyCampaign(page),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}