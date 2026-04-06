export const CompanyENDPOINT = {
  CAMPAIGN_BREIF: `/company/campaign-brief`,
   GET_CAMPAIGN_BRIEF: (user_id: string) =>
    `/company/campaign-brief/${user_id}`,
     UPDATE_CAMPAIGN_BRIEF: (brief_id: string) =>
    `/company/update-campaign-brief/${brief_id}`,

    DELETE_CAMPAIGN_BRIEF: (brief_id: string) =>
    `/company/campaign-brief/${brief_id}`,
    
  GET_CAMPAIGN_BRIEF_DETAIL: (brief_id: string) =>
    `/company/campaign-brief/detail/${brief_id}`,
  
UPLOAD_CAMPAIGN_LOGO: (brief_id: string) =>
  `/company/update-brief-logo/${brief_id}`,
  
  CAMPAIGN: `/company/campaigns`,
  CREATE_CAMPAIGN: `/company/campaigns`,
  CAMPAIGN_REJECTED_INFLUENCERS: `/company/campaigns/rejected-influencers`,

  PROFILE_DETAILS: (user_id: string) => `/company/user-profile/${user_id}`,
  PROFILE_UPDATE: (user_id: string) => `/company/update-profile/${user_id}`,

  COMPANY_UPDATE_INFLUENCER_STATUS: `/company/campaigns/update-influencer-status`,
REVIEW_PENDING_INFLUENCERS: (campaign_id: string) =>
  `/company/campaigns/${campaign_id}/campaign-influencers`,
  COMPNAY_APPROVED_CAMPAIGN: (user_id: string) => `/company/${user_id}/approved-campaign`,
  APPROVED_CONTENT: '/company/approved-content',
  APPROVED_CONTENT_UPDATE: (approved_content_id: string) =>
    `/company/approved-content/${approved_content_id}`,
  FORGOT_PASSWORD: `/auth/forgot-password`,
  VERIFY_OTP: `/auth/verify-otp`,
  CHANGE_PASSWORD: (user_id: string) => `/company/change-password/${user_id}`,
  RESET_PASSWORD: `/company/reset-password`,
};