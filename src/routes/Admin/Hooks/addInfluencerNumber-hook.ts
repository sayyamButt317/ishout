import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminAddInfluencersNumberApi } from "../API/admin.routes";
import { AddInfluencersNumberRequest } from "@/src/types/Admin-Type/review-influencer";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function AddInfluencerNumberHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (addInfluencersNumberRequest: AddInfluencersNumberRequest) => AdminAddInfluencersNumberApi(addInfluencersNumberRequest),
        onSuccess: async (data: { message: string }) => {
            toast.success(data.message);
            await queryClient.invalidateQueries({ queryKey: ['campaign-influencers'] });
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to add influencer number', {
                description: axiosError.response?.data?.detail || 'An error occurred during influencer number addition.',
            });
        },
    })
}