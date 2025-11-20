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
    requested_date: string;
    user_id: string;
    // user_details: {
    //     contact_person: string;
    //     phone: string;
    // }
    influencers_ids: number;
    influencer_references: {
        influencers_id: string;
        platform: string;
    }
    rejected_ids: number;
    created_at: string;
    updated_at: string;
    generated_influencers: number;
    generated_influencers_count: number;
    approved_influencers_count: number;
    rejected_influencers_count: number;
    rejectedByUser: number;
    rejected_by_user_count: number;
}