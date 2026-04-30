"use client";

import CampaignAllInfluencerHook from "@/src/routes/Admin/Hooks/feedback/CampaignInfluencer-hook";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Influencer } from "@/src/types/Admin-Type/Feedback/influencer-type";
import useCampaignAnalytics from "@/src/routes/Admin/Hooks/Report/analytics-hook";
import { useState } from "react";


function formatNumber(n: number | string): string {
  if (typeof n === "string") return n;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function getEngagementColor(rate: number) {
  if (rate < 2) return "bg-red-500";
  if (rate < 5) return "bg-yellow-400";
  return "bg-green-500";
}

function getEngagementLabel(rate: number) {
  if (rate < 2) return "Low";
  if (rate < 5) return "Average";
  return "High";
}



export default function InfluencerReportHeader() {
  const { id } = useParams<{ id: string }>();

  const { data: influencerData } = CampaignAllInfluencerHook(id);

  const {
    data: campaignAnalytics,
    isLoading,
    isError,
  } = useCampaignAnalytics(id);

  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const analytics = campaignAnalytics?.summary;
  const top = campaignAnalytics?.top_performer;

  if (isLoading) {
    return <div className="text-white">Loading analytics...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Failed to load analytics</div>;
  }

  return (
    <div className="space-y-6">
      {analytics && (
        <div className="space-y-4">

          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              Campaign Analytics Dashboard
            </h1>
            <span className="text-xs text-white/40">
              ID: {campaignAnalytics.campaign_id}
            </span>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <MiniCard label="Influencers" value={analytics.total_influencers} />
            <MiniCard label="Likes" value={analytics.total_likes} />
            <MiniCard label="Comments" value={analytics.total_comments} />
            <MiniCard label="Interactions" value={analytics.total_interactions} />
            <MiniCard
              label="Avg Interaction"
              value={analytics.avg_interaction_per_influencer}
            />
            <MiniCard
              label="Engagement %"
              value={`${analytics.engagement_rate}%`}
            />
          </div>

          {/* TOP PERFORMER */}
          {top && (
            <div className="bg-linear-to-r from-pink-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
                  🏆
                </div>

                <div>
                  <p className="text-white font-semibold">
                    Top Performer: @{top.username}
                  </p>
                  <p className="text-white/40 text-xs">
                    {top.interaction} interactions • {top.likes} likes •{" "}
                    {top.comments} comments
                  </p>
                </div>
              </div>

              <a
                href={top.reel_url}
                target="_blank"
                className="text-pink-400 text-xs font-medium"
              >
                View Reel →
              </a>
            </div>
          )}
        </div>
      )}



      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {influencerData?.influencers?.map(
          (inf: Influencer, index: number) => {
            const profile = inf?.data?.profile;
            const reel = inf?.data?.reel;

            if (!profile || !reel) return null;

            const isPlaying = playingIndex === index;

            const engRateNumber = profile.followers
              ? ((reel.likes + reel.comments + reel.interaction) /
                profile.followers) *
              100
              : 0;

            const engRate = profile.followers
              ? engRateNumber.toFixed(2) + "%"
              : "N/A";

            return (
              <div
                key={inf.username}
                className="rounded-2xl bg-[#0f0f12] border border-white/10 overflow-hidden flex"
              >
                {/* VIDEO */}
                <div
                  className="relative w-[45%] aspect-9/16 bg-black cursor-pointer"
                  onClick={() => setPlayingIndex(index)}
                >
                  {!isPlaying ? (
                    <>
                      <Image
                        src={reel.thumbnail}
                        alt="thumbnail"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center text-black font-bold">
                          ▶
                        </div>
                      </div>
                    </>
                  ) : (
                    <video
                      src={reel.media_url}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* DETAILS */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Image
                        src={profile.profile_image}
                        alt={profile.username}
                        width={45}
                        height={45}
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-white font-semibold">
                          {profile.name || profile.username}
                        </p>
                        <p className="text-white/40 text-sm">
                          @{profile.username}
                        </p>
                      </div>
                    </div>

                    <p className="text-white/50 text-xs mb-3 line-clamp-2">
                      {profile.biography}
                    </p>

                    {/* STATS */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <Stat
                        label="Followers"
                        value={formatNumber(profile.followers)}
                      />
                      <Stat
                        label="Following"
                        value={formatNumber(profile.following)}
                      />
                      <Stat
                        label="Posts"
                        value={formatNumber(profile.media_count)}
                      />
                      <Stat label="Likes" value={formatNumber(reel.likes)} />
                      <Stat
                        label="Comments"
                        value={formatNumber(reel.comments)}
                      />
                      <Stat
                        label="Interactions"
                        value={formatNumber(reel.interaction)}
                      />
                      <Stat label="Views" value={formatNumber(reel.views)} />
                    </div>

                    {/* ENGAGEMENT */}
                    <div className="text-xs text-white/50">
                      Engagement:{" "}
                      <span className="text-white font-semibold">
                        {engRate} ({getEngagementLabel(engRateNumber)})
                      </span>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-3">
                    <p className="text-white/40 text-xs italic line-clamp-2 mb-1">
                      “{reel.caption}”
                    </p>

                    <a
                      href={reel.url}
                      target="_blank"
                      className="text-pink-500 text-xs"
                    >
                      Open Reel ↗
                    </a>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}


function MiniCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-[#0f0f12] border border-white/10 rounded-xl p-3">
      <p className="text-[10px] text-white/40">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}



function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-md p-2">
      <p className="text-[10px] text-white/40">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}