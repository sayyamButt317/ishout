import { useQuery } from '@tanstack/react-query';
import { NegotiationAgreedByCampaignApi } from '../../API/admin.routes';

export default function NegotiationAgreedByCampaignHook(
  campaign_id: string | null | undefined,
) {
  return useQuery({
    queryKey: ['negotiation-agreed-by-campaign', campaign_id],
    queryFn: () => NegotiationAgreedByCampaignApi(campaign_id as string),
    enabled: !!campaign_id,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
