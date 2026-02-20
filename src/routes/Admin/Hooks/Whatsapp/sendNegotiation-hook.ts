import { useMutation } from "@tanstack/react-query";
import { AdminSendNegotiationMessage } from "../../API/admin.routes";
import { toast } from "sonner";
import { AxiosError } from "axios";


export default function SendNegotiationHook() {
    return useMutation({
        mutationFn: (influencer_id: string) => AdminSendNegotiationMessage(influencer_id),
        onSuccess: (data: { message: string }) => {
            toast.success(data.message);
        },
        onError: (error: AxiosError<{ detail: string }>) => {
            toast.error(error.response?.data?.detail as string);
        },
    })
}