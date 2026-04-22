import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { updateApprovedContentApi } from '../company.routes';
import type { UpdateApprovedContentPayload } from '@/src/types/Compnay/approved-video-type';

type UpdateApprovedContentVariables = {
  approved_content_id: string;
  payload: UpdateApprovedContentPayload;
};

export default function useUpdateApprovedContent() {
  return useMutation({
    mutationFn: ({ approved_content_id, payload }: UpdateApprovedContentVariables) =>
      updateApprovedContentApi(approved_content_id, payload),
    onSuccess: () => {
      toast.success('Content details saved');
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{
        message?: string;
        error?: { message?: string };
      }>;
      toast.error('Failed to save content details', {
        description:
          axiosError.response?.data?.error?.message ||
          axiosError.response?.data?.message ||
          'Please try again.',
      });
    },
  });
}
