import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useReadyMadeTemplateStore } from '../../../store/Campaign/ready-made';
import { ApprovedInfluencersRequest, ApprovedInfluencersResponse, ReadyMadeInfluencersApiResponse } from '../../../types/readymadeinfluencers-type';
import { useRouter } from 'next/navigation';
import { ApprovedInfluencersApi } from '../API/admin.routes';

export default function ApprovedInfluencersHook() {
    const router = useRouter();
    const { setResults, getField } = useReadyMadeTemplateStore();
    const campaignId = getField("campaign_id");

    return useMutation({
        mutationFn: (influencerRequest: ApprovedInfluencersRequest) => ApprovedInfluencersApi(influencerRequest),
        onSuccess: async (data: ApprovedInfluencersResponse) => {
            setResults(data as unknown as ReadyMadeInfluencersApiResponse);
            console.log("Navigation to Route,", `/ready-made/approved-influencers/${campaignId}`);
            if (campaignId) {
                router.push(`/ready-made/approved-influencers/${campaignId}`);
            }
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to get approved influencers', {
                description: axiosError.response?.data?.detail as string
            });
        }
    })
}
