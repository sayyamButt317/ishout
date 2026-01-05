import { useMutation } from "@tanstack/react-query";
import { SendWhatsappMessageApi } from "../API/admin.routes";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function SendWhatsappMessageHook(thread_id: string) {
    return useMutation({
        mutationFn: (message: string) => SendWhatsappMessageApi(thread_id, message),
        onSuccess: () => {
            toast.success('Message sent successfully');
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to send message', {
                description: axiosError.response?.data?.detail as string
            });
        },
    });
}