import { getApprovedContentsApi } from '../company.routes';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export default function ApprovedContentsMutation() {
  return useMutation({
    mutationFn: (campaign_id: string) => getApprovedContentsApi(campaign_id),
    onError: (error) => {
      const axiosError = error as AxiosError<{
        message?: string;
        error?: { message?: string };
      }>;
      toast.error('Failed to load approved content', {
        description:
          axiosError.response?.data?.error?.message ||
          axiosError.response?.data?.message ||
          'Please try again.',
      });
    },
  });
}
