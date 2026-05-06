import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { AdminDeleteUserApi } from '../../API/admin.routes';

export default function DeleteUserHook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user_id: string) => AdminDeleteUserApi(user_id),

    onSuccess: () => {
      // ✅ Prefix match — invalidates all ['all-users', page] entries across all pages
      queryClient.invalidateQueries({ queryKey: ['all-users'] });
      toast.success('User deleted successfully');
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error('Failed to delete user', {
        description: error.response?.data?.message,
      });
    },
  });
}