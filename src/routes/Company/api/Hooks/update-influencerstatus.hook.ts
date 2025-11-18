import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CompanyUpdateInfluencerStatusApi } from "../company.routes";
import { UpdateInfluencerStatusRequestProps, UpdateInfluencerStatusResponseProps } from "@/src/types/Admin-Type/Campaign.type";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function UpdateInfluencerStatusCompanyHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (influencerRequest: UpdateInfluencerStatusRequestProps) => CompanyUpdateInfluencerStatusApi(influencerRequest),
        onSuccess: async (data: UpdateInfluencerStatusResponseProps) => {
            toast.success(data.message);
            await queryClient.invalidateQueries({ queryKey: ['approved-campaign'] });
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to update influencer status', {
                description: axiosError.response?.data?.detail as string
            });
        },
    });
}