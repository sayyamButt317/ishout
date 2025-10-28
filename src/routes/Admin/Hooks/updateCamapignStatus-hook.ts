import { useMutation } from "@tanstack/react-query";
import { AdminUpdateCampaignStatusApi } from "../API/admin.routes";
import { UpdateCampaignStatusRequestProps } from "@/src/types/Admin-Type/Campaign.type";

export default function UpdateCampaignStatusHook(campaign_id: string) {
    return useMutation({
        mutationFn: (updateCampaignStatusRequest: UpdateCampaignStatusRequestProps) => AdminUpdateCampaignStatusApi(updateCampaignStatusRequest),
    })
}