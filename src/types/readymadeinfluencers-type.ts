import { PlatformType } from "../store/Campaign/ready-made";

export interface InfluencerResponseProps {
  platform: PlatformType;
  category: string;
  limit: string;
  followers: string;
  country: string;
}

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
  content: string;
  influencer_username: string;
  name: string;
  bio: string;
  country: string;
  followers: number;
  engagement_rate: string; 
  pic: string;
  external_link: string;
}

export interface ReadyMadeInfluencersResponse {
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