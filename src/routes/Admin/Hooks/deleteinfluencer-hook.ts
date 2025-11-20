import { toast } from "sonner";
import { DeleteInfluencer } from "../API/admin.routes";
import { useMutation } from "@tanstack/react-query";
import { DeleterInfluenceerequest, ReadyMadeInfluencerResponse, ReadyMadeInfluencersApiResponse } from "../../../types/readymadeinfluencers-type";
import { AxiosError } from "axios";
import { useReadyMadeTemplateStore } from "../../../store/Campaign/campaign.store";


export default function DeleteInfluencerhook() {
    const { results, setResults } = useReadyMadeTemplateStore();

    return useMutation({
        mutationFn: (deleteInfluencerRequest: DeleterInfluenceerequest) => DeleteInfluencer(deleteInfluencerRequest),
        onMutate: async (deleteInfluencerRequest: DeleterInfluenceerequest): Promise<{ previousResults: ReadyMadeInfluencersApiResponse | undefined }> => {
            // Store the previous state for rollback
            const previousResults = results;

            //  update the UI by removing the influencer from the store
            if (results?.influencers) {
                const updatedInfluencers = results.influencers.filter(
                    (influencer: ReadyMadeInfluencerResponse) => influencer._id !== deleteInfluencerRequest.influencer_id
                );

                setResults({
                    ...results,
                    influencers: updatedInfluencers,
                    notes: {
                        ...(results as ReadyMadeInfluencersApiResponse).notes,
                        returned: updatedInfluencers.length
                    }
                });
            }

            return { previousResults: previousResults as ReadyMadeInfluencersApiResponse };
        },
        onSuccess: async () => {
            toast.success('Influencer deleted successfully');
        },
        onError: (error: AxiosError<{ detail: string }>, variables: DeleterInfluenceerequest, context: { previousResults: ReadyMadeInfluencersApiResponse | undefined } | undefined) => {
            // Revert the optimistic update to the previous state
            if (context?.previousResults) {
                setResults(context.previousResults);
            }
            toast.error('Failed to delete influencer', {
                description: error.response?.data?.detail as string
            });
        }
    });
}