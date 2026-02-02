


import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { toast } from "sonner";
import { AdminDeleteWhatsappUserMessagesApi } from "../API/admin.routes";


export default function DeleteWhatsappChatHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (thread_id: string) => AdminDeleteWhatsappUserMessagesApi(thread_id),
        onSuccess: (data: { message: string }) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ['whatsapp-messages'] });
        },
        onError: (error: AxiosError<{ detail: string }>) => {
            toast.error(error.response?.data?.detail as string);
        },
    })
}