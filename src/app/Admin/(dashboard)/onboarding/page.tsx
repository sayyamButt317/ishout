"use client";
import PlatformBadge from "@/src/app/component/custom-component/platformbadge";
import Spinner from "@/src/app/component/custom-component/spinner";
import TableComponent from "@/src/app/component/CustomTable";
import { PlatformType } from "@/src/types/readymadeinfluencers-type";
import Image from "next/image";
import React, { useMemo } from "react";
import OnboardingHook from "@/src/routes/Admin/Hooks/onboarding-hook";

interface InfluencerReviewResponse {
  _id: string;
  username: string;
  picture: string;
  engagementRate: number;
  bio: string;
  followers: number;
  country: string;
  status: string;
  admin_approved: boolean;
  company_approved: boolean;
  campaign_id: string;
  influencer_id: string;
  platform: PlatformType;
}

interface InfluencerReviewApiResponse {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
  data?: InfluencerReviewResponse[];
  influencers?: InfluencerReviewResponse[];
}

const formatFollowers = (followers: number) =>
  Intl.NumberFormat("en", { notation: "compact" }).format(followers);

const formatEngagementRate = (rate: number) => `${(rate * 100).toFixed(2)}%`;

const approvalChip = (flag: boolean) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold ${
      flag
        ? "bg-emerald-500/15 text-emerald-300"
        : "bg-slate-500/20 text-slate-200"
    }`}
  >
    {flag ? "Approved" : "Pending"}
  </span>
);

export default function OnboardingPage() {
  const { data, isLoading, error } = OnboardingHook();
  console.log("onboarding data", data);

  const typedData = (data ?? null) as InfluencerReviewApiResponse | null;
  const influencers = useMemo(
    () => typedData?.data ?? typedData?.influencers ?? [],
    [typedData]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-2xl font-bold">
          Error: {error.message}
        </div>
      </div>
    );
  }

  return (
    <>
      <TableComponent
        header={[
          "Influencer",
          "Followers",
          "Engagement",
          "Country",
          "Platform",
          "Admin Review",
          "Company Review",
          "Campaign ID",
          "Action",
        ]}
        subheader={influencers.map((influencer) => [
          <div
            key={`profile-${influencer._id}`}
            className="flex items-center gap-3"
          >
            <div className="relative h-12 w-12 rounded-full overflow-hidden border border-white/15">
              <Image
                src={influencer.picture}
                alt={influencer.username}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="truncate max-w-[160px]">
              <p className="font-semibold">{influencer.username}</p>
              <p className="text-xs text-slate-400 truncate">
                {influencer.bio || "—"}
              </p>
            </div>
          </div>,
          formatFollowers(influencer.followers),
          formatEngagementRate(influencer.engagementRate),
          influencer.country,
          <div key={`platform-${influencer._id}`} className="truncate">
            <PlatformBadge platform={influencer.platform} />
          </div>,
          //   <div key={`status-${influencer._id}`} className="truncate">
          //     <StatusBadge status={influencer.status} />
          //   </div>,
          approvalChip(influencer.admin_approved),
          approvalChip(influencer.company_approved),
          <span
            key={`campaign-${influencer._id}`}
            className="text-xs text-slate-300"
          >
            {influencer.campaign_id}
          </span>,
          <div
            key={`action-${influencer._id}`}
            className="text-xs text-slate-400"
          >
            —
          </div>,
        ])}
        paginationstart={typedData?.page ?? 1}
        paginationend={typedData?.total_pages ?? 1}
        onPageChange={(page: number) => {
          console.log(page);
        }}
        isLoading={isLoading}
      />
    </>
  );
}
