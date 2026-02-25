import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdateCampaignBrief } from "@/src/types/Compnay/campaignbrieftype";
import { UpdateCampaignBriefApi } from "../company.routes";

export default function useUpdateCampaignBrief() {
  return useMutation({
    mutationFn: async (brief: UpdateCampaignBrief) => {
      return await UpdateCampaignBriefApi(brief);
    },
    onSuccess: () => {
      toast.success("Campaign brief updated successfully");
    },
    onError: () => {
      toast.error("Failed to update campaign brief");
    },
  });
}