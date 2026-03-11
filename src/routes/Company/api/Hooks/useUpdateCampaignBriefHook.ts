import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdateCampaignBriefPayload, UpdateCampaignBrief } from "@/src/types/Compnay/campaignbrieftype";
import { UpdateCampaignBriefApi } from "../company.routes";

export default function useUpdateCampaignBrief() {
  return useMutation({
    mutationFn: async ({ brief, product_image_urls }: UpdateCampaignBriefPayload) => {
      return await UpdateCampaignBriefApi(brief, product_image_urls);
    },
    onSuccess: () => {
      toast.success("Campaign brief updated successfully");
    },
    onError: () => {
      toast.error("Failed to update campaign brief");
    },
  });
}