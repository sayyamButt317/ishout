import { useQuery } from "@tanstack/react-query";
import { CampaignBriefItem } from "@/src/types/Compnay/campaign-brief.types";
import { getCampaignBriefDetail } from "../company.routes";

export default function CampaignBriefDetailHook(brief_id: string) {
  return useQuery<CampaignBriefItem>({
    queryKey: ["campaign-brief-detail", brief_id],
    queryFn: () => getCampaignBriefDetail(brief_id),
    enabled: !!brief_id,
    staleTime: 1000 * 60 * 5,
  });
}

