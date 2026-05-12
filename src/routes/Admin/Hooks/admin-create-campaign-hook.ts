import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { AdminCreateCampaignApi } from '@/src/routes/Admin/API/admin.routes';
import type { AdminCreateCampaignRequest } from '@/src/types/Admin-Type/create-campaign-type';
import { useReadyMadeTemplateStore } from '@/src/store/Campaign/campaign.store';

export default function useAdminCreateCampaignHook() {
  const queryClient = useQueryClient();
  const { setResults } = useReadyMadeTemplateStore();

  return useMutation({
    mutationFn: (payload: AdminCreateCampaignRequest) => AdminCreateCampaignApi(payload),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ['create-campaign'] });
      setResults(data);
      toast.success('Campaign created successfully');
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error('Failed to create campaign', {
        description:
          axiosError.response?.data?.detail ||
          'An error occurred while creating the campaign.',
      });
    },
  });
}
