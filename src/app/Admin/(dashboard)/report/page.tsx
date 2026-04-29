// export default function ContentReportGeneration() {
//   return (
//     <div>ContentReportGeneration

//       <div className='flex flex-row item-center justify-center '>
//       <button className='bg-primaryButton text-white px-4 py-2 rounded-lg mt-4'>Generate Report</button>
//       </div>
//     </div>
//   )
// }

"use client";

import Image from "next/image";
import React from "react";

interface ReelData {
  url: string;
  thumbnail: string;
  media_url: string;
  likes: number;
  comments: number;
  views: string | number;
  interaction: number;
  caption: string;
  "date posted on": string;
}

interface ProfileData {
  username: string;
  name: string;
  profile_image: string;
  biography: string;
  followers: number;
  following: number;
  media_count: number;
}

interface InfluencerData {
  profile: ProfileData;
  reel: ReelData;
}

interface InfluencerReportHeaderProps {
  data?: InfluencerData;
  campaignName?: string;
}

function formatNumber(n: number | string): string {
  if (typeof n === "string") return n;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function calcEngagementRate(data: InfluencerData): string {
  const { followers } = data.profile;
  const { likes, comments, interaction } = data.reel;
  if (!followers) return "N/A";
  const eng = ((likes + comments + interaction) / followers) * 100;
  return `${eng.toFixed(2)}%`;
}

export default function InfluencerReportHeader({
  data,
  campaignName = "Campaign Success Report",
}: InfluencerReportHeaderProps) {
  const { profile, reel } = data;
  const engRate = calcEngagementRate(data);

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
      sub: "High Intensity",
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
      {/* Background glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#FF3B8D]/5 blur-3xl pointer-events-none" />

      {/* Top label */}
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#FF3B8D] mb-3">
        Intelligence Insight
      </p>

      <div className="flex flex-col lg:flex-row lg:items-center gap-8">
        {/* Left: title + description */}
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight mb-3">
            {campaignName}
          </h1>

          {/* Influencer identity row */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 shrink-0">
              {profile.profile_image ? (
                <Image
                  src={profile?.profile_image}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  width={200}
                  height={200}
                />
              ) : (
                <div className="w-full h-full bg-[#FF3B8D]/20 flex items-center justify-center text-[#FF3B8D] font-bold text-xs">
                  {profile.name?.[0] ?? "?"}
                </div>
              )}
            </div>
            <div>
              <span className="text-white font-semibold text-sm">
                {profile.name}
              </span>
              <span className="text-white/40 text-sm ml-1.5">
                @{profile.username}
              </span>
            </div>
            <span className="ml-auto text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Active
            </span>
          </div>

          <p className="text-white/40 text-sm leading-relaxed max-w-md">
            {profile.biography ||
              `An analytical breakdown of the latest reel performance across all metrics. High resonance detected in metropolitan hubs.`}
          </p>
        </div>

        {/* Right: stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-3 shrink-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`flex flex-col gap-1 rounded-xl px-4 py-3 border transition-all ${
                stat.accent
                  ? "bg-[#FF3B8D]/8 border-[#FF3B8D]/25"
                  : "bg-white/4 border-white/[0.07]"
              }`}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.12em] text-white/40 whitespace-nowrap">
                {stat.label}
              </span>
              <span
                className={`text-2xl font-black tracking-tight leading-none ${
                  stat.accent ? "text-[#FF3B8D]" : "text-white"
                }`}
              >
                {stat.value}
              </span>
              <span className="text-[11px] text-white/30 mt-0.5">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reel caption strip */}
      {reel.caption && (
        <div className="mt-6 pt-5 border-t border-white/6 flex items-start gap-3">
          <span className="shrink-0 mt-0.5 w-4 h-4 text-white/20">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 4.5A2.5 2.5 0 014.5 2h7A2.5 2.5 0 0114 4.5v7A2.5 2.5 0 0111.5 14h-7A2.5 2.5 0 012 11.5v-7z"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M6.5 6.5L10 8l-3.5 1.5v-3z"
                fill="currentColor"
              />
            </svg>
          </span>
          <p className="text-white/30 text-xs leading-relaxed line-clamp-2 italic">
            &ldquo;{reel.caption.trim()}&rdquo;
          </p>
          <a
            href={reel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto shrink-0 text-[#FF3B8D] text-[11px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity whitespace-nowrap"
          >
            View Reel ↗
          </a>
        </div>
      )}
    </div>
  );
}


/* ── Usage example ──────────────────────────────────────────────────────────

import InfluencerReportHeader from "@/components/InfluencerReportHeader";

const sampleData = {
  profile: {
    username: "withregardsrafia",
    name: "Rafia",
    profile_image: "https://...",
    biography: "Lifestyle creator based in Dubai 🇦🇪",
    followers: 51000,
    following: 22,
    media_count: 11,
  },
  reel: {
    url: "https://www.instagram.com/reel/DDzsYxLImZe/",
    thumbnail: "https://...",
    media_url: "...",
    likes: 15,
    comments: 5,
    views: "N/A",
    interaction: 20,
    caption: "My aesthetic camera roll\n",
    "date posted on": "2024-12-20T16:58:58+0000",
  },
};

export default function Page() {
  return (
    <main className="p-8 bg-black min-h-screen">
      <InfluencerReportHeader
        data={sampleData}
        campaignName="Campaign Success Report"
      />
    </main>
  );
}

─────────────────────────────────────────────────────────────────────────── */