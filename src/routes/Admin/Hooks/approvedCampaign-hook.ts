import { AdminApprovedCampaignApi } from "../API/admin.routes";
import { useQuery } from "@tanstack/react-query";

export default function ApprovedCampaignHook() {
    return useQuery({
        queryKey: ['approved-campaign'],
        queryFn: () => AdminApprovedCampaignApi(),
        refetchOnWindowFocus: false, // Don't refetch on window focus
        refetchOnReconnect: false,    // Don't refetch on reconnect
        staleTime: 1000 * 60 * 5, // Data considered fresh for 5 minutes
        gcTime: 1000 * 60 * 60, // Keep inactive data in cache for 1 hour

    })
}