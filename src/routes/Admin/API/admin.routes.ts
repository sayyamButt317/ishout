import { ApprovedInfluencersRequest, ApprovedInfluencersResponse, DeleterInfluenceerequest, MoreInfluencerRequest, ReadyMadeInfluencersApiResponse, ReadyMadeInfluencersRequest } from "@/src/types/readymadeinfluencers-type";
import { AdminENDPOINT } from "./endpoint";
import useAuthStore from "@/src/store/AuthStore/authStore";
import { toast } from "sonner";
import axios from "axios";
import { getAuthTokenProvider } from "@/src/provider/auth-provide";
import { UpdateCampaignStatusRequestProps } from "@/src/types/Admin-Type/Campaign.type";

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


export const AdminAllCampaignApi = async () => {
    const response = await api.get(AdminENDPOINT.ADMIN_ALL_CAMPAIGN,);
    return response.data;
}

export const AdminCampaignByIdApi = async (campaign_id: string) => {
    const response = await api.get(AdminENDPOINT.ADMIN_CAMPAIGN_BY_ID(campaign_id));
    return response.data;
}
export const ApprovedInfluencersApi = async (influencerRequest: ApprovedInfluencersRequest) => {
    const response = await api.put<ApprovedInfluencersResponse>(AdminENDPOINT.ADMIN_APPROVED_INFLUENCER, influencerRequest);
    return response.data;
}

export const RejectedInfluencer = async (influencerRequest: MoreInfluencerRequest) => {
    const response = await api.post<ReadyMadeInfluencersRequest>(AdminENDPOINT.ADMIN_REJECTED_INFLUENCER, influencerRequest);
    return response.data;
}

export const InfluencersListApi = async (campaign_id: string) => {
    const response = await api.get<ReadyMadeInfluencersApiResponse>(AdminENDPOINT.INFLUENCERS_LIST(campaign_id));
    return response.data;
}

export const DeleteInfluencer = async (deleteInfluencerRequest: DeleterInfluenceerequest) => {
    const response = await api.delete(AdminENDPOINT.ADMIN_DELETE_INFLUENCER, { data: deleteInfluencerRequest });
    return response.data;
};

export const AdminUpdateCampaignStatusApi = async (updateCampaignStatusRequest: UpdateCampaignStatusRequestProps) => {
    const response = await api.put(AdminENDPOINT.UPDATE_CAMPAIGN_STATUS(), updateCampaignStatusRequest);
    return response.data;
}