import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendAdminInfluencerMessage } from '../../API/admin.routes';
import {
  normalizeAdminInfluencerMessageInput,
  type SendAdminInfluencerMessageMutationInput,
} from '@/src/types/Admin-Type/admin-influencer-message-type';

export default function useSendAdminMessage(
  thread_id: string,
  negotiation_id?: string | null,
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['whatsapp-admin-influencer-send-human', thread_id, negotiation_id ?? ''],
    mutationFn: (input: SendAdminInfluencerMessageMutationInput) => {
      const normalized = normalizeAdminInfluencerMessageInput(input, negotiation_id);
      return sendAdminInfluencerMessage({
        threadId: thread_id,
        ...normalized,
      });
    },
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
