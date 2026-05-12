import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AdminCreateCampaignBriefApi } from '@/src/routes/Admin/API/admin.routes';
import type { AdminCampaignBriefRequest } from '@/src/types/Admin-Type/create-campaign-type';

export default function useAdminCreateCampaignBriefHook() {
  return useMutation({
    mutationFn: (payload: AdminCampaignBriefRequest) => AdminCreateCampaignBriefApi(payload),
    onSuccess: () => {
      toast.success('Campaign brief generated successfully');
    },
    onError: () => {
      toast.error('Failed to generate campaign brief');
    },
  });
}
