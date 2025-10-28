import { AdminAllCampaignApi } from "../API/admin.routes";
import { useQuery } from "@tanstack/react-query";

export default function AllCampaignHook() {
    return useQuery({
        queryKey: ['all-campaign'],
        queryFn: () => AdminAllCampaignApi(),
    })
}