import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WhatsAppAdminInfuencerSendHumanMessageApi } from '../../API/admin.routes';

export default function useSendAdminMessage(thread_id: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['whatsapp-admin-influencer-send-human', thread_id],
    mutationFn: (message: string) =>
      WhatsAppAdminInfuencerSendHumanMessageApi(thread_id, message),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin-influencer-messages', thread_id],
      });
    },
  });

  return {
    ...mutation,
    sendMessage: mutation.mutateAsync,
  };
}
