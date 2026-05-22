import type { Profile, Reel } from '@/src/types/Admin-Type/Feedback/influencer-type';

export interface OverallCampaignOutcomesResponse {
  total_influencers: number;
  total_likes: number;
  total_comments: number;
  total_interactions: number;
  total_followers: number;
  engagement_rate: number;
}

export interface InfluencerDemographicsAsset {
  id: string;
  image_url: string;
  content_type: string;
  content_id: string;
}

export interface InfluencerDemographicsAssetsResponse {
  demographics: InfluencerDemographicsAsset[];
}

export interface InfluencerReelAnalytics {
  CPV: number;
  CPE: number;
  CPM: number;
}

export interface CampaignReportProfile extends Profile {
  pricing?: number;
  engagementRate?: number;
}

export interface CampaignReportInfluencerData {
  profile: CampaignReportProfile;
  reel: Reel;
  analytics?: InfluencerReelAnalytics;
  demographics?: boolean;
  insights?: boolean;
  influencer_id?: string;
}

export interface CampaignReportInfluencer {
  /** MongoDB report document id — used for DELETE /admin/reports/delete/{id} */
  _id: string;
  username: string;
  influencer_id?: string;
  shortcode: string;
  data: CampaignReportInfluencerData;
  updated_at: string;
  /** When true at root level (some API shapes) */
  demographics?: boolean;
}

/** DELETE /admin/reports/delete/{id} and DELETE /company/reports/delete/{id} */
export interface DeleteCampaignReportResponse {
  success: boolean;
  message: string;
  id: string;
}

/** GET /admin/campaign-influncersReport?campaign_id=... */
export interface CampaignInfluencerReportResponse {
  campaign_id: string;
  total: number;
  influencers: CampaignReportInfluencer[];
}
