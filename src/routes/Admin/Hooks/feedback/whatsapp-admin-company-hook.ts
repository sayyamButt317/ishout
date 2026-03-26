import { useQuery } from '@tanstack/react-query';
import { WhatsAppAdminCompnayMessagesApi } from '../../API/admin.routes';

export default function useAdminCompanyMessagesHook(
  thread_id: string,
  page: number = 1,
  page_size: number = 20,
) {
  return useQuery({
    queryKey: ['admin-influencer-messages', thread_id, page, page_size],
    queryFn: () => WhatsAppAdminCompnayMessagesApi(thread_id, { page, page_size }),
    enabled: !!thread_id,
    refetchOnWindowFocus: false,
  });
}
