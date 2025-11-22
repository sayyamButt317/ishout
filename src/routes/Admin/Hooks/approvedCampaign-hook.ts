import { AdminApprovedCampaignApi } from "../API/admin.routes";
import { useQuery } from "@tanstack/react-query";

export default function ApprovedCampaignHook(page: number = 1) {
    return useQuery({
        queryKey: ['approved-campaign', page],
        queryFn: () => AdminApprovedCampaignApi(page),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}