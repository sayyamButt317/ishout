import { useQuery } from "@tanstack/react-query";
import { GetCampaignBriefResponse } from "@/src/types/Compnay/campaign-brief.types";
import { getCampaignBrief } from "../company.routes";

export default function CampaignBriefHook(user_id: string) {
  return useQuery<GetCampaignBriefResponse>({
    queryKey: ["campaign-brief", user_id],
    queryFn: () => getCampaignBrief(user_id),
    enabled: !!user_id,
    staleTime: 1000 * 60 * 5,
  });
}