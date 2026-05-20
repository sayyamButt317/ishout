import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ExtractDemoGraphics } from '../../API/admin.routes';
import type { ExtractReportRequest, ExtractReportResponse } from '@/src/types/Admin-Type/Feedback/influencer-type';

export default function ExtractPostDemoGraphicsHook() {
  return useMutation<ExtractReportResponse, AxiosError<{ detail: string }>, ExtractReportRequest>({
    mutationFn: ({ campaign_id, username, url }) =>
      ExtractDemoGraphics(campaign_id, username, url),
    onError: (error) => {
      toast.error('Failed to extract analytics', {
        description: error.response?.data?.detail,
      });
    },
  });
}
