import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import axios from 'axios'; // adjust to your axios path

async function updateProfilePictureApi(userId: string, formData: FormData) {
  const { data } = await axios.patch(
    `/company/profile/${userId}/picture`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return data;
}

export default function UpdateProfilePictureHook(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => updateProfilePictureApi(userId, formData),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['company-profile', userId] });
      toast.success('Profile picture updated');
    },

    onError: (error: AxiosError<{ message?: string; detail?: string }>) => {
      toast.error('Failed to update profile picture', {
        description: error.response?.data?.message ?? error.response?.data?.detail,
      });
    },
  });
}