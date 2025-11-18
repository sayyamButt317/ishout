export const formatFollowers = (followers: number) =>
  Intl.NumberFormat("en", { notation: "compact" }).format(followers);

export const formatEngagementRate = (rate: number) =>
  `${(rate * 100).toFixed(2)}%`;
