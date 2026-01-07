"use client";
import { Button } from "@/components/ui/button";
import TableComponent from "@/src/app/component/CustomTable";
import useAuthStore from "@/src/store/AuthStore/authStore";
import { CircleCheckIcon, CircleXIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import StatusBadge from "@/src/app/component/custom-component/statusbadge";
import {
  formatEngagementRate,
  formatFollowers,
  UsernameLink,
} from "@/src/helper/followersformat";
import { ReviewInfluencerResponse } from "@/src/types/Admin-Type/review-influencer";
import UpdateInfluencerStatusCompanyHook from "@/src/routes/Company/api/Hooks/update-influencerstatus.hook";
import ReviewPendingInfluencersHook from "@/src/routes/Company/api/Hooks/reveiw-pending.hook";
import { useParams } from "next/navigation";

export default function InfluencerReviewPage() {
  const { user_id } = useAuthStore();
  const { Id } = useParams<{ Id: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = ReviewPendingInfluencersHook(
    currentPage,
    Id ?? ""
  );

  const {
    mutate: updateInfluencerStatus,
    isPending: isUpdatingInfluencerStatus,
  } = UpdateInfluencerStatusCompanyHook();

  return (
    <>
      <TableComponent
        header={[
          "Influencer",
          "Followers",
          "Engagement",
          "Country",
          "Platform",
          "Pricing",
          "Admin",
          "Company",
          // "Campaign ID",
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
                <p className="font-semibold">
                  <span
                    className="text-white hover:text-blue-600 hover:underline cursor-pointer"
                    onClick={() =>
                      window.open(
                        UsernameLink(influencer.platform, influencer.username),
                        "_blank"
                      )
                    }
                  >
                    {influencer.username}
                  </span>
                </p>
              </div>
            </div>,
            formatFollowers(influencer?.followers),
            formatEngagementRate(influencer?.engagementRate),
            influencer.country,
            <div
              key={`platform-${influencer._id}`}
              className="truncate text-xs sm:text-sm"
            >
              {influencer?.platform.charAt(0).toUpperCase() +
                influencer?.platform.slice(1)}
            </div>,
            <div
              key={`pricing-${influencer._id}`}
              className="truncate text-xs sm:text-sm"
            >
              ${influencer?.pricing}
            </div>,
            <StatusBadge
              key={`status-${influencer._id}`}
              status={influencer.admin_approved ? "approved" : "reject"}
            />,
            <StatusBadge
              key={`status-${influencer._id}`}
              status={influencer?.company_approved ? "approved" : "pending"}
            />,
            <div key={`action-${influencer._id}`} className="gap-2 flex">
              <Button
                variant="outline"
                onClick={() => {
                  updateInfluencerStatus({
                    campaign_id: influencer.campaign_id,
                    influencer_id: influencer.influencer_id,
                    platform: influencer.platform,
                    status: "approved",
                    username: influencer.username,
                    followers: influencer.followers,
                    engagementRate: influencer.engagementRate,
                    picture: influencer.picture,
                    bio: influencer.bio,
                    country: influencer.country,
                    company_user_id: user_id,
                  });
                }}
                disabled={isUpdatingInfluencerStatus}
              >
                <CircleCheckIcon className="text-emerald-500 hover:text-emerald-500/80" />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  updateInfluencerStatus({
                    campaign_id: influencer.campaign_id,
                    influencer_id: influencer.influencer_id,
                    platform: influencer.platform,
                    status: "rejected",
                    username: influencer.username,
                    followers: influencer.followers,
                    engagementRate: influencer.engagementRate,
                    picture: influencer.picture,
                    bio: influencer.bio,
                    country: influencer.country,
                    company_user_id: user_id,
                  });
                }}
                disabled={isUpdatingInfluencerStatus}
              >
                <CircleXIcon className="text-destructive hover:text-destructive/80" />
              </Button>
            </div>,
          ]
        )}
        paginationstart={data?.page ?? 1}
        paginationend={data?.total_pages ?? 1}
        onPageChange={(page: number) => {
          setCurrentPage(page);
        }}
        isLoading={isLoading}
      />
    </>
  );
}
