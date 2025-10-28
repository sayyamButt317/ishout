export const AdminENDPOINT = {
    INFLUENCERS_LIST: (campaign_id: string) => `/campaigns/${campaign_id}`,
    ADMIN_DELETE_INFLUENCER: `/delete-influencer`,
    ADMIN_REJECTED_INFLUENCER: `/find-influencer/more`,
    ADMIN_APPROVED_INFLUENCER: `/campaigns/approve-multiple-influencers`,

    ADMIN_ALL_CAMPAIGN: `/admin/campaigns`,
    ADMIN_CAMPAIGN_BY_ID: (campaign_id: string) => `/admin/campaigns/${campaign_id}`,
    UPDATE_CAMPAIGN_STATUS: () => `/admin/campaigns/update-status`,
}