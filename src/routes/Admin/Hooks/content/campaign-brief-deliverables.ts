import { useQuery } from '@tanstack/react-query';
import { AdminCampaignBriefDeliverablesApi } from '../../API/admin.routes';

export default function useCampaignBriefDeliverablesHook(brief_id: string) {
  return useQuery({
    queryKey: ['admin-campaign-brief-deliverables', brief_id],
    queryFn: () => AdminCampaignBriefDeliverablesApi(brief_id),
    enabled: !!brief_id,
    refetchOnWindowFocus: false,
  });
}

