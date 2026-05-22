export interface DemographicsOcrPayload {
  image_url: string[];
  campaign_id: string;
  influencer_id: string;
}

export interface DemographicsOcrMetrics {
  views?: string;
  watch_time?: string;
  average_watch_time?: string;
  interactions?: string;
  profile_activity?: string;
  accounts_reached?: string;
  likes?: string;
  comments?: string;
  shares?: string;
  saves?: string;
  reposts?: string;
  follows?: string;
  followers_percent?: string;
  non_followers_percent?: string;
  [key: string]: string | undefined;
}

export interface DemographicsOcrGenderSplit {
  male?: string;
  female?: string;
  [key: string]: string | undefined;
}

export interface DemographicsOcrAgeGroups {
  [ageRange: string]: string | undefined;
}

export interface DemographicsOcrDemographicsBlock {
  gender_split?: DemographicsOcrGenderSplit;
  age_groups?: DemographicsOcrAgeGroups;
  total_followers?: string;
  top_countries?: Array<{ name?: string; value?: string; percent?: string } | string>;
  top_cities?: Array<{ name?: string; value?: string; percent?: string } | string>;
  top_languages?: Array<{ name?: string; value?: string; percent?: string } | string>;
  most_active_times?: {
    days?: string[];
    hours?: string[];
  };
  follower_growth?: {
    value?: string;
    change?: string;
  };
  [key: string]: unknown;
}

export interface DemographicsOcrResponse {
  platform?: string;
  content_type?: string;
  posted_at?: string;
  caption?: string;
  account_handle?: string;
  period?: string;
  metrics?: DemographicsOcrMetrics;
  demographics?: DemographicsOcrDemographicsBlock;
  extra?: Record<string, string>;
}

/** GET /extract-insights — persisted record from DB */
export interface StoredInsightsRecord {
  _id: string;
  influencer_id: string;
  campaign_id: string;
  created_at: string;
  updated_at: string;
  insights: DemographicsOcrResponse;
}

export function mapStoredInsightsToOcrResponse(
  payload: StoredInsightsRecord | DemographicsOcrResponse | null | undefined,
): DemographicsOcrResponse | null {
  if (!payload) return null;

  const inner =
    'insights' in payload && payload.insights != null
      ? payload.insights
      : (payload as DemographicsOcrResponse);

  if (!inner || (typeof inner === 'object' && !inner.metrics && !inner.demographics && !inner.platform)) {
    return null;
  }

  const extra: Record<string, string> = { ...(inner.extra ?? {}) };
  const metrics: DemographicsOcrMetrics = { ...(inner.metrics ?? {}) };

  if (extra.followers_percent && !metrics.followers_percent) {
    metrics.followers_percent = extra.followers_percent;
  }
  if (extra.non_followers_percent && !metrics.non_followers_percent) {
    metrics.non_followers_percent = extra.non_followers_percent;
  }

  const handle = inner.account_handle?.trim();
  const period = inner.period?.trim();

  return {
    platform: inner.platform,
    content_type: inner.content_type,
    posted_at: period || inner.posted_at,
    period: period || inner.period,
    account_handle: handle,
    caption:
      inner.caption ||
      (handle && handle !== 'unknown' ? `@${handle.replace(/^@/, '')}` : undefined),
    metrics,
    demographics: inner.demographics,
    extra,
  };
}
