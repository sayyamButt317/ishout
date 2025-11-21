export const CompanyENDPOINT = {

  CAMPAIGN: `/company/campaigns`,
  CREATE_CAMPAIGN: `/company/campaigns`,
  CAMPAIGN_REJECTED_INFLUENCERS: `/company/campaigns/rejected-influencers`,

  COMPANY_UPDATE_INFLUENCER_STATUS: `/company/campaigns/update-influencer-status`,
  APPROVED_CAMPAIGN_BY_ID: (user_id: string) => `/company/approved-campaigns/${user_id}`,
};