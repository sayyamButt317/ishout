import { useMutation } from '@tanstack/react-query';
import { GetContentRevisionHistoryApi } from '../../API/admin.routes';

export default function useContentRevisionHistoryHook() {
  return useMutation({
    mutationFn: (negotiation_id: string) => GetContentRevisionHistoryApi(negotiation_id),
  });
}
