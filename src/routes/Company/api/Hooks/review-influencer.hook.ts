import { useMutation } from "@tanstack/react-query";
import { CompanyUpdateInfluencerStatusApi } from "../company.routes";
import { toast } from "sonner";
import { UpdateInfluencerStatusRequestProps, UpdateInfluencerStatusResponseProps } from "@/src/types/Admin-Type/Campaign.type";
import { AxiosError } from "axios";

export default function InfluencerReviewHook() {
    return useMutation({
        mutationFn: (influencerRequest: UpdateInfluencerStatusRequestProps) => CompanyUpdateInfluencerStatusApi(influencerRequest),
        onSuccess: async (data: UpdateInfluencerStatusResponseProps) => {
            toast.success(data.message);
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to review influencer', {
                description: axiosError.response?.data?.detail as string
            });
        },
    });
}