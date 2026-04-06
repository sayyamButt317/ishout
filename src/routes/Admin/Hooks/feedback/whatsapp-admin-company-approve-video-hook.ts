import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { WhatsAppAdminCompanyApproveVideoApi } from '../../API/admin.routes';
import {
  type WhatsAppAdminCompanyApproveVideoPayload,
  type WhatsAppAdminCompanyApproveVideoResponse,
} from '@/src/types/Compnay/approved-video-type';

export default function useWhatsAppAdminCompanyApproveVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: WhatsAppAdminCompanyApproveVideoPayload) =>
      WhatsAppAdminCompanyApproveVideoApi(payload),
    onSuccess: (data: WhatsAppAdminCompanyApproveVideoResponse, variables) => {
      if (data?.success) {
        toast.success(data.message ?? 'Video approved');
      } else {
        toast.error(data?.message ?? 'Failed to approve video');
      }

      // Mark the matching brand chat query as stale so it refreshes.
      queryClient.invalidateQueries({
        queryKey: [
          'admin-company-messages',
          variables.brand_thread_id,
          variables.negotiation_id,
        ],
      });
    },
    onError: () => {
      toast.error('Failed to approve video');
    },
  });
}
