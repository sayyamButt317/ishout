import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { UploadProfilePictureFunction } from '../../company.routes';



export default function UpdateProfilePictureHook(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ user_id, file }: { user_id: string; file: File }) =>
      UploadProfilePictureFunction(user_id, file),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["company-profile", userId] });
      toast.success("Profile picture updated");
    },

    onError: (error: AxiosError<{ message?: string; detail?: string }>) => {
      toast.error("Failed to update profile picture", {
        description:
          error.response?.data?.message ?? error.response?.data?.detail,
      });
    },
  });
}