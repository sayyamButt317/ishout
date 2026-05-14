import { useQuery } from '@tanstack/react-query';
import { CompanyPostingDetailsApi } from '../company.routes';
import type {
  CompanyPostingDetailsApiResponse,
  CompanyPostingDetailsListData,
} from '@/src/app/client/posting-details-type';

function toListData(data: CompanyPostingDetailsApiResponse): CompanyPostingDetailsListData {
  const pd = data.posting_details;
  const posting_details =
    pd == null ? [] : Array.isArray(pd) ? pd : [pd];
  return { success: data.success, posting_details };
}

export function CompanyPostingDetailsHook(campaign_id: string | null) {
  return useQuery({
    queryKey: ['company-posting-details', campaign_id],
    queryFn: async () => {
      const raw = await CompanyPostingDetailsApi(campaign_id!);
      return toListData(raw);
    },
    enabled: !!campaign_id,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
