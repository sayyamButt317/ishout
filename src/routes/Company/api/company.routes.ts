import axios from 'axios';
import { CompanyENDPOINT } from './endpoint';
import { FindInfluencerRequestProps } from '@/src/types/readymadeinfluencers-type';
import { GuidedQuestionsType } from '@/src/types/guidedquestion-type';
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
        toast.error('Session expired. Please login again.');
        window.location.href = '/login';
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

export const CompanyCampaign = async () => {
  const response = await api.get(CompanyENDPOINT.CAMPAIGN);
  return response.data;
}

export const CampaignRejectedInfluencers = async () => {
  const response = await api.put(CompanyENDPOINT.CAMPAIGN_REJECTED_INFLUENCERS)
  return response.data;
}

export const CampaignApprovedInfluencers = async () => {
  const response = await api.get(CompanyENDPOINT.CAMPAIGN_APPROVED_INFLUENCERS)
  return response.data;
}

export const ApprovedCampaignById = async (user_id: string) => {
  const response = await api.get(CompanyENDPOINT.APPROVED_CAMPAIGN_BY_ID(user_id))
  return response.data;
}

export const QuestionGuided = async (guidedQuestion: GuidedQuestionsType) => {
  const response = await api.post<GuidedQuestionsType>(CompanyENDPOINT.QUESTION_GUIDED, guidedQuestion);
  return response.data;
};

export const CompanyUpdateInfluencerStatusApi = async (influencerRequest: UpdateInfluencerStatusRequestProps) => {
  const response = await api.patch<UpdateInfluencerStatusResponseProps>(CompanyENDPOINT.COMPANY_UPDATE_INFLUENCER_STATUS, influencerRequest);
  return response.data;
}

