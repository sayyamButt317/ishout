import { PlatformType } from "../readymadeinfluencers-type";
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
    created_at: string;
    updated_at: string;
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
    campaign_id: string;
    name: string;
    platform: PlatformType;
    followers: string[];
    limit: number;
    status: string;
    created_at: string;
    updated_at: string;
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