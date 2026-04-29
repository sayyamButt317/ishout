export interface Profile {
    username: string;
    name: string;
    profile_image: string;
    biography: string;
    followers: number;
    following: number;
    media_count: number;
}

export interface Reel {
    url: string;
    thumbnail: string;
    media_url: string;
    likes: number;
    comments: number;
    views: number | "N/A";
    interaction: number;
    caption: string;
    timestamp: string;
}

export interface InfluencerData {
    profile: Profile;
    reel: Reel;
}
export interface Influencer {
    username: string;
    shortcode: string;
    data: InfluencerData;
    updated_at: string;
}
export interface InfluencerReportResponse {
    campaign_id: string;
    total: number;
    influencers: Influencer[];
}