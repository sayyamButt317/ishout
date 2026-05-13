export class ReportsTyes {}

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
