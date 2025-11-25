export const CompanyENDPOINT = {

  CAMPAIGN: `/company/campaigns`,
  CREATE_CAMPAIGN: `/company/campaigns`,
  CAMPAIGN_REJECTED_INFLUENCERS: `/company/campaigns/rejected-influencers`,

  COMPANY_UPDATE_INFLUENCER_STATUS: `/company/campaigns/update-influencer-status`,
  REVIEW_PENDING_INFLUENCERS: (campaign_id: string) => `/company/review-pending-influencers/${campaign_id}`,
  COMPNAY_APPROVED_CAMPAIGN: (user_id: string) => `/company/${user_id}/approved-campaign`,
};