export interface CampaignBrief {
  title?: string;
  deliverables_per_influencer?: string[];
  timeline?: string[];
}

export interface CampaignInfo {
  platform?: string[];
  category?: string[];
  company_name?: string;
  brand_thread_id?: string;
  brief_id?: string;
}

export interface Influencer {
  _id: string;
  username?: string;
  picture?: string;
  engagementRate?: number;
  country?: string;
  platform?: string;
}

export interface NegotiationItem {
  _id: string;
  campaign_id?: string;
  thread_id?: string;
  brand_thread_id?: string;

  name?: string;

  admin_approved?: string | null;
  Brand_approved?: string | null;

  campaign_logo_url?: string;

  influencer?: Influencer;
  campaign_brief?: CampaignBrief;
}

export interface NegotiationResponse {
  campaign_id?: string;
  campaign?: CampaignInfo;
  campaign_brief?: CampaignBrief;
  campaign_logo_url?: string;

  negotiations?: NegotiationItem[];
  negotiation_controls?: NegotiationItem[];
 
  total?: number;
}

export interface CardType {
  id: string;
  campaign_id?: string;
  title: string;
  campaign: string;
  thumb: string;

  thread_id?: string;
  brand_thread_id?: string;

  Brand_approved?: string | null;
  rights?: string;
  comments?: number;
  status?: string;

  source: NegotiationItem;
}
