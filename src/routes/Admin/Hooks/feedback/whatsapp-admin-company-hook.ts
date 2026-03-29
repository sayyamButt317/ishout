import { useQuery } from '@tanstack/react-query';
import { WhatsAppAdminCompanyMessagesApi } from '../../API/admin.routes';

export default function useAdminCompanyMessagesHook(
  thread_id: string,
  page: number = 1,
  page_size: number = 20,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ['admin-company-messages', thread_id, page, page_size],
    queryFn: () => WhatsAppAdminCompanyMessagesApi(thread_id, { page, page_size }),
    enabled: enabled && !!thread_id,
    refetchOnWindowFocus: false,
  });
}
