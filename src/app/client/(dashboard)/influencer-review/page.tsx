"use client";
import { Button } from "@/components/ui/button";
import CountButton from "@/src/app/component/custom-component/countbutton";
import PlatformBadge from "@/src/app/component/custom-component/platformbadge";
import StatusBadge from "@/src/app/component/custom-component/statusbadge";
import TableComponent from "@/src/app/component/CustomTable";
import CompanyApprovedCampaignHook from "@/src/routes/Company/api/Hooks/comanyapprovedCampaign.hook";
import useAuthStore from "@/src/store/AuthStore/authStore";
import { CompanyCampaignResponse } from "@/src/types/Admin-Type/Campaign.type";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RevieInfluencer() {
  const [currentPage, setCurrentPage] = useState(1);
  // const { data, isLoading } = CompanyCampaignHook(currentPage);
  const { user_id } = useAuthStore();
  const { data, isLoading } = CompanyApprovedCampaignHook(user_id, currentPage);
  const router = useRouter();
  return (
    <>
      <TableComponent
        header={[
          "Campaign ID",
          "Campaign Name",
          "followers",
          "Platform",
          "Requested ",
          "Approval Required",
          // "Rejected ",
          "Status",
          "Created At",
          "Detail",
        ]}
        subheader={data?.campaigns?.map((campaign: CompanyCampaignResponse) => [
          campaign?._id,
          <div key={`name-${campaign?._id}`} className="truncate">
            {campaign?.name}
          </div>,
          <div key={`followers-${campaign?._id}`} className="truncate">
            {campaign?.followers?.join(", ")}
          </div>,
          <div key={`platform-${campaign?._id}`} className="truncate">
            <PlatformBadge platform={campaign?.platform} />
          </div>,
          <div
            key={`requested-${campaign?._id}`}
            className="truncate flex items-center "
          >
            <CountButton count={campaign?.limit ?? 0} />
          </div>,
          <div
            key={`approved-${campaign?._id}`}
            className="truncate flex items-center "
          >
            <CountButton count={campaign?.pending_influencers_count} />
          </div>,
          <div key={`status-${campaign?._id}`} className="truncate">
            <StatusBadge status={campaign.status} />
            {/* <StatusBadge status={campaign.status} /> */}
          </div>,
          <div key={`created-at-${campaign?._id}`} className="truncate">
            {new Date(campaign?.created_at).toLocaleDateString()}
          </div>,
          <div key={`view-${campaign?._id}`} className="truncate">
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={() =>
                router.push(`/client/influencer-review/${campaign?._id}`)
              }
            >
              Details
            </Button>
          </div>,
        ])}
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
