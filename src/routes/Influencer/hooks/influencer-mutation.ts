import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { InfluencerPostingDetailsApi } from "../api/influencer.routes";
import { InfluencerPostingDetailsRequest } from "@/src/types/Posting/posting-type";
import usePostingStore from "@/src/store/Report/posting-store";

export function InfluencerPostingDetailsHook() {
    const { reset } = usePostingStore();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: InfluencerPostingDetailsRequest) => InfluencerPostingDetailsApi(payload),
        onSuccess: () => {
            reset();
            queryClient.invalidateQueries({ queryKey: ['influencer-posting-details'] });
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to get influencer posting details', {
                description: axiosError.response?.data?.detail as string
            });
        },

    })
}
