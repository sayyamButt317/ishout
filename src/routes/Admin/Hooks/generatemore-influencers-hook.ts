import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminMoreInfluencerApi } from "../API/admin.routes";
import { AxiosError } from "axios";


export default function GenerateMoreInfluencersHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ campaign_id }: { campaign_id: string }) => AdminMoreInfluencerApi({ campaign_id }),
        onSuccess: async () => {
            toast.success('More influencers generated successfully', {
                description: 'You will be notified when the influencers are approved',
            });
            await queryClient.invalidateQueries({ queryKey: ['generated-influencers'] });
            await queryClient.invalidateQueries({ queryKey: ['pending-campaign'] });
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to generate influencers', {
                description: axiosError.response?.data?.detail || 'An error occurred during influencer generation.',
            });
        },
    })
}