import { AxiosError } from "axios";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminRejectandRegenerateInfluencerApi } from "../API/admin.routes";
import { RejectandRegenerateInfluencerRequest } from "@/src/types/Admin-Type/reject-influencers.type";

export default function RejectedandRegenerateInfluencershook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: RejectandRegenerateInfluencerRequest) => AdminRejectandRegenerateInfluencerApi(payload),
        onSuccess: async (data: { message: string }) => {
            toast.success(data.message);
            await queryClient.invalidateQueries({ queryKey: ['campaign-influencers'] });
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to find more influencers', {
                description:
                    axiosError.response?.data?.detail || 'An error occurred during influencer finding.',
            });
        },
    });
}