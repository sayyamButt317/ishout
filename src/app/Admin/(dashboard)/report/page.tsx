"use client";

import CampaignAllInfluencerHook from "@/src/routes/Admin/Hooks/feedback/CampaignInfluencer-hook";
import Image from "next/image";
import React from "react";

function formatNumber(n: number | string): string {
  if (typeof n === "string") return n;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export default function InfluencerReportHeader() {
  const campaignid = "69ef73775c6f03c182d111aa";

  const { data, isLoading } = CampaignAllInfluencerHook(campaignid);
  console.log("data", data)

  const influencer = data?.influencers?.[0];
  const profile = influencer?.data?.profile;
  const reel = influencer?.data?.reel;

  if (!profile || !reel) return <p className="text-white">No data found</p>;

  const engRate = profile.followers
    ? (
      ((reel.likes + reel.comments + reel.interaction) /
        profile.followers) *
      100
    ).toFixed(2) + "%"
    : "N/A";

  const stats = [
    {
      label: "Total Reach",
      value: formatNumber(profile.followers),
      sub: `${profile.media_count} posts`,
      accent: false,
    },
    {
      label: "Eng. Rate",
      value: engRate,
      sub: "Engagement",
      accent: true,
    },
    {
      label: "Interactions",
      value: formatNumber(reel.interaction),
      sub: "Likes + Comments",
      accent: false,
    },
    {
      label: "Video Views",
      value: formatNumber(reel.views),
      sub: "Latest reel",
      accent: false,
    },
  ];

  return (
    <div className="w-full rounded-2xl bg-[#111114] border border-white/[0.07] p-6 md:p-8 relative overflow-hidden">
      {/* HEADER */}
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#FF3B8D] mb-3">
        Intelligence Insight
      </p>

      <div className="flex flex-col lg:flex-row lg:items-center gap-8">
        {/* LEFT */}
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold text-white mb-3">
            Campaign Success Report
          </h1>

          {/* PROFILE */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20">
              <Image
                src={profile.profile_image}
                alt={profile.name}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <p className="text-white font-semibold">{profile.name}</p>
              <p className="text-white/40 text-sm">@{profile.username}</p>
            </div>
          </div>

          <p className="text-white/40 text-sm">
            {profile.biography}
          </p>
        </div>

        {/* RIGHT STATS */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 border border-white/10 rounded-xl p-3"
            >
              <p className="text-xs text-white/40">{stat.label}</p>
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/30">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* REEL */}
      <div className="mt-6 border-t border-white/10 pt-4">
        <p className="text-white/40 text-sm italic">
          “{reel.caption}”
        </p>

        <a
          href={reel.url}
          target="_blank"
          className="text-pink-500 text-xs mt-2 inline-block"
        >
          View Reel ↗
        </a>
      </div>
    </div>
  );
}