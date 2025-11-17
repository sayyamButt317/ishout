import { useQuery } from "@tanstack/react-query";
import { CompanyCampaign } from "../company.routes";

export default function CompanyCampaignHook() {
    return useQuery({
        queryKey: ['company-campaign'],
        queryFn: () => CompanyCampaign(),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        refetchOnMount: false,
    });
}