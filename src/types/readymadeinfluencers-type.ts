export interface InfluencerResponseProps {
  platform: string[];
  category: string[];
  limit: string;
  followers: string[];
  country: string[];
}
export type PlatformType = "Instagram" | "YouTube" | "TikTok" | ""
export interface FoundedInfluencers {
  username: string;
  name: string;
  bio: string;
  country: string;
  followers: number;
  engagementRate: number;
  pic: string;
}

export interface ReadyMadeInfluencerResponse {
  _id: string;
  id: string;
  userId: string | null;
  country: string;
  countryCode: string | null;
  followers: number;
  engagementRate: number;
  name: string;
  influencer_username: string;
  bio: string;
  pic: string;
  page_content: string;
  similarity_score: number;
  platform: string;
  category: string;
}

export interface ReadyMadeInfluencersRequest {
  category: string;
  platform: string;
  followers: {
    min: number;
    max: number;
    range: string;
  };
  limit: number;
  count: number;
  country: string;
  influencers: ReadyMadeInfluencerResponse[];
}

export interface ReadyMadeInfluencersApiResponse {
  influencers: ReadyMadeInfluencerResponse[];
  notes: {
    requested: number;
    returned: number;
    global_cap: number;
    strategy: string;
  };
}

export interface DeleterInfluenceerequest {
  platform: string;
  influencer_id: string;
}

export interface MoreInfluencerRequest {
  platform: string[];
  category: string[];
  followers: string[];
  country: string[];
  limit: number;
  more: number;
  exclude_ids: string[];
}

export interface MoreInfluencerReplacePayload {
  request: MoreInfluencerRequest;
  replaceId: string;
}
