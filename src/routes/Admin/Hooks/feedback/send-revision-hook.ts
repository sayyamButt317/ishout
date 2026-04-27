import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { SendRevisionMessage } from '../../API/admin.routes';
import { SendRevisionPayload } from '@/src/types/Admin-Type/Feedback/revision-type';

export default function SendRevisionHook() {
    return useMutation({
        mutationFn: (data: SendRevisionPayload) => SendRevisionMessage(data),
        onSuccess: (data: { message: string }) => {
            toast.success(data.message);
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to send Revision messages', {
                description: axiosError.response?.data?.detail,
            });
        },
    });
}
