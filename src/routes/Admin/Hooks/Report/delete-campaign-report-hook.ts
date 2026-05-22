import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteCampaignReportApi } from '../../API/admin.routes';

export default function useDeleteCampaignReportHook(campaign_id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reportId: string) => deleteCampaignReportApi(reportId),
    onSuccess: (data) => {
      toast.success(data.message ?? 'Report deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['all-influencers', campaign_id] });
    },
    onError: () => {
      toast.error('Failed to delete report');
    },
  });
}
