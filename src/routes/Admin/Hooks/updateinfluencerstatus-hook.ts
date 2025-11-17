import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { UpdateInfluencerStatusApi } from '../API/admin.routes';
import { UpdateInfluencerStatusRequestProps, UpdateInfluencerStatusResponseProps } from '@/src/types/Admin-Type/Campaign.type';

export default function UpdateInfluencerStatusHook() {
    return useMutation({
        mutationFn: (influencerRequest: UpdateInfluencerStatusRequestProps) => UpdateInfluencerStatusApi(influencerRequest),
        onSuccess: async (data: UpdateInfluencerStatusResponseProps) => {
            toast.success(data.message);
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to update influencer status', {
                description: axiosError.response?.data?.detail as string
            });
        }
    })
}
