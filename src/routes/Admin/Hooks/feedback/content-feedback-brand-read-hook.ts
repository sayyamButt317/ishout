import { useQuery } from '@tanstack/react-query';
import { GetBrandContentFeedbackApi } from '../../API/admin.routes';

export default function useBrandContentFeedbackReadHook(
  feedback_id: string,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ['brand-content-feedback-read', feedback_id],
    queryFn: () => GetBrandContentFeedbackApi(feedback_id),
    enabled: enabled && !!feedback_id,
    refetchOnWindowFocus: false,
  });
}
