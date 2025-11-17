"use client";
import { Button } from "@/components/ui/button";
import CountButton from "@/src/app/component/custom-component/countbutton";
import PlatformBadge from "@/src/app/component/custom-component/platformbadge";
import Spinner from "@/src/app/component/custom-component/spinner";
import StatusBadge from "@/src/app/component/custom-component/statusbadge";
import TableComponent from "@/src/app/component/CustomTable";
import CompanyCampaignHook from "@/src/routes/Company/api/Hooks/companyCampaign.hook";
import { AdminAllCampaignApiResponse } from "@/src/types/Admin-Type/Campaign.type";
import { Eye } from "lucide-react";
import router from "next/router";
import React from "react";

export default function ApprovedCampaign() {
  const { data, isLoading, error } = CompanyCampaignHook();
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
  if (!data?.campaigns) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-primary-text text-2xl font-bold">
          No data found
        </div>
      </div>
    );
  }
  console.log("response data ", data?.campaigns);
  return (
    <>
      <TableComponent
        header={[
          "Campaign ID",
          "Campaign Name",
          // "Company Name",
          "Platform",
          "Requested ",
          "Approved ",
          "Rejected ",
          "Status",
          "Created At",
          "View",
        ]}
        subheader={data?.campaigns?.map(
          (campaign: AdminAllCampaignApiResponse) => [
            campaign?._id,
            <div key={`name-${campaign?._id}`} className="truncate">
              {campaign?.name}
            </div>,
            // <div key={`company-name-${campaign._id}`} className="truncate">
            //   {campaign.company_name}
            // </div>,
            <div key={`platform-${campaign._id}`} className="truncate">
              <PlatformBadge platform={campaign?.platform} />
            </div>,
            <div key={`requested-${campaign._id}`} className="truncate">
              <CountButton count={campaign?.limit} />
            </div>,
            <div key={`approved-${campaign._id}`} className="truncate">
              <CountButton count={campaign?.approved_influencers_count} />
            </div>,
            <div key={`rejected-${campaign._id}`} className="truncate">
              <CountButton count={campaign?.rejected_influencers_count} />
            </div>,
            <div key={`status-${campaign?._id}`} className="truncate">
              <StatusBadge status={campaign.status} />
              {/* <StatusBadge status={campaign.status} /> */}
            </div>,
            <div key={`created-at-${campaign._id}`} className="truncate">
              {new Date(campaign?.created_at).toLocaleDateString()}
            </div>,
            <div key={`view-${campaign._id}`} className="truncate">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  router.push(`/Admin/pending-campaign/${campaign._id}`)
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
