
import { FindInfluencer } from "@/src/routes/api/ai.routes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { InfluencerResponseProps, ReadyMadeInfluencersRequest } from "@/src/types/readymadeinfluencers-type";
import { useReadyMadeTemplateStore } from "../store/Campaign/ready-made";
import { useRouter } from "next/navigation";

export default function FindInfluencerResponsehook() {
  const router = useRouter();
  const { setResults } = useReadyMadeTemplateStore();

  return useMutation({
    mutationFn: (influencerRequest: InfluencerResponseProps) => FindInfluencer(influencerRequest),
    onSuccess: async (data: ReadyMadeInfluencersRequest) => {
      setResults(data);
      router.push("/ready-made/influencers");
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
