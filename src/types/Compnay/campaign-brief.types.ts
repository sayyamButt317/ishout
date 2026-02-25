export interface CampaignBriefResponseContent {
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
}

export interface CampaignBriefItem {
  id: string;
  user_id: string;
  prompt: string;
  response: CampaignBriefResponseContent;
  status: string;
  version: number;
  regenerated_from: string | null;
  created_at: string;
}

export type GetCampaignBriefResponse = CampaignBriefItem[];