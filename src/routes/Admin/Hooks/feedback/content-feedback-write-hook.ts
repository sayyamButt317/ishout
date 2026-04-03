import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { SaveContentFeedbackApi } from '../../API/admin.routes';
import { SaveContentFeedbackPayload } from '@/src/types/Admin-Type/Content-type';


export default function useSaveContentFeedbackHook() {
  return useMutation({
    mutationFn: (payload: SaveContentFeedbackPayload) => SaveContentFeedbackApi(payload),
    onError: (error: Error) => {
      toast.error(`Failed to save content feedback: ${error.message}`);
    },
  });
}