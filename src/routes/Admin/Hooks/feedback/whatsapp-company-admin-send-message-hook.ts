import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WhatsAppCompanyAdminSendHumanMessageApi } from '../../API/admin.routes';

export default function useSendCompanyAdminMessage(
  user_id: string,
  negotiation_id: string,
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['whatsapp-company-admin-send-human', user_id, negotiation_id],
    mutationFn: (message: string) =>
      WhatsAppCompanyAdminSendHumanMessageApi(user_id, message, negotiation_id),
    onSuccess: () => {
      // Re-fetch any company chat that matches this negotiation_id.
      // `useAdminCompanyMessagesHook` queryKey = ['admin-company-messages', thread_id, negotiation_id, page, page_size]
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey as unknown as Array<unknown>;
          return key[0] === 'admin-company-messages' && key[2] === negotiation_id;
        },
      });
    },
  });

  return {
    ...mutation,
    sendMessage: mutation.mutateAsync,
  };
}
