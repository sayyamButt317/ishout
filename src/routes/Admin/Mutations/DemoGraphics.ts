import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { DemographicsOcrApi, ReadyForPostingApi } from "../API/admin.routes";

export default function DemographicsOcrHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (url: string[]) => DemographicsOcrApi(url),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["demographics-ocr"] });
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to demographics ocr', {
                description: axiosError.response?.data?.detail as string
            });
        },
    })
}

export function ReadyForPostingHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (campaign_id: string) => ReadyForPostingApi(campaign_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ready-for-posting"] });
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to ready for posting', {
                description: axiosError.response?.data?.detail as string
            });
        },
    })
}