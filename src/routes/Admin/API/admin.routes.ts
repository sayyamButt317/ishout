import {
  DeleterInfluenceerequest,
  GeneratedMoreInfluencerRequest,
  MoreInfluencerRequest,
  ReadyMadeInfluencersApiResponse,
  ReadyMadeInfluencersRequest,
} from '@/src/types/readymadeinfluencers-type';
import { AdminENDPOINT } from './endpoint';
import useAuthStore from '@/src/store/AuthStore/authStore';
import { toast } from 'sonner';
import axios, { AxiosResponse } from 'axios';
import { getAuthTokenProvider } from '@/src/provider/auth-provide';
import { AgreedNegotiationResponse } from '@/src/types/Admin-Type/agreed-negotiation-type';
import {
  UpdateCampaignStatusRequestProps,
  UpdateInfluencerStatusRequestProps,
  UpdateInfluencerStatusResponseProps,
} from '@/src/types/Admin-Type/Campaign-type';
import { MessageTemplate } from '@/src/types/meta.type';
import { UpdateUserStatusResponse } from '@/src/types/Admin-Type/usermanagment.type';
import { RejectandRegenerateInfluencerRequest } from '@/src/types/Admin-Type/reject-influencers.type';
import { AddInfluencersNumberRequest } from '@/src/types/Admin-Type/review-influencer';
import {
  SaveContentFeedbackPayload,
} from '@/src/types/Admin-Type/Content-type';
import {
  buildAdminInfluencerMessageFormData,
  mapAdminInfluencerMessageError,
  type SendAdminInfluencerMessageInput,
} from '@/src/types/Admin-Type/admin-influencer-message-type';
import {
  type WhatsAppAdminCompanyApproveVideoPayload,
  type WhatsAppAdminCompanyApproveVideoResponse,
} from '@/src/types/Compnay/approved-video-type';
import { SendRevisionPayload } from '@/src/types/Admin-Type/Feedback/revision-type';
import { AdminInfluencerMessagesResponse } from '@/src/types/Admin-Type/Feedback/admin-influencer-messages-type';
import { CompanyAdminMessagesResponse } from '@/src/types/Compnay/company-admin-messages-type';

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
  if (status && status !== 'all') {
    params.status = status;
  }

  const response = await api.get(AdminENDPOINT.ADMIN_ALL_CAMPAIGN, {
    params,
  });
  return response.data;
};
export const AdminGenerateInfluencersApi = async (campaign_id: string, limit: number) => {
  const response = await api.post(
    AdminENDPOINT.ADMIN_GENERATE_INFLUENCERS_BY_ID(campaign_id),
    {
      campaign_id,
      limit,
    },
  );
  return response.data;
};
export const AdminGeneratedInfluencersByIdApi = async (campaign_id: string) => {
  const response = await api.get(
    AdminENDPOINT.ADMIN_GENERATED_INFLUENCERS_BY_ID(campaign_id),
  );
  return response.data;
};
export const AdminPendingCampaignApi = async (page: number = 1) => {
  const response = await api.get(AdminENDPOINT.ADMIN_PENDING_CAMPAIGN, {
    params: { page },
  });
  return response.data;
};
export const AdminApprovedCampaignApi = async (page: number = 1) => {
  const response = await api.get(AdminENDPOINT.ADMIN_APPROVED_CAMPAIGN, {
    params: { page },
  });
  return response.data;
};

export const ApprovedCampaignByIdApi = async (campaign_id: string) => {
  const response = await api.get(
    AdminENDPOINT.ADMIN_APPROVED_CAMPAIGN_BY_ID(campaign_id),
  );
  return response.data;
};

export const AdminOnBoardingCampaigns = async (page: number = 1) => {
  const response = await api.get(AdminENDPOINT.ADMIN_ONBOARDING_CAMPAIGNS, {
    params: { page },
  });
  return response.data;
};

export const ApprovedOnBoardingInfluencers = async (
  campaign_id: string,
  page: number = 1,
) => {
  const response = await api.get(
    AdminENDPOINT.ADMIN_ONBOARDING_INFLUENCERS(campaign_id),
    {
      params: { page, page_size: 10, campaign_id },
    },
  );
  return response.data;
};

export const InfluencersCampaignByIdApi = async (campaign_id: string) => {
  const response = await api.get(AdminENDPOINT.INFLUENCERS_CAMPAIGN_BY_ID(campaign_id));
  return response.data;
};
export const UpdateInfluencerStatusApi = async (
  influencerRequest: UpdateInfluencerStatusRequestProps,
) => {
  const response = await api
    .patch<UpdateInfluencerStatusResponseProps>(
      AdminENDPOINT.ADMIN_UPDATE_INFLUENCER_STATUS,
      influencerRequest,
    )
    .then(
      (response: AxiosResponse<UpdateInfluencerStatusResponseProps>) => response.data,
    );
  return response;
};

export const UpdateStatusApi = async ({
  campaign_id,
  status,
}: {
  campaign_id: string;
  status: string;
}) => {
  const response = await api.patch<UpdateInfluencerStatusResponseProps>(
    AdminENDPOINT.STATUS_UPDATE,
    { campaign_id, status },
  );
  return response.data;
};

export const RejectedInfluencer = async (influencerRequest: MoreInfluencerRequest) => {
  const response = await api.post<ReadyMadeInfluencersRequest>(
    AdminENDPOINT.ADMIN_REJECTED_INFLUENCER,
    influencerRequest,
  );
  return response.data;
};

export const InfluencersListApi = async (campaign_id: string) => {
  const response = await api.get<ReadyMadeInfluencersApiResponse>(
    AdminENDPOINT.INFLUENCERS_LIST_BY_ID(campaign_id),
  );
  return response.data;
};

export const DeleteInfluencer = async (
  deleteInfluencerRequest: DeleterInfluenceerequest,
) => {
  const response = await api.delete(AdminENDPOINT.ADMIN_DELETE_INFLUENCER, {
    data: deleteInfluencerRequest,
  });
  return response.data;
};

export const DeleteCampaignApi = async (campaign_id: string) =>
  await api.delete(AdminENDPOINT.ADMIN_DELETE_CAMPAIGN(campaign_id));

export const AdminUpdateCampaignStatusApi = async (
  updateCampaignStatusRequest: UpdateCampaignStatusRequestProps,
) => {
  const response = await api.put(
    AdminENDPOINT.UPDATE_CAMPAIGN_STATUS(),
    updateCampaignStatusRequest,
  );
  return response.data;
};

export const AdminCompanyDetailsByIdApi = async (user_id: string) => {
  const response = await api.get(AdminENDPOINT.ADMIN_COMPANY_DETAILS_BY_ID(user_id));
  return response.data;
};

export const AdminUserManagementApi = async (page: number = 1) => {
  const response = await api.get(AdminENDPOINT.ADMIN_USER_MANAGEMENT, {
    params: { page },
  });
  return response.data;
};
export const AdminUpdateUserStatusApi = async (user_id: string, status: string) => {
  const response = await api.patch<UpdateUserStatusResponse>(
    AdminENDPOINT.ADMIN_USER_MANAGEMENT_BY_ID(user_id),
    {},
    { params: { status } },
  );
  return response;
};

export const AdminRejectandRegenerateInfluencerApi = async (
  rejectInfluencerRequest: RejectandRegenerateInfluencerRequest,
) => {
  const response = await api.post(
    AdminENDPOINT.ADMIN_REJECT_INFLUENCER,
    rejectInfluencerRequest,
  );
  return response.data;
};
export const AdminMoreInfluencerApi = async (
  moreInfluencerRequest: GeneratedMoreInfluencerRequest,
) => {
  const response = await api.post(AdminENDPOINT.ADMIN_MORE_INFLUENCER, {
    campaign_id: moreInfluencerRequest.campaign_id,
  });
  return response.data;
};

export const AdminAddInfluencersNumberApi = async (
  addInfluencersNumberRequest: AddInfluencersNumberRequest,
) => {
  const response = await api.post(AdminENDPOINT.ADMIN_ADD_INFLUENCERS_NUMBER, {
    campaign_influencer_id: addInfluencersNumberRequest.campaign_influencer_id,
    phone_number: addInfluencersNumberRequest.phone_number,
    platform: addInfluencersNumberRequest.platform,
    max_price: addInfluencersNumberRequest.max_price,
    min_price: addInfluencersNumberRequest.min_price,
  });
  return response.data;
};

export const WhatsAppuserSessionApi = async ({
  page,
  page_size,
}: {
  page: number;
  page_size: number;
}) => {
  const response = await api.get(AdminENDPOINT.ADMIN_WHATSAPP_USERSESSION, {
    params: {
      page,
      page_size,
    },
  });
  return response.data;
};

export const WhatsAppUserMessagesApi = async (
  thread_id: string,
  { page, page_size }: { page: number; page_size: number },
) => {
  const response = await api.get(
    AdminENDPOINT.ADMIN_WHATSAPP_USERMESSAGE_BY_ID(thread_id),
    {
      params: {
        page,
        page_size,
      },
    },
  );
  return response.data;
};

// inside src/routes/Admin/API/admin.routes.ts

export const HumanTakeoverApi = async (thread_id: string, enabled: boolean) => {
  const response = await api.post(AdminENDPOINT.ADMIN_HUMAN_TAKEOVER(thread_id), {
    enabled,
  });
  return response.data;
};

export const NegotiationHumanTakeoverApi = async (
  thread_id: string,
  enabled: boolean,
) => {
  const response = await api.post(
    AdminENDPOINT.ADMIN_NEGOTIATION_HUMAN_TAKEOVER(thread_id),
    { enabled },
  );
  return response.data;
};

export const NegotiationTakeoverValueApi = async (thread_id: string) => {
  const response = await api.get(
    AdminENDPOINT.ADMIN_NEGOTIATION_TAKEOVER_VALUE(thread_id),
  );
  return response.data;
};

export const NegotiationSendHumanMessageApi = async (
  thread_id: string,
  payload: { message: string; negotiation_id: string },
) => {
  const response = await api.post(
    AdminENDPOINT.ADMIN_NEGOTIATION_SEND_HUMAN_MESSAGE(thread_id),
    payload,
  );
  return response.data;
};

export const SendWhatsappMessageApi = async (thread_id: string, message: string) => {
  const response = await api.post(AdminENDPOINT.ADMIN_SEND_WHATSAPP_MESSAGEl(thread_id), {
    message: message,
  });
  return response.data;
};

export const ToogleStatusApi = async (thread_id: string) => {
  const response = await api.get(AdminENDPOINT.ADMIN_TAKEOVER_TOGGLE(thread_id));
  return response.data;
};

export const AdminInstaConversationListApi = async () => {
  const response = await api.get(AdminENDPOINT.ADMIN_INSTA_CONVERSATION_LIST);
  return response.data;
};
export const AdminDeleteUserApi = async (user_id: string) => {
  const response = await api.delete(AdminENDPOINT.ADMIN_DELETE_USER(user_id));
  return response.data;
};
export const AdminInstaConversationByIdApi = async (conversation_id: string) => {
  const response = await api.get(AdminENDPOINT.ADMIN_INSTA_CONVERSATION_BY_ID, {
    params: {
      conversation_id,
    },
  });
  return response.data;
};

export const AdminDeleteWhatsappUserMessagesApi = async (thread_id: string) => {
  const response = await api.delete(
    AdminENDPOINT.DELETE_WHATSAPP_USER_MESSAGES(thread_id),
  );
  return response.data;
};

export const AdminDeleteNegotiationApi = async (thread_id: string) => {
  const response = await api.delete(AdminENDPOINT.DELETE_NEGOTIATION(thread_id));
  return response.data as { success: boolean; message: string };
};

export const AdminSendNegotiationMessage = async (influencer_id: string) => {
  const response = await api.post(AdminENDPOINT.SENDNEGOTITIONTEMPLATE, null, {
    params: {
      influencer_id: influencer_id,
    },
  });

  return response.data;
};

export const NegotiationStatsApi = async (page: number = 1, page_size: number = 10) => {
  const response = await api.get(AdminENDPOINT.NEGOTIATION_STATS, {
    params: {
      page,
      page_size,
    },
  });
  return response.data;
};

export const NegotiationAgreedByCampaignApi = async (
  campaign_id: string,
): Promise<AgreedNegotiationResponse> => {
  const response = await api.get(
    AdminENDPOINT.NEGOTIATION_AGREED_BY_CAMPAIGN(campaign_id),
  );
  return response.data;
};


export const NegotiationChatDetailApi = async (_id: string) => {
  const response = await api.get(AdminENDPOINT.NEGOTIATION_CHAT_DETAIL, {
    params: {
      _id,
    },
  });
  return response.data;
};

export const SendOnboardingMessage = async (
  psid: number,
  messageTemplate: MessageTemplate,
) => {
  const metaApi = axios.create({
    baseURL: '',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAGE_ACCESS_TOKEN}`,
    },
  });

  const response = await metaApi.post(AdminENDPOINT.META_MESSAGE, {
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
  });

  return response.data;
};

export const AdminNegotiationApprovalStatusApi = async (
  thread_id: string,
  payload: { admin_approved?: string; Brand_approved?: string },
) => {
  const response = await api.patch(
    AdminENDPOINT.ADMIN_NEGOTIATION_APPROVAL_STATUS(thread_id),
    payload,
  );
  return response.data;
};

// Content -feedback

export const WhatsAppAdminCompanyMessagesApi = async (
  thread_id: string,
  negotiation_id: string,
  { page, page_size }: { page: number; page_size: number },
): Promise<CompanyAdminMessagesResponse> => {
  const response = await api.get(
    AdminENDPOINT.ADMIN_WHATSAPP_ADMIN_COMPANY_MESSAGES_BY_ID(thread_id),
    {
      params: {
        page,
        page_size,
        negotiation_id,
      },
    },
  );
  return response.data;
};

export const WhatsAppCompanyAdminSendHumanMessageApi = async (
  User_id: string,
  message: string,
  negotiation_id: string,
) => {
  const response = await api.post(
    AdminENDPOINT.ADMIN_WHATSAPP_COMPANY_ADMIN_SEND_HUMAN_MESSAGE(User_id),
    { message, negotiation_id },
  );
  return response.data;
};

export const sendAdminInfluencerMessage = async (
  input: SendAdminInfluencerMessageInput,
) => {
  try {
    const formData = buildAdminInfluencerMessageFormData(input);
    const response = await api.post(
      AdminENDPOINT.ADMIN_WHATSAPP_ADMIN_INFLUENCER_SEND_HUMAN_MESSAGE(input.threadId),
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(mapAdminInfluencerMessageError(error));
  }
};

export const WhatsAppAdminCompanySendHumanMessageApi = async (
  thread_id: string,
  message: string,
  negotiation_id: string,
) => {
  const response = await api.post(
    AdminENDPOINT.ADMIN_WHATSAPP_ADMIN_COMPANY_SEND_HUMAN_MESSAGE(thread_id),
    { message, negotiation_id },
  );
  return response.data;
};

export const WhatsAppAdminCompanyApproveVideoApi = async (
  payload: WhatsAppAdminCompanyApproveVideoPayload,
): Promise<WhatsAppAdminCompanyApproveVideoResponse> => {
  const body: Record<string, string> = {
    negotiation_id: payload.negotiation_id,
    campaign_id: payload.campaign_id,
    video_url: payload.video_url,
    brand_thread_id: payload.brand_thread_id,
  };
  if (payload.content_id != null) {
    body.content_id = payload.content_id;
  }
  if (payload.video_approve_admin != null) {
    body.video_approve_admin = payload.video_approve_admin;
  }
  if (payload.video_approve_brand != null) {
    body.video_approve_brand = payload.video_approve_brand;
  }

  const response = await api.post(
    AdminENDPOINT.ADMIN_WHATSAPP_ADMIN_COMPANY_APPROVE_VIDEO,
    body,
  );

  return response.data;
};

export const SaveContentFeedbackApi = async (payload: SaveContentFeedbackPayload) => {
  const response = await api.post(AdminENDPOINT.ADMIN_CONTENT_FEEDBACK, payload);
  return response.data;
};

export const GetAdminContentFeedbackApi = async (content_id: string) => {
  const response = await api.get(AdminENDPOINT.ADMIN_CONTENT_FEEDBACK_ADMIN_READ, {
    params: { content_id },
  });
  return response.data;
};

export const GetBrandContentFeedbackApi = async (content_id: string) => {
  const response = await api.get(AdminENDPOINT.ADMIN_CONTENT_FEEDBACK_BRAND_READ, {
    params: { content_id },
  });
  return response.data;
};

export const WhatsAppAdminInfluencerMessagesApi = async (
  thread_id: string,
  { page, page_size }: { page: number; page_size: number },
): Promise<AdminInfluencerMessagesResponse> => {
  const response = await api.get(
    AdminENDPOINT.ADMIN_WHATSAPP_ADMIN_INFLUENCER_MESSAGES_BY_ID(thread_id),
    {
      params: {
        page,
        page_size,
      },
    },
  );

  return response.data;
};

export const DeleteAdminInfluencerMessagesApi = async (
  thread_id: string,
): Promise<{ success: boolean; thread_id: string; deleted_count: number }> => {
  const response = await api.delete(
    AdminENDPOINT.ADMIN_WHATSAPP_ADMIN_INFLUENCER_MESSAGES_DELETE(thread_id),
  );
  return response.data;
};

export const SendRevisionMessage = async (data: SendRevisionPayload) => {
  const response = await api.post(AdminENDPOINT.SENDREVISIONMESSAGE, data)
  return response.data
}

export const ExtractContentRevisionforInfluencer = async (
  negotiation_id: string,
  message_id?: string
) => {
  const response = await api.get(
    AdminENDPOINT.CONTENTDETAILSFORINFLUENCER(negotiation_id),
    {
      params: {
        message_id: message_id,
      },
    }
  )

  return response.data
}

export const ExtractDemoGraphics = async (
  campaign_id: string,
  username: string,
  url: string
) => {
  const response = await api.post(AdminENDPOINT.EXTRACTDEMOGRAPHICS, {
    campaign_id,
    username,
    url,
  });

  return response.data;
};

export const ExtractAllInfluencerDemoGraphics = async (campaign_id: string) => {
  const response = await api.get(
    AdminENDPOINT.EXTRACTCAMPAIGNALLINFLUENCERREPORT(campaign_id)
  )
  return response.data;
}