import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { HumanTakeoverApi } from "../API/admin.routes";
import { AxiosError } from "axios";

export default function HumanTakeoverHook(thread_id: string) {
    return useMutation({
        mutationFn: (enabled: boolean) =>
            HumanTakeoverApi(thread_id, enabled),

        onSuccess: (data: { message: string }) => {
            toast.success(data.message);
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error("Failed to toggle agent", {
                description: axiosError.response?.data?.detail,
            });
        },
    });
}

