export interface CampaignBrief {
    id?: string;
    title: string;
    brand_name_influencer_campaign_brief: string;
    campaign_overview: string[];
    campaign_objectives: string[];
    target_audience: string[];
    influencer_profile: string[];
    key_campaign_message: string[];
    content_direction: string[];
    deliverables_per_influencer: string[];
    hashtags_mentions: string[];
    timeline: string[];
    approval_process: string[];
    kpis_success_metrics: string[];
    usage_rights: string[];
    dos_donts: string[];
    campaign_logo_url?: string | null;
}

// campaignbrieftype.ts
export interface UpdateCampaignBrief {
    id: string; 
    video_links?: string[] | null;
    campaign_logo_url?: string | null;
    brand_name_influencer_campaign_brief: string;
    campaign_overview: string[];
    campaign_objectives: string[];
    target_audience: string[];
    influencer_profile: string[];
    key_campaign_message: string[];
    content_direction: string[];
    deliverables_per_influencer: string[];
    hashtags_mentions: string[];
    timeline: string[];
    approval_process: string[];
    kpis_success_metrics: string[];
    usage_rights: string[];
    dos_donts: string[];
}

// New payload type
export interface UpdateCampaignBriefPayload {
  brief: UpdateCampaignBrief;
  product_image_urls?: File | null;
}