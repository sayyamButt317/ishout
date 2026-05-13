import { useQuery } from '@tanstack/react-query';
import { OverallCampaignOutcomesApi } from '../../API/admin.routes';

export default function useOverallCampaignOutcomes(campaign_id?: string) {
  return useQuery({
    queryKey: ['overall-campaign-outcomes', campaign_id],
    queryFn: () => OverallCampaignOutcomesApi(campaign_id as string),
    enabled: !!campaign_id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
