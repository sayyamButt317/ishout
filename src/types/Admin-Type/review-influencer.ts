import { PlatformType } from "../readymadeinfluencers-type";

export interface ReviewInfluencerResponse {
    _id: string;
    username: string;
    picture: string;
    engagementRate: number;
    bio: string;
    followers: number;
    country: string;
    status: string;
    admin_approved: boolean;
    company_approved: boolean;
    campaign_id: string;
    influencer_id: string;
    platform: PlatformType;
}

export interface InfluencerReviewApiResponse {
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
    data?: ReviewInfluencerResponse[];
    influencers?: ReviewInfluencerResponse[];
}
