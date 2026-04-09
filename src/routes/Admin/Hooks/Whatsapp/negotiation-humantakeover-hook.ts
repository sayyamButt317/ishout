import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { NegotiationHumanTakeoverApi } from '../../API/admin.routes';

export default function NegotiationHumanTakeoverHook(thread_id: string) {
  return useMutation({
    mutationFn: (enabled: boolean) => NegotiationHumanTakeoverApi(thread_id, enabled),
    onSuccess: (data: { message: string }) => {
      toast.success(data.message);
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error('Failed to toggle negotiation takeover', {
        description: axiosError.response?.data?.detail,
      });
    },
  });
}
