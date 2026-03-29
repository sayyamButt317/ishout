import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WhatsAppCompanyAdminSendHumanMessageApi } from '../../API/admin.routes';

export default function useSendCompanyAdminMessage(user_id: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['whatsapp-company-admin-send-human', user_id],
    mutationFn: (message: string) =>
      WhatsAppCompanyAdminSendHumanMessageApi(user_id, message),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin-company-messages'],
      });
    },
  });

  return {
    ...mutation,
    sendMessage: mutation.mutateAsync,
  };
}
