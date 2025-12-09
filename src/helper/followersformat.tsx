import { PlatformType } from "../types/readymadeinfluencers-type";

export const formatFollowersCompact = (followers: number) =>
  Intl.NumberFormat("en", { notation: "compact" }).format(followers);

export const formatEngagementRate = (rate: number) =>
  `${(rate * 100).toFixed(2)}%`;

export const formatFollowers = (num: number) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`;
  }
  return num.toString();
};

export const engagementPercentage = (engagementRate: number) =>
  Math.round(engagementRate * 100);

export const UsernameLink = (platform: PlatformType, username: string) => {
  if (platform === "instagram") {
    return `https://www.instagram.com/${username}`;
  } else if (platform === "tiktok") {
    return `https://www.tiktok.com/@${username}`;
  } else if (platform === "youtube") {
    return `https://www.youtube.com/@${username}`;
  }
};
