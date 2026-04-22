import { useMutation } from '@tanstack/react-query';
import { AdminNegotiationApprovalStatusApi } from '../../API/admin.routes';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export default function useAdminNegotiationApprovalStatus() {
  return useMutation({
    mutationFn: ({
      thread_id,
      payload,
    }: {
      thread_id: string;
      payload: { admin_approved?: string; Brand_approved?: string };
    }) => AdminNegotiationApprovalStatusApi(thread_id, payload),
    onSuccess: (data: { message: string }) => {
      toast.success(data.message || 'Approval status updated successfully');
    },
    onError: (error: AxiosError<{ detail: string }>) => {
      toast.error(error.response?.data?.detail || 'Failed to update approval status');
    },
  });
}
