import { AxiosError } from "axios";
import { UpdateStatusApi } from "../API/admin.routes";
import { toast } from "sonner";
import { UpdateInfluencerStatusResponseProps } from "@/src/types/Admin-Type/Campaign.type";
import { useMutation } from "@tanstack/react-query";


export default function UpdateStatusHook() {
    return useMutation({
        mutationFn: ({ campaign_id, status }: { campaign_id: string, status: string }) => UpdateStatusApi({ campaign_id, status }),
        onSuccess: async (data: UpdateInfluencerStatusResponseProps) => {
            toast.success(data.message);
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to update campaign status', {
                description: axiosError.response?.data?.detail as string
            });
        }
    })
}