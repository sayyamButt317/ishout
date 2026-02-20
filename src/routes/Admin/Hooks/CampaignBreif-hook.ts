import { useMutation } from "@tanstack/react-query";
import { AdminCampaignBreifApi } from "../API/admin.routes";
import { toast } from "sonner";

export default function CampaignBreifHook() {
    return useMutation({
        mutationFn: (user_input: string) => AdminCampaignBreifApi(user_input),
        onSuccess: (data) => {
            toast.success('Campaign breif generated successfully');
            return data;
        },
        onError: (error) => {
            toast.error('Failed to generate campaign breif');
            return error;
        },
    })
}