"use client";
import PlatformBadge from "@/src/app/component/custom-component/platformbadge";
import TableComponent from "@/src/app/component/CustomTable";
import React, { useState } from "react";
import StatusBadge from "@/src/app/component/custom-component/statusbadge";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import OnboardingCampaignHook from "@/src/routes/Admin/Hooks/onboardingCampaign-hook";
import { CompanyCampaignResponse } from "@/src/types/Admin-Type/Campaign.type";
import CountButton from "@/src/app/component/custom-component/countbutton";
import { useRouter } from "next/navigation";

export default function OnboardingCampaignPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch, isRefetching } =
    OnboardingCampaignHook(currentPage);
  const router = useRouter();

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-row items-center gap-2">
          <h1 className="italic text-xl md:text-3xl font-semibold text-white tracking-tight">
            Onboarding Influencers
          </h1>
          <Button
            className="cursor-pointer"
            variant="ghost"
            size="icon"
            onClick={() => {
              refetch();
            }}
            disabled={isRefetching}
          >
            <RefreshCcw
              className={`mt-5 w-4 h-4 text-primary-text cursor-pointer ${isRefetching ? "animate-spin" : ""
                }`}
            />
          </Button>
        </div>
        <p className="italic text-xs text-slate-200 mt-2">
          Showing {data?.campaigns?.length} onboarding campaigns that have waiting
          for influencers to be onboarded
        </p>
      </div>

      <TableComponent
        header={[
          "Company Name",
          "Campaign Name",
          "Source",
          "Platform",
          "Category",
          "Followers",
          "Country",
          "Requested",
          "Onboarded",
          "Status",
          "Created At",
          "View",
        ]}
        imageUrls={data?.campaigns?.map((campaign: CompanyCampaignResponse) => campaign?.logo_url || null)}
        subheader={data?.campaigns?.map((campaign: CompanyCampaignResponse) => [
          <div key={`company-${campaign._id}`} className="truncate">
            {campaign?.company_name}
          </div>,
          <div key={`campaign-name-${campaign._id}`} className="truncate">
            {campaign?.name}
          </div>,
          <div key={`source-${campaign._id}`} className="truncate">
            {campaign?.user_type || "-"}
          </div>,
          <div key={`platform-${campaign._id}`} className="truncate">
            <PlatformBadge platform={campaign?.platform} />
          </div>,
          <div key={`category-${campaign._id}`} className="truncate">
            {campaign?.category?.join(", ") || "-"}
          </div>,
          <div key={`followers-${campaign._id}`} className="truncate">
            {Array.isArray(campaign?.followers)
              ? campaign.followers.map((f: number) => `${f}k`).join(", ")
              : "-"}
          </div>,
          <div key={`country-${campaign._id}`} className="truncate">
            {campaign?.country?.join(", ") || "-"}
          </div>,
          <div key={`requested-influencers-${campaign._id}`} className="truncate">
            <CountButton count={campaign?.limit} />
          </div>,
          <div key={`onboarding-influencers-${campaign._id}`} className="truncate">
            <CountButton count={campaign?.approved_influencer_count} />
          </div>,
          <div key={`status-${campaign._id}`} className="truncate">
            <StatusBadge status={campaign?.status} />
          </div>,
          <div key={`created-at-${campaign._id}`} className="truncate">
            {new Date(campaign?.created_at).toLocaleDateString()}
          </div>,
          <div key={`view-${campaign._id}`} className="truncate">
            <Button
              className="bg-primaryButton hover:bg-primaryHover text-white whitespace-nowrap text-xs px-3 cursor-pointer"
              onClick={() => {
                router.push(`/Admin/onboarding/${campaign?._id}`);
              }}
            >
              View
            </Button>
          </div>,
        ])}
        paginationstart={currentPage}
        paginationend={data?.total_pages ?? 1}
        onPageChange={(page: number) => setCurrentPage(page)}
        isLoading={isLoading}
      />
    </>
  );
}
