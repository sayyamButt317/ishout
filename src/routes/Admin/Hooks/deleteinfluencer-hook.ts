import { toast } from "sonner";
import { DeleteInfluencer } from "../API/admin.routes";
import { useMutation } from "@tanstack/react-query";
import { DeleterInfluenceerequest, ReadyMadeInfluencersApiResponse } from "../../../types/readymadeinfluencers-type";
import { AxiosError } from "axios";
import { useReadyMadeTemplateStore } from "../../../store/Campaign/campaign.store";

interface DeleteInfluencerContext {
    previousResults: ReadyMadeInfluencersApiResponse[] | undefined;
}

export default function DeleteInfluencerhook() {
    const { results, setResults } = useReadyMadeTemplateStore();

    return useMutation<
        unknown,
        AxiosError<{ detail: string }>,
        DeleterInfluenceerequest,
        DeleteInfluencerContext
    >({
        mutationFn: (deleteInfluencerRequest: DeleterInfluenceerequest) => DeleteInfluencer(deleteInfluencerRequest),
        onMutate: async (): Promise<DeleteInfluencerContext> => {
            const previousResults = results;
            return { previousResults };
        },
        onSuccess: async (_, deleteInfluencerRequest) => {
            if (results && results.length > 0) {
                const updatedResults = results.map((responseObj: ReadyMadeInfluencersApiResponse) => ({
                    ...responseObj,
                    id: responseObj.id !== deleteInfluencerRequest.influencer_id
                }));
                setResults(updatedResults as unknown as ReadyMadeInfluencersApiResponse[]);
                toast.success('Influencer deleted successfully');
            }
        },
        onError: (error: AxiosError<{ detail: string }>, _, context) => {
            if (context?.previousResults) {
                setResults(context.previousResults);
            }
            toast.error('Failed to delete influencer', {
                description: error.response?.data?.detail as string
            });
        }
    });
}