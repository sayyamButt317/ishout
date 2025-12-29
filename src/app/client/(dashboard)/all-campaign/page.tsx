"use client";
import PlatformBadge from "@/src/app/component/custom-component/platformbadge";
import StatusBadge from "@/src/app/component/custom-component/statusbadge";
import TableComponent from "@/src/app/component/CustomTable";
import CompanyCampaignHook from "@/src/routes/Company/api/Hooks/companyCampaign.hook";
import { CompanyCampaignResponse } from "@/src/types/Admin-Type/Campaign.type";
import { useState } from "react";

export default function AllCampaign() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = CompanyCampaignHook(currentPage);
  return (
    <>
      <TableComponent
        header={[
          "Campaign Name",
          "followers",
          "Platform",
          "Requested ",
          // "Approved ",
          // "Rejected ",
          "Status",
          "Created At",
          //   "View",
        ]}
        subheader={data?.campaigns?.map((campaign: CompanyCampaignResponse) => [
          <div key={`name-${campaign?.campaign_id}`} className="truncate">
            {campaign?.name}
          </div>,
          <div key={`followers-${campaign?.campaign_id}`} className="truncate">
            {campaign?.followers?.join(", ")}
          </div>,
          <div key={`platform-${campaign?.campaign_id}`} className="truncate">
            <PlatformBadge platform={campaign?.platform} />
          </div>,
          <div
            key={`requested-${campaign?.campaign_id}`}
            className="truncate items-center justify-center"
          >
            {campaign?.limit}
          </div>,
          <div key={`status-${campaign?.campaign_id}`} className="truncate">
            <StatusBadge status={campaign.status} />
            {/* <StatusBadge status={campaign.status} /> */}
          </div>,
          <div key={`created-at-${campaign?.campaign_id}`} className="truncate">
            {new Date(campaign?.created_at).toLocaleDateString()}
          </div>,
          //   <div key={`view-${campaign?.campaign_id}`} className="truncate">
          //     <Button
          //       className="cursor-pointer"
          //       variant="outline"
          //       size="icon"
          //       onClick={() =>
          //         router.push(`/Admin/pending-campaign/${campaign?.campaign_id}`)
          //       }
          //     >
          //       <Eye className="w-4 h-4 text-primary-text cursor-pointer" />
          //     </Button>
          //   </div>,
          // <div key={`delete-${campaign._id}`} className="truncate">
          //   <Button variant="outline" size="icon">
          //     <Download className="w-4 h-4 text-delete-text cursor-pointer" />
          //   </Button>
          // </div>,
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
