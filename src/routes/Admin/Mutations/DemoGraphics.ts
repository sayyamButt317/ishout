import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { DemographicsOcrApi } from "../API/admin.routes";

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