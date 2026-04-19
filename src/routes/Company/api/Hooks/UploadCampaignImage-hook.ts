import { CampaignSBriefStore } from "@/src/store/Campaign/brief.store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { UploadImageToCampaign } from "../company.routes";

export default function UploadCampaignImageHook() {
    const { setImageUrls } = CampaignSBriefStore()
    return useMutation({
        mutationFn: ({ brief_id, files }: { brief_id: string, files: File[] }) => UploadImageToCampaign(brief_id, files),
        onSuccess: (data: { urls: string[] }) => {
            setImageUrls(data.urls)
        },
        onError: () => {
            toast.error('Failed to upload image');
        },
    })
}