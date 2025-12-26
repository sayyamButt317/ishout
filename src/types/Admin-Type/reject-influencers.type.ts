export interface RejectandRegenerateInfluencerRequest {
    platform: string;
    category: string;
    followers: string[];
    country: string[];
    limit: number;
    campaign_id: string;
    generated_influencers_id: string[];
    rejected_influencers_id: string[];
}

export interface RejectandRegenerateInfluencerResponse {
    _id: string;
    username: string;
    followers: number;
    country: string;
    bio: string;
    engagementRate: number;
    picture: string;
    platform: string;
}