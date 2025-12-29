export interface FindInfluencerRequestProps {
  name?: string;
  platform: string[];
  category: string[];
  limit: string;
  followers: string[];
  country: string[];
  company_name: string;
}
export type PlatformType = "instagram" | "youtube" | "tiktok" | "all" | "Instagram" | "YouTube" | "TikTok"
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
  campaign_id: string;
  influencer_id: string;
  country: string;
  followers: number;
  engagementRate: number;
  bio: string;
  picture: string;
  username: string;
  platform: PlatformType;
  status: string;
  admin_approved: boolean;
  created_at: string;
  updated_at: string;
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
  id: string;
  name: string;
  username: string;
  picture: string;
  platform: string;
  category: string;
  company_name: string;
  followers: number;
  engagementRate: number;
  bio: string;
  country: string;
  countryCode: string | null;
  page_content: string;
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

export interface GeneratedMoreInfluencerRequest {
  campaign_id: string;
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

interface TemplateProps {
  _id: string[];
  username: string[];
  platform: string[];
  category: string[];
  limit: string;
  followers: string[];
  country: string[];
  campaign_id: string;
  iseditable: boolean;
  isSelected: boolean;
  results?: ReadyMadeInfluencersApiResponse[];

  setField: <K extends keyof Omit<TemplateProps, 'setField' | 'getField' | 'addToArray' | 'removeFromArray' | 'clearArray'>>(
    field: K,
    value: TemplateProps[K]
  ) => void;

  getField: <K extends keyof Omit<TemplateProps, 'setField' | 'getField' | 'addToArray' | 'removeFromArray' | 'clearArray'>>(
    field: K
  ) => TemplateProps[K];

  addToArray: (field: "platform" | "category" | "followers" | "country", value: string) => void;
  removeFromArray: (field: "platform" | "category" | "followers" | "country" | "limit", value: string) => void;
  clearArray: (field: "platform" | "category" | "followers" | "country" | "limit", value: string) => void;
  clearTemplate: () => void;
  setResults: (results: ReadyMadeInfluencersApiResponse[] | undefined) => void;
}

