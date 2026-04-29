import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { ExtractDemoGraphics } from "../../API/admin.routes";
import { AxiosError } from 'axios';

export default function ExtractPostDemoGraphicsHook() {
    return useMutation({
        mutationFn: ({ campaign_id, username, url }: { campaign_id: string, username: string; url: string }) =>
            ExtractDemoGraphics(campaign_id, username, url),
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to send Revision messages', {
                description: axiosError.response?.data?.detail,
            });
        },
    });
}