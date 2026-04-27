// src/routes/Admin/Hooks/negotiation-delete-hook.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { AdminDeleteNegotiationApi } from '../API/admin.routes';

interface DeleteNegotiationResponse {
  success: boolean;
  message: string;
}

// Type for context returned by onMutate
interface DeleteNegotiationContext {
  previousData?: { negotiations: { thread_id: string; name: string }[] };
}

export default function useDeleteNegotiation() {
  const queryClient = useQueryClient();

  return useMutation<
    DeleteNegotiationResponse,                  // type returned by mutationFn
    AxiosError<{ message: string }>,           // type of error
    string,                                    // type of variables (thread_id)
    DeleteNegotiationContext                    // type of context returned by onMutate
  >({
    mutationFn: (thread_id: string) => AdminDeleteNegotiationApi(thread_id),

    onMutate: async (thread_id: string) => {
      await queryClient.cancelQueries({ queryKey: ['all-negotiations'] });

      const previousData = queryClient.getQueryData<{ negotiations: { thread_id: string; name: string }[] }>(
        ['all-negotiations']
      );

      if (previousData) {
        queryClient.setQueryData(['all-negotiations'], {
          negotiations: previousData.negotiations.filter((neg) => neg.thread_id !== thread_id),
        });
      }

      return { previousData };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-negotiations'] });
      toast.success('Negotiation deleted successfully');
    },

    onError: (error, _, context) => {
   
      if (context?.previousData) {
        queryClient.setQueryData(['all-negotiations'], context.previousData);
      }
      toast.error('Failed to delete negotiation', {
        description: error.response?.data?.message,
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['all-negotiations'] });
    },
  });
}