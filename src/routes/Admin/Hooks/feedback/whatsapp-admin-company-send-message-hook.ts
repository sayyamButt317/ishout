import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WhatsAppAdminCompanySendHumanMessageApi } from '../../API/admin.routes';


export default function useSendAdminCompanyMessage(thread_id: string, negotiation_id: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['whatsapp-admin-company-send-human', thread_id, negotiation_id],
    mutationFn: (message: string) =>
      WhatsAppAdminCompanySendHumanMessageApi(thread_id, message, negotiation_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin-company-messages', thread_id, negotiation_id],
      });
    },
  });

  return {
    ...mutation,
    sendMessage: mutation.mutateAsync,
  };
}
