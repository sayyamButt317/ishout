export interface InfluencerPostingDetailsRequest {
    campaign_id: string;
    campaign_name: string;
    logo_url: string;
    posting_date: string;
    posting_time: string;
    hashtag: string[];
    tag_users: string[];
    caption: string;
}