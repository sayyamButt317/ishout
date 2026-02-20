import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CompanyCampaignBreifApi } from "../company.routes";

export default function CampaignBreifHook() {
    return useMutation({
        mutationFn: (user_input: string) => CompanyCampaignBreifApi(user_input),
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