"use client";
import PlatformBadge from "@/src/app/component/custom-component/platformbadge";
import Spinner from "@/src/app/component/custom-component/spinner";
import TableComponent from "@/src/app/component/CustomTable";
import Image from "next/image";
import React, { useState } from "react";
import OnboardingHook from "@/src/routes/Admin/Hooks/onboarding-hook";
import StatusBadge from "@/src/app/component/custom-component/statusbadge";
import {
  formatEngagementRate,
  formatFollowers,
} from "@/src/helper/followersformat";
import { ReviewInfluencerResponse } from "@/src/types/Admin-Type/review-influencer";

export default function OnboardingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = OnboardingHook(currentPage);
  console.log("onboarding data", data);

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
        subheader={data?.influencers?.map(
          (influencer: ReviewInfluencerResponse) => [
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
            <StatusBadge
              key={`status-${influencer._id}`}
              status={influencer.admin_approved ? "approved" : "reject"}
            />,
            <StatusBadge
              key={`status-${influencer._id}`}
              status={influencer.company_approved ? "approved" : "reject"}
            />,
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
          ]
        )}
        paginationstart={data?.page ?? 1}
        paginationend={data?.total_pages ?? 1}
        onPageChange={(page: number) => {
          console.log(page);
          setCurrentPage(page);
        }}
        isLoading={isLoading}
      />
    </>
  );
}
