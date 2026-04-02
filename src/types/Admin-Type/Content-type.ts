export interface CardType {
  id: string;
  campaign_id?: string;
  title: string;
  campaign: string;
  thumb: string;
  thread_id?: string;
  brand_thread_id?: string;
  admin_approved?: string | null;
  rights?: string;
  comments?: number;
  status?: string;
}

export interface CampaignBrief {
  title?: string;
}

export interface NegotiationItem {
  _id: string;
  campaign_id?: string;
  name?: string;
  thread_id?: string;
  brand_thread_id?: string;
  negotiation_status?: string;
  campaign_brief?: CampaignBrief;
  campaign_logo_url?: string;
  Brand_approved?: string | null;
  admin_approved?: string | null;
}

export interface ChatMessage {
  _id: string;
  sender: 'ADMIN' | 'USER' | 'AI';
  username?: string;
  message: string;
  timestamp: string;
  video_status?: string | null;
  video_url?: string | null;
  video_approve_admin?: string | null;
  video_approve_brand?: string | null;
}
export interface NegotiationResponse {
  campaign_id?: string;
  negotiations?: NegotiationItem[];
  total?: number;
  negotiation_controls?: NegotiationItem[];
}
