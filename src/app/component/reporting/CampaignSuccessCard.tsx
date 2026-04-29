// components/CampaignSuccessCard.tsx

import React from "react";

const CampaignSuccessCard = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl p-10 bg-section-overlays backdrop-blur-xl border border-white/10">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/20 blur-[120px] rounded-full" />

      <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <span className="text-primaryButton text-xs uppercase tracking-widest mb-3 block">
            Intelligence Insight
          </span>

          <h1 className="text-4xl font-bold mb-4">
            Campaign Success Report
          </h1>

          <p className="text-white/60 max-w-md">
            Analytical breakdown of campaign performance across influencers with
            high engagement and ROI.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard title="Total Reach" value="4.2M" sub="+12.4%"  />
          <StatCard title="Eng. Rate" value="8.6%" sub="High" />
          <StatCard title="ROI" value="14.2x" sub="Top Tier" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  sub,
  highlight,
}: {
  title: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-5 rounded-2xl border border-white/10 bg-white/5 ${
        highlight ? "shadow-[0_0_20px_rgba(255,78,126,0.3)]" : ""
      }`}
    >
      <span className="text-[10px] text-white/50 uppercase mb-1">
        {title}
      </span>

      <span className="text-xl font-semibold">{value}</span>

      <span
        className={`text-[10px] mt-1 ${
          highlight ? "text-green-400" : "text-primaryButton"
        }`}
      >
        {sub}
      </span>
    </div>
  );
};

export default CampaignSuccessCard;