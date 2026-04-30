"use client";

import CampaignAllInfluencerHook from "@/src/routes/Admin/Hooks/feedback/CampaignInfluencer-hook";
import Image from "next/image";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Influencer } from "@/src/types/Admin-Type/Feedback/influencer-type";
import NegotiationAgreedByCampaignHook from "@/src/routes/Admin/Hooks/Whatsapp/negotiation-agreed-by-campaign-hook";
import ContentHeader from "@/src/app/component/custom-component/ContentHeader";

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

  const { data, isLoading } = NegotiationAgreedByCampaignHook(id);
  const { data: influencerData } = CampaignAllInfluencerHook(id);

  const [selectedBriefId, setSelectedBriefId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  if (isLoading) return <p className="text-white">Loading...</p>;

  if (!influencerData?.influencers?.length)
    return <p className="text-white">No influencer data found</p>;

  // =========================
  // SAFE MAPPING
  // =========================
  const campaign = data?.campaign;
  const brief = data?.campaign_brief;
  const deliverables = brief?.deliverables_per_influencer ?? [];
  const timeline = brief?.timeline ?? [];

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <ContentHeader
        title={brief?.title ?? "Campaign"}
        logo={data?.campaign_logo_url ?? ""}
        description="Showing influencers content waiting for content feedback review"
        category={campaign?.category?.join(", ") ?? "Influencers Content"}
        deliverables={deliverables}
        timeline={timeline}
        platform={campaign?.platform}
        companyName={campaign?.company_name ?? ""}
        briefId={campaign?.brief_id}
        brandThreadId={campaign?.brand_thread_id}
        onViewBrief={(id) => {
          setSelectedBriefId(id);
          setDialogOpen(true);
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {influencerData.influencers.map((inf: Influencer, index: number) => {
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

                    {/* ENGAGEMENT */}
                    <div className="col-span-2 mb-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-white/50">Engagement</span>
                        <span
                          className={`font-semibold ${engRateNumber < 2
                            ? "text-red-400"
                            : engRateNumber < 5
                              ? "text-yellow-400"
                              : "text-green-400"
                            }`}
                        >
                          {engRate} ({getEngagementLabel(engRateNumber)})
                        </span>
                      </div>

                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`${getEngagementColor(
                            engRateNumber
                          )} h-full`}
                          style={{
                            width: `${Math.min(engRateNumber * 10, 100)}%`,
                          }}
                        />
                      </div>
                    </div>

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

                  {/* META */}
                  <div className="text-[10px] text-white/40 flex justify-between">
                    <p>
                      Posted:{" "}
                      {new Date(reel.timestamp).toLocaleDateString()}
                    </p>
                    <p>
                      Updated:{" "}
                      {new Date(inf.updated_at).toLocaleDateString()}
                    </p>
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
        })}
      </div>
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