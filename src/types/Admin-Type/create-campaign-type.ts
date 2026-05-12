import type { CampaignBrief } from '@/src/types/Compnay/campaignbrieftype';
import type { ReadyMadeInfluencersApiResponse } from '@/src/types/readymadeinfluencers-type';

/** GET /admin/all-companies-names — JSON array of company display names. */
export type AdminAllCompaniesNamesResponse = string[];

/** POST /admin/generate-campaign — admin creates campaign / generates influencers for a company. */
export interface AdminCreateCampaignRequest {
  company_name: string;
  platform: string[];
  category: string[];
  followers?: string[] | null;
  country?: string[] | null;
  limit: number;
  name?: string | null;
  brief_id?: string | null;
}

/** Response body for POST /admin/generate-campaign (same influencer row shape as company create flow). */
export type AdminCreateCampaignApiResponse = ReadyMadeInfluencersApiResponse[];

/** POST /admin/campaign-brief — body is only natural-language input (no user_id / company lookup). */
export interface AdminCampaignBriefRequest {
  user_input: string;
}

/** Matches backend `CampaignBriefResponse` for admin campaign-brief generation. */
export interface AdminCampaignBriefApiResponse {
  id?: string | null;
  campaign_name?: string;
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

  platform?: string[];
  category?: string[];
  limit?: number | null;
  /** Backend may return a single string or legacy array shape. */
  followers?: string | string[] | null;
  country?: string[];

  product_image_urls?: string[] | null;
  video_links?: string[] | null;
  campaign_logo_url?: string | null;
}

export function mapAdminCampaignBriefApiResponseToCampaignBrief(
  res: AdminCampaignBriefApiResponse,
): CampaignBrief {
  return {
    id: res.id ?? undefined,
    title: res.title || res.campaign_name || 'Campaign Brief',
    brand_name_influencer_campaign_brief: res.brand_name_influencer_campaign_brief ?? '',
    campaign_overview: res.campaign_overview ?? [],
    campaign_objectives: res.campaign_objectives ?? [],
    target_audience: res.target_audience ?? [],
    influencer_profile: res.influencer_profile ?? [],
    key_campaign_message: res.key_campaign_message ?? [],
    content_direction: res.content_direction ?? [],
    deliverables_per_influencer: res.deliverables_per_influencer ?? [],
    hashtags_mentions: res.hashtags_mentions ?? [],
    timeline: res.timeline ?? [],
    approval_process: res.approval_process ?? [],
    kpis_success_metrics: res.kpis_success_metrics ?? [],
    usage_rights: res.usage_rights ?? [],
    dos_donts: res.dos_donts ?? [],
    campaign_logo_url: res.campaign_logo_url ?? null,
    video_links: res.video_links ?? null,
  };
}
