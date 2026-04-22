import { useQuery } from '@tanstack/react-query';
import { GetAdminContentFeedbackApi } from '../../API/admin.routes';

export default function useAdminContentFeedbackReadHook(
  feedback_id: string,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ['admin-content-feedback-read', feedback_id],
    queryFn: () => GetAdminContentFeedbackApi(feedback_id),
    enabled: enabled && !!feedback_id,
    refetchOnWindowFocus: false,
  });
}
