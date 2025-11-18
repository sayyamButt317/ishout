export const AdminENDPOINT = {
    INFLUENCERS_CAMPAIGN_BY_ID: (campaign_id: string) => `/admin/campaigns/${campaign_id}`,
    INFLUENCERS_LIST_BY_ID: (campaign_id: string) => `/admin/campaigns/${campaign_id}/generate-influencers`,

    ADMIN_DELETE_INFLUENCER: `/delete-influencer`,
    ADMIN_REJECTED_INFLUENCER: `/find-influencer/more`,
    ADMIN_UPDATE_INFLUENCER_STATUS: `/admin/campaigns/update-influencer-status`,

    ADMIN_ALL_CAMPAIGN: `/admin/campaigns`,
    ADMIN_PENDING_CAMPAIGN: `/admin/pending-campaigns`,
    ADMIN_PROCESSING_CAMPAIGN: `/admin/processing-campaigns`,
    ADMIN_APPROVED_CAMPAIGN: `/admin/approved-campaign`,
    ADMIN_APPROVED_CAMPAIGN_BY_ID: (campaign_id: string) => `/admin/approved-campaign/${campaign_id}`,
    ADMIN_ONBOARDING_INFLUENCERS: `/admin/company-approved-influencers`,

    ADMIN_GENERATE_INFLUENCERS_BY_ID: (campaign_id: string) => `/admin/campaigns/generate-influencers/${campaign_id}`,
    UPDATE_CAMPAIGN_STATUS: () => `/admin/campaigns/update-status`,
    ADMIN_DELETE_CAMPAIGN: (campaign_id: string) => `/admin/delete-campaign/${campaign_id}`,

    ADMIN_INSTAGRAM_NOTIFICATION: `/meta/notifications`,
}