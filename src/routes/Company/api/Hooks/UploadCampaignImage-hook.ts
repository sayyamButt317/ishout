import { CampaignSBriefStore } from "@/src/store/Campaign/brief.store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { UploadImageToCampaign } from "../company.routes";
import type { AxiosError } from "axios";

export default function UploadCampaignImageHook() {
    const { imageUrls, setImageUrls } = CampaignSBriefStore()
    return useMutation({
        mutationFn: ({ brief_id, files }: { brief_id: string, files: File[] }) => UploadImageToCampaign(brief_id, files),
        onSuccess: (data: { urls: string[] }) => {
            const merged = [...new Set([...imageUrls, ...data.urls])];
            setImageUrls(merged);
        },
        onError: (error: AxiosError) => {
            const status = error.response?.status;
            if (status === 413) {
                toast.error('File too large for the server limit. Use smaller images.');
            } else {
                toast.error('Failed to upload image');
            }
        },
    })
}