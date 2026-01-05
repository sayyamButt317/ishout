import { DeleterInfluenceerequest, GeneratedMoreInfluencerRequest, MoreInfluencerRequest, ReadyMadeInfluencersApiResponse, ReadyMadeInfluencersRequest } from "@/src/types/readymadeinfluencers-type";
import { AdminENDPOINT } from "./endpoint";
import useAuthStore from "@/src/store/AuthStore/authStore";
import { toast } from "sonner";
import axios, { AxiosResponse } from "axios";
import { getAuthTokenProvider } from "@/src/provider/auth-provide";
import { UpdateCampaignStatusRequestProps, UpdateInfluencerStatusRequestProps, UpdateInfluencerStatusResponseProps } from "@/src/types/Admin-Type/Campaign.type";
import { MessageTemplate } from "@/src/types/meta.type";
import { UpdateUserStatusResponse } from "@/src/types/Admin-Type/usermanagment.type";
import { RejectandRegenerateInfluencerRequest } from "@/src/types/Admin-Type/reject-influencers.type";
import { AddInfluencersNumberRequest } from "@/src/types/Admin-Type/review-influencer";

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
export const AdminGeneratedInfluencersByIdApi = async (campaign_id: string) => {
    const response = await api.get(AdminENDPOINT.ADMIN_GENERATED_INFLUENCERS_BY_ID(campaign_id));
    return response.data;
}
export const AdminPendingCampaignApi = async (page: number = 1) => {
    const response = await api.get(AdminENDPOINT.ADMIN_PENDING_CAMPAIGN, {
        params: { page }
    });
    return response.data;
}
export const AdminApprovedCampaignApi = async (page: number = 1) => {
    const response = await api.get(AdminENDPOINT.ADMIN_APPROVED_CAMPAIGN, {
        params: { page }
    });
    return response.data;
}

export const ApprovedCampaignByIdApi = async (campaign_id: string) => {
    const response = await api.get(AdminENDPOINT.ADMIN_APPROVED_CAMPAIGN_BY_ID(campaign_id));
    return response.data;
}

export const AdminOnBoardingCampaigns = async (page: number = 1) => {
    const response = await api.get(AdminENDPOINT.ADMIN_ONBOARDING_CAMPAIGNS, {
        params: { page }
    });
    return response.data;
}

export const ApprovedOnBoardingInfluencers = async (campaign_id: string, page: number = 1) => {
    const response = await api.get(AdminENDPOINT.ADMIN_ONBOARDING_INFLUENCERS(campaign_id), {
        params: { page, page_size: 10, campaign_id }
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

export const UpdateStatusApi = async ({ campaign_id, status }: { campaign_id: string, status: string }) => {
    const response = await api.patch<UpdateInfluencerStatusResponseProps>(AdminENDPOINT.STATUS_UPDATE, { campaign_id, status });
    return response.data;
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

export const AdminCompanyDetailsByIdApi = async (user_id: string) => {
    const response = await api.get(AdminENDPOINT.ADMIN_COMPANY_DETAILS_BY_ID(user_id));
    return response.data;
}

export const AdminUserManagementApi = async (page: number = 1) => {
    const response = await api.get(AdminENDPOINT.ADMIN_USER_MANAGEMENT, {
        params: { page }
    });
    return response.data;
}
export const AdminUpdateUserStatusApi = async (user_id: string, status: string) => {
    const response = await api.patch<UpdateUserStatusResponse>(AdminENDPOINT.ADMIN_USER_MANAGEMENT_BY_ID(user_id), {}, { params: { status } });
    return response;
}

export const AdminRejectandRegenerateInfluencerApi = async (rejectInfluencerRequest: RejectandRegenerateInfluencerRequest) => {
    const response = await api.post(AdminENDPOINT.ADMIN_REJECT_INFLUENCER, rejectInfluencerRequest);
    return response.data;
}
export const AdminMoreInfluencerApi = async (moreInfluencerRequest: GeneratedMoreInfluencerRequest) => {
    const response = await api.post(AdminENDPOINT.ADMIN_MORE_INFLUENCER, {
        campaign_id: moreInfluencerRequest.campaign_id
    });
    return response.data;
}

export const AdminAddInfluencersNumberApi = async (addInfluencersNumberRequest: AddInfluencersNumberRequest) => {
    const response = await api.post(AdminENDPOINT.ADMIN_ADD_INFLUENCERS_NUMBER, {
        influencer_id: addInfluencersNumberRequest.influencer_id,
        phone_number: addInfluencersNumberRequest.phone_number,
        platform: addInfluencersNumberRequest.platform,
    });
    return response.data;
}

export const WhatsAppuserSessionApi = async ({ page, page_size }: { page: number, page_size: number }) => {
    const response = await api.get(AdminENDPOINT.ADMIN_WHATSAPP_USERSESSION, {
        params: {
            page,
            page_size
        }
    })
    return response.data;
}

export const WhatsAppUserMessagesApi = async (thread_id: string, { page, page_size }: { page: number, page_size: number }) => {
    const response = await api.get(AdminENDPOINT.ADMIN_WHATSAPP_USERMESSAGE_BY_ID(thread_id), {
        params: {
            page,
            page_size
        }
    })
    return response.data;
}

export const HumanTakeoverApi = async (
    thread_id: string,
    enabled: boolean
) => {
    const response = await api.post(
        AdminENDPOINT.ADMIN_HUMAN_TAKEOVER(thread_id),
        {
            enabled,
        }
    );
    return response.data;
};


export const SendWhatsappMessageApi = async (thread_id: string, message: string) => {
    const response = await api.post(AdminENDPOINT.ADMIN_SEND_WHATSAPP_MESSAGEl(thread_id), {
        message: message
    });
    return response.data;
}

export const SendOnboardingMessage = async (
    psid: number,
    messageTemplate: MessageTemplate
) => {
    const metaApi = axios.create({
        baseURL: '',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAGE_ACCESS_TOKEN}`,
        },
    });

    const response = await metaApi.post(
        AdminENDPOINT.META_MESSAGE,
        {
            recipient: { id: psid },
            message: {
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: 'generic',
                        elements: [
                            {
                                title: messageTemplate.title,
                                subtitle: messageTemplate.subtitle,
                            },
                        ],
                    },
                },
            },
        }
    );

    return response.data;
};