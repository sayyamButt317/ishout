import axios from 'axios';
import { CompanyENDPOINT } from './endpoint';
import { FindInfluencerRequestProps } from '@/src/types/readymadeinfluencers-type';
import useAuthStore from '@/src/store/AuthStore/authStore';
import { toast } from 'sonner';
import { getAuthTokenProvider } from '@/src/provider/auth-provide';
import {
  UpdateInfluencerStatusRequestProps,
  UpdateInfluencerStatusResponseProps,
} from '@/src/types/Admin-Type/Campaign.type';
import {
  CompanyProfileDetailsResponseProps,
  UpdateProfileRequestProps,
  UpdateProfileResponseProps,
} from '@/src/types/Compnay/profile-type';
import {
  ChangePasswordRequestProps,
  ProfileChangePasswordRequestProps,
} from '@/src/types/Compnay/password-type';
import {
  GetCampaignBriefResponse,
  CampaignBriefItem,
} from '@/src/types/Compnay/campaign-brief.types';
import { UpdateCampaignBrief } from '@/src/types/Compnay/campaignbrieftype';

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

export const CompanyCampaignBreifApi = async (payload: {
  user_input: string;
  user_id: string;
}) => {
  const response = await api.post(CompanyENDPOINT.CAMPAIGN_BREIF, payload);
  return response.data;
};

export const UpdateCampaignBriefApi = async (
  brief: UpdateCampaignBrief,
  files?: File[] | null, // now an array
) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(brief));

  // Append multiple files
  if (files && files.length > 0) {
    files.forEach((file) => {
      formData.append('files', file); // must match FastAPI parameter name
    });
  }

  const response = await api.patch(
    CompanyENDPOINT.UPDATE_CAMPAIGN_BRIEF(brief.id),
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );

  return response.data;
};
export const getCampaignBrief = async (
  user_id: string,
): Promise<GetCampaignBriefResponse> => {
  const response = await api.get<GetCampaignBriefResponse>(
    CompanyENDPOINT.GET_CAMPAIGN_BRIEF(user_id),
  );

  return response.data;
};

export const deleteCampaignBrief = async (brief_id: string) => {
  const response = await api.delete(CompanyENDPOINT.DELETE_CAMPAIGN_BRIEF(brief_id));

  return response.data;
};

export const getCampaignBriefDetail = async (
  brief_id: string,
): Promise<CampaignBriefItem> => {
  const response = await api.get<CampaignBriefItem>(
    CompanyENDPOINT.GET_CAMPAIGN_BRIEF_DETAIL(brief_id),
  );

  return response.data;
};

export const FindInfluencer = async (influencerRequest: FindInfluencerRequestProps) => {
  const response = await api.post(CompanyENDPOINT.CREATE_CAMPAIGN, influencerRequest);
  return response.data;
};

export const CompanyCampaign = async (page: number = 1) => {
  const response = await api.get(CompanyENDPOINT.CAMPAIGN, {
    params: { page },
  });
  return response.data;
};

export const CampaignRejectedInfluencers = async () => {
  const response = await api.put(CompanyENDPOINT.CAMPAIGN_REJECTED_INFLUENCERS);
  return response.data;
};

export const CompanyApprovedCampaign = async (user_id: string, page: number = 1) => {
  const response = await api.get(CompanyENDPOINT.COMPNAY_APPROVED_CAMPAIGN(user_id), {
    params: { page },
  });
  return response.data;
};

export const uploadCampaignLogoApi = async (brief_id: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post(
    CompanyENDPOINT.UPLOAD_CAMPAIGN_LOGO(brief_id),
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

export const ReviewPendingInfluencers = async (campaign_id: string, page: number = 1) => {
  const response = await api.get(
    CompanyENDPOINT.REVIEW_PENDING_INFLUENCERS(campaign_id),
    {
      params: { page },
    },
  );
  return response.data;
};

export const CompanyUpdateInfluencerStatusApi = async (
  influencerRequest: UpdateInfluencerStatusRequestProps,
) => {
  const response = await api.patch<UpdateInfluencerStatusResponseProps>(
    CompanyENDPOINT.COMPANY_UPDATE_INFLUENCER_STATUS,
    influencerRequest,
  );
  return response.data;
};

export const CompanyProfileDetailsApi = async (user_id: string) => {
  const response = await api.get<CompanyProfileDetailsResponseProps>(
    CompanyENDPOINT.PROFILE_DETAILS(user_id),
  );
  return response.data;
};

export const CompanyUpdateProfileApi = async (
  user_id: string,
  profileRequest: UpdateProfileRequestProps,
) => {
  const response = await api.patch<UpdateProfileResponseProps>(
    CompanyENDPOINT.PROFILE_UPDATE(user_id),
    profileRequest,
  );
  return response.data;
};

export const CompanyForgotPasswordApi = async (email: string) => {
  const response = await api.post(CompanyENDPOINT.FORGOT_PASSWORD, { email });
  return response.data;
};

export const CompanyVerifyOtpApi = async (otp: string, email: string) => {
  const response = await api.post(CompanyENDPOINT.VERIFY_OTP, { otp, email });
  return response.data;
};

export const CompanyChangePasswordApi = async (password: ChangePasswordRequestProps) => {
  const response = await api.put(CompanyENDPOINT.RESET_PASSWORD, { password });
  return response.data;
};

export const CompanyResetPasswordApi = async (payload: ChangePasswordRequestProps) => {
  const response = await api.put(CompanyENDPOINT.RESET_PASSWORD, payload);
  return response.data;
};

export const CompanyProfileChangePasswordApi = async (
  user_id: string,
  payload: ProfileChangePasswordRequestProps,
) => {
  const response = await api.patch(CompanyENDPOINT.CHANGE_PASSWORD(user_id), payload);
  return response.data;
};
