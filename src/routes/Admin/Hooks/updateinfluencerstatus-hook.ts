import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { UpdateInfluencerStatusApi } from '../API/admin.routes';
import { UpdateInfluencerStatusRequestProps } from '@/src/types/Admin-Type/Campaign.type';

export default function UpdateInfluencerStatusHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (influencerRequest: UpdateInfluencerStatusRequestProps) => UpdateInfluencerStatusApi(influencerRequest),
        onSuccess: async () => {
            toast.success('Influencer status updated successfully');
            await queryClient.invalidateQueries({ queryKey: ["pending-campaign"] });
            await queryClient.invalidateQueries({ queryKey: ["generated-influencers"] });
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error("Failed to update influencer status", {
                description: axiosError.response?.data?.detail as string,
            });
        },
    });
}
