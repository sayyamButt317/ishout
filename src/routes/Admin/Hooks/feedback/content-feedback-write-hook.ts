import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { SaveContentFeedbackApi } from '../../API/admin.routes';

type ContentFeedbackReviewSide = 'admin_review' | 'brand_review';

type SaveContentFeedbackPayload = {
  negotiation_id: string;
  campaign_id: string;
  content_url: string;
  msg: string;
  review_side: ContentFeedbackReviewSide;
  timestamp: number;
  snapshot: string;
};

export default function useSaveContentFeedbackHook() {
  return useMutation({
    mutationFn: (payload: SaveContentFeedbackPayload) => SaveContentFeedbackApi(payload),
    onError: () => {
      toast.error('Failed to save content feedback');
    },
  });
}
