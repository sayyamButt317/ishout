
import { useQuery } from "@tanstack/react-query";
import { AdminAllCampaignApi } from "../../API/admin.routes";

export default function AllCampaignHook(page: number = 1, status?: string) {
    return useQuery({
        queryKey: ['all-campaign', page, status ?? 'all'],
        queryFn: () => AdminAllCampaignApi({ page, status }),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}