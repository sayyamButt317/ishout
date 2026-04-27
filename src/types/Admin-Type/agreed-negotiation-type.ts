export interface CampaignBrief {
  title?: string;
  deliverables_per_influencer?: string[];
  timeline?: string[];
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
  // The API previously returned `campaign` and `campaign_brief` at the top level.
  // Newer responses may omit those and instead include `campaign_brief` per negotiation.
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
