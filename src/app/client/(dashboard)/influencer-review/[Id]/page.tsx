"use client";
import { Button } from "@/components/ui/button";
import TableComponent from "@/src/app/component/CustomTable";
import useAuthStore from "@/src/store/AuthStore/authStore";
import { CircleCheckIcon, CircleXIcon, UserCheck } from "lucide-react";
import PageHeader from "@/src/app/component/PageHeader";
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

  const InfluencerCard = ({ influencer }: { influencer: ReviewInfluencerResponse }) => (
    <div className="group relative w-full rounded-[28px] border border-white/10 bg-[#0f0f10] text-white shadow-[0_24px_80px_rgba(0,0,0,0.55)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent" />
      
      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Image
              src={influencer.picture}
              alt={influencer.username}
              width={72}
              height={72}
              className="h-16 w-16 rounded-full object-cover ring-2 ring-white/10"
            />
            <div className="min-w-0">
              <div
                className="text-[22px] italic font-semibold leading-tight text-white truncate cursor-pointer"
                onClick={() =>
                  window.open(
                    UsernameLink(influencer.platform, influencer.username),
                    "_blank"
                  )
                }
              >
                @{influencer.username || "No name available"}
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-white/60 min-w-0">
                <span className="truncate">{influencer.country}</span>
                <span className="text-white/25">|</span>
                <span className="capitalize truncate">{influencer.platform}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
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
              className="h-8 rounded-full border border-white/40 bg-white/[0.02] px-3 text-sm font-medium text-white/90 hover:bg-white/[0.06] hover:text-white"
            >
              <CircleCheckIcon className="h-4 w-4 text-emerald-500" />
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
              className="h-8 rounded-full border border-white/40 bg-white/[0.02] px-3 text-sm font-medium text-white/90 hover:bg-white/[0.06] hover:text-white"
            >
              <CircleXIcon className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
        
        <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] divide-x divide-white/10">
          <div className="py-3 text-center">
            <p className="text-[11px] tracking-[0.16em] text-white/60">FOLLOWERS</p>
            <p className="mt-1 text-lg font-semibold text-white">
              {formatFollowers(influencer?.followers)}
            </p>
          </div>
          <div className="py-3 text-center">
            <p className="text-[11px] tracking-[0.16em] text-white/60">ENGAGEMENT</p>
            <p className="mt-1 text-lg font-semibold text-primarytext">
              {formatEngagementRate(influencer?.engagementRate)}
            </p>
          </div>
          <div className="py-3 text-center">
            <p className="text-[11px] tracking-[0.16em] text-white/60">PRICING</p>
            <p className="mt-1 text-lg font-semibold text-white">
              ${influencer?.pricing}
            </p>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-center">
            <p className="text-sm text-white/75">Admin Status</p>
            <p
              className={`mt-1 text-lg font-normal ${influencer?.admin_approved ? "text-emerald-400" : "text-red-400"}`}
            >
              {influencer?.admin_approved ? "Approved" : "Not Approved"}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-center">
            <p className="text-sm text-white/75">Company Status</p>
            <p
              className={`mt-1 text-lg font-normal ${influencer?.company_approved ? "text-emerald-400" : "text-red-400"}`}
            >
              {influencer?.company_approved ? "Approved" : "Pending"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Review Influencer"
        description={`${data?.influencers?.length ?? 0} influencers available for review`}
        icon={<UserCheck className="size-5" />}
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.influencers?.map((influencer: ReviewInfluencerResponse) => (
            <InfluencerCard key={influencer._id} influencer={influencer} />
          ))}
        </div>
      )}
      
      {/* Pagination controls */}
      {!isLoading && data && (
        <div className="flex justify-center items-center space-x-4 pt-6">
          <Button
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
            disabled={currentPage <= 1}
            variant="outline"
          >
            Previous
          </Button>
          
          <span className="text-white">
            Page {data.page} of {data.total_pages}
          </span>
          
          <Button
            onClick={() => {
              if (currentPage < data.total_pages) {
                setCurrentPage(currentPage + 1);
              }
            }}
            disabled={currentPage >= data.total_pages}
            variant="outline"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
