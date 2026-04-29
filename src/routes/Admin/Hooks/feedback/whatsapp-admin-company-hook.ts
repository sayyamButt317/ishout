import { useQuery } from '@tanstack/react-query';
import { WhatsAppAdminCompanyMessagesApi } from '../../API/admin.routes';
import type { CompanyAdminMessagesResponse } from '@/src/types/Compnay/company-admin-messages-type';

export default function useAdminCompanyMessagesHook(
  thread_id: string,
  negotiation_id: string,
  page: number = 1,
  page_size: number = 20,
  enabled: boolean = true,
) {
  return useQuery<CompanyAdminMessagesResponse>({
    queryKey: ['admin-company-messages', thread_id, negotiation_id, page, page_size],
    queryFn: () =>
      WhatsAppAdminCompanyMessagesApi(thread_id, negotiation_id, { page, page_size }),
    enabled: enabled && !!thread_id && !!negotiation_id,
    refetchOnWindowFocus: false,
  });
}
