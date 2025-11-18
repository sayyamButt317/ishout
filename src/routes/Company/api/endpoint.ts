export const CompanyENDPOINT = {
  QUESTION_GUIDED: `/question-guided`,

  // Campaign
  CAMPAIGN: `/company/campaigns`,
  CREATE_CAMPAIGN: `/company/campaigns`,
  CAMPAIGN_REJECTED_INFLUENCERS: `/auth/campaigns/rejected-influencers`,
  CAMPAIGN_APPROVED_INFLUENCERS: `/auth/campaigns/approved-influencers`,
  // Profile 
  USER_PROFILE: `/auth/profile`,
  UPDATE_USER_PROFILE: `/auth/profile`,
  CHANGE_PASSWORD: `/auth/change-password`,

  COMPANY_UPDATE_INFLUENCER_STATUS: `/company/campaigns/update-influencer-status`,
  APPROVED_CAMPAIGN_BY_ID: (user_id: string) => `/company/approved-campaigns/${user_id}`,
};