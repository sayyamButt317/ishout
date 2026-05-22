import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deletePostingDetailApi } from '../../API/admin.routes';

export default function useDeletePostingDetailHook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePostingDetailApi(id),
    onSuccess: (data) => {
      toast.success(data.message ?? 'Posting detail deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['posting-details'] });
    },
    onError: () => {
      toast.error('Failed to delete posting detail');
    },
  });
}
