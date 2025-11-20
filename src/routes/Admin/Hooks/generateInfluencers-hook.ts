import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminGenerateInfluencersApi } from "../API/admin.routes";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/campaign.store";

export default function AdminGenerateInfluencersHook() {
    const queryClient = useQueryClient();
    const { setResults } = useReadyMadeTemplateStore();
    return useMutation({
        mutationFn: ({ campaign_id, limit }: { campaign_id: string; limit: number }) => AdminGenerateInfluencersApi(campaign_id, limit),
        onSuccess: async (data) => {
            setResults(data);
            await queryClient.invalidateQueries({ queryKey: ['pending-campaign'] });
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to find more influencers', {
                description:
                    axiosError.response?.data?.detail || 'An error occurred during influencer finding.',
            });
        },
    })
}