import { DeleterInfluenceerequest, MoreInfluencerRequest, ReadyMadeInfluencersApiResponse, ReadyMadeInfluencersRequest } from "@/src/types/readymadeinfluencers-type";
import { AdminENDPOINT } from "./endpoint";
import useAuthStore from "@/src/store/AuthStore/authStore";
import { toast } from "sonner";
import axios, { AxiosResponse } from "axios";
import { getAuthTokenProvider } from "@/src/provider/auth-provide";
import { UpdateCampaignStatusRequestProps, UpdateInfluencerStatusRequestProps, UpdateInfluencerStatusResponseProps } from "@/src/types/Admin-Type/Campaign.type";

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
        const originalRequest = error.config;

        const isLoginRequest =
            originalRequest?.url?.includes(AdminENDPOINT.ADMIN_ALL_CAMPAIGN) &&
            originalRequest?.method === 'post';

        if (error.response && error.response.status === 401 && !isLoginRequest) {
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


interface AdminAllCampaignParams {
    page?: number;
    status?: string;
    page_size?: number;
}

export const AdminAllCampaignApi = async ({
    page = 1,
    status,
    page_size = 10,
}: AdminAllCampaignParams = {}) => {
    const params: Record<string, string | number> = { page, page_size };
    if (status && status !== "all") {
        params.status = status;
    }

    const response = await api.get(AdminENDPOINT.ADMIN_ALL_CAMPAIGN, {
        params,
    });
    return response.data;
};
export const AdminGenerateInfluencersApi = async (campaign_id: string, limit: number) => {
    const response = await api.post(AdminENDPOINT.ADMIN_GENERATE_INFLUENCERS_BY_ID(campaign_id), {
        campaign_id,
        limit
    });
    return response.data;
}
export const AdminPendingCampaignApi = async () => {
    const response = await api.get(AdminENDPOINT.ADMIN_PENDING_CAMPAIGN);
    return response.data;
}
export const AdminApprovedCampaignApi = async () => {
    const response = await api.get(AdminENDPOINT.ADMIN_APPROVED_CAMPAIGN);
    return response.data;
}

export const ApprovedCampaignByIdApi = async (campaign_id: string) => {
    const response = await api.get(AdminENDPOINT.ADMIN_APPROVED_CAMPAIGN_BY_ID(campaign_id));
    return response.data;
}

export const ApprovedOnBoardingInfluencers = async (page: number = 1) => {
    const response = await api.get(AdminENDPOINT.ADMIN_ONBOARDING_INFLUENCERS, {
        params: { page }
    });
    return response.data;
}

export const InfluencersCampaignByIdApi = async (campaign_id: string) => {
    const response = await api.get(AdminENDPOINT.INFLUENCERS_CAMPAIGN_BY_ID(campaign_id));
    return response.data;
}
export const UpdateInfluencerStatusApi = async (influencerRequest: UpdateInfluencerStatusRequestProps) => {
    const response = await api.patch<UpdateInfluencerStatusResponseProps>(AdminENDPOINT.ADMIN_UPDATE_INFLUENCER_STATUS, influencerRequest).then((response: AxiosResponse<UpdateInfluencerStatusResponseProps>) => response.data);
    return response;
}

export const RejectedInfluencer = async (influencerRequest: MoreInfluencerRequest) => {
    const response = await api.post<ReadyMadeInfluencersRequest>(AdminENDPOINT.ADMIN_REJECTED_INFLUENCER, influencerRequest);
    return response.data;
}

export const InfluencersListApi = async (campaign_id: string) => {
    const response = await api.get<ReadyMadeInfluencersApiResponse>(AdminENDPOINT.INFLUENCERS_LIST_BY_ID(campaign_id));
    return response.data;
}

export const DeleteInfluencer = async (deleteInfluencerRequest: DeleterInfluenceerequest) => {
    const response = await api.delete(AdminENDPOINT.ADMIN_DELETE_INFLUENCER, { data: deleteInfluencerRequest });
    return response.data;
};

export const DeleteCampaignApi = async (campaign_id: string) => await api.delete(AdminENDPOINT.ADMIN_DELETE_CAMPAIGN(campaign_id));

export const AdminUpdateCampaignStatusApi = async (updateCampaignStatusRequest: UpdateCampaignStatusRequestProps) => {
    const response = await api.put(AdminENDPOINT.UPDATE_CAMPAIGN_STATUS(), updateCampaignStatusRequest);
    return response.data;
}

