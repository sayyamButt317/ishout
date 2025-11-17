import { FindInfluencer } from "@/src/routes/Company/api/company.routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { FindInfluencerRequestProps, ReadyMadeInfluencersRequest } from "@/src/types/readymadeinfluencers-type";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/ready-made";


export default function FindInfluencerResponsehook() {
  const queryClient = useQueryClient();
  const { setResults } = useReadyMadeTemplateStore();
  return useMutation({
    mutationFn: (influencerRequest: FindInfluencerRequestProps) => FindInfluencer(influencerRequest),
    onSuccess: async (data: ReadyMadeInfluencersRequest) => {
      queryClient.invalidateQueries({ queryKey: ['all-campaign'] });
      setResults(data);
      toast.success('Influencers generated successfully', {
        description: 'You will be notified when the influencers are approved',
      });
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error('Failed to find influencer', {
        description:
          axiosError.response?.data?.detail || 'An error occurred during influencer finding.',
      });
    },
  });
}
