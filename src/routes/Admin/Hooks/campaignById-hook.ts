import { useQuery } from "@tanstack/react-query";
import { AdminCampaignByIdApi } from "../API/admin.routes";


export default function CampaignByIdHook(campaign_id: string) {
    return useQuery({
        queryKey: ['campaign-by-id', campaign_id],
        queryFn: () => AdminCampaignByIdApi(campaign_id),
        enabled: !!campaign_id,
    })
}