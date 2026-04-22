import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { NegotiationSendHumanMessageApi } from '../../API/admin.routes';

export default function NegotiationSendHumanMessageHook(
  thread_id: string,
  negotiation_id: string,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message: string) =>
      NegotiationSendHumanMessageApi(thread_id, {
        message,
        negotiation_id,
      }),
    onSuccess: () => {
      toast.success('Message sent successfully');
      queryClient.invalidateQueries({ queryKey: ['negotiation-chat-detail', negotiation_id] });
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error('Failed to send message', {
        description: axiosError.response?.data?.detail as string,
      });
    },
  });
}
