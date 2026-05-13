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

export interface DemographicsOcrResponse {
  platform?: string;
  content_type?: string;
  posted_at?: string;
  caption?: string;
  metrics?: DemographicsOcrMetrics;
  demographics?: {
    gender_split?: DemographicsOcrGenderSplit;
    [key: string]: unknown;
  };
  extra?: Record<string, string>;
}
