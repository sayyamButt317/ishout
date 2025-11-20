"use client";
import { Button } from "@/components/ui/button";
import PlatformBadge from "@/src/app/component/custom-component/platformbadge";
import StatusBadge from "@/src/app/component/custom-component/statusbadge";
import TableComponent from "@/src/app/component/CustomTable";
import ApprovedCampaignHook from "@/src/routes/Company/api/Hooks/approved-campaign.hook";
import useAuthStore from "@/src/store/AuthStore/authStore";
import { PlatformType } from "@/src/types/readymadeinfluencers-type";
import { Eye } from "lucide-react";
import router from "next/router";
import React from "react";

interface ApprovedCampaignResponse {
  campaign_id: string;
  name: string;
  platform: PlatformType;
  limit: number;
  approved_influencers_count: number;
  rejected_influencers_count: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function ApprovedCampaignPage() {
  const { user_id } = useAuthStore();
  const { data, isLoading } = ApprovedCampaignHook(user_id ?? "");

  return (
    <>
      <TableComponent
        header={[
          "Campaign ID",
          "Campaign Name",
          // "Company Name",
          "Platform",
          // "Requested ",
          // "Approved ",
          // "Rejected ",
          "Status",
          "Created At",
          "View",
        ]}
        subheader={data?.campaigns?.map(
          (campaign: ApprovedCampaignResponse) => [
            campaign?.campaign_id,
            <div key={`name-${campaign?.campaign_id}`} className="truncate">
              {campaign?.name}
            </div>,
            // <div key={`company-name-${campaign._id}`} className="truncate">
            //   {campaign.company_name}
            // </div>,
            <div key={`platform-${campaign?.campaign_id}`} className="truncate">
              <PlatformBadge platform={campaign?.platform} />
            </div>,
            // <div
            //   key={`requested-${campaign?.campaign_id}`}
            //   className="truncate"
            // >
            //   <CountButton count={campaign?.limit} />
            // </div>,
            // <div key={`approved-${campaign?.campaign_id}`} className="truncate">
            //   <CountButton count={campaign?.approved_influencers_count} />
            // </div>,
            // <div key={`rejected-${campaign?.campaign_id}`} className="truncate">
            //   <CountButton count={campaign?.rejected_influencers_count} />
            // </div>,
            <div key={`status-${campaign?.campaign_id}`} className="truncate">
              <StatusBadge status={campaign.status} />
              {/* <StatusBadge status={campaign.status} /> */}
            </div>,
            <div
              key={`created-at-${campaign?.campaign_id}`}
              className="truncate"
            >
              {new Date(campaign?.created_at).toLocaleDateString()}
            </div>,
            <div key={`view-${campaign?.campaign_id}`} className="truncate">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  router.push(
                    `/Admin/pending-campaign/${campaign?.campaign_id}`
                  )
                }
              >
                <Eye className="w-4 h-4 text-primary-text cursor-pointer" />
              </Button>
            </div>,
            // <div key={`delete-${campaign._id}`} className="truncate">
            //   <Button variant="outline" size="icon">
            //     <Download className="w-4 h-4 text-delete-text cursor-pointer" />
            //   </Button>
            // </div>,
          ]
        )}
        paginationstart={1}
        paginationend={10}
        onPageChange={(page: number) => {
          console.log(page);
        }}
        isLoading={isLoading}
      />
    </>
  );
}
