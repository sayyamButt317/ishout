
const ROLE = "admin"
export const AdminENDPOINT = {
  INFLUENCERS_CAMPAIGN_BY_ID: (campaign_id: string) => `/${ROLE}/campaigns/${campaign_id}`,
  INFLUENCERS_LIST_BY_ID: (campaign_id: string) =>
    `/${ROLE}/campaigns/${campaign_id}/generate-influencers`,

  ADMIN_DELETE_INFLUENCER: `/${ROLE}/delete-influencer`,
  ADMIN_REJECTED_INFLUENCER: `/find-influencer/more`,
  ADMIN_UPDATE_INFLUENCER_STATUS: `/${ROLE}/campaigns/update-influencer-status`,

  ADMIN_ALL_CAMPAIGN: `/${ROLE}/campaigns`,
  ADMIN_PENDING_CAMPAIGN: `/${ROLE}/pending-campaigns`,
  ADMIN_PROCESSING_CAMPAIGN: `/${ROLE}/processing-campaigns`,
  ADMIN_APPROVED_CAMPAIGN: `/${ROLE}/approved-campaign`,
  ADMIN_APPROVED_CAMPAIGN_BY_ID: (campaign_id: string) =>
    `/${ROLE}/approved-campaign/${campaign_id}`,
  ADMIN_ONBOARDING_INFLUENCERS: (campaign_id: string) =>
    `/${ROLE}/company-approved-influencers/${campaign_id}`,
  ADMIN_ONBOARDING_CAMPAIGNS: `/${ROLE}/onboarding-campaigns`,
  ADMIN_DELETE_USER: (user_id: string) => `/${ROLE}/delete-user/${user_id}`,

  ADMIN_GENERATE_INFLUENCERS_BY_ID: (campaign_id: string) =>
    `/${ROLE}/campaigns/generate-influencers/${campaign_id}`,
  ADMIN_GENERATED_INFLUENCERS_BY_ID: (campaign_id: string) =>
    `/${ROLE}/generated-influencers/${campaign_id}`,
  UPDATE_CAMPAIGN_STATUS: () => `/${ROLE}/campaigns/update-status`,
  STATUS_UPDATE: `/${ROLE}/campaigns/status-update`,
  ADMIN_DELETE_CAMPAIGN: (campaign_id: string) => `/${ROLE}/delete-campaign/${campaign_id}`,
  ADMIN_NOTIFICATION: `/ws/admin`,
  ADMIN_COMPANY_DETAILS_BY_ID: (user_id: string) => `/${ROLE}/company-data/${user_id}`,

  ADMIN_USER_MANAGEMENT: `/${ROLE}/user-management`,
  ADMIN_USER_MANAGEMENT_BY_ID: (user_id: string) => `/${ROLE}/user-management/${user_id}`,
  ADMIN_REJECT_INFLUENCER: `/${ROLE}/campaigns/reject-and-regenerate`,
  ADMIN_MORE_INFLUENCER: `/${ROLE}/more-influencers`,
  ADMIN_ADD_INFLUENCERS_NUMBER: `/${ROLE}/add-influencer-number`,

  ADMIN_WHATSAPP_USERSESSION: `/${ROLE}/whatsapp-users-sessions`,
  ADMIN_WHATSAPP_USERMESSAGE_BY_ID: (thread_id: string) =>
    `/${ROLE}/whatsapp-messages/${thread_id}`,

  ADMIN_HUMAN_TAKEOVER: (thread_id: string) =>
    `/${ROLE}/whatsapp/toggle-takeover/${thread_id}`,
  ADMIN_SEND_WHATSAPP_MESSAGEl: (thread_id: string) =>
    `/${ROLE}/whatsapp/send-human-message/${thread_id}`,
  ADMIN_TAKEOVER_TOGGLE: (thread_id: string) =>
    `/${ROLE}/whatsapp/takeover-value/${thread_id}`,

  ADMIN_INSTA_CONVERSATION_LIST: `/${ROLE}/instagram/conversations-list`,
  ADMIN_INSTA_CONVERSATION_BY_ID: `/${ROLE}/instagram/conversation-with-user`,

  ADMIN_REPLY_INSTAGRAM_MESSAGE: `https://graph.facebook.com/v23.0/me/messages`,
  META_MESSAGE: `https://graph.facebook.com/v23.0/me/messages`,

  DELETE_WHATSAPP_USER_MESSAGES: (thread_id: string) =>
    `/${ROLE}/delete-whatsapp-chat/${thread_id}`,
  SENDNEGOTITIONTEMPLATE: `/admin/negotiation-initial-message`,
  NEGOTIATION_STATS: `/${ROLE}/negotiation-controls`,
  NEGOTIATION_AGREED_BY_CAMPAIGN: (campaign_id: string) =>
    `/${ROLE}/negotiation-controls/agreed/${campaign_id}`,
  NEGOTIATION_CHAT_DETAIL: `/admin/negotiation-chat-detail`,
  ADMIN_NEGOTIATION_HUMAN_TAKEOVER: (thread_id: string) =>
    `/${ROLE}/negotiation/toggle-takeover/${thread_id}`,
  ADMIN_NEGOTIATION_TAKEOVER_VALUE: (thread_id: string) =>
    `/${ROLE}/negotiation/takeover-value/${thread_id}`,
  ADMIN_NEGOTIATION_SEND_HUMAN_MESSAGE: (thread_id: string) =>
    `/${ROLE}/negotiation/send-human-message/${thread_id}`,

  DELETE_NEGOTIATION: (thread_id: string) => `/admin/negotiation-controls/${thread_id}`,
  ADMIN_NEGOTIATION_APPROVAL_STATUS: (thread_id: string) =>
    `/${ROLE}/negotiation/approval-status/${thread_id}`,

  ADMIN_WHATSAPP_ADMIN_INFLUENCER_MESSAGES_BY_ID: (thread_id: string) =>
    `/${ROLE}/whatsapp-admin-influencer-messages/${thread_id}`,
  ADMIN_WHATSAPP_ADMIN_INFLUENCER_MESSAGES_DELETE: (thread_id: string) =>
    `/${ROLE}/whatsapp-admin-influencer-messages/${thread_id}`,

  ADMIN_WHATSAPP_ADMIN_COMPANY_MESSAGES_BY_ID: (thread_id: string) =>
    `/${ROLE}/whatsapp-admin-company-messages/${thread_id}`,

  ADMIN_WHATSAPP_ADMIN_COMPANY_APPROVE_VIDEO: `/${ROLE}/whatsapp-admin-company/approve-video`,

  ADMIN_WHATSAPP_ADMIN_INFLUENCER_SEND_HUMAN_MESSAGE: (thread_id: string) =>
    `/${ROLE}/whatsapp-admin-influencer/send-human-message/${thread_id}`,

  ADMIN_WHATSAPP_COMPANY_ADMIN_SEND_HUMAN_MESSAGE: (user_id: string) =>
    `/${ROLE}/whatsapp-admin-company/send-company-admin-message/${user_id}`,

  ADMIN_WHATSAPP_ADMIN_COMPANY_SEND_HUMAN_MESSAGE: (thread_id: string) =>
    `/${ROLE}/whatsapp-admin-company/send-human-message/${thread_id}`,

  ADMIN_CONTENT_FEEDBACK: `/${ROLE}/content-feedback`,
  ADMIN_CONTENT_FEEDBACK_ADMIN_READ: `/${ROLE}/content-feedback/admin`,
  ADMIN_CONTENT_FEEDBACK_BRAND_READ: `/${ROLE}/content-feedback/brand`,
  SENDREVISIONMESSAGE: `/${ROLE}/send-revision`,
  CONTENTDETAILSFORINFLUENCER: (negotiation_id: string) =>
    `/${ROLE}/feedback/${negotiation_id}`,

  EXTRACTDEMOGRAPHICS: `/${ROLE}/extract-report`,
  EXTRACTCAMPAIGNALLINFLUENCERREPORT: (campaign_id: string) =>
    `/${ROLE}/campaign-influncersReport?campaign_id=${campaign_id}`,
  CAMPAIGNANALTICS: (campaign_id: string) =>
    `/${ROLE}/campaign-analytics/${campaign_id}`,

  /** POST JSON — store influencer demographics row */
  ADMIN_STORE_INFLUENCER_DEMOGRAPHICS: `/${ROLE}/store/Influencer-demographics`,
};