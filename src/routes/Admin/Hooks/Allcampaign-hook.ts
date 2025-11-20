import { AdminAllCampaignApi } from "../API/admin.routes";
import { useQuery } from "@tanstack/react-query";

export default function AllCampaignHook(page: number = 1, status?: string) {
    return useQuery({
        queryKey: ['all-campaign', page, status ?? 'all'],
        queryFn: () => AdminAllCampaignApi({ page, status }),
        refetchOnWindowFocus: false, // Don't refetch on window focus
        refetchOnReconnect: false,    // Don't refetch on reconnect
        // staleTime: 1000 * 60 * 2, // Data considered fresh for 2 minutes
        // gcTime: 1000 * 60 * 60, // Keep inactive data in cache for 1 hour
        refetchOnMount: (query) => !query.getObserversCount(),
    })
}