import { useQuery } from '@tanstack/react-query';
import { GetBrandContentFeedbackApi } from '../../API/admin.routes';

export default function useBrandContentFeedbackReadHook(
  content_id: string,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ['brand-content-feedback-read', content_id],
    queryFn: () => GetBrandContentFeedbackApi(content_id),
    enabled: enabled && !!content_id,
    refetchOnWindowFocus: false,
  });
}
