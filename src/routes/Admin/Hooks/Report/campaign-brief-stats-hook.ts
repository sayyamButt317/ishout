import { useMutation } from '@tanstack/react-query';
import { CampaignBriefAndInfluencerStatsApi } from '../../API/admin.routes';

export default function useCampaignBriefStats() {
  return useMutation({
    mutationFn: (campaign_id: string) => CampaignBriefAndInfluencerStatsApi(campaign_id),
  });
}
