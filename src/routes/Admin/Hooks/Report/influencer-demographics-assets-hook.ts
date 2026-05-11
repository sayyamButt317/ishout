import { useQuery } from '@tanstack/react-query';
import { CampaignInfluencerAnalyticsDemographicsApi } from '../../API/admin.routes';

export default function useInfluencerDemographicsAssets(
  campaign_id?: string,
  instagram_username?: string,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: [
      'campaign-influencer-demographics-assets',
      campaign_id,
      instagram_username,
    ],
    queryFn: () =>
      CampaignInfluencerAnalyticsDemographicsApi(
        campaign_id as string,
        instagram_username as string,
      ),
    enabled: Boolean(campaign_id && instagram_username && enabled),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
