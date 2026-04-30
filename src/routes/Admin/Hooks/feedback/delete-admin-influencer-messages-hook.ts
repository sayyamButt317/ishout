import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { DeleteAdminInfluencerMessagesApi } from '../../API/admin.routes';

type DeleteAdminInfluencerMessagesResponse = {
  success: boolean;
  thread_id: string;
  influencer_deleted_count?: number;
  company_deleted_count?: number;
  deleted_count?: number;
};

type DeleteAdminInfluencerMessagesVariables = {
  thread_id: string;
  negotiation_id?: string;
};

export default function useDeleteAdminInfluencerMessagesHook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ thread_id, negotiation_id }: DeleteAdminInfluencerMessagesVariables) =>
      DeleteAdminInfluencerMessagesApi(thread_id, negotiation_id),
    onSuccess: (
      data: DeleteAdminInfluencerMessagesResponse,
      variables: DeleteAdminInfluencerMessagesVariables,
    ) => {
      const influencerCount = data.influencer_deleted_count ?? data.deleted_count ?? 0;
      const companyCount = data.company_deleted_count ?? 0;
      toast.success(
        `Chat deleted (admin-influencer: ${influencerCount}, admin-company: ${companyCount})`,
      );

      // Refresh GET /whatsapp-admin-influencer-messages/{thread_id} consumers.
      queryClient.invalidateQueries({
        queryKey: ['admin-influencer-messages', variables.thread_id],
      });
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete chat: ${error.message}`);
    },
  });
}
