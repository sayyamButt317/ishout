import { useQuery } from '@tanstack/react-query';
import { GetAdminContentFeedbackApi } from '../../API/admin.routes';

export default function useAdminContentFeedbackReadHook(
  content_id: string,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ['admin-content-feedback-read', content_id],
    queryFn: () => GetAdminContentFeedbackApi(content_id),
    enabled: enabled && !!content_id,
    refetchOnWindowFocus: false,
  });
}
