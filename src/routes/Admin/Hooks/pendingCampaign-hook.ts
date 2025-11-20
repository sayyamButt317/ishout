import { AdminPendingCampaignApi } from "../API/admin.routes";
import { useQuery } from "@tanstack/react-query";

export function usePendingCampaigns(page: number = 1) {
    return useQuery({
        queryKey: ['pending-campaign', page],
        queryFn: () => AdminPendingCampaignApi(page),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        // staleTime: 1000 * 60 * 5,
        // gcTime: 1000 * 60 * 60,
        refetchOnMount: (query) => !query.getObserversCount(),
    });
}