import { AdminPendingCampaignApi } from "../API/admin.routes";
import { useQuery } from "@tanstack/react-query";

export function usePendingCampaigns() {
    return useQuery({
        queryKey: ['pending-campaign'],
        queryFn: () => AdminPendingCampaignApi(),
        // refetchOnWindowFocus: false,
        // refetchOnReconnect: false,
        // staleTime: 1000 * 60 * 5,
        // gcTime: 1000 * 60 * 60,
    });
}