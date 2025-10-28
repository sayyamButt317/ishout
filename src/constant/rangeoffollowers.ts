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

export const influencerCategories = [
  {
    title: "Micro Influencers",
    ranges: microInfluencers,
    color: "from-green-500 to-emerald-600",
    bgColor: "from-green-900 via-emerald-900 to-teal-900",
    description: "High engagement, niche audiences",
  },
  {
    title: "Mid-tier Influencers",
    ranges: midTierInfluencers,
    color: "from-blue-500 to-cyan-600",
    bgColor: "from-blue-900 via-cyan-900 to-sky-900",
    description: "Balanced reach and engagement",
  },
  {
    title: "Macro Influencers",
    ranges: macroInfluencers,
    color: "from-purple-500 to-pink-600",
    bgColor: "from-purple-900 via-pink-900 to-rose-900",
    description: "Massive reach, brand awareness",
  },
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
