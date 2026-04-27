import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CompanyCampaignBreifApi } from "../company.routes";

export default function CampaignBreifHook() {
    return useMutation({
        mutationFn: (payload: {
            user_input: string,
            user_id: string
        }) =>
            CompanyCampaignBreifApi(payload),
        onSuccess: () => {
            toast.success("Campaign brief generated successfully");
        },
        onError: () => {
            toast.error("Failed to generate campaign brief");
        },
    });
}