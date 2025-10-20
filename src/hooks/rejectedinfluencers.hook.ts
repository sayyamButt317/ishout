import { AxiosError } from "axios";
import { toast } from "sonner";
import { MoreInfluencerReplacePayload, ReadyMadeInfluencersApiResponse, ReadyMadeInfluencersRequest } from "../types/readymadeinfluencers-type";
import { useMutation } from "@tanstack/react-query";
import { useReadyMadeTemplateStore } from "../store/Campaign/ready-made";
import { MoreInfluencer } from "../routes/api/ai.routes";

export default function MoreInfluencershook() {
    const { results, setResults } = useReadyMadeTemplateStore();
    return useMutation({
        mutationFn: (payload: MoreInfluencerReplacePayload) => MoreInfluencer(payload.request),
        onSuccess: async (data: ReadyMadeInfluencersRequest, variables: MoreInfluencerReplacePayload) => {
            // Replace the rejected influencer with the first returned suggestion
            const replacement = data?.influencers?.[0];
            if (!replacement || !results?.influencers) {
                return;
            }
            const updated = results.influencers.map((infuencer) =>
                infuencer._id === variables.replaceId ? replacement : infuencer
            );

            setResults({
                ...results as ReadyMadeInfluencersApiResponse,
                influencers: updated,
            });
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to find more influencers', {
                description:
                    axiosError.response?.data?.detail || 'An error occurred during influencer finding.',
            });
        },
    });
}