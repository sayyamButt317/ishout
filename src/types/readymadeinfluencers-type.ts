export interface InfluencerResponseProps {
  platform: string[];
  category: string[];
  limit: string;
  followers: string[];
  country: string[];
  is_campaign_create: boolean;
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
  data: {
    campaign: {
      campaign_id: string;
    }
  }
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

export interface ApprovedInfluencersRequest {
  campaign_id: string;
  influencers: {
    influencer_id: string;
    platform: string;
  }[];
};
export interface ApprovedInfluencersResponse {
  influencers: ApprovedInfluencersResponse[];
  notes: {
    requested: number;
    returned: number;
    global_cap: number;
    strategy: string;
  };
}