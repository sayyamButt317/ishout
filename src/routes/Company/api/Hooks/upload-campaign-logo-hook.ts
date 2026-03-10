import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { uploadCampaignLogoApi } from '../company.routes';

export default function UploadCampaignLogoHook() {
  return useMutation({
    mutationFn: ({ brief_id, file }: { brief_id: string; file: File }) =>
      uploadCampaignLogoApi(brief_id, file),
    onSuccess: () => {
      toast.success('Campaign logo uploaded successfully');
    },
    onError: () => {
      toast.error('Failed to upload campaign logo');
    },
  });
}