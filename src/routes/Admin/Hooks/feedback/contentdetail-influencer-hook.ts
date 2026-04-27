import { useQuery } from '@tanstack/react-query';
import { ExtractContentRevisionforInfluencer } from '../../API/admin.routes';

export default function useInfluencerContentFeedbackHook(
    negotiation_id: string,
    message_id?: string
) {
    return useQuery({
        queryKey: ['influencercontent', negotiation_id, message_id],
        queryFn: () =>
            ExtractContentRevisionforInfluencer(negotiation_id, message_id),
        enabled: !!negotiation_id,
        refetchOnWindowFocus: false,
    })
}