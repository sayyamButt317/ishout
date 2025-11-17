import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { toast } from "sonner";
import { DeleteCampaignApi } from "../API/admin.routes";
import { AdminAllCampaignApiResponse } from "@/src/types/Admin-Type/Campaign.type";


export default function DeleteCampaignHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (campaign_id: string) => DeleteCampaignApi(campaign_id),
        onSuccess: (_, campaign_id) => {
            queryClient.setQueryData(['all-campaign'], (oldData: { campaigns: AdminAllCampaignApiResponse[] }) => {
                if (!oldData) return { campaigns: [] };
                return { campaigns: oldData.campaigns.filter((campaign: AdminAllCampaignApiResponse) => campaign._id !== campaign_id) };
            });
            queryClient.invalidateQueries({ queryKey: ['all-campaign'] });
            toast.success('Campaign deleted successfully');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            console.error('Error deleting campaign', error);
            toast.error('Failed to delete campaign', {
                description: error.response?.data?.message,
            });
        },
    });
}