import { useQuery } from '@tanstack/react-query';
import { WhatsAppAdminInfluencerMediaUrlsApi } from '../../API/admin.routes';

export default function useInfluencerMediaUrlsHook(
    negotiation_id: string,
) {
    return useQuery({
        queryKey: ['influencercontent', negotiation_id],
        queryFn: () =>
            WhatsAppAdminInfluencerMediaUrlsApi(negotiation_id),
        enabled: !!negotiation_id,
        refetchOnWindowFocus: false,
    })
}