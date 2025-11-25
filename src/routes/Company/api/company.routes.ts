import axios from 'axios';
import { CompanyENDPOINT } from './endpoint';
import { FindInfluencerRequestProps } from '@/src/types/readymadeinfluencers-type';
import useAuthStore from '@/src/store/AuthStore/authStore';
import { toast } from 'sonner';
import { getAuthTokenProvider } from '@/src/provider/auth-provide';
import { UpdateInfluencerStatusRequestProps, UpdateInfluencerStatusResponseProps } from '@/src/types/Admin-Type/Campaign.type';


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getAuthTokenProvider();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response && error.response.status === 401) {
      useAuthStore().clearAuth();

      if (error.response?.status === 403) {
        toast.error('Unauthorized access');
      } else if (error.response?.status === 500) {
        toast.error('Server error');
      } else {
        toast.error('An error occurred. Please try again.');
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  },
);

//Get All Jobs

export const FindInfluencer = async (influencerRequest: FindInfluencerRequestProps) => {
  const response = await api.post(CompanyENDPOINT.CREATE_CAMPAIGN, influencerRequest);
  return response.data;
};

export const CompanyCampaign = async (page: number = 1) => {
  const response = await api.get(CompanyENDPOINT.CAMPAIGN, {
    params: { page },
  });
  return response.data;
}

export const CampaignRejectedInfluencers = async () => {
  const response = await api.put(CompanyENDPOINT.CAMPAIGN_REJECTED_INFLUENCERS)
  return response.data;
}

export const CompanyApprovedCampaign = async (
  user_id: string,
  page: number = 1
) => {
  const response = await api.get(
    CompanyENDPOINT.COMPNAY_APPROVED_CAMPAIGN(user_id),
    {
      params: { page }
    }
  );
  return response.data;
};


export const ReviewPendingInfluencers = async (campaign_id: string, page: number = 1) => {
  const response = await api.get(CompanyENDPOINT.REVIEW_PENDING_INFLUENCERS(campaign_id), {
    params: { page },
  })
  return response.data;
}

export const CompanyUpdateInfluencerStatusApi = async (influencerRequest: UpdateInfluencerStatusRequestProps) => {
  const response = await api.patch<UpdateInfluencerStatusResponseProps>(CompanyENDPOINT.COMPANY_UPDATE_INFLUENCER_STATUS, influencerRequest);
  return response.data;
}

