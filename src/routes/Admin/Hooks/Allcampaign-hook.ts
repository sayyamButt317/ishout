import { AdminAllCampaignApi } from "../API/admin.routes";
import { useQuery } from "@tanstack/react-query";

export default function AllCampaignHook(page: number = 1, status?: string) {
    return useQuery({
        queryKey: ['all-campaign', page, status ?? 'all'],
        queryFn: () => AdminAllCampaignApi({ page, status }),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}