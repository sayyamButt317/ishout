export type WhatsAppAdminCompanyApproveVideoPayload = {
  brand_thread_id: string;
  campaign_id: string;
  negotiation_id: string;
  video_url: string;
  content_id?: string;
  video_approve_admin?: string;
  video_approve_brand?: string;
};

export type WhatsAppAdminCompanyApproveVideoResponse = {
  success: boolean;
  message: string;
  approved_content_id?: string;
  video_approve_admin?: string;
  video_approve_brand?: string;
};

/** Tags bucket for approved-content update (API accepts full shape; UI may send a subset) */
export type ApprovedContentTagsPayload = {
  people?: string[];
  brand?: string[];
};

export type UpdateApprovedContentPayload = {
  hashtags?: string[];
};
