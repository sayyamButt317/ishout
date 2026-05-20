import { useQuery } from '@tanstack/react-query';
import { ExtractAllInfluencerDemoGraphics } from '../../API/admin.routes';
import type { CampaignInfluencerReportResponse } from '@/src/types/Admin-Type/Reports-tyes';

export default function CampaignAllInfluencerHook(campaign_id: string) {
  return useQuery<CampaignInfluencerReportResponse>({
    queryKey: ['all-influencers', campaign_id],
    queryFn: () => ExtractAllInfluencerDemoGraphics(campaign_id),
    enabled: !!campaign_id,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
