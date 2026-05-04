import { useMutation } from '@tanstack/react-query';

import { storeInfluencerDemographicsApi } from '../../API/admin.routes';
import type { StoreInfluencerDemographicsRequest } from '@/src/types/Admin-Type/Feedback-Type';

export default function useStoreInfluencerDemographicsHook() {
  return useMutation({
    mutationFn: (payload: StoreInfluencerDemographicsRequest) =>
      storeInfluencerDemographicsApi(payload),
  });
}
