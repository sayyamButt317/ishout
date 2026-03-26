export interface CardType {
  id: string;
  title: string;
  campaign: string;
  thumb: string;
  thread_id?: string;
  rights?: string;
  comments?: number;
  status?: string;
}

export interface CampaignBrief {
  title?: string;
  campaign_logo_url?: string;
}

export interface NegotiationItem {
  _id: string;
  name?: string;
  thread_id?: string;
  negotiation_status?: string;
  campaign_brief?: CampaignBrief;
}

export interface ChatMessage {
  _id: string;
  sender: 'ADMIN' | 'USER' | 'AI';
  username?: string;
  message: string;
  timestamp: string;
}
export interface NegotiationResponse {
  negotiation_controls?: NegotiationItem[];
}
