export type ApprovedContentItem = {
  _id: string;
  campaign_id: string;
  negotiation_id: string;
  video_url: string;
  brand_thread_id: string;
  created_at: string;
  updated_at: string;
  video_approve_admin: string;
  video_approve_brand: string;
  caption?: string;
  hashtags?: string[];
  subtitles?: string;
};

export type ApprovedContentsResponse = {
  approved_contents: ApprovedContentItem[];
  total: number;
  campaign_id: string;
};
