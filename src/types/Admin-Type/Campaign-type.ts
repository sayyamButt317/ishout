import { PlatformType } from '../readymadeinfluencers-type';
export interface UpdateCampaignStatusRequestProps {
  campaign_id: string;
  status: string;
}

export interface UpdateInfluencerStatusRequestProps {
  campaign_id: string;
  influencer_id: string;
  platform: string;
  status: string;
  username: string;
  followers: number;
  engagementRate: number;
  picture: string;
  bio: string;
  country: string;
  company_user_id?: string;
  pricing?: number;
  admin_approved?: boolean;
}
export interface UpdateInfluencerStatusResponseProps {
  message: string;
  status: string;
}
export interface ApiInfluencerResponse {
  bio: string;
  country: string;
  engagementRate: number;
  followers: number;
  picture: string;
  platform: string | null;
  username: string;
}

export interface AdminAllCampaignApiResponse {
  _id: string;
  user_type: string;
  name: string;
  description: string;
  platform: PlatformType;
  category: string[];
  followers: string[];
  country: string[];
  limit: number;
  status: string;
  company_name: string;
  requested_date: string;
  user_id: string;
  influencers_ids: number;
  generated: boolean;
  campaign_logo_url: string;
  created_at: string;
  updated_at: string;
  brief_id?: string;
}

export interface CreateCampaignRequest {
  name?: string;
  platform: string[];
  category: string[];
  limit: string;
  followers: string[];
  country: string[];
}

export interface CompanyCampaignResponse {
  /** Present on some list responses; company `/campaigns` may only send `campaign_id`. */
  _id?: string;
  campaign_id: string;
  company_name: string;
  category: string[];
  name: string;
  platform: PlatformType;
  followers: number[];
  country: string[];
  limit: number;
  user_type: string;
  status: string;
  pending_influencers_count: number;
  approved_influencer_count: number;
  campaign_logo_url: string;
  created_at: string;
  updated_at: string;
  brief_id?: string;
  admin_approved?: boolean;
  company_approved?: boolean;
}

export interface CampaignResponse {
  _id: string;
  id: string;
  userId: string;
  country: string[];
  followers: string[];
  engagementRate: number[];
  name: string[];
  username: string[];
  bio: string;
  picture: string;
  page_content: string;
  platform: string;
  category: string;
}

export interface ApprovedCampaignResponse {
  _id: string;
  campaign_id: string;
  company_name: string;
  category: string[];
  followers: string[];
  country: string[];
  user_type: string;
  name: string;
  platform: PlatformType;
  limit: number;
  status: string;
  campaign_logo_url: string;
  created_at: string;
  brief_id?: string;
}
