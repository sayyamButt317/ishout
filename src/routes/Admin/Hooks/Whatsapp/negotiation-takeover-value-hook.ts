import { useQuery } from '@tanstack/react-query';
import { NegotiationTakeoverValueApi } from '../../API/admin.routes';

export default function NegotiationTakeoverValueHook(
  thread_id: string,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ['negotiation-takeover-value', thread_id],
    queryFn: () => NegotiationTakeoverValueApi(thread_id),
    enabled: enabled && !!thread_id,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
}
