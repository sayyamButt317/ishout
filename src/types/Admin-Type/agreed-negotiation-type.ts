export interface CampaignBrief {
  title?: string;
  brand_name_influencer_campaign_brief?: string;
  campaign_overview?: string[];
  campaign_objectives?: string[];
  target_audience?: string[];
  influencer_profile?: string[];
  key_campaign_message?: string[];
  content_direction?: string[];
  deliverables_per_influencer?: string[];
  hashtags_mentions?: string[];
  timeline?: string[];
  approval_process?: string[];
  kpis_success_metrics?: string[];
  usage_rights?: string[];
  dos_donts?: string[];
}

export interface Influencer {
  _id: string;
  username?: string;
  picture?: string;
  engagementRate?: number;
  country?: string;
  platform?: string;
}

export interface AgreedNegotiation {
  _id: string;
  thread_id: string;
  brand_thread_id?: string;
  campaign_id: string;
  campaign_logo_url?: string;
  name?: string;
  influencer_id: string;
  Brand_approved?: string | null;
  admin_approved?: string | null;
  campaign_brief?: CampaignBrief;
  influencer?: Influencer;
}

export interface CampaignMeta {
  platform?: string[];
  category?: string[];
  company_name?: string;
  brand_thread_id?: string;
  brief_id?: string;
}

export interface AgreedNegotiationResponse {
  campaign_id: string;
  campaign?: CampaignMeta;
  campaign_brief?: CampaignBrief;
  campaign_logo_url?: string;
  negotiations: AgreedNegotiation[];
  total: number;
}




export interface CardType {
  id: string;
  campaign_id?: string;

  campaign: string;
  thumb: string;

  influncer_name: string;
  picture?: string;

  thread_id?: string;
  brand_thread_id?: string;

  admin_approved?: string | null;
  Brand_approved?: string | null;
  status?: string;

  rights?: string;
  comments?: number;

  engagementRate?: number;
  country?: string;
  platform?: string;
}
