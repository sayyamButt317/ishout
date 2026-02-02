export const AdminENDPOINT = {
    INFLUENCERS_CAMPAIGN_BY_ID: (campaign_id: string) => `/admin/campaigns/${campaign_id}`,
    INFLUENCERS_LIST_BY_ID: (campaign_id: string) => `/admin/campaigns/${campaign_id}/generate-influencers`,

    ADMIN_DELETE_INFLUENCER: `/admin/delete-influencer`,
    ADMIN_REJECTED_INFLUENCER: `/find-influencer/more`,
    ADMIN_UPDATE_INFLUENCER_STATUS: `/admin/campaigns/update-influencer-status`,

    ADMIN_ALL_CAMPAIGN: `/admin/campaigns`,
    ADMIN_PENDING_CAMPAIGN: `/admin/pending-campaigns`,
    ADMIN_PROCESSING_CAMPAIGN: `/admin/processing-campaigns`,
    ADMIN_APPROVED_CAMPAIGN: `/admin/approved-campaign`,
    ADMIN_APPROVED_CAMPAIGN_BY_ID: (campaign_id: string) => `/admin/approved-campaign/${campaign_id}`,
    ADMIN_ONBOARDING_INFLUENCERS: (campaign_id: string) => `/admin/company-approved-influencers/${campaign_id}`,
    ADMIN_ONBOARDING_CAMPAIGNS: `/admin/onboarding-campaigns`,
    ADMIN_DELETE_USER: (user_id: string) => `/admin/delete-user/${user_id}`,

    ADMIN_GENERATE_INFLUENCERS_BY_ID: (campaign_id: string) => `/admin/campaigns/generate-influencers/${campaign_id}`,
    ADMIN_GENERATED_INFLUENCERS_BY_ID: (campaign_id: string) => `/admin/generated-influencers/${campaign_id}`,
    // update campaign status with background task for whatsapp users
    UPDATE_CAMPAIGN_STATUS: () => `/admin/campaigns/update-status`,
    // update campaign status without background task for all users
    STATUS_UPDATE: `/admin/campaigns/status-update`,
    ADMIN_DELETE_CAMPAIGN: (campaign_id: string) => `/admin/delete-campaign/${campaign_id}`,

    ADMIN_NOTIFICATION: `/ws/admin`,
    ADMIN_COMPANY_DETAILS_BY_ID: (user_id: string) => `/admin/company-data/${user_id}`,

    ADMIN_USER_MANAGEMENT: `/admin/user-management`,
    ADMIN_USER_MANAGEMENT_BY_ID: (user_id: string) => `/admin/user-management/${user_id}`,
    ADMIN_REJECT_INFLUENCER: `/admin/campaigns/reject-and-regenerate`,
    ADMIN_MORE_INFLUENCER: `/admin/more-influencers`,
    ADMIN_ADD_INFLUENCERS_NUMBER: `/admin/add-influencer-number`,

    ADMIN_WHATSAPP_USERSESSION: `/admin/whatsapp-users-sessions`,
    ADMIN_WHATSAPP_USERMESSAGE_BY_ID: (thread_id: string) => `/admin/whatsapp-messages/${thread_id}`,

    ADMIN_HUMAN_TAKEOVER: (thread_id: string) => `/admin/whatsapp/toggle-takeover/${thread_id}`,
    ADMIN_SEND_WHATSAPP_MESSAGEl: (thread_id: string) => `/admin/whatsapp/send-human-message/${thread_id}`,
    ADMIN_TAKEOVER_TOGGLE: (thread_id: string) => `/admin/whatsapp/takeover-value/${thread_id}`,

    ADMIN_INSTA_CONVERSATION_LIST: `/admin/instagram/conversations-list`,
    ADMIN_INSTA_CONVERSATION_BY_ID: `/admin/instagram/conversation-with-user`,

    ADMIN_REPLY_INSTAGRAM_MESSAGE: `https://graph.facebook.com/v23.0/me/messages`,
    META_MESSAGE: `https://graph.facebook.com/v23.0/me/messages`,

    DELETE_WHATSAPP_USER_MESSAGES: (thread_id: string) => `/admin/delete-whatsapp-messages/${thread_id}`,
}
