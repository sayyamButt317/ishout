import { FindInfluencer } from "@/src/routes/Company/api/company.routes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { InfluencerResponseProps, ReadyMadeInfluencersRequest } from "@/src/types/readymadeinfluencers-type";
import { useReadyMadeTemplateStore } from "../../../store/Campaign/ready-made";


export default function FindInfluencerResponsehook() {

  const { setResults, setField } = useReadyMadeTemplateStore();
  return useMutation({
    mutationFn: (influencerRequest: InfluencerResponseProps) => FindInfluencer(influencerRequest),
    onSuccess: async (data: ReadyMadeInfluencersRequest) => {
      setResults(data);
      // setField("campaign_id", data?.campaign?.campaign_id);
      toast.success('Influencers found successfully', {
        description: 'You will be notified when the influencers are approved',
      });
      // router.push("/ready-made/influencers");
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
