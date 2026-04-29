import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { ExtractDemoGraphics } from "../../API/admin.routes";
import { AxiosError } from 'axios';
import useReportStore from "@/src/store/Feedback/report-store";


export default function ExtractPostDemoGraphicsHook() {
    const { setReport, setLoading } = useReportStore();

    return useMutation({
        mutationFn: ({ username, url }: { username: string; url: string }) =>
            ExtractDemoGraphics(username, url),
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: (data) => {
            setReport(data);
            toast.success("Extracted successfully");
        },
        onError: (error) => {
            setLoading(false);
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to send Revision messages', {
                description: axiosError.response?.data?.detail,
            });
        },
    });
}