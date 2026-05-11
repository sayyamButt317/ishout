import { useQuery } from '@tanstack/react-query';
import { CompanyWhatsAppAdminCompanyMediaUrlsApi } from '../../API/admin.routes';

export default function useBrandMediaUrlsHook(negotiation_id: string) {
  return useQuery({
    queryKey: ['brand-media-urls', negotiation_id],
    queryFn: () => CompanyWhatsAppAdminCompanyMediaUrlsApi(negotiation_id),
    enabled: !!negotiation_id,
    refetchOnWindowFocus: false,
  });
}
