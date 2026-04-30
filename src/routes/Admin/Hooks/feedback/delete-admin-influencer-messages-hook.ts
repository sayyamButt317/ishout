import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { DeleteAdminInfluencerMessagesApi } from '../../API/admin.routes';

type DeleteAdminInfluencerMessagesResponse = {
  success: boolean;
  thread_id: string;
  deleted_count: number;
};

export default function useDeleteAdminInfluencerMessagesHook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (thread_id: string) => DeleteAdminInfluencerMessagesApi(thread_id),
    onSuccess: (data: DeleteAdminInfluencerMessagesResponse, thread_id: string) => {
      toast.success(
        `Chat deleted (${data.deleted_count ?? 0} message${data.deleted_count === 1 ? '' : 's'})`,
      );

      // Refresh GET /whatsapp-admin-influencer-messages/{thread_id} consumers.
      queryClient.invalidateQueries({
        queryKey: ['admin-influencer-messages', thread_id],
      });
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete chat: ${error.message}`);
    },
  });
}
