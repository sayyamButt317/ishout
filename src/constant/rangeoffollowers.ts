export const microInfluencers = [
  "10k-50k",
  "50k-100k",
];

export const midTierInfluencers = [
  "100k-200k",
  "200k-500k",
  "500k-1M",
];

export const macroInfluencers = [
  "500k-600k",
  "600k-1M",
  "1M-2M",
  "3M-5M",
  "5M-10M",
];

export const rangeOfFollowers = [
  ...microInfluencers,
  ...midTierInfluencers,
  ...macroInfluencers,
];

export const followerRangesByCategory = {
  micro: microInfluencers,
  midTier: midTierInfluencers,
  macro: macroInfluencers,
};
