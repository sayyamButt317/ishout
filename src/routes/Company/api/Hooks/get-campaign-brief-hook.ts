import { GetCampaignBriefResponse } from "@/src/types/Compnay/campaign-brief.types";
import { getCampaignBrief,deleteCampaignBrief } from "../company.routes";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"

export default function CampaignBriefHook(user_id: string) {
  return useQuery<GetCampaignBriefResponse>({
    queryKey: ["campaign-brief", user_id],
    queryFn: () => getCampaignBrief(user_id),
    enabled: !!user_id,
    staleTime: 1000 * 60 * 5,
  });
}

export function DeleteCampaignBriefHook(user_id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (brief_id: string) => deleteCampaignBrief(brief_id),

    onMutate: () => {
      toast("Deleting campaign brief...", { duration: 2000 });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["campaign-brief", user_id],
      });
      toast.success("Campaign brief deleted successfully");
    },

    onError: (err: unknown) => {
      if (err instanceof Error) {
        toast.error(`Failed to delete campaign brief: ${err.message}`);
      } else {
        toast.error("Failed to delete campaign brief");
      }
      console.error(err);
    },
  });
}