import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminUpdateCampaignStatusApi } from "../API/admin.routes";
import { UpdateCampaignStatusRequestProps } from "@/src/types/Admin-Type/Campaign.type";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function UpdateCampaignStatusHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updateCampaignStatusRequest: UpdateCampaignStatusRequestProps) => AdminUpdateCampaignStatusApi(updateCampaignStatusRequest),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pending-campaigns"] });
            queryClient.invalidateQueries({ queryKey: ["campaigns"] });
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to update campaign status', {
                description: axiosError.response?.data?.detail as string
            });
        },
    })
}